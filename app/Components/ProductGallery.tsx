"use client";

import { useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import Image from "next/image";
import { urlFor } from "@/app/lib/sanity";

type SanityImage = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
};

interface Props {
  images: SanityImage[];
  name: string;
}

export default function ProductGallery({ images, name }: Props) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) {
    return <div className="bg-gray-100 h-96 rounded-lg animate-pulse"></div>;
  }

  const mainImage = urlFor(images[index]).url();

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 sticky top-24 z-20">
      {/* Thumbnails */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide lg:w-20">
        {images.map((img, i) => (
          <div
            key={i}
            onMouseEnter={() => setIndex(i)} 
            className={`relative w-16 h-16 shrink-0 border rounded-md cursor-pointer overflow-hidden transition-all ${
              i === index
                ? "border-(--prim-color) ring-2 ring-(--prim-color)/30"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <Image
              src={urlFor(img).url()}
              alt={`Thumbnail ${i + 1}`}
              fill
              className="object-contain p-1"
            />
          </div>
        ))}
      </div>

      {/* Main Image & Magnifier */}
      <div className="flex-1 relative bg-white group z-50">
        <div className="w-full relative z-50">
           <ReactImageMagnify
            {...{
              smallImage: {
                alt: name,
                isFluidWidth: true,
                src: mainImage,
              },
              largeImage: {
                src: mainImage,
                width: 1200,
                height: 1200,
              },
              enlargedImageContainerDimensions: {
                width: '150%',
                height: '100%',
              },
              enlargedImageContainerStyle: {
                zIndex: 9999,
                backgroundColor: "white",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                marginLeft: "20px", 
                border: "1px solid #e5e7eb",
              },
              isHintEnabled: true,
              shouldUsePositiveSpaceLens: true, 
            }}
            className="w-full z-50 border border-gray-100 rounded-lg"
          />
        </div>
        <p className="text-center text-xs text-gray-400 mt-2 lg:hidden">
          Tap image to zoom
        </p>
      </div>
    </div>
  );
}