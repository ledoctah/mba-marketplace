import { HugeiconsProps } from 'hugeicons-react';
import { Link, LinkProps, useLocation } from 'react-router-dom';

import { cn } from '@/lib/utils';

type HeaderNavLinkProps = Omit<LinkProps, 'children'> & {
  title: string;
  Icon: React.ComponentType<HugeiconsProps>;
};

export function HeaderNavLink({
  Icon,
  to,
  title,
  className,
  ...props
}: HeaderNavLinkProps) {
  const { pathname } = useLocation();

  const isCurrentLocation = pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        'items-centers flex gap-2 px-4 py-2 text-sm',
        isCurrentLocation && 'rounded-lg bg-shape text-primary',
        className,
      )}
      {...props}
    >
      <Icon className="h-5 w-5" />
      {title}
    </Link>
  );
}
