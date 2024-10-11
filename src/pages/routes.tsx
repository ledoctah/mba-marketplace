import { createBrowserRouter } from 'react-router-dom';

import { AuthLayout } from './_layouts/auth';
import { SignIn } from './auth/sign-in';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },
    ],
  },
]);
