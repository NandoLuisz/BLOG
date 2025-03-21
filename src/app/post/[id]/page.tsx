"use client"

import HeaderAllPosts from "@/components/header-all-posts"

import Footer from "@/components/footer"
import { use, useEffect, useState } from "react"
import { PostResponse } from "@/api/get-all-posts"
import { getPostById } from "@/api/get-post-by-id"
import formatarData from "@/api/date-format"
interface PostParams {
  params: Promise<{ id: string }>
}

export default function ({ params }: PostParams) {
  const { id } = use(params)
  const [postPage, setPostPage] = useState<PostResponse | null>(null)
  
  useEffect(() => {
      async function fetchPost() {
        try {
            const post = await getPostById(id)
            if (post != null) {
              setPostPage(post)   
            }
        } catch (error) {
            console.error("Erro ao buscar o post:", error)
        }
      }

      fetchPost()

  }, [id])

  if (!postPage) return <p>Carregando...</p>

  return (
    <section className="w-full min-h-screen relative">
      <div className="w-full h-[70vh] bg-gray-300 absolute -z-50"></div>
      <HeaderAllPosts />
      <div className="w-full flex flex-col items-center gap-4">
        <div className="flex gap-2">
          <p className="bg-black rounded-xl text-white px-2 py-[0.5px]">{postPage.type}</p>
          <p className="font-poppins">{formatarData(postPage.createdAt)}</p>
        </div>
        <h1 className="text-5xl font-semibold">{postPage.title}</h1>
        <img src={postPage.creator.imageProfileUrl} alt="" className="w-[80px] h-[80px] object-cover border-3 border-white rounded-full"/>
        <p className="text-xl font-serif">{postPage.creator.username}</p>
        <img src={postPage.imagePostUrl} alt="" className="w-[60%] h-[500px] object-cover border-3 border-white"/>
        <div className="w-[60%]" dangerouslySetInnerHTML={{ __html: postPage.content }}></div>
      </div>
      <Footer />
    </section>
  )
}
   