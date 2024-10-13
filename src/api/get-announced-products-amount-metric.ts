import { api } from '@/lib/axios';

type SignInResponse = {
  amount: number;
};

export async function getAnnouncedProductsAmountMetric() {
  const response = await api.get<SignInResponse>(
    '/sellers/metrics/products/available',
  );

  return response.data;
}
