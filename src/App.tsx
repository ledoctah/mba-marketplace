import './global.css';

import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';

import { router } from './pages/routes';

export default function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Marketplace" />
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}
