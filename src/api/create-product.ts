import { api } from '@/lib/axios';

import { Product } from './list-products';

type CreateProductBody = {
  title: string;
  categoryId: string;
  description: string;
  priceInCents: number;
  attachmentsIds: string[];
};

type CreateProductResponse = {
  product: Product;
};

export async function createProduct({
  title,
  categoryId,
  description,
  priceInCents,
  attachmentsIds,
}: CreateProductBody) {
  const response = await api.post<CreateProductResponse>('/products', {
    title,
    categoryId,
    description,
    priceInCents,
    attachmentsIds,
  });

  return response.data;
}
