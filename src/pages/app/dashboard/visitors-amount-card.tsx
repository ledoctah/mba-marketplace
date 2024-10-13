import { UserMultipleIcon } from 'hugeicons-react';

import { Card, CardContent } from '@/components/ui/card';

export function VisitorsAmountCard() {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-3 pr-7">
        <div className="bg-blue-light rounded-lg p-5">
          <UserMultipleIcon className="h-10 w-10 text-gray-300" />
        </div>

        <div className="flex flex-col justify-center gap-2">
          <h2 className="font-secondary text-3xl text-gray-400">1.238</h2>

          <p className="text-xs">Pessoas visitantes</p>
        </div>
      </CardContent>
    </Card>
  );
}
