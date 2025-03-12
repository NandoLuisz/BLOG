"use client"
import { CirclePlus, SquarePen, Mail, CloudUpload  } from 'lucide-react'
import { useRef } from 'react'

export default function AddBlog(){

    const fileInputRef = useRef<HTMLInputElement | null>(null)

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
            <div className="w-[1px] min-h-screen bg-gray-800"></div>
            <div className='h-screen flex-1'>
                <div className='flex justify-between items-center px-10 py-5 border-b-[2px]'>
                    <span>Painel do administrador</span>
                    <img src="/perfil.jpeg" width={50} height={50} alt="Luís" className='rounded-4xl cursor-pointer' />
                </div>
                <div className='w-full pl-16 pt-10'>
                    <div className='w-96 flex flex-col gap-4'>
                        <div className='flex flex-col gap-3 w-50'>
                            <span className='text-lg'>Carregue a Miniatura</span>
                            <div 
                                className='w-42 h-20 flex flex-col items-center 
                                            justify-center bg-gray-100 border-dashed 
                                            border-2 border-gray-300 cursor-pointer relative'
                                            onClick={() => {fileInputRef.current?.click()}}>
                                <CloudUpload  className='text-gray-400 size-9'/>
                                <span className='text-gray-400 text-sm'>Carregar</span>
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    className='absolute right-[9999px]'
                                    onChange={e => {
                                        const file = e.target.files?.[0]
                                        console.log(file)
                                    }}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 w-full'>
                            <span className='text-lg'>Título do Blog</span>
                            <input 
                                type="text" 
                                placeholder='Digite aqui' 
                                className='w-full px-3 py-3 border-[0.5px] border-gray-400 outline-none'
                            />
                        </div>
                        <div className='flex flex-col gap-3 w-full'>
                            <span className='text-lg'>Descrição do Blog</span>
                            <textarea 
                                placeholder='escreva o conteúdo aqui'
                                className='w-full h-32 px-3 py-3 border-[0.5px] border-gray-400 outline-none '
                                />
                        </div>
                        <div className='flex flex-col gap-3 w-46'>
                            <span className='text-lg'>Categoria do Blog</span>
                            <select className='p-3 border-[0.5px] border-gray-400 outline-none text-gray-500'>
                                <option value="Startup">Startup</option>
                                <option value="Tecnológia">Tecnológia</option>
                                <option value="Empreendorismo">Empreendorismo</option>
                            </select>
                        </div>
                        <button className='w-46 bg-black text-white py-3 cursor-pointer'>ADD</button>
                    </div>
                </div>
            </div>
        </main>
    )
}