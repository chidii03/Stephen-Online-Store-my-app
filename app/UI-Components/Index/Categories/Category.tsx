"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useCallback, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";

type CategoryType = {
  image: string;
  title: string;
  products: string;
};

const categories: CategoryType[] = [
  { image: "/categories/category1.webp", title: "Office-Supplies", products: "125+ Products" },
  { image: "/categories/category2.webp", title: "School-Supplies", products: "90+ Products" },
  { image: "/categories/category3.webp", title: "Ink & Toner", products: "80+ Products" },
  { image: "/categories/category4.webp", title: "Funiture", products: "60+ Products" },
  { image: "/categories/category5.webp", title: "Computer & Accessories", products: "100+ Products" },
  { image: "/categories/category6.webp", title: "Electronics", products: "50+ Products" },
  { image: "/categories/category7.jpg", title: "Cleaning", products: "45+ Products" },
  { image: "/categories/category8.jpg", title: "Breakroom", products: "105+ Products" },
  { image: "/categories/category9.jpg", title: "Mailing & Shipping", products: "40+ Products" },
  { image: "/categories/category10.jpg", title: "Shop-Greener-Products", products: "180+ Products" },
];

export default function Category() {
  const sliderRef = useRef<SwiperType | null>(null);
  const [isHoveringNext, setIsHoveringNext] = useState(false);

  const handlePrev = useCallback(() => {
    sliderRef.current?.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    sliderRef.current?.slideNext();
  }, []);

  return (
    <div className="px-[8%] lg:px-3 py-10">
      <div className="mb-10 flex items-center justify-between pl-4 md:pl-8 xl:pl-12">
        <div>
          <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_834_7356)">
                <path
                  d="M3.94024 13.4474C2.6523 12.1595 2.00832 11.5155 1.7687 10.68C1.52908 9.84449 1.73387 8.9571 2.14343 7.18231L2.37962 6.15883C2.72419 4.66569 2.89648 3.91912 3.40771 3.40789C3.91894 2.89666 4.66551 2.72437 6.15865 2.3798L7.18213 2.14361C8.95692 1.73405 9.84431 1.52927 10.6798 1.76889C11.5153 2.00851 12.1593 2.65248 13.4472 3.94042L14.9719 5.46512C17.2128 7.70594 18.3332 8.82635 18.3332 10.2186C18.3332 11.6109 17.2128 12.7313 14.9719 14.9721C12.7311 17.2129 11.6107 18.3334 10.2184 18.3334C8.82617 18.3334 7.70576 17.2129 5.46494 14.9721L3.94024 13.4474Z"
                  stroke="#3C50E0"
                  strokeWidth="1.5"
                />
                <circle cx="7.17245" cy="7.39917" r="1.66667" transform="rotate(-45 7.17245 7.39917)" stroke="#3C50E0" strokeWidth="1.5" />
                <path d="M9.61837 15.4164L15.4342 9.6004" stroke="#3C50E0" strokeWidth="1.5" strokeLinecap="round" />
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
          {/* PREVIOUS BUTTON: Blue by default, goes white if Next is hovered */}
          <button
            onClick={handlePrev}
            className={`p-2 rounded-lg transition-all duration-300 transform active:scale-95 mb-10 border ${
              isHoveringNext
                ? "bg-white text-gray-700 border-gray-300"
                : "bg-(--prim-color) text-white border-(--prim-color) shadow-md"
            }`}
          >
            <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M15.4881 4.43057C15.8026 4.70014 15.839 5.17361 15.5694 5.48811L9.98781 12L15.5694 18.5119C15.839 18.8264 15.8026 19.2999 15.4881 19.5695C15.1736 19.839 14.7001 19.8026 14.4306 19.4881L8.43056 12.4881C8.18981 12.2072 8.18981 11.7928 8.43056 11.5119L14.4306 4.51192C14.7001 4.19743 15.1736 4.161 15.4881 4.43057Z" />
            </svg>
          </button>

          {/* NEXT BUTTON: White by default, goes Blue on hover */}
          <button
            onClick={handleNext}
            onMouseEnter={() => setIsHoveringNext(true)}
            onMouseLeave={() => setIsHoveringNext(false)}
            className="p-2 rounded-lg bg-white text-gray-700 border border-gray-300 transition-all duration-300 hover:bg-(--prim-color) hover:text-white hover:border-(--prim-color) hover:shadow-md transform active:scale-95 mb-10"
          >
            <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M8.51192 4.43057C8.82641 4.161 9.29989 4.19743 9.56946 4.51192L15.5695 11.5119C15.8102 11.7928 15.8102 12.2072 15.5695 12.4881L9.56946 19.4881C9.29989 19.8026 8.82641 19.839 8.51192 19.5695C8.19743 19.2999 8.161 18.8264 8.43057 18.5119L14.0122 12L8.43057 5.48811C8.161 5.17361 8.19743 4.70014 8.51192 4.43057Z" />
            </svg>
          </button>
        </div>
      </div>

      <Swiper
        onSwiper={(swiper) => (sliderRef.current = swiper)}
        slidesPerView={6}
        spaceBetween={24}
        loop
        modules={[Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
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
            <div className="flex flex-col items-center gap-4 cursor-pointer">
              <div className="relative w-48 h-48 bg-white rounded-xl shadow flex items-center justify-center">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-contain p-5 transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="text-center">
                <h3 className="Unbounded text-lg relative inline-block after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-px after:bg-(--prim-color) after:transition-all after:duration-300 hover:after:w-full hover:text-(--prim-color) whitespace-nowrap">
                  {category.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1">{category.products}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}