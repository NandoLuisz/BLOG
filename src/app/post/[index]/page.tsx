import HeaderAllPosts from "@/components/header-all-posts"

interface PostParams {
  params: { index: number }
}

import data from "../../../../data.json"
import Footer from "@/components/footer"

export default function Page({ params }: PostParams) {
  const post = data[params.index]
  return (
    <section className="w-full min-h-screen relative">
      <div className="w-full h-[70vh] bg-gray-300 absolute -z-50"></div>
      <HeaderAllPosts />
      <div className="w-full flex flex-col items-center gap-4">
        <div className="flex gap-2">
          <p className="bg-black rounded-xl text-white px-2 py-[0.5px]">{post.type}</p>
          <p className="font-poppins">Outubro 23, 2023</p>
        </div>
        <h1 className="text-5xl font-semibold">{post.title}</h1>
        <img src={post.imageProfile} alt="" className="border-3 border-white rounded-full"/>
        <p className="text-xl font-serif">{post.creator}</p>
        <img src={post.imagePost} alt="" className="w-[60%] border-3 border-white"/>
        <div className="w-[60%]" dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </div>
      <Footer />
    </section>
  )
}
   