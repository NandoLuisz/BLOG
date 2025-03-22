"use client";

import { useEffect, useState } from "react";
import HeaderAllPosts from "@/components/header-all-posts";
import MostPopularPost from "@/components/most-popular-post";
import MainIntroPosts from "@/components/main-intro-posts";
import Footer from "@/components/footer";
import CardPost from "@/components/card-post";
import { getAllPosts, PostResponse } from "@/api/get-all-posts";

const filters = ["Todos", "Tecnologia", "Startups", "Lifestyle"];

export default function Home() {
  const [selectFilter, setSelectFilter] = useState<string>("Todos");
  const [postsFiltered, setPostsFiltered] = useState<PostResponse[]>([]);
  const [allPosts, setAllPosts] = useState<PostResponse[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const posts = await getAllPosts()
        if (posts) {
          setAllPosts(posts)
          setPostsFiltered(posts)
        }
      } catch (error) {
        console.error("Erro ao buscar os posts:", error)
      }
    }
    fetchPosts()
  }, [])

  useEffect(() => {
    console.log(selectFilter)
    if(selectFilter != "Todos") {
      let filtered = allPosts.filter(each => each.type === selectFilter)
      console.log("filtered:", filtered)
      setPostsFiltered(filtered)
    }else{
      setPostsFiltered(allPosts)
    }

  }, [allPosts, selectFilter])

  return (
    <div className="w-full min-h-screen font-poppins">
      <HeaderAllPosts />
      <MainIntroPosts />
      <section className="w-full flex flex-col items-center">
        <MostPopularPost />
        <div className="w-full flex gap-8 justify-center my-10">
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
        {postsFiltered.length != 1 ? (
          <div className="w-[78%] grid grid-cols-4 gap-5">
            {postsFiltered.slice(1).map((post) => (
              <CardPost 
                key={post.id}
                id={post.id} 
                imagePostUrl={post.imagePostUrl} 
                type={post.type} 
                creator={post.creator} 
                title={post.title}
              />
            ))}
          </div>
        ) : (
          <p>Carregando....</p>
        )}
      </section>
      <Footer />
    </div>
  );
}
