import './global.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';

import { Toaster } from './components/ui/toaster';
import { queryClient } from './lib/queryClient';
import { router } from './pages/routes';

export default function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Marketplace" />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>

      <Toaster />
    </HelmetProvider>
  );
}
