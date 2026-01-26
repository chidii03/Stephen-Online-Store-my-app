"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { client, urlFor } from "@/app/lib/sanity";
import LoadingSpinner from "@/app/Components/LoadingSpinner";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

type SanityImage = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
};

type HeroData = {
  _id: string;
  name: string;
  small_text:string;
  description?: string;
  slug: { current: string };
  image: SanityImage[];
};

export default function Hero() {
  const [heroProducts, setHeroProducts] = useState<HeroData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const query = `*[_type == "product" && isHero == true && isBestOffer != true && isBestSales != true && isbanner != true && isShortProducts != true && isArrivals != true] | order(Hero_order asc)[0...3]{
          _id, name, slug, image, small_text, description
        }`;
        const data = await client.fetch(query);
        setHeroProducts(data);
      } catch (error) {
        console.error("Sanity Hero Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="py-20 text-center">
        <LoadingSpinner />
      </div>
    );
  if (heroProducts.length === 0) return null;

  return (
    <div className="px-[4%] lg:px-[8%] py-5 bg-[#f3f4f6]">
      <div className="relative Hero flex items-center gap-5">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className="h-full hero-swiper w-full mb-9"
        >
          {heroProducts.map((product) => (
            <SwiperSlide key={product._id}>
              <Link href={`/product/${product.slug.current}`}>
                <div className="hero-wrap relative w-full rounded-2xl overflow-hidden border border-gray-200 h-full flex flex-col lg:flex-row items-center bg-white">
                  {/* Left Side: Content */}
                  <div className="w-full lg:w-1/2 p-8 z-10 h-full flex justify-center items-start flex-col lg:pl-14">
                    <h1 className="Merienda text-3xl lg:text-[3.6rem] font-bold leading-tight">
                      {product.name.split(" ").slice(0, 1).join(" ")}{" "}
                      <span className="bg-(--prim-color) px-4 py-1 rounded-2xl text-white inline-block">
                        {product.name.split(" ").slice(1, 2).join(" ")}
                      </span>{" "}
                      {product.name.split(" ").slice(2).join(" ")}
                    </h1>

                    <p className="w-[90%] my-5 text-gray-700 font-medium">
                     {product.small_text}
                    </p>

                    <button className="px-6 py-3 rounded-full text-white font-bold bg-blue-600 hover:bg-white hover:text-blue-600 border border-blue-600 transition-all duration-300 shadow-lg">
                      Shop Now <i className="bi bi-cart3 ps-2"></i>
                    </button>
                  </div>

                  {/* Right Side: Image */}
                  <div className="w-full lg:w-1/2 h-full flex justify-center items-center p-8">
                    <Image
                      src={urlFor(product.image[0]).url()}
                      alt={product.name}
                      width={500}
                      height={500}
                      className="object-contain w-full h-full max-h-96 lg:max-h-full"
                    />
                  </div>                
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
