"use client"

import HeaderAllPosts from "@/components/header-all-posts"
import MostPopularPost from '@/components/most-popular-post'
import MainIntroPosts from "@/components/main-intro-posts"

const filters = ["Todos", "Tecnologia", "Startups", "Lifestyle"]

import Footer from "@/components/footer"
import CardPost from "@/components/card-post"
import { useEffect, useState } from "react"
import { getAllPosts, PostResponse } from "@/api/get-all-posts"

export default function Home() {
  const [selectFilter, setSelectFilter] = useState<string>("Todos")
  const [postsFiltered, setPostsFiltered] = useState<PostResponse[] | null>([])
  const [allPosts, setAllPosts] = useState<PostResponse[] | null>([])

  useEffect(() => {
        async function fetchPost() {
          try {
              const posts = await getAllPosts()
              if (posts != null) {
                setAllPosts(posts)   
              }else{
                console.log(posts)
              }
          } catch (error) {
              console.error("Erro ao buscar o post:", error)
          }
        }
  
        fetchPost()
  
    }, [])

    if(allPosts == null) return null

  useEffect(() => {
    const filtered = selectFilter !== "Todos"
    ? allPosts.filter(each => each.type.toLowerCase() === selectFilter.toLowerCase())
    : allPosts;

    setPostsFiltered(filtered)

  }, [allPosts, selectFilter])

  console.log(allPosts)

  return (
    <div className='w-full min-h-screen font-poppins'>
      <HeaderAllPosts />
      <MainIntroPosts />
      <section className='w-full flex flex-col items-center'>
        <MostPopularPost />
        <div className="w-full flex gap-8 justify-center my-10 ">
          {filters.map(filter => 
            filter === selectFilter ? (
              <span 
                key={filter} 
                onClick={() => setSelectFilter(filter)}  
                className="bg-black text-white px-2 py-1 cursor-pointer">{filter}</span>
            ) : (
              <span 
                key={filter} 
                onClick={() => setSelectFilter(filter)} 
                className="cursor-pointer">{filter}</span>
            )
          )}
        </div>
        <div className="w-[78%] grid grid-cols-4 gap-5">
          {postsFiltered && postsFiltered.length > 0 ? (
            postsFiltered.slice(1).map((post: PostResponse) => (
              <CardPost 
                key={post.id} 
                id={post.id} 
                imagePostUrl={post.imagePostUrl} 
                type={post.type} 
                creator={post.creator} 
                title={post.title}
              />
            ))
          ) : (
            <h2 className="w-full font-semibold text2xl">Não tem posts. Seja o primeiro a fazer um!</h2>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
