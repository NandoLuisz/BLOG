import HeaderAllPosts from "@/components/header-all-posts"
import MostPopularPost from '@/components/most-popular-post'
import MainIntroPosts from "@/components/main-intro-posts"

import data from "../../data.json"

import Footer from "@/components/footer"
import CardPost from "@/components/card-post"

export default function Home() {
  return (
    <div className='w-full min-h-screen font-poppins'>
      <HeaderAllPosts />
      <MainIntroPosts />
      <section className='w-full flex flex-col items-center'>
        <MostPopularPost />
        <div className="w-full flex gap-6 justify-center my-10 ">
          <span>Todos</span>
          <span>Tecnologia</span>
          <span>Startup</span>
          <span>Lifestyle</span>
        </div>
        <div className="w-[78%] grid grid-cols-4 gap-5">
          {data.map((post, index) => 
            index === 0 ? (
              null
            ) : (
              <CardPost 
                key={index}
                id={index} 
                imagePost={post.imagePost} 
                imageProfile={post.imageProfile} 
                type={post.type} 
                creator="Marcos Rich" 
                title={post.title}/>
            )
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
