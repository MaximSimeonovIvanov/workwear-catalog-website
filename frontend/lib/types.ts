export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  parent: number | null;
  children: Category[];
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
  description: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface ProductImage {
  id: number;
  image: string;
  alt_text: string;
  is_primary: boolean;
  order: number;
}

export interface ProductVariant {
  id: number;
  size: string;
  color: string;
  color_hex: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price_display: string;
  category: Category;
  brand: Brand;
  tags: Tag[];
  images: ProductImage[];
  variants: ProductVariant[];
  is_featured: boolean;
  material: string;
  features: string;
  created_at: string;
  updated_at: string;
}

export interface ProductList {
  id: number;
  name: string;
  slug: string;
  price_display: string;
  category: Category;
  brand: Brand;
  tags: Tag[];
  is_featured: boolean;
  primary_image: ProductImage | null;
}

export interface StoreInfo {
  address: string;
  phone: string;
  email: string;
  opening_hours: Record<string, string>;
  about_text: string;
  google_maps_embed_url: string;
}
