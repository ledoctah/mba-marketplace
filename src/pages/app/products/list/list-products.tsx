import { FilterProductsForm } from './filter-products-form';
import { ProductCard } from './product-card';

export function ListProducts() {
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
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </div>
  );
}
