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
import backEndClient from './src/utils/backendClient'

export default function App() {
  const [emAlta, setEmAlta] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
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
  return (
    

    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Cabecalho></Cabecalho>
        {carregando? <Carregando mensagem='Buscando os filmes em alta...'></Carregando>: erro!=null? <Text style={styles.erro}>{erro}</Text> : <ListaFilmes titulo='Em alta nesta semana' filmes={emAlta}></ListaFilmes>}
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
    }
});
