import HeaderAllPosts from "@/components/header-all-posts";
import data from "../../data.json"
import MostPopularPost from '@/components/most-popular-post';
import MainIntroPosts from "@/components/main-intro-posts";

import { ArrowUpRight } from 'lucide-react';

export default function Home() {
  return (
    <div className='w-full min-h-screen font-poppins'>
      <HeaderAllPosts />
      <MainIntroPosts />
      <section className='w-full flex flex-col items-center'>
        <MostPopularPost />
        <div className="w-[78%] grid grid-cols-4 gap-5">
          {data.map((post, index) => 
            index === 0 ? (
              null
            ) : (
              <div key={index} className="border-[0.5px] border-black hover:shadow-links">
                <img src={post.imagePost} alt="" className='w-full'/>
                <div className="w-full px-2 py-2 flex flex-col gap-2">
                  <div className="w-full flex items-center justify-between ">
                    <img src={post.imageProfile} alt="" className='w-[50px] h-[50px]'/>
                    <p className="bg-black text-white px-1 py-1 text-xs">{post.type}</p>
                  </div>
                  <p>Amélia Leurent</p>
                  <p>{post.title}</p>
                  <button className="flex">
                      Ler mais
                      <ArrowUpRight />
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </section>
      <footer className="w-full h-[40vh] bg-black mt-20">

      </footer>
    </div>
  );
}
