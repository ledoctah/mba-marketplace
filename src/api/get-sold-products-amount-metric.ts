import { api } from '@/lib/axios';

type SignInResponse = {
  amount: number;
};

export async function getSoldProductsAmountMetric() {
  const response = await api.get<SignInResponse>(
    '/sellers/metrics/products/sold',
  );

  return response.data;
}
