import {
  AccessIcon,
  ArrowRight02Icon,
  CallIcon,
  Mail02Icon,
  UserIcon,
} from 'hugeicons-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Fieldset } from '@/components/ui/fieldset';
import { FileInput } from '@/components/ui/file-input';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';

export function SignUp() {
  return (
    <div className="m-10 ml-auto flex max-w-[630px] justify-end">
      <Helmet title="Acesse sua conta" />

      <Card className="flex w-full flex-col px-20 py-16">
        <CardHeader className="pb-0">
          <h1 className="font-secondary text-2xl font-bold text-gray-500">
            Crie sua conta
          </h1>

          <p className="text-sm">Informe os seus dados pessoais e de acesso</p>
        </CardHeader>

        <CardContent className="my-10 pb-0">
          <form className="flex flex-col gap-5">
            <Fieldset className="gap-5" legend="Perfil">
              <FileInput title="Upload de imagem" />

              <Input
                placeholder="Seu nome completo"
                label="Nome"
                LeftIcon={UserIcon}
              />

              <Input
                placeholder="(00) 00000-0000"
                label="Telefone"
                LeftIcon={CallIcon}
              />
            </Fieldset>

            <Fieldset className="mt-8 gap-5" legend="Acesso">
              <Input
                placeholder="Seu e-mail de acesso"
                label="E-mail"
                LeftIcon={Mail02Icon}
              />

              <PasswordInput
                placeholder="Senha de acesso"
                label="Senha"
                LeftIcon={AccessIcon}
              />

              <PasswordInput
                placeholder="Confirme a senha"
                label="Confirmar senha"
                LeftIcon={AccessIcon}
              />
            </Fieldset>

            <Button size="2xl" className="mt-10 text-left">
              Cadastrar
              <ArrowRight02Icon className="ml-auto" />
            </Button>
          </form>
        </CardContent>

        <CardFooter className="mt-auto flex flex-col pt-6">
          <p className="w-full">Já tem uma conta?</p>

          <Button
            variant="outline"
            size="2xl"
            className="mt-5 w-full text-left"
            asChild
          >
            <Link to="/sign-in">
              Acessar
              <ArrowRight02Icon className="ml-auto" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
