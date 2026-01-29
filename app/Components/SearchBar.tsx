'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Search, X, Loader2, ChevronRight } from 'lucide-react';
import { client } from '@/app/lib/sanity'; 
import Link from 'next/link';

// --- Types ---
type SanityImage = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
};

interface ProductSuggestion {
  _id: string;
  name: string;
  category: string;
  slug: { current: string };
  image: SanityImage[];
}

interface SearchBarProps {
  variant?: 'mobile' | 'desktop';
}

const SearchBar = ({ variant = 'desktop' }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const router = useRouter();
  const pathname = usePathname();
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search when route changes
  useEffect(() => {
    setIsOpen(false);
    setActiveIndex(-1);
  }, [pathname]);

  // Handle Click Outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // -- Typed Debounce Function --
  const debounce = useCallback((func: (...args: unknown[]) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: unknown[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }, []);

  // -- Fetch Logic --
  const fetchSuggestions = useCallback(async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }
    setIsLoading(true);
    
    const groqQuery = `*[_type == "product" && (
      name match "${searchTerm}*" || 
      details match "*${searchTerm}*" ||
      category->title match "${searchTerm}*" ||
      tags[] match "${searchTerm}*"
    )][0...8] {
      _id,
      name,
      "slug": slug,
      "category": category->title,
      image
    }`;

    try {
      const results = await client.fetch(groqQuery);
      setSuggestions(results);
    } catch (error) {
      console.error("Search Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Use a ref to keep the debounced function stable across renders
  const debouncedSearch = useRef(debounce((val) => fetchSuggestions(val as string), 300)).current;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setActiveIndex(-1); // Reset selection on typing
    if (val.length > 0) {
      setIsOpen(true);
      debouncedSearch(val);
    } else {
      setIsOpen(false);
      setSuggestions([]);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };

  // -- Keyboard Navigation --
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        e.preventDefault();
        // Go directly to the selected product
        router.push(`/product/${suggestions[activeIndex].slug.current}`);
        setIsOpen(false);
      }
      // If no suggestion selected, standard form submit handles it
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* 1. The "Ash" Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-[2px] z-40 transition-opacity duration-300" />
      )}

      {/* 2. The Search Container */}
      <div 
        ref={searchRef} 
        className={`relative z-50 ${variant === 'desktop' ? 'flex-1 mx-10 max-w-2xl' : 'flex-1'}`}
      >
        <form onSubmit={handleSearchSubmit}
         className={`flex items-center bg-white border-2 transition-all rounded-2xl overflow-hidden ${isOpen ? 'border-blue-500 shadow-lg' : 'border-gray-200'}`}>
          <div className={`relative w-full flex items-center overflow-hidden
            ${variant === 'desktop' 
              ? `bg-white border-2 ${isOpen ? 'border-blue-500 rounded-2xl rounded-b-none' : 'border-gray-300 rounded-2xl'}` 
              : 'bg-gray-100 rounded-2xl border border-transparent focus-within:bg-white focus-within:border-blue-500'
            }
          `}>
            
            <div className="pl-4 text-gray-500">
               {isLoading ? <Loader2 className="animate-spin w-5 h-5 text-blue-500" /> : <Search className="w-5 h-5" />}
            </div>

            <input
              type="text"
              value={query}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onFocus={() => query.length > 0 && setIsOpen(true)}
              placeholder={variant === 'desktop' ? "Search for office supplies..." : "Search..."}
              className={`w-full py-3 px-3 text-gray-900 placeholder-gray-500 outline-none bg-transparent text-base`}
              autoComplete="off"
            />

            {query && (
              <button 
                type="button" 
                onClick={() => { setQuery(''); setIsOpen(false); }}
                className="pr-4 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {variant === 'desktop' && (
              <button type="submit" className="hidden md:flex bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-medium transition-colors cursor-pointer">
                Search
              </button>
            )}
          </div>

          {/* 3. Suggestions Dropdown */}
          {isOpen && suggestions.length > 0 && (
            <div className={`absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border-t-0 border-x border-b border-gray-200 overflow-hidden
              ${variant === 'desktop' ? 'rounded-b-2xl' : 'rounded-xl mt-2'}
            `}>
              <ul>
                {suggestions.map((product, index) => (
                  <li key={product._id} className="border-b border-gray-50 last:border-none">
                    <Link 
                      href={`/product/${product.slug.current}`}
                      className={`flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer
                        ${index === activeIndex ? 'bg-gray-100 ring-l-4 ring-orange-500' : ''}`}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center gap-3">
                        <Search className={`w-4 h-4 ${index === activeIndex ? 'text-orange-500' : 'text-gray-400'}`} />
                        <div>
                          <span className="font-medium text-gray-900">{product.name}</span>
                          {product.category && (
                            <span className="text-xs text-gray-500 ml-2 hidden sm:inline-block">in {product.category}</span>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300" />
                    </Link>
                  </li>
                ))}
                
                <li className="bg-gray-50">
                   <button 
                    onClick={handleSearchSubmit} 
                    className="w-full text-left px-4 py-3 text-sm text-blue-600 hover:underline font-semibold cursor-pointer"
                   >
                     See all results for &quot;{query}&quot;
                   </button>
                </li>
              </ul>
            </div>
          )}

          {isOpen && query.length > 2 && suggestions.length === 0 && !isLoading && (
            <div className={`absolute left-0 right-0 top-full bg-white shadow-xl p-4 text-center
               ${variant === 'desktop' ? 'rounded-b-2xl' : 'rounded-xl mt-2'}
            `}>
              <p className="text-gray-500">No products found for &quot;{query}&quot;</p>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default SearchBar;