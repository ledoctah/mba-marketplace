import { createBrowserRouter } from 'react-router-dom';

import { AuthLayout } from './_layouts/auth';
import { SignIn } from './auth/sign-in';
import { SignUp } from './auth/sign-up';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/sign-up',
        element: <SignUp />,
      },
    ],
  },
]);
