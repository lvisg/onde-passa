import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Carregando from "./Carregando";
import Provedores from "./Provedores";
import backEndClient from "../utils/backendClient";
import formatarNota, { formatarDuracao } from "../utils/formatacao";

export default function DetalhesFilme({id, onVoltar}) {
  const [filme, setFilme] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    async function carregar(){
      setCarregando(true)
      setErro(null)
      try{
        const result = await backEndClient.get('/filme', {
          params: {
            id: id
          }
        })
        setFilme(result.data)
        setCarregando(false)
      }catch(error){
        console.log(error)
        setCarregando(false)
        setErro(error.response?.data?.mensagem || "Não foi possível carregar os detalhes.")
      }
    }

    carregar()
  }, [id])

  const informacoes = filme != null ?
    [filme.ano, formatarDuracao(filme.duracao), ...filme.generos].filter((info) => info).join(' · ')
  : ''

  const disponivel = filme != null &&
    filme.ondeAssistir.assinatura.length + filme.ondeAssistir.aluguel.length + filme.ondeAssistir.compra.length > 0

  return (
    <View style={styles.container}>
      <Pressable onPress={onVoltar} style={styles.voltar}>
        <Text style={styles.textoVoltar}>‹ Voltar</Text>
      </Pressable>

      {carregando ?
        <Carregando mensagem='Carregando os detalhes...'></Carregando>
      : erro != null ?
        <Text style={styles.erro}>{erro}</Text>
      :
        <ScrollView>
          {filme.fundo ? <Image source={{uri: filme.fundo}} style={styles.fundo}></Image> : null}

          {filme.poster ?
            <Image source={{uri: filme.poster}} style={styles.poster}></Image>
          :
            <View style={[styles.poster, styles.semPoster]}><Text style={styles.textoSemPoster}>Sem pôster</Text></View>
          }

          <Text style={styles.titulo}>{filme.titulo}</Text>
          {informacoes != '' && <Text style={styles.detalhes}>{informacoes}</Text>}
          <Text style={styles.detalhes}>{formatarNota(filme.nota)}</Text>

          <Text style={styles.secao}>Sinopse</Text>
          <Text style={styles.detalhes}>{filme.sinopse != null ? filme.sinopse : 'Sinopse indisponível'}</Text>

          <Text style={styles.secao}>Onde assistir no Brasil</Text>
          {disponivel ?
            <>
              <Provedores titulo='Assinatura' provedores={filme.ondeAssistir.assinatura}></Provedores>
              <Provedores titulo='Aluguel' provedores={filme.ondeAssistir.aluguel}></Provedores>
              <Provedores titulo='Compra' provedores={filme.ondeAssistir.compra}></Provedores>
            </>
          :
            <Text style={styles.detalhes}>Este filme não está disponível em nenhum serviço no Brasil no momento.</Text>
          }
          <Text style={styles.justWatch}>Dados de disponibilidade: JustWatch</Text>
        </ScrollView>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16
  },
  voltar: {
    paddingVertical: 8
  },
  textoVoltar: {
    color: '#D62F3A',
    fontSize: 16,
    fontWeight: 'bold'
  },
  fundo: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 12
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 10,
    marginBottom: 12
  },
  semPoster: {
    backgroundColor: '#4e4e4e',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textoSemPoster: {
    color: '#d0d0d0',
    fontSize: 12,
    textAlign: 'center'
  },
  titulo: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold'
  },
  detalhes: {
    color: '#b4b4b4',
    fontSize: 14,
    marginTop: 6
  },
  secao: {
    color: '#D62F3A',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20
  },
  justWatch: {
    color: '#838383',
    fontSize: 11,
    fontStyle: 'italic',
    marginTop: 16,
    marginBottom: 12
  },
  erro: {
    color: '#D62F3A',
    textAlign: 'center'
  }
})
