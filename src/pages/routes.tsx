import { createBrowserRouter } from 'react-router-dom';

import { AppLayout } from './_layouts/app';
import { AuthLayout } from './_layouts/auth';
import { Dashboard } from './app/dashboard/dashboard';
import { AddProduct } from './app/products/add-product';
import { EditProduct } from './app/products/edit-product';
import { ListProducts } from './app/products/list-products';
import { SignIn } from './auth/sign-in';
import { SignUp } from './auth/sign-up';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/products',
        element: <ListProducts />,
      },
      {
        path: '/products/add',
        element: <AddProduct />,
      },
      {
        path: '/products/:id/edit',
        element: <EditProduct />,
      },
    ],
  },
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
