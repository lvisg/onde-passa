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
  const [mensagemCarregando, setMensagemCarregando] = useState('Buscando os filmes em alta...')
  const [termo, setTermo] = useState('')
  const [termoBuscado, setTermoBuscado] = useState('')
  const [resultados, setResultados] = useState(null)
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

  async function buscar(){
    setMensagemCarregando('Procurando filmes...')
    setCarregando(true)
    try{
      const result = await backEndClient.get('/filmes', {
        params: {
          busca: termo
        }
      })
      setResultados(result.data)
      setTermoBuscado(termo)
      setErro(null)
      setCarregando(false)
    }catch(error){
      console.log(error)
      setCarregando(false)
      setErro(error.response?.data?.mensagem || "Não foi possível buscar os filmes.")
    }
  }

  function limpar(){
    setTermo('')
    setResultados(null)
    setErro(null)
  }

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
              onTermoAlterado={setTermo}
              onBuscar={buscar}
              onLimpar={limpar} />
            {carregando ?
              <Carregando mensagem={mensagemCarregando}></Carregando>
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
    }
});
