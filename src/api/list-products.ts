import { api } from '@/lib/axios';

export type ProductStatus = 'available' | 'sold' | 'cancelled';

export type Product = {
  id: string;
  title: string;
  description: string;
  priceInCents: number;
  status: ProductStatus;
  owner: {
    id: string;
    name: string;
    phone: string;
    email: string;
    avatar: {
      id: string;
      url: string;
    } | null;
  };
  category: {
    id: string;
    title: string;
    slug: string;
  };
  attachments: Array<{
    id: string;
    url: string;
  }>;
};

type Response = {
  products: Product[];
};

export async function listProduct(query?: string, status?: string) {
  const response = await api.get<Response>('/products/me', {
    params: {
      search: query,
      status,
    },
  });

  return response.data.products;
}
