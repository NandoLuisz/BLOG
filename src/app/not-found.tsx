import Link from "next/link";

export default function NotFound(){
    return (
        <div className="flex h-screen flex-col items-center justify-center gap-2">
            <h1 className="text-4xl">Página não encontrada</h1>
            <p className="text-accent-foreground">
                Voltar para o <Link href="/" className="text-sky-600 dark:text-sky-400">Posts</Link> 
            </p>
        </div>
    )
}