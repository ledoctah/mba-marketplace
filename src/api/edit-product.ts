import { api } from '@/lib/axios';

import { Product } from './list-products';

type EditProductBody = {
  productId: string;
  title: string;
  categoryId: string;
  description: string;
  priceInCents: number;
  attachmentsIds: string[];
};

type EditProductResponse = {
  product: Product;
};

export async function editProduct({
  productId,
  title,
  categoryId,
  description,
  priceInCents,
  attachmentsIds,
}: EditProductBody) {
  const response = await api.put<EditProductResponse>(
    `/products/${productId}`,
    {
      title,
      categoryId,
      description,
      priceInCents,
      attachmentsIds,
    },
  );

  return response.data;
}
