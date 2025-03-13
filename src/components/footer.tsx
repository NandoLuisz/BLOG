export default function Footer(){
    return(
        <footer className="w-full h-[50vh] bg-black mt-20 px-16 py-10">
            <h2 className="font-abril-fatface text-white text-4xl mb-10">Vamos começar algo grandioso</h2>
            <div className="w-full flex justify-between text-white mb-10">
                <div>
                    <span className="text-sm opacity-80">Companhia</span>
                    <ul>
                        <li className="cursor-pointer hover:opacity-80">Sobre nós</li>
                        <li className="cursor-pointer hover:opacity-80">Carreiras</li>
                        <li className="cursor-pointer hover:opacity-80">Novas</li>
                        <li className="cursor-pointer hover:opacity-80">Contact</li>
                    </ul>
                </div>
                <div>
                    <span className="text-sm opacity-80">Recursos</span>
                    <ul>
                        <li className="cursor-pointer hover:opacity-80">Blog</li>
                        <li className="cursor-pointer hover:opacity-80">Boletim</li>
                        <li className="cursor-pointer hover:opacity-80">Eventos</li>
                        <li className="cursor-pointer hover:opacity-80">Suporte</li>
                    </ul>
                </div>
                <div>
                    <span className="text-sm opacity-80">Social</span>
                    <ul>
                        <li className="cursor-pointer hover:opacity-80">X</li>
                        <li className="cursor-pointer hover:opacity-80">LinkedIn</li>
                        <li className="cursor-pointer hover:opacity-80">Facebook</li>
                        <li className="cursor-pointer hover:opacity-80">Github</li>
                    </ul>
                </div>
                <div>
                    <span className="text-sm opacity-80">Casos de uso</span>
                    <ul>
                        <li className="cursor-pointer hover:opacity-80">Startups</li>
                        <li className="cursor-pointer hover:opacity-80">Empreendimento</li>
                        <li className="cursor-pointer hover:opacity-80">Governo</li>
                        <li className="cursor-pointer hover:opacity-80">SaaS centro</li>
                    </ul>
                </div>
                <div>
                    <span className="text-sm opacity-80">Jurídica</span>
                    <ul>
                        <li className="cursor-pointer hover:opacity-80">Termos</li>
                        <li className="cursor-pointer hover:opacity-80">Privacidade</li>
                        <li className="cursor-pointer hover:opacity-80">Cookies</li>
                        <li className="cursor-pointer hover:opacity-80">Configurações</li>
                    </ul>
                </div>
            </div>
            <div className="w-full flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                    <span className="text-white">NFL's Blogger</span>
                </div>
                <div className="text-sm text-white">
                    &copy; nfl's blogg {new Date().getFullYear()}. Todos os direitos reservados
                </div>
            </div>
        </footer>
    )
}   