import { useEffect, useState } from 'react'; 
import { StyleSheet, Text } from 'react-native';
import Cabecalho from './src/components/Cabecalho';
import Creditos from './src/components/Creditos';
import {
SafeAreaProvider,
SafeAreaView,
} from 'react-native-safe-area-context'
import Carregando from './src/components/Carregando';
import ListaFilmes from './src/components/ListaFilmes';
import Busca from './src/components/Busca';
import DetalhesFilme from './src/components/DetalhesFilme';
import backEndClient from './src/utils/backendClient'

export default function App() {
  const [emAlta, setEmAlta] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [termo, setTermo] = useState('')
  const [termoBuscado, setTermoBuscado] = useState('')
  const [resultados, setResultados] = useState(null)
  const [buscando, setBuscando] = useState(false)
  const [filmeSelecionado, setFilmeSelecionado] = useState(null)
  useEffect(()  => {
    async function carregar(){
      try{
      const result = await backEndClient.get('/em-alta')
      setEmAlta(result.data)
      setCarregando(false)
    }catch(error){
      console.log(error)
      setCarregando(false)
      setErro("Não foi possível carregar os filmes. Verifique se o backend está no ar.")
    }
    }
    
    carregar()
    }, [])

  useEffect(() => {
    const termoLimpo = termo.trim()

    if(termoLimpo == ''){
      setResultados(null)
      setErro(null)
      return
    }

    if(termoLimpo.length < 3){
      return
    }

    let ativo = true

    const id = setTimeout(async () => {
      setBuscando(true)
      try{
        const result = await backEndClient.get('/filmes', {
          params: {
            busca: termoLimpo
          }
        })
        if(!ativo) return
        setResultados(result.data)
        setTermoBuscado(termoLimpo)
        setErro(null)
        setBuscando(false)
      }catch(error){
        if(!ativo) return
        console.log(error)
        setBuscando(false)
        setErro(error.response?.data?.mensagem || "Não foi possível buscar os filmes.")
      }
    }, 600)

    return () => {
      ativo = false
      clearTimeout(id)
      setBuscando(false)
    }
  }, [termo])

  const termoCurto = termo.trim().length > 0 && termo.trim().length < 3

  return (


    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Cabecalho></Cabecalho>
        {filmeSelecionado != null ?
          <DetalhesFilme id={filmeSelecionado} onVoltar={() => setFilmeSelecionado(null)}></DetalhesFilme>
        :
          <>
            <Busca
              termo={termo}
              buscando={buscando}
              onTermoAlterado={setTermo}
              onLimpar={() => setTermo('')} />
            {termoCurto ? <Text style={styles.dica}>Digite pelo menos 3 letras.</Text> : null}
            {carregando ?
              <Carregando mensagem='Buscando os filmes em alta...'></Carregando>
            : erro != null ?
              <Text style={styles.erro}>{erro}</Text>
            : resultados === null ?
              <ListaFilmes titulo='Em alta nesta semana' filmes={emAlta} onSelecionar={setFilmeSelecionado}></ListaFilmes>
            : resultados.length === 0 ?
              <Text style={styles.aviso}>Nenhum filme encontrado para “{termoBuscado}”.</Text>
            : <ListaFilmes titulo={`Resultados para “${termoBuscado}”`} filmes={resultados} onSelecionar={setFilmeSelecionado}></ListaFilmes>
            }
          </>
        }
        <Creditos></Creditos>
      </SafeAreaView>
    </SafeAreaProvider>

    
  );
  
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#141012',
      justifyContent: 'space-between'
    },
    erro:{
      color:'#D62F3A',
      textAlign: 'center'
    },
    aviso:{
      color:'#b4b4b4',
      textAlign: 'center'
    },
    dica:{
      color:'#838383',
      fontSize: 12,
      paddingHorizontal: 16,
      marginBottom: 8
    }
});
