import { ChartHistogramIcon, PackageIcon, PlusSignIcon } from 'hugeicons-react';
import { Link } from 'react-router-dom';

import Logo from '@/assets/logo.svg';

import { HeaderNavLink } from './nav-link';

export function Header() {
  return (
    <div className="h-fit w-full border-b-2 border-b-shape">
      <header className="mx-auto flex max-w-[1366px] justify-between p-5">
        <Link to="/">
          <img src={Logo} alt="" className="w-14" />
        </Link>

        <nav className="flex items-center justify-center gap-2">
          <HeaderNavLink Icon={ChartHistogramIcon} title="Dashboard" to="/" />

          <HeaderNavLink Icon={PackageIcon} title="Produtos" to="/products" />
        </nav>

        <section className="flex items-center gap-4">
          <Link
            to="/products/add"
            className="flex items-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
          >
            <PlusSignIcon className="h-5 w-5" />
            Novo produto
          </Link>

          <img
            src="https://github.com/ledoctah.png"
            alt=""
            className="h-12 w-12 rounded-xl"
          />
        </section>
      </header>
    </div>
  );
}
