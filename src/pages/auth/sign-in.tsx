import { AccessIcon, ArrowRight02Icon, Mail02Icon } from 'hugeicons-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';

export function SignIn() {
  return (
    <div className="m-10 ml-auto flex max-w-[630px] justify-end">
      <Helmet title="Acesse sua conta" />

      <Card className="my-auto flex w-full flex-col px-20 py-16">
        <CardHeader>
          <h1 className="font-secondary text-2xl font-bold text-gray-500">
            Acesse sua conta
          </h1>

          <p className="text-sm">Informe seu e-mail e senha para entrar</p>
        </CardHeader>

        <CardContent className="my-10 pb-0">
          <form className="flex flex-col gap-5">
            <Input
              placeholder="Seu e-mail cadastrado"
              label="E-mail"
              LeftIcon={Mail02Icon}
            />

            <PasswordInput
              placeholder="Sua senha de acesso"
              label="Senha"
              LeftIcon={AccessIcon}
            />

            <Button size="2xl" className="mt-10 text-left">
              Acessar
              <ArrowRight02Icon className="ml-auto" />
            </Button>
          </form>
        </CardContent>

        <CardFooter className="mt-auto flex flex-col pt-6">
          <p className="w-full">Ainda não tem uma conta?</p>

          <Button
            variant="outline"
            size="2xl"
            className="mt-5 w-full text-left"
            asChild
          >
            <Link to="/sign-up">
              Cadastrar
              <ArrowRight02Icon className="ml-auto" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
