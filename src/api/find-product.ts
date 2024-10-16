import { api } from '@/lib/axios';

import { Product } from './list-products';

type FindProductResponse = {
  product: Product;
};

export async function findProduct(productId: string) {
  const response = await api.get<FindProductResponse>(`/products/${productId}`);

  return response.data;
}
