"use client";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/app/lib/sanity";

type SanityImage = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
};

interface ProductProps {
  product: {
    _id: string;
    name: string;
    price: number;
    lessprice?: number;
    slug: { current: string };
    image: SanityImage[];
  };
}

export default function ProductCard({ product }: ProductProps) {
  const discount = product.lessprice 
    ? Math.round(((product.lessprice - product.price) / product.lessprice) * 100) 
    : 0;

  return (
    <Link href={`/product/${product.slug.current}`} className="group block bg-white h-full">
      <div className="relative aspect-square bg-[#F7F7F7] rounded-3xl overflow-hidden transition-all duration-500 group-hover:rounded-2xl">
        {/* Badge */}
        {discount > 0 && (
          <span className="absolute top-3 left-3 z-10 bg-black text-white text-[10px] font-black Unbounded px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}
        
        {/* Image */}
        <div className="relative w-full h-full">
           <Image
            src={urlFor(product.image[0]).url()}
            alt={product.name}
            fill
            className="object-contain p-5 transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Quick Add Overlay (Glassmorphism) */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
          <button className="bg-white/80 backdrop-blur-sm text-black px-4 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <i className="bi bi-bag-plus-fill text-lg"></i>
          </button>
        </div>
      </div>

      <div className="mt-3 px-1">
        {/* Title - Truncated to 1 line to prevent breaking */}
        <h3 className="text-[11px] md:text-[13px] font-bold text-gray-900 Unbounded uppercase truncate tracking-tight">
          {product.name}
        </h3>
        
        {/* Price Section */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[14px] md:text-[16px] font-black text-(--prim-color) Unbounded">
            ₦{product.price.toLocaleString()}
          </span>
          {product.lessprice && (
            <span className="text-[10px] md:text-[12px] text-gray-400 font-bold line-through">
              ₦{product.lessprice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}