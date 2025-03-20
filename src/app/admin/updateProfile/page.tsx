"use client"

import { getCookie } from '@/api/get-cookie'
import { setCookieProfile } from '@/api/set-cookie-profile'
import { api } from '@/lib/api'
import { CirclePlus, CloudUpload, SquarePen, UserPen, X  } from 'lucide-react'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

interface UpdateProfileResponse{
    imageProfileUrl: string
}

const MAX_FILE_SIZE = 1000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const profileUpdateFormSchema = z.object({
    imageProfile: z
    .array(z.instanceof(File))
    .nonempty("Image is required.")
    .max(1, "You can only upload one file.")
    .refine(
        (files) => files[0].size <= MAX_FILE_SIZE,
        `Max file size is 10MB.`
    )
    .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files[0].type),
        ".jpg, .jpeg, .png and .webp files are accepted."
    ),
})

type ProfileUpdateFormFilds = z.infer<typeof profileUpdateFormSchema>

export default function UpdateProfile(){

    const [username, setUsername] = useState<RequestCookie | undefined>(undefined)
    const [imageProfileUrl, setImageProfileUrl] = useState<RequestCookie | undefined>(undefined)
    const [creatorIdCookie, setCreatorIdCookie] = useState<RequestCookie | undefined>(undefined)
    const [thumbnail, setThumbnail] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        const fetchCookies = async () => {
            const cookies = await getCookie(); 
            setImageProfileUrl(cookies.imageProfileUrl)
            setUsername(cookies.username)
            setCreatorIdCookie(cookies.id)
        }

        fetchCookies()
    }, [])

    const {
            handleSubmit, 
            setValue,
            formState: { isSubmitting },
        } = useForm<ProfileUpdateFormFilds>()

    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
    
        if (file) {
            setThumbnail(URL.createObjectURL(file));

            setValue("imageProfile", [file]); 
        }
    };

    const handleReload = () => {
        window.location.reload();
    }

    const onSubmit: SubmitHandler<ProfileUpdateFormFilds> = async (data) => {
    
        if(!creatorIdCookie) return

        const id = creatorIdCookie.value

        if (!data.imageProfile || data.imageProfile.length === 0) {
            console.error("Nenhuma imagem foi enviada.");
            return;
        }
        
        const result = profileUpdateFormSchema.safeParse(data) 
        if(!result.success) return 

        const { imageProfile } = data

        if(!imageProfileUrl) return

        const formPost = new FormData()
        formPost.append("imageProfile", imageProfile[0]);
        formPost.append("id", id)
        formPost.append("imageUrlProfile", imageProfileUrl.value)

        try{
            const response = await api.put<UpdateProfileResponse>("/creator/update-image-creator-profile", formPost, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                },
            })

            if(response.status != 400){
                setThumbnail(null)
            }

        } catch (error: any) {
            console.log(error)
        }
    }
   
    return (
        <main className="w-full h-[120vh] flex items-start font-poppins relative">
            <div className="min-h-[120vh] bg-gray-200 flex flex-col gap-10">
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
                    <Link href="/admin/updateProfile">
                        <div className='w-64 h-12 bg-white flex items-center gap-3 pl-3 font-semibold text-sm 
                                        tracking-wider border-1 border-balck cursor-pointer shadow-links hover:shadow-links-move'>
                            <UserPen /> 
                            <span>Meu perfil</span>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="w-[1px] h-[120vh] bg-gray-800"></div>
            <div className='w-full h-screen flex-1'>
                <div className='flex justify-between items-center px-10 py-5 border-b-[2px]'>
                    <span>Painel do administrador</span>
                    {(imageProfileUrl && username) ? (
                        <img 
                            src={imageProfileUrl.value} 
                            alt={username.value} 
                            className='rounded-4xl cursor-pointer w-[55px] h-[55px] object-cover' />
                    ) : (
                        <img 
                            src="/perfil.jpeg" 
                            alt="username" 
                            className='rounded-4xl cursor-pointer w-[55px] h-[55px] object-cover' />
                    )}
                </div>
                <div className='w-full pl-16 pt-10'>
                    <form 
                        className='w-96 flex flex-col gap-4'
                        onSubmit={handleSubmit(onSubmit)}
                        >
                        <div className='flex flex-col gap-3 w-50'>
                            <span className='text-lg'>Carregue sua foto</span>
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
                        </div>
                        <button 
                            type='submit' 
                            className='w-42 bg-black text-white py-3 cursor-pointer'>
                            {isSubmitting ? "Editando..." : "Editar"}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}