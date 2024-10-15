import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { listProduct } from '@/api/list-products';
import { FilterProductsForm } from '@/components/filter-products-form';
import { ProductCard } from '@/components/product-card';
import { ProductCardSkeleton } from '@/components/product-card-skeleton';

export function ListProducts() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') ?? undefined;
  const status = searchParams.get('status') ?? undefined;

  const { data: products, isLoading } = useQuery({
    queryFn: () => listProduct(query, status),
    queryKey: ['products', query, status],
  });

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2">
        <h1 className="font-secondary text-2xl font-bold text-gray-500">
          Seus produtos
        </h1>
        <p className="text-sm">
          Acesse gerencie a sua lista de produtos à venda
        </p>
      </div>

      <div className="mt-10 grid grid-cols-3 gap-4">
        <FilterProductsForm className="col-span-1 h-fit" />

        <div className="col-span-2 grid grid-cols-2 gap-4">
          {!isLoading &&
            products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

          {isLoading &&
            Array.from({ length: 6 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
        </div>
      </div>
    </div>
  );
}
