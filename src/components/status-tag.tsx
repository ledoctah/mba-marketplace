import React from 'react';

import { ProductStatus } from '@/api/list-products';
import { cn } from '@/lib/utils';

type StatusTagProps = React.HTMLAttributes<HTMLDivElement> & {
  status: ProductStatus;
};

const statusProps = {
  available: {
    title: 'Anunciado',
    bgColor: 'bg-blue-dark',
  },
  sold: {
    title: 'Vendido',
    bgColor: 'bg-success',
  },
  cancelled: {
    title: 'Desativado',
    bgColor: 'bg-gray-300',
  },
};

export function ProductStatusTag({
  status,
  className,
  ...props
}: StatusTagProps) {
  const statusProp = statusProps[status];

  console.log(statusProp);

  return (
    <div
      className={cn(
        'rounded-full px-2 py-1 text-xs uppercase text-primary-foreground',
        statusProp?.bgColor,
        className,
      )}
      {...props}
    >
      {statusProp?.title}
    </div>
  );
}
