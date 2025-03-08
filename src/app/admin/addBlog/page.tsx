import { CirclePlus, SquarePen, Mail } from 'lucide-react'

export default function AddBlog(){
    return (
        <main className="w-full h-screen flex items-start font-poppins">
            <div className="h-screen bg-gray-200 flex flex-col gap-10">
                <div className="flex items-center px-12 py-3 border-b-[2px] border-gray-800">
                    <img src="/icon-logo.png" width={66} height={66} alt="Logo" />
                    <span className="text-black text-2xl font-semibold tracking-tighter">NFL's Blogger</span>
                </div>
                <div className='flex flex-col items-end gap-5'>
                    <div className='w-64 h-12 bg-white flex items-center gap-3 pl-3 font-semibold text-sm 
                                    tracking-wider border-1 border-balck cursor-pointer shadow-links hover:shadow-links-move'>
                        <CirclePlus />
                        <span>Add blogs</span>
                    </div>
                    <div className='w-64 h-12 bg-white flex items-center gap-3 pl-3 font-semibold text-sm 
                                    tracking-wider border-1 border-balck cursor-pointer shadow-links hover:shadow-links-move'>
                        <SquarePen />
                        <span>Lista de blogs</span>
                    </div>
                    <div className='w-64 h-12 bg-white flex items-center gap-3 pl-3 font-semibold text-sm 
                                    tracking-wider border-1 border-balck cursor-pointer shadow-links hover:shadow-links-move'>
                        <Mail />
                        <span>Assinaturas</span>
                    </div>
                </div>
            </div>
            <div className="w-[1px] h-screen bg-gray-800"></div>
            <div className='h-screen flex-1'>
                <div className='flex justify-between items-center px-10 py-5 border-b-[2px]'>
                    <span>Painel do administrador</span>
                    <img src="/perfil.jpeg" width={50} height={50} alt="Luís" className='rounded-4xl' />
                </div>
            </div>
        </main>
    )
}