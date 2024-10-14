import { api } from '@/lib/axios';

export type ViewsPerDay = {
  date: string;
  amount: number;
};

type SignInResponse = {
  viewsPerDay: ViewsPerDay[];
};

export async function getVisitorsAmountPerDay() {
  const response = await api.get<SignInResponse>('/sellers/metrics/views/days');

  return response.data;
}
