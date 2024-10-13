import { useQuery } from '@tanstack/react-query';
import { Store04Icon } from 'hugeicons-react';

import { getAnnouncedProductsAmountMetric } from '@/api/get-announced-products-amount-metric';
import { Card, CardContent } from '@/components/ui/card';

import { MetricCardSkeleton } from './metric-card-skeleton';

export function ProductsAnnouncedCard() {
  const { data } = useQuery({
    queryFn: getAnnouncedProductsAmountMetric,
    queryKey: ['metrics', 'announced-products-amount'],
  });

  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-3 pr-7">
        <div className="rounded-lg bg-blue-light p-5">
          <Store04Icon className="h-10 w-10 text-blue-dark" />
        </div>

        {data ? (
          <div className="flex flex-col justify-center gap-2">
            <h2 className="font-secondary text-3xl text-gray-400">
              {data.amount}
            </h2>

            <p className="text-xs">Produtos anunciados</p>
          </div>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  );
}
