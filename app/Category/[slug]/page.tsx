import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/app/Components/ui/badge';
import { sanityFetch, urlFor } from '@/app/lib/sanity';
import { CATEGORIES_DATA } from '@/app/lib/categoryData';

interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

interface Product {
  _id: string;
  name: string;
  price: number;
  slug: { current: string };
  image: SanityImage[];
}

interface Params {
  params: { slug: string };
}

/**
 * OLD STORE COMPATIBILITY
 * We generate routes from static category list
 */
export async function generateStaticParams() {
  return CATEGORIES_DATA.map((c) => ({
    slug: c.slug,
  }));
}

export default async function CategoryPage({ params }: Params) {
  const products = await sanityFetch<Product[]>(
    `*[_type == "product" && category->slug.current == $slug] | order(_createdAt desc)`,
    { slug: params.slug }
  );

  const categoryMeta = CATEGORIES_DATA.find(
    (c) => c.slug === params.slug
  );

  if (!products.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Badge className="mb-4">Coming Soon</Badge>
          <h1 className="text-2xl font-bold">
            {categoryMeta?.title ?? 'Products'}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-4xl font-bold">
          {categoryMeta?.title ?? params.slug.replace(/-/g, ' ')}
        </h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/product/${product.slug.current}`}
            className="border rounded-lg p-4 hover:shadow-lg transition"
          >
            <Image
              src={urlFor(product.image[0]).width(400).height(400).url()}
              alt={product.name}
              width={300}
              height={300}
              className="object-contain w-full h-48"
            />
            <h3 className="mt-4 font-semibold">{product.name}</h3>
            <p className="text-red-600 font-bold">
              ₦{product.price.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
