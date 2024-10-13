import { useQuery } from '@tanstack/react-query';
import { UserMultipleIcon } from 'hugeicons-react';

import { getVisitorsAmountMetric } from '@/api/get-visitors-amount-metric';
import { Card, CardContent } from '@/components/ui/card';

import { MetricCardSkeleton } from './metric-card-skeleton';

export function VisitorsAmountCard() {
  const { data } = useQuery({
    queryFn: getVisitorsAmountMetric,
    queryKey: ['metrics', 'visitors-amount'],
  });

  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-3 pr-7">
        <div className="rounded-lg bg-blue-light p-5">
          <UserMultipleIcon className="h-10 w-10 text-gray-300" />
        </div>

        {data ? (
          <div className="flex flex-col justify-center gap-2">
            <h2 className="font-secondary text-3xl text-gray-400">
              {data.amount}
            </h2>

            <p className="text-xs">Pessoas visitantes</p>
          </div>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  );
}
