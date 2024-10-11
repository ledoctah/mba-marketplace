import { Outlet } from 'react-router-dom';

import HeroBg from '@/assets/auth-bg.svg';
import Logo from '@/assets/logo.svg';

export function AuthLayout() {
  return (
    <div className="m-auto grid min-h-screen max-w-[1366px] grid-cols-2">
      <div className="flex flex-col">
        <header className="m-10">
          <div className="flex gap-4">
            <img src={Logo} alt="" />

            <div className="flex flex-col justify-center">
              <span className="font-secondary text-2xl text-gray-500">
                Marketplace
              </span>
              <span className="text-gray-400">Painel de Vendedor</span>
            </div>
          </div>
        </header>

        <img
          src={HeroBg}
          alt={
            'A imagem possui três caixas contendo textos informativos a respeito do painel de vendedores do Marketplace, informando três funcionalidades da plataforma: acompanhamento de vendas, gerenciamento de anúncios e acompanhamento do crescimento da loja.'
          }
          className="m-auto"
        />
      </div>

      <Outlet />
    </div>
  );
}
