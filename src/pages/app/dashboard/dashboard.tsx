import { ProductsAnnouncedCard } from './products-announced-card';
import { SoldProductsCard } from './sold-products-card';
import { VisitorsAmountCard } from './visitors-amount-card';
import { VisitorsAmountChartCard } from './visitors-amount-chart-card';

export function Dashboard() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2">
        <h1 className="font-secondary text-2xl font-bold text-gray-500">
          Últimos 30 dias
        </h1>
        <p className="text-sm">
          Confira as estatísticas da sua loja no último mês
        </p>
      </div>

      <div className="mt-10 grid grid-cols-4 gap-6">
        <div className="col-span-1 flex flex-col gap-4">
          <SoldProductsCard />
          <ProductsAnnouncedCard />
          <VisitorsAmountCard />
        </div>

        <div className="col-span-3">
          <VisitorsAmountChartCard />
        </div>
      </div>
    </div>
  );
}
