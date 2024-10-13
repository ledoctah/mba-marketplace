import { HugeiconsProps } from 'hugeicons-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  LeftIcon?: React.ComponentType<HugeiconsProps>;
  RightIcon?: React.ComponentType<HugeiconsProps>;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, LeftIcon, RightIcon, ...props }, ref) => {
    return (
      <label className="w-full border-b border-input transition-colors focus-within:text-ring">
        <span className="text-xs font-medium uppercase">{label}</span>

        <div className="flex items-center gap-2">
          {LeftIcon && <LeftIcon className="h-6 w-6" />}

          <input
            type={type}
            className={cn(
              'flex h-9 w-full text-base text-gray-400 file:border-0 file:bg-transparent file:text-base file:font-medium file:text-foreground placeholder:text-muted-foreground focus:caret-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
              className,
            )}
            ref={ref}
            {...props}
          />

          {RightIcon && <RightIcon className="h-6 w-6" />}
        </div>
      </label>
    );
  },
);
Input.displayName = 'Input';

export { Input };
