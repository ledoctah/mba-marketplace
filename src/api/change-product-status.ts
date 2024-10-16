import { api } from '@/lib/axios';

import { Product } from './list-products';

type ChangeProductStatusBody = {
  productId: string;
  status: 'available' | 'cancelled' | 'sold';
};

type ChangeProductStatusResponse = {
  product: Product;
};

export async function changeProductStatus({
  productId,
  status,
}: ChangeProductStatusBody) {
  const response = await api.patch<ChangeProductStatusResponse>(
    `/products/${productId}/${status}`,
  );

  return response.data;
}
