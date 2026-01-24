"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { sanityFetch, urlFor } from "@/app/lib/sanity";

type SanityImage = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
};

type OfferProduct = {
  _id: string;
  name: string;
  ctg: string;
  image: SanityImage[];
  slug: { current: string };
};

export default function Offers() {
  const [offers, setOffers] = useState<OfferProduct[]>([]);

  useEffect(() => {
    const fetchOffers = async () => {
      const query = `*[_type == "product" && isBestOffer == true && isHotDeal != true]
        | order(_createdAt desc)[0...2]{
          _id,
          name,
          ctg,
          image,
          slug,
        }`;

      const data = await sanityFetch<OfferProduct[]>(query);
      setOffers(data || []);
    };

    fetchOffers();
  }, []);

  return (
    <div className="px-[5%] lg:px-[8%] mb-12">
      <div className="flex flex-col lg:flex-row gap-5">
        {offers.map((offer, index) => (
          <Link
            key={offer._id}
            href={`/product/${offer.slug.current}`}
            className={`offer-wrap relative flex items-center justify-between w-full h-64
              rounded-3xl p-8 overflow-hidden cursor-pointer
              transition-transform hover:scale-[1.01]
              ${index === 0 ? "bg-[#f1f1f1]" : "bg-[#e2faff]"}`}
          >
            {/* TEXT CONTENT */}
            <div className="z-10 flex flex-col justify-center max-w-[55%]">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                {offer.ctg}
              </p>

              <h2 className="text-2xl font-bold Merienda text-black leading-tight mb-4 whitespace-pre-line pb-3">
                {offer.name}
              </h2>

              <button
                onClick={(e) => e.stopPropagation()}
                className="w-fit px-6 py-2 rounded-full text-white font-bold bg-black hover:bg-white hover:text-black border transition-all text-sm shadow-sm"
              >
                Shop Now →
              </button>
            </div>

            {/* IMAGE */}
            <div className="relative w-[45%] h-full flex items-center justify-end">
              {offer.image?.[0] && (
                <Image
                  src={urlFor(offer.image[0]).url()}
                  alt={offer.name}
                  fill
                  className="object-contain object-right"
                  priority
                />
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
