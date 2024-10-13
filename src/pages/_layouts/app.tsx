import { Outlet } from 'react-router-dom';

import { Header } from '@/components/header';

export function AppLayout() {
  return (
    <div className="m-auto flex min-h-screen flex-col">
      <Header />

      <main className="m-auto w-full max-w-[1030px] px-5 py-14">
        <Outlet />
      </main>
    </div>
  );
}
