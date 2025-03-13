import data from "../../data.json"

export default function MostPopularPost(){
    const mostPopularPost = data[1]
    return(
        <div className='w-[80%] px-4 py-4'>
            <div className="w-full -z-10 relative">
                <img src={mostPopularPost.imagePost} alt="" className='w-full border-[0.5px] border-black'/>
                <div className="absolute left-10 top-[660px] flex items-center gap-4">
                    <img src={mostPopularPost.imageProfile} alt="" className="z-10"/>
                    <div>
                        <p className="z-10 text-white text-3xl font-serif">{mostPopularPost.creator}</p>
                        <p className="z-10 text-white text-2xl tracking-tighter">{mostPopularPost.title}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}