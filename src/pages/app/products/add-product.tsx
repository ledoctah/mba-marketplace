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

export function AddProduct() {
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
        />

        <Card className="col-span-2 p-8">
          <CardHeader className="p-0">
            <h2 className="font-secondary text-lg">Dados do produto</h2>
          </CardHeader>

          <CardContent className="mt-8 p-0">
            <form className="flex flex-col gap-5">
              <div className="flex w-full gap-5">
                <Input label="Título" placeholder="Nome do produto" />
                <Input label="Valor" placeholder="R$ 0,00" />
              </div>

              <Textarea
                label="Descrição"
                placeholder="Escreva detalhes sobre o produto, tamanho, características"
              />

              <Select label="Categoria">
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
