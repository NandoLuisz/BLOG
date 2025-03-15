export function DateFormat(date:string){
    const data = new Date(date);
    
    let formatado = new Intl.DateTimeFormat('pt-BR', {
        month: 'long',
        day: '2-digit',
        year: 'numeric'
    }).format(data);
    
    return formatado.charAt(0).toUpperCase() + formatado.slice(1);
}