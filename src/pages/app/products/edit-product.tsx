import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ArrowLeft02Icon, Tick02Icon, UnavailableIcon } from 'hugeicons-react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import { editProduct } from '@/api/edit-product';
import { findProduct } from '@/api/find-product';
import { listCategories } from '@/api/list-categories';
import { Product } from '@/api/list-products';
import { uploadAttachment } from '@/api/upload-attachment';
import { ProductStatusTag } from '@/components/status-tag';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { FileInput } from '@/components/ui/file-input';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { queryClient } from '@/lib/queryClient';
import { formatMoney } from '@/utils/formatMoney';

const editProductSchema = z.object({
  title: z
    .string({ required_error: 'Campo obrigatório' })
    .min(1, 'Campo obrigatório'),
  priceInCents: z
    .string({ required_error: 'Campo obrigatório' })
    .min(1, 'Campo obrigatório')
    .transform((value) => Number(value.replace(/\D/g, ''))),
  description: z
    .string({ required_error: 'Campo obrigatório' })
    .min(1, 'Campo obrigatório'),
  categoryId: z.string({ required_error: 'Campo obrigatório' }),
  file: z
    .instanceof(FileList)
    .transform((fileList) => fileList.item(0)!)
    .optional(),
});

type EditProductFormData = z.infer<typeof editProductSchema>;

export function EditProduct() {
  const navigate = useNavigate();

  const { toast } = useToast();

  const { id: productId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => findProduct(String(productId)),
    staleTime: Infinity,
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: listCategories,
    staleTime: Infinity,
  });

  const { mutateAsync: editProductFn } = useMutation({
    mutationFn: editProduct,
    onError: () => {
      toast({
        title: 'Erro ao editar o produto',
        description: 'Não foi possível editar o produto, tente novamente!',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      toast({
        title: 'Sucesso!',
        description: 'Produto atualizado com sucesso!',
      });
    },
  });

  const product = data?.product;

  const { handleSubmit, register, control, formState } =
    useForm<EditProductFormData>({
      resolver: zodResolver(editProductSchema),
      values: {
        title: product?.title ?? '',
        categoryId: product?.category.id ?? '',
        description: product?.description ?? '',
        priceInCents: formatMoney(
          (product?.priceInCents || 0) / 100,
        ) as unknown as number,
      },
    });

  const { mutateAsync: uploadAttachmentFn } = useMutation({
    mutationFn: uploadAttachment,
    onError: () => {
      toast({
        title: 'Erro ao editar o produto',
        description: 'Não foi possível anexar a imagem, tente novamente!',
        variant: 'destructive',
      });
    },
  });

  const { isSubmitting, errors } = formState;

  function updateProductsOnCache(updatedProduct: Product) {
    const productsListCache = queryClient.getQueriesData<Product[]>({
      queryKey: ['products'],
    });

    productsListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return;
      }

      queryClient.setQueryData<Product[]>(
        cacheKey,
        cacheData.map((product) => {
          if (product.id === updatedProduct.id) {
            return updatedProduct;
          }

          return product;
        }),
      );
    });

    queryClient.setQueriesData(
      { queryKey: ['product', productId] },
      { product: updatedProduct },
    );
  }

  async function handleEditProduct({
    categoryId,
    description,
    priceInCents,
    title,
    file,
  }: EditProductFormData) {
    const attachmentsIds: string[] = (product?.attachments || []).map(
      (attachment) => attachment.id,
    );

    if (file) {
      const { attachments } = await uploadAttachmentFn(file);

      attachmentsIds.push(...attachments.map((attachment) => attachment.id));
    }

    const { product: updatedProduct } = await editProductFn({
      productId: product?.id || '',
      title,
      priceInCents,
      categoryId,
      description,
      attachmentsIds,
    });

    updateProductsOnCache(updatedProduct);

    navigate('/products');
  }

  if (isLoading && !product) {
    return (
      <div className="flex flex-col">
        <Link to="/products" className="flex gap-2 text-sm text-primary">
          <ArrowLeft02Icon className="h-5 w-5" />
          Voltar
        </Link>

        <div className="mt-2 flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="font-secondary text-2xl font-bold text-gray-500">
              Editar produto
            </h1>

            <p className="text-sm">
              Gerencie as informações do produto cadastrado
            </p>
          </div>

          <div className="flex items-end gap-4">
            <Skeleton className="h-[20px] w-[180px]" />

            <Skeleton className="h-[20px] w-[180px]" />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-4">
          <Skeleton className="h-[340px] w-full" />

          <Card className="relative col-span-2 p-8">
            <CardHeader className="p-0">
              <h2 className="font-secondary text-lg">Dados do produto</h2>

              <Skeleton className="absolute right-6 top-6 h-[25px] w-[100px] rounded-full px-2 py-1 text-xs uppercase text-primary-foreground" />
            </CardHeader>

            <CardContent className="mt-9 p-0">
              <div className="flex flex-col gap-5">
                <div className="flex w-full gap-5">
                  <Skeleton className="h-[55px] w-full" />

                  <Skeleton className="h-[55px] w-full" />
                </div>

                <Skeleton className="h-[90px] w-full" />

                <Skeleton className="h-[55px] w-full" />

                <div className="flex gap-3">
                  <Skeleton className="h-[50px] w-full" />

                  <Skeleton className="h-[50px] w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Link to="/products" className="flex gap-2 text-sm text-primary">
        <ArrowLeft02Icon className="h-5 w-5" />
        Voltar
      </Link>

      <div className="mt-2 flex justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="font-secondary text-2xl font-bold text-gray-500">
            Editar produto
          </h1>

          <p className="text-sm">
            Gerencie as informações do produto cadastrado
          </p>
        </div>

        <div className="flex items-end gap-4">
          <Button variant="ghost" className="h-fit p-0">
            <Tick02Icon className="mr-2 h-5 w-5" />
            Marcar como vendido
          </Button>

          <Button variant="ghost" className="h-fit p-0">
            <UnavailableIcon className="mr-2 h-5 w-5" />
            Desativar anúncio
          </Button>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-3 gap-4">
        <FileInput
          containerProps={{
            className: 'h-auto max-h-[340px] w-full col-span-1',
          }}
          label="Selecione a imagem do produto"
          {...register('file')}
          defaultValue={product?.attachments[0].url}
        />

        <Card className="relative col-span-2 p-8">
          <CardHeader className="p-0">
            <h2 className="font-secondary text-lg">Dados do produto</h2>

            <ProductStatusTag
              className="absolute right-6 top-6 rounded-full bg-blue-dark px-2 py-1 text-xs uppercase text-primary-foreground"
              status={product?.status || 'available'}
            />
          </CardHeader>

          <CardContent className="mt-8 p-0">
            <form
              className="flex flex-col gap-5"
              onSubmit={handleSubmit(handleEditProduct)}
            >
              <div className="flex w-full gap-5">
                <Input
                  label="Título"
                  placeholder="Nome do produto"
                  error={errors.title?.message}
                  {...register('title')}
                />

                <Input
                  label="Valor"
                  placeholder="R$ 0,00"
                  error={errors.priceInCents?.message}
                  {...register('priceInCents')}
                />
              </div>

              <Textarea
                label="Descrição"
                placeholder="Escreva detalhes sobre o produto, tamanho, características"
                error={errors.description?.message}
                {...register('description')}
              />

              <Controller
                name="categoryId"
                control={control}
                render={({
                  field: { name, onChange, value, disabled },
                  fieldState: { error },
                }) => {
                  return (
                    <Select
                      label="Categoria"
                      name={name}
                      onValueChange={onChange}
                      value={value}
                      disabled={disabled}
                      error={error?.message}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>

                      <SelectContent>
                        {categories?.map((category) => {
                          return (
                            <SelectItem key={category.id} value={category.id}>
                              {category.title}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  );
                }}
              />

              <div className="flex gap-3">
                <Link to="/products" className="w-full">
                  <Button
                    type="button"
                    variant="outline"
                    size="xl"
                    className="w-full"
                  >
                    Cancelar
                  </Button>
                </Link>

                <Button
                  type="submit"
                  size="xl"
                  className="w-full"
                  isLoading={isSubmitting}
                >
                  Salvar e atualizar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
