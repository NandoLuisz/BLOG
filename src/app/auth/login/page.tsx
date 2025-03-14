import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SingIn(){
    return(
        <main className="w-full h-screen flex items-center justify-center relative">
            <Link href="/">
                <button className="bg-blue-400 hover:bg-blue-500 text-white text-xs flex gap-1 rounded-md px-4 py-2 absolute left-5 top-5 cursor-pointer">
                    <ArrowLeft className="size-4"/>
                    Voltar para os posts
                </button>
            </Link>
            <div className="w-[450px] h-[600px] bg-white border-[0.5px] flex
                            flex-col items-center gap-2 border-black px-6 py-6 rounded-md">
                <img src="/icon-logo.png" width={50} height={50} alt="Logo" />
                <h1 className="font-semibold font-roboto text-xl">Bem-vindo de volta!</h1>  
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
                <form className="w-full h-[45%] flex flex-col gap-3">
                    <div className="flex flex-col">
                        <span className="font-medium">Email</span>
                        <input 
                            type="email" 
                            placeholder="exemplo@gmail.com" 
                            className="py-2 px-2 border-b-2 border-zinc-300 outline-none text-zinc-400"/>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-medium">Senha</span>
                        <input 
                            type="password" 
                            className="py-2 px-2 border-b-2 border-zinc-300 outline-none text-zinc-400"
                            placeholder="Digite sua senha"
                            />
                    </div>
                    <button 
                        type="submit"
                        className="w-full py-2 bg-blue-800 hover:bg-blue-900 border-[0.5px] border-blue-700 
                                text-white rounded-lg mt-12 cursor-pointer">
                            Entrar
                    </button>
                </form>
                <div className="flex items-center gap-2 text-zinc-600 mt-20">
                    <span>Ainda não tem uma conta?</span>
                    <Link href="/auth/register">
                        <span 
                            className="bg-zinc-500 text-white px-2 py-1 rounded-md border-[0.5px] border-zinc-400 cursor-pointer">
                            Registrar
                        </span>
                    </Link>
                </div>
            </div>
        </main>
    )
}