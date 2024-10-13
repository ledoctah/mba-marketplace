import { api } from '@/lib/axios';

export type SignInBody = {
  email: string;
  password: string;
};

type SignInResponse = {
  accessToken: string;
};

export async function signIn({ email, password }: SignInBody) {
  const response = await api.post<SignInResponse>('/sellers/sessions', {
    email,
    password,
  });

  return response.data;
}
