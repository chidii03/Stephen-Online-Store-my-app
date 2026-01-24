import React from 'react'
import Image from "next/image";


const featureData = [
  {
    img: "/categories/images/icons/icon-01.svg",
    title: "Free Shipping",
    description: "Free Shipping Over 200k",
  },
  {
    img: "/categories/images/icons/icon-02.svg",
    title: "1 & 1 Returns",
    description: "Cancellation after 1 day",
  },
  {
    img: "/categories/images/icons/icon-03.svg",
    title: "100% Secure Payments",
    description: "Gurantee secure payments",
  },
  {
    img: "/categories/images/icons/icon-04.svg",
    title: "24/7 Dedicated Support",
    description: "Anywhere & anytime",
  },
];

export default function Benefits() {
    return (
    <div className="max-w-1060 w-full mx-auto px-4 sm:px-8 xl:px-0 pl-10">
      <div className="flex flex-wrap items-center gap-7.5 xl:gap-12.5 mt-5">
        {featureData.map((item, key) => (
          <div className="flex items-center gap-4" key={key}>
            <Image src={item.img} alt="icons" width={40} height={41} />

            <div>
              <h3 className="font-medium text-gray-700 Unbounded">{item.title}</h3>
              <p className="text-sm text-gray-700 ">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}