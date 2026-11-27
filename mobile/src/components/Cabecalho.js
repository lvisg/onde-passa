import { StyleSheet, Text, View } from 'react-native'; 


export default function Cabecalho() {
  return (
    <View style={styles.container}>
      <Text
      style={styles.titulo}>🍿 OndePassa</Text>
      <Text
      style={styles.subtitulo}>Descubra onde assistir qualquer filme</Text>
    </View>
    
  )
}

const styles = StyleSheet.create({
    container:{
      paddingTop: 2,
      alignItems: 'center'
    },
    titulo:{
      fontSize: 28,
      fontWeight: 'bold',
      color:'#D62F3A',
      textAlign: 'center'
    },
    subtitulo:{
      fontSize:14,
      color:'#b4b4b4',
      textAlign: 'center'
    }
})
