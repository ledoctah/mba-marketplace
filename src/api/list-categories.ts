import { api } from '@/lib/axios';

export type Category = {
  id: string;
  title: string;
  slug: string;
};

type Response = {
  categories: Category[];
};

export async function listCategories() {
  const response = await api.get<Response>('/categories');

  return response.data.categories;
}
