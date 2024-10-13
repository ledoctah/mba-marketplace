import { api } from '@/lib/axios';

type SignInResponse = {
  amount: number;
};

export async function getVisitorsAmountMetric() {
  const response = await api.get<SignInResponse>('/sellers/metrics/views');

  return response.data;
}
