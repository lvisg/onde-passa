export const formatarNota = (nota)=>{
    if(nota == 0 || nota == null){
        return "Sem nota"
    }
    nota=nota.toLocaleString('pt-BR', {minimumFractionDigits: 1,
        maximumFractionDigits: 1})
    return `★ ${nota}`
}
export default formatarNota

export const formatarDuracao = (duracao)=>{
    if(duracao == 0 || duracao == null){
        return null
    }
    const horas = Math.floor(duracao / 60)
    const minutos = duracao % 60
    if(horas == 0){
        return `${minutos}min`
    }
    if(minutos == 0){
        return `${horas}h`
    }
    return `${horas}h ${minutos}min`
}
