import { Product, ProductList, Category, Brand, Tag, StoreInfo } from './types';

const SERVER_API_URL = 'http://backend:8000';
const CLIENT_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const API_URL = typeof window === 'undefined' ? SERVER_API_URL : CLIENT_API_URL;

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_URL}/api${endpoint}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} on ${endpoint}`);
  }

  return res.json();
}

export const api = {
  products: {
    list: (params?: string) =>
      fetchAPI<ProductList[]>(`/products/${params ? `?${params}` : ''}`),
    detail: (slug: string) =>
      fetchAPI<Product>(`/products/${slug}/`),
  },
  categories: {
    list: () => fetchAPI<Category[]>('/categories/'),
  },
  brands: {
    list: () => fetchAPI<Brand[]>('/brands/'),
  },
  tags: {
    list: () => fetchAPI<Tag[]>('/tags/'),
  },
  store: {
    info: () => fetchAPI<StoreInfo>('/store-info/'),
  },
};
