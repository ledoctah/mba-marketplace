import { ArrowLeft02Icon, Tick02Icon, UnavailableIcon } from 'hugeicons-react';
import { Link } from 'react-router-dom';

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

export function EditProduct() {
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
        />

        <Card className="relative col-span-2 p-8">
          <CardHeader className="p-0">
            <h2 className="font-secondary text-lg">Dados do produto</h2>

            <div className="absolute right-6 top-6 rounded-full bg-blue-dark px-2 py-1 text-xs uppercase text-primary-foreground">
              Anunciado
            </div>
          </CardHeader>

          <CardContent className="mt-8 p-0">
            <form className="flex flex-col gap-5">
              <div className="flex w-full gap-5">
                <Input
                  label="Título"
                  placeholder="Nome do produto"
                  value="Sofá"
                />

                <Input label="Valor" placeholder="R$ 0,00" value="R$ 1200,90" />
              </div>

              <Textarea
                label="Descrição"
                placeholder="Escreva detalhes sobre o produto, tamanho, características"
              >
                Sofá revestido em couro legítimo, com estrutura em madeira
                maciça e pés em metal cromado.
              </Textarea>

              <Select label="Categoria" value="furniture">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="toys">Brinquedo</SelectItem>
                  <SelectItem value="furniture">Móveis</SelectItem>
                  <SelectItem value="paper">Papelaria</SelectItem>
                  <SelectItem value="beauty">Saúde & Beleza</SelectItem>
                  <SelectItem value="utensils">Utensílios</SelectItem>
                  <SelectItem value="clothes">Vestuário</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="xl"
                  className="w-full"
                >
                  Cancelar
                </Button>

                <Button type="submit" size="xl" className="w-full">
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
