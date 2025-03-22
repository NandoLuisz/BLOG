"use client";

import { setCookie } from "@/api/set-cookie";
import { api } from "@/lib/api";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";

const userLoginFormSchema = z.object({
  username: z.string().min(3, "Usuário deve ter pelo menos 3 caracteres").max(20),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres").max(20),
});

type LoginFormFields = z.infer<typeof userLoginFormSchema>;

export default function SignIn() {

  const [type, setType] = useState('password');

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>();

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    const result = userLoginFormSchema.safeParse(data);
    if (!result.success) {
      console.log(result.error.format());
      return;
    }

    try {
      const response = await api.post("auth/login-creator", data);
      if (response.status === 200) {
        const { token } = response.data;
        setCookie(token)
        reset();
        router.push("/");
      }
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data;
        console.error(errorMessage);

        if (errorMessage === "Usuário não cadastrado.") {
          setError("username", { message: errorMessage });
        } else if (errorMessage === "Senha incorreta.") {
          setError("password", { message: errorMessage });
        } else {
          setError("root", { message: "Erro inesperado ao entrar com usuário." });
        }
      } else {
        console.error("Erro desconhecido:", error);
        setError("root", { message: "Erro de conexão com o servidor." });
      }
    }
  };

  return (
    <main className="w-full h-screen flex items-center justify-center relative">
      <Link href="/">
        <button className="bg-blue-400 hover:bg-blue-500 text-white text-xs flex gap-1 rounded-md px-4 py-2 absolute left-5 top-5 cursor-pointer">
          <ArrowLeft className="size-4" />
          Voltar para os posts
        </button>
      </Link>
      <div className="w-[450px] min-h-[600px] bg-white border-[0.5px] flex flex-col items-center gap-2 border-black px-6 py-6 rounded-md">
        <img src="/icon-logo.png" width={50} height={50} alt="Logo" />
        <h1 className="font-semibold font-roboto text-xl">Bem-vindo de volta!</h1>
        <div className="w-full flex items-center justify-between gap-2">
          <button className="w-[50%] flex items-center justify-center py-2 bg-zinc-100 border-[0.5px] border-zinc-200 rounded-lg">
            <FcGoogle />
          </button>
          <button className="w-[50%] flex items-center justify-center py-2 bg-zinc-100 border-[0.5px] border-zinc-200 rounded-lg">
            <FaGithub />
          </button>
        </div>
        <div className="w-full flex items-center gap-2">
          <div className="w-full h-[0.5px] bg-zinc-200"></div>
          <span className="text-zinc-300">Ou</span>
          <div className="w-full h-[0.5px] bg-zinc-200"></div>
        </div>
        <form className="w-full min-h-[45%] flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <span className="font-medium">Usuário</span>
            <input
              {...register("username", { required: "Usuário obrigatório" })}
              type="text"
              placeholder="Digite seu usuário"
              className="py-2 px-2 outline-none border-b-[1px] border-zinc-400"
            />
            {errors.username && <span className="text-red-700 text-xs">{errors.username.message}</span>}
          </div>
          <div className="flex flex-col relative">
            <span className="font-medium">Senha</span>
            <input
              {...register("password", { required: "Senha é obrigatória" })}
              type={type}
              placeholder="Digite sua senha"
              className="py-2 px-2 outline-none border-b-[1px] border-zinc-400"
            />
            {errors.password && <span className="text-red-700 text-xs">{errors.password.message}</span>}
            {type === 'password' ? (
              <Eye 
                className="absolute right-5 bottom-2 text-zinc-400"
                onClick={() => setType('text')}
              />
            ) : (
              <EyeOff  
                className="absolute right-5 bottom-2 text-zinc-400"
                onClick={() => setType('password')}
            />
            )}
          </div>
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full py-2 bg-blue-800 hover:bg-blue-900 border-[0.5px] border-blue-700 text-white rounded-lg mt-12 cursor-pointer">
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
          {errors.root && <span className="text-red-700 text-xs mb-5">{errors.root.message}</span>}
        </form>
        <div className="flex items-center gap-2 text-zinc-600 mt-10">
          <span>Ainda não tem uma conta?</span>
          <Link href="/register">
            <span className="bg-zinc-500 text-white px-2 py-1 rounded-md border-[0.5px] border-zinc-400 cursor-pointer">
              Registrar
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
