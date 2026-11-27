export const formatarNota = (nota)=>{
    if(nota == 0 || nota == null){
        return "Sem nota"
    }
    nota=nota.toLocaleString('pt-BR', {minimumFractionDigits: 1,
        maximumFractionDigits: 1})
    return `★ ${nota}`
}
export default formatarNota