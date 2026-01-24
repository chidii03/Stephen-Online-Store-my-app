// src/types/product.ts (Create this file)

// Define the core type for Sanity's image asset
export interface ImageAsset {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

// Define the main Product type
export interface ProductType {
  _id: string;
  _createdAt: string;
  name: string;
  price: number;
  details: string;
  category: string;
  image: ImageAsset[];
  slug: {
    current: string;
    _type: 'slug';
  };
}