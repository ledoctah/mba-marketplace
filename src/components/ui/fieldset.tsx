import React from 'react';

import { cn } from '@/lib/utils';

export interface FieldsetProps
  extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legend: string;
}

export function Fieldset({
  className,
  legend: fieldsetLegend,
  children,
  ...props
}: FieldsetProps) {
  return (
    <fieldset className={cn('flex flex-col', className)} {...props}>
      {fieldsetLegend && (
        <legend className="mb-5 text-lg font-bold text-gray-500">
          {fieldsetLegend}
        </legend>
      )}

      {children}
    </fieldset>
  );
}
