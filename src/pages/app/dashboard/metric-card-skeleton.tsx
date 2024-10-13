import { Skeleton } from '@/components/ui/skeleton';

export function MetricCardSkeleton() {
  return (
    <>
      <div>
        <Skeleton className="h-7 w-24" />
        <Skeleton className="mt-2 h-7 w-24" />
      </div>
    </>
  );
}
