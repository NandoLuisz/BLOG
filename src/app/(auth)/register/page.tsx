"use client"

import { api } from "@/lib/api";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";

const creatorRegisterFormSchema = z.object({
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(6).max(20)
  })
  
type RegisterFormFields = z.infer<typeof creatorRegisterFormSchema>

export default function SingUp(){

  const [type, setType] = useState('password');

  const 
  { register, 
    handleSubmit, 
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormFields>()

  const onSubmit: SubmitHandler<RegisterFormFields> = async (data) => {
    const result = creatorRegisterFormSchema.safeParse(data) 
    
    if(!result.success) return 

    const { username, email, password } = data

    const role  = "ADMIN"
    const user = {
      username,
      password,
      email,
      role
    }
  
    try {
      const response = await api.post("auth/register-creator", JSON.stringify(user))
      if(response.status === 200) console.log("Usuário cadastrado com sucesso!")
      reset()  
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data
        
        if (errorMessage === "Usuário já cadastrado.") {
          setError("username", { message: errorMessage });
        } else if (errorMessage === "Email já cadastrado.") {
          setError("email", { message: errorMessage });
        } else {
          setError("root", { message: "Erro inesperado ao registrar o usuário." });
        }

      } else {
        console.error("Erro desconhecido:", error);
        setError("root", { message: "Erro de conexão com o servidor." });
      }
    }

      console.log(user)
    }

    return(
        <main className="w-full h-screen flex items-center justify-center">
            <Link href="/">
                <button 
                    className="bg-blue-400 hover:bg-blue-500 text-white text-xs flex gap-1 rounded-md 
                                px-4 py-2 absolute left-5 top-5 cursor-pointer">
                    <ArrowLeft className="size-4"/>
                    Voltar para os posts
                </button>
            </Link>
            <div className="w-[450px] min-h-[600px] bg-white border-[0.5px] flex
                            flex-col items-center gap-2 border-black px-6 py-6 rounded-md">
                <img src="/icon-logo.png" width={50} height={50} alt="Logo" />
                <h1 className="font-semibold font-roboto text-xl">Bem-vindo ao NFL's Blogger!</h1>  
                <div className="w-full flex items-center justify-between gap-2">
                    <button className="w-[50%] flex items-center justify-center 
                                        py-2 bg-zinc-100 border-[0.5px] border-zinc-200 rounded-lg">
                        <FcGoogle />
                    </button>
                    <button className="w-[50%] flex items-center justify-center 
                                        py-2 bg-zinc-100 border-[0.5px] border-zinc-200 rounded-lg">
                        <FaGithub />
                    </button>
                </div>
                <div className="w-full flex items-center gap-2">
                    <div className="w-full h-[0.5px] bg-zinc-200"></div>
                    <span className="text-zinc-300">Ou</span>
                    <div className="w-full h-[0.5px] bg-zinc-200"></div>
                </div>
                <form 
                    className="w-full min-h-[35%] flex flex-col gap-1"
                    onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col">
                        <span className="font-medium">Usuário</span>
                        <input 
                            {...register("username", 
                                {required: "Usuário obrigatório", 
                                                            minLength: {
                                                              value: 3,
                                                              message: "Usuário precisa ter no mínimo 6 caracteres"
                                                            }
                                                            })} 
                            type="text" 
                            className="py-2 px-2 border-b-2 border-zinc-300 outline-none"
                            placeholder="Digite seu usuário"
                        />
                            {errors.username && <span className="text-red-700 text-xs">{errors.username.message}</span>}
                    </div>
                    <div className="flex flex-col">
                        <span className="font-medium">Email</span>
                        <input 
                            {...register("email", 
                                {required: "Email obrigatório!", 
                                                          validate: (value) => {
                                                            if(!value.includes("@")){
                                                              return "Email precisa ser válido"
                                                            } 
                                                            return true
                                                          },})} 
                            type="email" 
                            placeholder="exemplo@gmail.com" 
                            className="py-2 px-2 border-b-2 border-zinc-300 outline-none"/>
                            {errors.email && <span className="text-red-700 text-xs mb-5">{errors.email.message}</span>}
                    </div>
                    <div className="flex flex-col relative">
                        <span className="font-medium">Senha</span>
                        <input 
                            {...register("password", 
                                {required: "Senha obrigatória", 
                                                            minLength: {
                                                              value: 6,
                                                              message: "Senha precisa ter no minímo 6 digitos"
                                                            },
                                                            })} 
                            type={type} 
                            className="py-2 px-2 border-b-2 border-zinc-300 outline-none"
                            placeholder="Digite sua senha"
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
                        className="w-full py-2 bg-blue-800 hover:bg-blue-900 border-[0.5px] border-blue-700 
                                text-white rounded-lg mt-4 cursor-pointer">
                            {isSubmitting ? "Registrando..." : "Registrar"}
                    </button>
                    {errors.root && <span className="text-red-700 text-xs">{errors.root.message}</span> }
                </form>
                <span className="text-sm text-zinc-500 mt-2 text-center">
                    Ao clicar em registrar, você concorda com os Termos de Serviços 
                    e a Política de Privacidade do NFL's Bloggers
                </span>
                <div className="flex items-center gap-2 text-zinc-600 mt-6">
                    <span>Já tem uma conta?</span>
                    <Link href="/login">
                        <span 
                            className="bg-zinc-500 text-white px-2 py-1 rounded-md border-[0.5px] border-zinc-400 cursor-pointer">
                            Entrar
                        </span>
                    </Link>
                </div>
            </div>
        </main>
    )
}