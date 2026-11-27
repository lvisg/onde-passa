import { StyleSheet, View, Text, Image, Pressable} from "react-native";
import formatarNota from "../utils/formatacao";
export default function CartaoFilme({titulo, ano, nota, poster, onSelecionar}) {
  return (
    <Pressable onPress={onSelecionar} style={styles.container}>
      {poster? <Image source={{uri:poster}} style={{width: 70, height: 105, borderRadius:10}}></Image>:<View style={styles.semPoster}><Text style={styles.textoSemPoster}>Sem pôster</Text></View> }
      
      <View style={styles.info}>
        <Text numberOfLines={2} style={styles.titulo}>{titulo}</Text>
        {ano!=null && <Text style={styles.detalhes}>{ano}</Text>}
        <Text style={styles.detalhes}>{formatarNota(nota)}</Text>
      </View>

    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop:10,
    paddingHorizontal: 16
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center'
  },
   semPoster: {
    backgroundColor: '#4e4e4e',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70, 
    height: 105,
    borderRadius:10
  },
  textoSemPoster: {
    color: '#d0d0d0',
    fontSize: 12,
    textAlign: 'center',
  },  
  titulo: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
    },
  detalhes: {
    color: '#b4b4b4',
    fontSize: 14,
    marginTop: 4
  }
    
})

