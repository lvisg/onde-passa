require('dotenv').config()
const axios = require('axios')
const cors = require('cors')
const express = require('express')
const app =express()
const tmdbClient = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`
    },
    params:{
        language: 'pt-BR'
    }
})
app.use(cors())
app.use(express.json())

const simplificarFilme=(filme)=>{
    const simplificado={
        'id': filme.id,
        'titulo': filme.title,
        'ano': filme.release_date? filme.release_date.substring(0,4):null,
        'nota': Math.round(filme.vote_average * 10) / 10,
        'poster':filme.poster_path? `https://image.tmdb.org/t/p/w342${filme.poster_path}` : null
    }
    return simplificado
}
const simplificarProvedores=(lista)=>{
    if (!lista) return []
    return lista.map((f)=>({
        'nome': f.provider_name,
        'logo': `https://image.tmdb.org/t/p/w92${f.logo_path}`}))
}

app.get('/', (req,res)=>{
    return res.json({"app": "OndePassa", "status": "online"})
})
app.get('/em-alta', async (req,res)=>{
    try{
        const result = await tmdbClient.get('/trending/movie/week')
        const filmes = result.data.results.map(simplificarFilme)
        res.json(filmes)
    }catch(error){
        console.log(error)
        return res.status(502).json({"mensagem": "Não foi possível consultar o catálogo de filmes."})
    }
    
})
app.get('/filmes', async (req,res)=>{
    try{
        const busca = req.query.busca
        const termo = busca?.trim();
        if(!termo) return res.status(400).json({ mensagem: 'Informe o título de um filme.' })
        console.log(`Busca: ${termo}`)
        const result = await tmdbClient.get('/search/movie',{
            params: {
                query : termo,
                include_adult : false
            }
        })
        const filmes = result.data.results.map(simplificarFilme)
        res.json(filmes)
    }catch(error){
        console.log(error)
        return res.status(502).json({"mensagem": "Não foi possível consultar o catálogo de filmes."})
    }
    
})
app.get('/filme', async (req,res)=>{
    try{
        const id=req.query.id
        if(!id) return res.status(400).json({ "mensagem": "Informe o id do filme." })
        const result = await tmdbClient(`/movie/${id}`,{
            params:{
                append_to_response : 'watch/providers'
            }
        })
        const providers = result.data['watch/providers']?.results?.BR
        const filme =  {...simplificarFilme(result.data),
            'duracao': result.data.runtime || null,
            'generos': result.data.genres.map((i)=>i.name),
            'sinopse': result.data.overview? result.data.overview:null,
            'fundo':result.data.backdrop_path? `https://image.tmdb.org/t/p/w780${result.data.backdrop_path}` : null,
            'ondeAssistir':{
                'assinatura': simplificarProvedores(providers?.flatrate),
                'aluguel':simplificarProvedores(providers?.rent),
                'compra': simplificarProvedores(providers?.buy)
            }
        }
        res.json(filme)
    }catch(error){
        if(error.response?.status === 404) return res.status(404).json({"mensagem": "Filme não encontrado."})
        console.log(error)
        return res.status(502).json({"mensagem": "Não foi possível consultar o catálogo de filmes."})
    }    

})
const port = 3000
app.listen(port, () => {
  console.log(`Backend do OndePassa no ar. Porta: ${port}.`)
})
