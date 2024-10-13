import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AccessIcon, ArrowRight02Icon, Mail02Icon } from 'hugeicons-react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { signIn } from '@/api/sign-in';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { useToast } from '@/hooks/use-toast';

const schema = z.object({
  email: z
    .string({ required_error: 'Campo obrigatório' })
    .email('E-mail inválido'),
  password: z
    .string({ required_error: 'Campo obrigatório' })
    .min(6, 'Mínimo de 6 caracteres'),
});

type SignInFormData = z.infer<typeof schema>;

export function SignIn() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { formState, handleSubmit, register } = useForm<SignInFormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync: authenticate, isPending } = useMutation({
    mutationFn: signIn,
    onError: () => {
      toast({
        title: 'Erro ao entrar',
        description: 'Credenciais inválidas, tente novamente!',
        variant: 'destructive',
      });
    },
  });

  const { errors } = formState;

  async function handleSignIn({ email, password }: SignInFormData) {
    await authenticate({
      email,
      password,
    });

    navigate({
      pathname: '/',
    });
  }

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
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(handleSignIn)}
          >
            <Input
              placeholder="Seu e-mail cadastrado"
              label="E-mail"
              LeftIcon={Mail02Icon}
              error={errors.email?.message}
              {...register('email')}
            />

            <PasswordInput
              placeholder="Sua senha de acesso"
              label="Senha"
              LeftIcon={AccessIcon}
              error={errors.password?.message}
              {...register('password')}
            />

            <Button
              size="2xl"
              className="mt-10 text-left"
              isLoading={isPending}
            >
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
