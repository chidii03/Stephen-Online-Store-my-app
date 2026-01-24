'use client';

import { useState } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import Image from 'next/image';
import { urlFor } from "../lib/sanity";
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

interface Props {
  images: SanityImageSource[];
  name: string;
}

export default function ProductImages({ images, name }: Props) {
  const [index, setIndex] = useState(0);

  if (!images?.length) return null;

  const imgUrl = urlFor(images[index]).url();

  return (
    <>
      <div className="image-container">
       <ReactImageMagnify
          {...{
            smallImage: {
              alt: name,
              isFluidWidth: true,
              src: imgUrl,
            },
            largeImage: {
              src: imgUrl,
              width: 1200,
              height: 1800,
            },
            enlargedImageContainerStyle: { zIndex: 999 },
            isHintEnabled: true,
            shouldUsePositiveSpaceLens: true,
          }}
        />
      </div>

      <div className="small-images-container">
          {images.map((item, i) => (
          <Image
            key={i}
            src={urlFor(item).url()}
            width={80}
            height={80}
            alt={`Thumbnail ${i + 1}`}
            className={`small-image ${i === index ? 'selected-image' : ''}`}
            onMouseEnter={() => setIndex(i)}
          />
        ))}
      </div>
    </>
  );
}
