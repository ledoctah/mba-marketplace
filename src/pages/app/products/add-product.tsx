import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { createProduct } from '@/api/create-product';
import { listCategories } from '@/api/list-categories';
import { Product } from '@/api/list-products';
import { uploadAttachment } from '@/api/upload-attachment';
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { queryClient } from '@/lib/queryClient';

const addProductSchema = z.object({
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
    .refine((fileList) => fileList?.length === 1, 'Campo obrigatório')
    .transform((fileList) => fileList.item(0)!),
});

type AddProductFormData = z.infer<typeof addProductSchema>;

export function AddProduct() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: listCategories,
    staleTime: Infinity,
  });

  const { mutateAsync: uploadAttachmentFn } = useMutation({
    mutationFn: uploadAttachment,
    onError: () => {
      toast({
        title: 'Erro ao criar o produto',
        description: 'Não foi possível anexar a imagem, tente novamente!',
        variant: 'destructive',
      });
    },
  });

  const { mutateAsync: createProductFn } = useMutation({
    mutationFn: createProduct,
    onError: () => {
      toast({
        title: 'Erro ao criar o produto',
        description: 'Não foi possível criar o produto, tente novamente!',
        variant: 'destructive',
      });
    },
  });

  const { handleSubmit, control, formState, register } =
    useForm<AddProductFormData>({
      resolver: zodResolver(addProductSchema),
    });

  const { errors, isSubmitting } = formState;

  function updateProductsOnCache(product: Product) {
    const productsListCache = queryClient.getQueryData<Product[]>(['products']);

    if (!productsListCache) {
      return;
    }

    queryClient.setQueryData(['products'], [...productsListCache, product]);
  }

  async function handleAddProduct({
    title,
    priceInCents,
    categoryId,
    description,
    file,
  }: AddProductFormData) {
    const { attachments } = await uploadAttachmentFn(file);

    const { product } = await createProductFn({
      title,
      priceInCents,
      categoryId,
      description,
      attachmentsIds: attachments.map((attachment) => attachment.id),
    });

    updateProductsOnCache(product);

    toast({
      title: 'Sucesso!',
      description: 'Produto criado com sucesso!',
    });

    navigate('/products');
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2">
        <h1 className="font-secondary text-2xl font-bold text-gray-500">
          Novo produto
        </h1>
        <p className="text-sm">Cadastre um produto para venda no marketplace</p>
      </div>

      <div className="mt-10 grid grid-cols-3 gap-4">
        <FileInput
          containerProps={{
            className: 'h-auto max-h-[340px] w-full col-span-1',
          }}
          label="Selecione a imagem do produto"
          form="add-product-form"
          {...register('file')}
        />

        <Card className="col-span-2 p-8">
          <CardHeader className="p-0">
            <h2 className="font-secondary text-lg">Dados do produto</h2>
          </CardHeader>

          <CardContent className="mt-8 p-0">
            <form
              id="add-product-form"
              className="flex flex-col gap-5"
              onSubmit={handleSubmit(handleAddProduct)}
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
                  format="money"
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
                  Salvar e publicar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
