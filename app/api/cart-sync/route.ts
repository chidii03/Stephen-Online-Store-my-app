import { NextResponse } from "next/server";
import { sanityFetch } from "@/app/lib/sanity";

export async function POST(req: Request) {
  const { ids } = await req.json();

  const query = `*[_type == "product" && _id in $ids]{
    _id,
    name,
    price,
    review,
    image
  }`;

  const products = await sanityFetch(query, { ids });
  return NextResponse.json(products);
}
