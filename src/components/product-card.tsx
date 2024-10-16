import { Link } from 'react-router-dom';

import { Product } from '@/api/list-products';
import { ProductStatusTag } from '@/components/status-tag';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/products/${product.id}/edit`}>
      <Card
        role="button"
        className="h-full cursor-pointer border border-transparent transition-all hover:border-blue-base"
      >
        <CardHeader className="relative p-1 pb-0">
          <img
            className="h-[144px] rounded-[20px] object-cover"
            src={product.attachments[0].url}
            alt=""
          />

          <div className="absolute right-3 top-3 flex gap-1">
            <ProductStatusTag status={product.status} />

            <div className="rounded-full bg-gray-400 px-2 py-1 text-xs uppercase text-primary-foreground">
              {product.category.title}
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-2 p-4 pb-5">
          <div className="flex justify-between text-gray-500">
            <h3 className="font-semibold">{product.title}</h3>

            <p className="font-secondary text-lg font-bold">
              <span className="font-primary text-xs font-medium">R$</span>
              {(product.priceInCents / 100).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>

          <p className="line-clamp-2 text-sm">{product.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
