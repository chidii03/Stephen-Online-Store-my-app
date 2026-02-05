"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useCallback, useRef, useState, useEffect } from "react";
import type { Swiper as SwiperType } from "swiper";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/app/lib/sanity";
import LoadingSpinner from "@/app/Components/LoadingSpinner";

type SanityImage = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
};

type CategoryType = {
  image: SanityImage;
  title: string;
  slug: { current: string };
  productCount: number;
  categoryId: number;
};

export default function Category() {
  const sliderRef = useRef<SwiperType | null>(null);
  const [isHoveringNext, setIsHoveringNext] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const fetchCategories = async () => {
      const query = `*[_type == "category" && isMain == true] | order(categoryId asc) [0...10] {
        title,
        image,
        slug,
        categoryId,
        "productCount": count(*[_type == "product" && (
           lower(category) == lower(^.title) || 
           references(^._id)
        )])
      }`;
      const data = await client.fetch(query);
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handlePrev = useCallback(() => {
    sliderRef.current?.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    sliderRef.current?.slideNext();
  }, []);

  const getCategoryLink = (title: string) => {
    if (!title) return "/shop";
    const cleanSlug = title.toLowerCase().trim().replace(/\s+/g, "-");
    return `/shop/${cleanSlug}`;
  };

  if (!mounted) return;
  <div className="py-20 text-center font-bold">
    <LoadingSpinner />
  </div>;

  return (
    <div className="px-[8%] lg:px-3 py-10">
      <div className="mb-10 flex items-center justify-between pl-4 md:pl-8 xl:pl-12">
        <div>
          <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_834_7356)">
                <path
                  d="M3.94024 13.4474C2.6523 12.1595 2.00832 11.5155 1.7687 10.68C1.52908 9.84449 1.73387 8.9571 2.14343 7.18231L2.37962 6.15883C2.72419 4.66569 2.89648 3.91912 3.40771 3.40789C3.91894 2.89666 4.66551 2.72437 6.15865 2.3798L7.18213 2.14361C8.95692 1.73405 9.84431 1.52927 10.6798 1.76889C11.5153 2.00851 12.1593 2.65248 13.4472 3.94042L14.9719 5.46512C17.2128 7.70594 18.3332 8.82635 18.3332 10.2186C18.3332 11.6109 17.2128 12.7313 14.9719 14.9721C12.7311 17.2129 11.6107 18.3334 10.2184 18.3334C8.82617 18.3334 7.70576 17.2129 5.46494 14.9721L3.94024 13.4474Z"
                  stroke="#3C50E0"
                  strokeWidth="1.5"
                />
                <circle
                  cx="7.17245"
                  cy="7.39917"
                  r="1.66667"
                  transform="rotate(-45 7.17245 7.39917)"
                  stroke="#3C50E0"
                  strokeWidth="1.5"
                />
                <path
                  d="M9.61837 15.4164L15.4342 9.6004"
                  stroke="#3C50E0"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_834_7356">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Categories
          </span>
          <h2 className="Unbounded xl:text-heading-5 text-dark whitespace-nowrap sm:whitespace-normal">
            Browse by Category
          </h2>
        </div>

        <div className="flex gap-3">
          {/* PREVIOUS BUTTON */}
          <button
            onClick={handlePrev}
            className={`p-2 rounded-lg transition-all duration-300 transform active:scale-95 mb-10 border ${
              isHoveringNext
                ? "bg-white text-gray-700 border-gray-300"
                : "bg-(--prim-color) text-white border-(--prim-color) shadow-md"
            }`}
          >
            <svg
              className="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.4881 4.43057C15.8026 4.70014 15.839 5.17361 15.5694 5.48811L9.98781 12L15.5694 18.5119C15.839 18.8264 15.8026 19.2999 15.4881 19.5695C15.1736 19.839 14.7001 19.8026 14.4306 19.4881L8.43056 12.4881C8.18981 12.2072 8.18981 11.7928 8.43056 11.5119L14.4306 4.51192C14.7001 4.19743 15.1736 4.161 15.4881 4.43057Z"
              />
            </svg>
          </button>

          {/* NEXT BUTTON */}
          <button
            onClick={handleNext}
            onMouseEnter={() => setIsHoveringNext(true)}
            onMouseLeave={() => setIsHoveringNext(false)}
            className="p-2 rounded-lg bg-white text-gray-700 border border-gray-300 transition-all duration-300 hover:bg-(--prim-color) hover:text-white hover:border-(--prim-color) hover:shadow-md transform active:scale-95 mb-10"
          >
            <svg
              className="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.51192 4.43057C8.82641 4.161 9.29989 4.19743 9.56946 4.51192L15.5695 11.5119C15.8102 11.7928 15.8102 12.2072 15.5695 12.4881L9.56946 19.4881C9.29989 19.8026 8.82641 19.839 8.51192 19.5695C8.19743 19.2999 8.161 18.8264 8.43057 18.5119L14.0122 12L8.43057 5.48811C8.161 5.17361 8.19743 4.70014 8.51192 4.43057Z"
              />
            </svg>
          </button>
        </div>
      </div>

      {categories.length > 0 && (
        <Swiper
          onSwiper={(swiper) => (sliderRef.current = swiper)}
          slidesPerView={6}
          spaceBetween={24}
          loop
          modules={[Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          speed={500}
          breakpoints={{
            1400: { slidesPerView: 5 },
            1200: { slidesPerView: 4 },
            900: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            575: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <Link
                href={getCategoryLink(category.title)}
                className="flex flex-col items-center gap-4 cursor-pointer group"
              >
                {/* Product Image Container */}
                <div className="relative w-48 h-48 bg-white rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:shadow-md">
                  {category.image && (
                    <Image
                      src={urlFor(category.image).url()}
                      alt={category.title}
                      fill
                      className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                </div>

                <div className="text-center">
                  <h3 className="Unbounded text-lg relative inline-block after:absolute after:left-0 after:bottom-0 after:w-0 after:h-px after:bg-(--prim-color) after:transition-all after:duration-300 hover:after:w-full hover:text-(--prim-color) whitespace-nowrap">
                    {category.title.replace(/-/g, " ")}
                  </h3>
                  <p className="text-gray-400 text-[10px] md:text-xs mt-1 font-bold Unbounded uppercase">
                    {category.productCount}+ Products
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
