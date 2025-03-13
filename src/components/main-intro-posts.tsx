export default function MainIntroPosts(){
    return (
        <main className='w-full min-h-[30vh] flex justify-center'>
            <div className='w-full text-center flex flex-col items-center gap-8'>
            <h1 className='text-5xl font-semibold'>Últimos Posts</h1>
            <p className='w-[60%]'>
                Fique por dentro das últimas novidades em tecnologia, startups e lifestyle. 
                Explore conteúdos exclusivos, tendências do mercado e insights valiosos para se manter sempre atualizado!
            </p>
            {/* <div className='w-[500px] shadow-links'>
                <input 
                type="text" 
                placeholder='Entre com seu e-mail'
                className='w-[350px] border-[0.5px] border-black px-4 py-2  outline-none'
                />
                <button className='w-[150px] border-[0.5px] px-4 py-2 border-black cursor-pointer'>Inscrever-se</button>
            </div> */}
            </div>
        </main>
    )
}