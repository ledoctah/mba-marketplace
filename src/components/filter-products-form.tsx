import { SaleTag02Icon, Search01Icon } from 'hugeicons-react';
import { Controller, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const filterProductSchema = z.object({
  query: z.string().optional(),
  status: z.string().optional(),
});

type FilterProductFormData = z.infer<typeof filterProductSchema>;

type FilterProductsFormProps = React.HTMLAttributes<HTMLDivElement>;

export function FilterProductsForm({ ...props }: FilterProductsFormProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query');
  const status = searchParams.get('status');

  const { control, handleSubmit, register } = useForm<FilterProductFormData>({
    defaultValues: {
      status: status ?? '',
      query: query ?? '',
    },
  });

  function handleFilter({ query, status }: FilterProductFormData) {
    setSearchParams((state) => {
      if (query) {
        state.set('query', query);
      } else {
        state.delete('query');
      }

      if (status) {
        state.set('status', status);
      } else {
        state.delete('status');
      }

      return state;
    });
  }

  return (
    <Card {...props}>
      <CardHeader>
        <h2 className="font-secondary text-lg font-bold">Filtrar</h2>
      </CardHeader>

      <CardContent>
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(handleFilter)}
        >
          <Input
            placeholder="Pesquisar"
            LeftIcon={Search01Icon}
            {...register('query')}
          />

          <Controller
            name="status"
            control={control}
            render={({ field: { name, onChange, value, disabled } }) => {
              return (
                <Select
                  name={name}
                  onValueChange={onChange}
                  value={value}
                  disabled={disabled}
                >
                  <SelectTrigger LeftIcon={SaleTag02Icon}>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="available">Anunciado</SelectItem>
                    <SelectItem value="sold">Vendido</SelectItem>
                    <SelectItem value="cancelled">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              );
            }}
          />

          <Button type="submit" size="2xl" className="mt-5">
            Aplicar filtro
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
