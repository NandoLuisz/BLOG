"use client"

import { getCookie } from '@/api/get-cookie'
import { api } from '@/lib/api'
import { CirclePlus, SquarePen, Mail, CloudUpload  } from 'lucide-react'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const postCreateFormSchema = z.object({
    imagePost: z
    .array(z.instanceof(File))
    .nonempty("Image is required.")
    .max(1, "You can only upload one file.")
    .refine(
        (files) => files[0].size <= MAX_FILE_SIZE,
        `Max file size is 5MB.`
    )
    .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files[0].type),
        ".jpg, .jpeg, .png and .webp files are accepted."
    ),
    title: z.string().min(25).max(100),
    content: z.string().min(200),
    creatorId: z.string().uuid(),
    type: z.string().min(6).max(12)
})

type PostFormFields = z.infer<typeof postCreateFormSchema>

export default function AddBlog(){

    const [username, setUsername] = useState<RequestCookie | undefined>(undefined)
    const [imageProfileUrl, setImageProfileUrl] = useState<RequestCookie | undefined>(undefined)
    const [creatorIdCookie, setCreatorIdCookie] = useState<RequestCookie | undefined>(undefined)
    const [thumbnail, setThumbnail] = useState<string | null>(null);

    const {
        register, 
        handleSubmit, 
        setValue,
        setError,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<PostFormFields>()

    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
    
        if (file) {
            setThumbnail(URL.createObjectURL(file));

            setValue("imagePost", [file]); 
        }
    };

    const onSubmit: SubmitHandler<PostFormFields> = async (data) => {

        if(!creatorIdCookie) return

        const creatorId = creatorIdCookie.value

        const newData = { ...data, creatorId }

        if (!data.imagePost || data.imagePost.length === 0) {
            console.error("Nenhuma imagem foi enviada.");
            return;
        }
        
        const result = postCreateFormSchema.safeParse(newData) 
        if(!result.success) return 

        const { imagePost, title, content, type } = newData

        const formPost = new FormData()
        formPost.append("imagePost", imagePost[0]);
        formPost.append("title", title);
        formPost.append("content", content);
        formPost.append("creatorId", creatorId);
        formPost.append("type", type)

        try{
            const response = await api.post("post/create-post", formPost, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                },
            })

            if(response.status === 200 || response.status === 201) console.log("Post feito com sucesso!")
                reset() 
                setThumbnail(null)

        } catch (error: any) {
            console.log(error)
        }

    }

    useEffect(() => {
        const fetchCookies = async () => {
            const cookies = await getCookie(); 
            setImageProfileUrl(cookies.imageProfileUrl)
            setUsername(cookies.username)
            setCreatorIdCookie(cookies.id)
        }
        fetchCookies();
    }, []);

    return (
        <main className="w-full h-[120vh] flex items-start font-poppins">
            <div className="h-[120vh] bg-gray-200 flex flex-col gap-10">
                <Link href="/">
                    <div className="flex items-center px-12 py-3 border-b-[2px] border-gray-800">
                        <img src="/icon-logo.png" width={66} height={66} alt="Logo" />
                        <span className="text-black text-2xl font-semibold tracking-tighter">NFL's Blogger</span>
                    </div>
                </Link>
                <div className='flex flex-col items-end gap-5'>
                    <Link href="/admin/addBlog">
                        <div className='w-64 h-12 bg-white flex items-center gap-3 pl-3 font-semibold text-sm 
                                        tracking-wider border-1 border-balck cursor-pointer shadow-links hover:shadow-links-move'>
                            <CirclePlus />
                            <span>Add blogs</span>
                        </div>
                    </Link>
                    <Link href="/admin/blogList">
                        <div className='w-64 h-12 bg-white flex items-center gap-3 pl-3 font-semibold text-sm 
                                        tracking-wider border-1 border-balck cursor-pointer shadow-links hover:shadow-links-move'>
                            <SquarePen />
                            <span>Lista de blogs</span>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="w-[1px] h-[120vh] bg-gray-800"></div>
            <div className='h-screen flex-1'>
                <div className='flex justify-between items-center px-10 py-5 border-b-[2px]'>
                    <span>Painel do administrador</span>
                    {(imageProfileUrl && username) ? (
                        <img 
                            src={imageProfileUrl.value} 
                            width={50} 
                            height={50} 
                            alt={username.value} 
                            className='rounded-4xl cursor-pointer' />
                    ): (
                        <img 
                            src="/perfil.jpeg" 
                            width={50} 
                            height={50} 
                            alt="username" 
                            className='rounded-4xl cursor-pointer' />
                    )}
                </div>
                <div className='w-full pl-16 pt-10'>
                    <form 
                        className='w-96 flex flex-col gap-4'
                        onSubmit={handleSubmit(onSubmit)}
                        >
                        <div className='flex flex-col gap-3 w-50'>
                            <span className='text-lg'>Carregue a Miniatura</span>
                            <div 
                                className='w-42 h-20 flex flex-col items-center 
                                            justify-center bg-gray-100 border-dashed 
                                            border-2 border-gray-300 cursor-pointer relative'
                                onClick={() => {fileInputRef.current?.click()}}>
                                {thumbnail ? (
                                    <img src={thumbnail} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <>
                                        <CloudUpload className='text-gray-400 size-9'/>
                                        <span className='text-gray-400 text-sm'>Carregar</span>
                                    </>
                                )}
                                <input 
                                    type="file"
                                    accept="image/jpeg, image/jpg, image/png, image/webp"
                                    onChange={handleFileChange}  
                                    ref={fileInputRef} 
                                    className="absolute right-[9999px]"
                                />
                            </div>
                            {errors.imagePost && <p className="error">{errors.imagePost.message}</p>}
                        </div>
                        <div className='flex flex-col gap-3 w-full'>
                            <span className='text-lg'>Título do Blog</span>
                            <input 
                                {...register("title", 
                                    {required: "Título obrigatório", 
                                                                minLength: {
                                                                  value: 25,
                                                                  message: "Título precisa ter no mínimo 25 caracteres"
                                                                }
                                                                })} 
                                type="text" 
                                placeholder='Digite aqui' 
                                className='w-full px-3 py-3 border-[0.5px] border-gray-400 outline-none'
                            />
                            {errors.title && <span className="text-red-700 text-xs">{errors.title.message}</span>}
                        </div>
                        <div className='flex flex-col gap-3 w-full'>
                            <span className='text-lg'>Descrição do Blog</span>
                            <textarea 
                                {...register("content", 
                                    {required: "Conteúdo obrigatório", 
                                                    minLength: {
                                                    value: 200,
                                                    message: "Conteúdo precisa ter no mínimo 200 caracteres"
                                                    }
                                                    })} 
                                placeholder='Escreva o conteúdo aqui'
                                className='w-full h-32 px-3 py-3 border-[0.5px] border-gray-400 outline-none '
                            />
                            {errors.content && <span className="text-red-700 text-xs">{errors.content.message}</span>}
                        </div>
                        <div className='flex flex-col gap-3 w-48'>
                            <span className='text-lg'>Categoria do Blog</span>
                            <select 
                                className='p-3 border-[0.5px] border-gray-400 outline-none text-gray-500'
                                {...register("type")}
                                >
                                <option value="Startup">Startup</option>
                                <option value="Tecnology">Tecnológia</option>
                                <option value="Lifestyle">Lifestyle</option>
                            </select>
                        </div>
                        <button 
                            type='submit' 
                            className='w-48 bg-black text-white py-3 cursor-pointer'>
                            {isSubmitting ? "Adicionando..." : "ADD"}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}