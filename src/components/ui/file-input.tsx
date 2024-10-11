import { ImageUploadIcon } from 'hugeicons-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
}

const FileInput = React.forwardRef<HTMLInputElement, Omit<InputProps, 'type'>>(
  ({ className, label, containerProps, ...props }, ref) => {
    return (
      <label
        title={props.title}
        className={cn(
          'bg-shape flex h-32 w-32 cursor-pointer flex-col items-center justify-center gap-4 rounded-xl',
          containerProps?.className,
        )}
        {...containerProps}
      >
        <ImageUploadIcon className="h-8 w-8 text-primary" />

        {label && <span className="text-center text-sm">{label}</span>}

        <input
          type="file"
          className={cn('hidden', className)}
          ref={ref}
          {...props}
        />
      </label>
    );
  },
);
FileInput.displayName = 'FileInput';

export { FileInput };
