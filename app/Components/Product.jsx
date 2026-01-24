import Link from 'next/link';
import Image from 'nexxt/image'
import { urlFor } from '@/lib/sanity';

const Product = ({ image, name, slug, price }) => {
  const imageUrl = urlFor(image && image[0]).url(); 

  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <Image
            src={imageUrl}
            width={250}
            height={250}
            className="product-image"
            alt={name} 
          />
          <h3>{name}</h3>
          <p>₦{price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
