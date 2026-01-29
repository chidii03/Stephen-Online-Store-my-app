"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import  SearchForm from "@/app/Components/SearchBar"


interface StorageItem {
  _id: string | number; 
}

export default function MiddleNav() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const loadCounts = () => {
      const cartData = localStorage.getItem("cart");
      const wishlistData = localStorage.getItem("wishlist");

      const cart: StorageItem[] = cartData ? JSON.parse(cartData) : [];
      const wishlist: StorageItem[] = wishlistData ? JSON.parse(wishlistData) : [];

      const uniqueCart = new Set(cart.map((item) => item._id));
      const uniqueWishlist = new Set(wishlist.map((item) => item._id));

      setCartCount(uniqueCart.size);
      setWishlistCount(uniqueWishlist.size);
    };

    loadCounts();
    window.addEventListener("storageUpdate", loadCounts);
    window.addEventListener("storage", loadCounts);

    return () => {
      window.removeEventListener("storageUpdate", loadCounts);
      window.removeEventListener("storage", loadCounts);
    };
  }, []);

  return (
    <nav className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
      {/* Top Row: Logo & Desktop Icons */}
      <div className="flex items-center justify-between py-4 px-[5%] lg:px-[12%]">

        {/* Logo - Centered on mobile, left-aligned on desktop */}
        <Link href="/" className="text-xl md:text-3xl font-bold Merienda text-black mx-auto lg:mx-0">
          Steve O Bizz <span className="text-(--prim-color)"> Store</span>
        </Link>

        {/* Desktop Search - Hidden on Mobile */}
        {/* <div className="hidden lg:flex flex-1 mx-10 max-w-2xl items-center">
            <input
              type="text"
              placeholder="Search for office supplies..."
              className="flex-1 border border-gray-400 px-5 py-2.5 rounded-l-full outline-none focus:border-(--prim-color)"
            />
            <button className="bg-(--prim-color) text-white px-6 py-2.5 rounded-r-full pr-4 cursor-pointer">
              <i className="bi bi-search"></i>
            </button>
        </div> */}
  <SearchForm/>  
  
       {/* Icons - HIDDEN on Mobile, Visible on Desktop (lg) */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link href="/wishlist" className="relative group">
            <i className="bi bi-heart text-2xl text-gray-600 group-hover:text-(--prim-color)"></i>
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-(--prim-color) text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link href="/cart" className="relative group">
            <i className="bi bi-cart3 text-2xl  text-gray-600 group-hover:text-(--prim-color)"></i>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-(--prim-color) text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}