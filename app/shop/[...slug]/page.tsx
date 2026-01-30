// app/shop/[...slug]/page.tsx
import { client } from "@/sanity/lib/client";
import ProductCard from "@/app/Components/ProductCard";

type SanityImage = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
};

type Product = {
  _id: string;
  name: string;
  price: number;
  lessPrice: number;
  slug: { current: string };
  review: number;
  soldCurrent: number;
  soldTotal: number;
  image: SanityImage[];
  sale: string;
};

export default async function CategoryPage({
  params,
}: {
  params: { slug: string[] };
}) {
  // Await params because in Next.js 15+ params are promises
  const { slug } = await params;
  
  // Get the last part of the URL (e.g., "biro-pens")
  const currentSlugRaw = slug[slug.length - 1];
  
  // Convert "biro-pens" to "biro pens" for display and querying
  const currentSlugString = currentSlugRaw.replace(/-/g, " ").toLowerCase();

  // GROQ Query Update:
  // We use `lower()` function to match the URL slug (lowercase) with the Sanity field (Title Case)
  // We check category, subCategory, OR subName
  const products = await client.fetch(
    `*[_type == "product" && (
      lower(category) == $currentSlug || 
      lower(subCategory) == $currentSlug || 
      lower(subName) == $currentSlug
    )] {
      _id, name, price, lessPrice, slug, image, sale, review
    }`,
    { currentSlug: currentSlugString }
  );

  return (
    <main className="min-h-screen bg-white px-[5%] lg:px-[10%] py-8 lg:py-12 overflow-x-hidden">
      <header className="mb-8 lg:mb-12 border-b border-gray-100 pb-6 lg:pb-10">
        
        {/* BREADCRUMBS - Responsive Fix */}
        <div className="flex flex-wrap items-center gap-2 text-[10px] lg:text-xs font-bold text-gray-400 Unbounded uppercase mb-4">
          <span className="shrink-0">Shop</span>
          
          {slug.map((s, index) => {
            const isLast = index === slug.length - 1;
            return (
              <span key={s} className={`flex items-center gap-2 ${!isLast ? 'hidden sm:flex' : 'flex'}`}>
                <i className="bi bi-chevron-right text-[8px] lg:text-[10px]"></i>
                <span className={`
                  ${isLast ? "text-black" : ""} 
                  max-w-37.5 truncate whitespace-nowrap
                `}>
                  {s.replace(/-/g, " ")}
                </span>
              </span>
            );
          })}
        </div>

        {/* TITLE - Responsive Fix */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-black Unbounded uppercase tracking-tighter wrap-break-word leading-tight">
          {currentSlugString}
        </h1>
        
        <p className="mt-2 text-xs text-gray-400 font-bold Unbounded">
            {products.length} Products Found
        </p>
      </header>

      {/* PRODUCTS GRID */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 md:gap-x-6 gap-y-8 md:gap-y-10">
          {products.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <i className="bi bi-box-seam text-4xl text-gray-300 mb-4 block"></i>
          <p className="Unbounded font-bold text-gray-400 text-sm">
            No products found in this category.
          </p>
          <p className="text-xs text-gray-300 mt-2">Try checking &quot;Office Supplies&quot;</p>
        </div>
      )}
    </main>
  );
}