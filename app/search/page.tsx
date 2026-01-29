import React from 'react';
import { client, urlFor } from '@/app/lib/sanity';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Truck, ShoppingCart, AlertCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

// --- Types ---
type SanityImage = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
};

// Interface to avoid 'any'
interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  oldPrice?: number; // Optional, might be null
  lessprice?: number;
  details: string;
  image: SanityImage[];
  category: string;
  review?: number; // Replaces rating
}

const getStableRandom = (seed: string, min: number, max: number) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return (Math.abs(hash) % (max - min + 1)) + min;
};

// Helper: Get Stable Date
const getDeliveryDate = (id: string) => {
  const dates = ["Thu, Feb 5", "Fri, Feb 6", "Mon, Feb 9", "Tue, Feb 10"];
  const index = getStableRandom(id, 0, dates.length - 1);
  return dates[index];
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const awaitedSearchParams = await searchParams; // Awaiting searchParams in Next.js 15+ is best practice
  const query = awaitedSearchParams.q || '';
  
  if (!query) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 bg-white">
        <AlertCircle className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">Please enter a search term</h2>
      </div>
    );
  }

  const sanityQuery = `*[_type == "product" && (
    name match "${query}*" || 
    details match "*${query}*" ||
    category->title match "*${query}*" ||
    tags[] match "${query}*"
  )] {
    _id,
    name,
    "slug": slug.current,
    price,
    oldPrice, 
    details,
    image[0],
    "category": category->title,
    review 
  }`;

  const products: Product[] = await client.fetch(sanityQuery);

  return (
    <div className="bg-white min-h-screen pb-20 font-sans">
      {/* Search Header */}
      <div className="border-b border-gray-200 shadow-sm bg-white sticky top-0 z-30 px-4 py-3">
        <div className="max-w-7xl mx-auto">
           <p className="text-sm text-gray-600">
             {products.length > 0 ? (
               <>Check out these results for <span className="text-orange-600 font-bold">&quot;{query}&quot;</span></>
             ) : (
               <>No results found for &quot;{query}&quot;</>
             )}
           </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Sidebar Filters */}
          <div className="hidden md:block col-span-1 pr-4 border-r border-gray-100 space-y-6">
            <div>
              <h3 className="font-bold text-sm mb-2">Customer Reviews</h3>
              <div className="flex flex-col gap-1 cursor-pointer">
                {[5, 4, 3].map((star) => (
                  <div key={star} className="flex items-center hover:text-orange-500 group">
                    <div className="flex text-yellow-400 group-hover:scale-105 transition-transform">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill={i < star ? "currentColor" : "none"} className={i < star ? "text-yellow-400" : "text-gray-300"} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">& Up</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-sm mb-2">Price</h3>
              <ul className="text-sm text-gray-600 space-y-1 cursor-pointer">
                <li className="hover:text-orange-600">Under ₦10,000</li>
                <li className="hover:text-orange-600">₦10,000 - ₦50,000</li>
                <li className="hover:text-orange-600">₦50,000 - ₦100,000</li>
                <li className="hover:text-orange-600">Over ₦100,000</li>
              </ul>
            </div>
          </div>

          {/* Results Grid */}
          <div className="col-span-1 md:col-span-3">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Results</h2>
            
            {products.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 rounded-xl">
                 <p className="text-gray-500 text-lg">We couldn&apos;t find any matches.</p>
                 <p className="text-gray-400">Try checking your spelling or use more general terms.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product) => {
                  // Calculate display logic
                  const isDeal = product.oldPrice && product.price < product.oldPrice;
                  const discount = isDeal && product.oldPrice 
                    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) 
                    : 0;
                  
                  // Use stable random for ratings count
                  const ratingCount = getStableRandom(product._id, 10, 500);

                  return (
                    <div key={product._id} className="group flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md">
                      
                      {/* Product Image */}
                      <div className="w-full sm:w-56 h-56 shrink-0 bg-gray-100 rounded-md overflow-hidden relative">
                         <Link href={`/product/${product.slug}`}>
                            {product.image ? (
                               <Image 
                                 src={urlFor(product.image).url()} 
                                 alt={product.name}
                                 fill
                                 className="object-contain p-4 group-hover:scale-105 transition-transform duration-300 mix-blend-multiply"
                               />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                            )}
                         </Link>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-start">
                        <Link href={`/product/${product.slug}`}>
                          <h3 className="text-lg md:text-xl font-medium text-gray-900 line-clamp-2 hover:text-orange-600 transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        
                        {/* Rating / Review */}
                        <div className="flex items-center gap-1 mt-1">
                          <div className="flex text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} fill={i < (product.review || 4) ? "currentColor" : "none"} className={i < (product.review || 4) ? "text-yellow-500" : "text-gray-300"} />
                            ))}
                          </div>
                          <span className="text-sm text-blue-600 hover:underline cursor-pointer ml-1">
                            {ratingCount} ratings
                          </span>
                        </div>

                        {/* Price Section */}
                        <div className="mt-2">
                           {isDeal && (
                             <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-sm uppercase inline-block mb-1">
                               Limited time deal
                             </span>
                           )}
                           <div className="flex items-baseline gap-2">
                             <span className="text-xs relative -top-2">₦</span>
                             <span className="text-2xl font-bold text-gray-900">
                               {product.price.toLocaleString()}
                             </span>
                             <span className="text-xs">00</span>
                           </div>
                           {isDeal && product.oldPrice && (
                             <p className="text-sm text-gray-500">
                               Was: <span className="line-through">₦{product.oldPrice.toLocaleString()}</span> ({discount}% off)
                             </p>
                           )}
                        </div>

                        {/* Delivery Info */}
                        <div className="mt-2 flex flex-col gap-1 text-sm text-gray-700">
                          <div className="flex items-center gap-2">
                             <span className="font-bold">Get it by {getDeliveryDate(product._id)}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500 text-xs">
                            <Truck className="w-3 h-3" />
                            <span>Free delivery by Steve O&apos;Bizz</span>
                          </div>
                        </div>
                        
                        {/* Mobile: Add to Cart Button */}
                         <button className="mt-4 md:hidden w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 rounded-full text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors">
                           <ShoppingCart className="w-4 h-4" />
                          Add to basket
                         </button>
                      </div>
                      
                      {/* Desktop: Add to Cart Column */}
                      <div className="hidden md:flex flex-col items-center justify-center w-48 pl-4 border-l border-gray-100">
                         <div className="text-center w-full">
                           <p className="text-xl font-bold text-red-700 mb-2">In Stock</p>
                           <button className="w-full bg-yellow-400 hover:bg-yellow-500 transition-colors text-black font-medium py-2.5 rounded-full shadow-sm text-sm flex items-center justify-center gap-2 cursor-pointer">
                              <ShoppingCart className="w-4 h-4" />
                              Add 
                           </button>
                         </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}