import { ActivityIndicator, StyleSheet, View, Text} from "react-native";

export default function Carregando({mensagem= "Carregando..."}) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color='#D62F3A'>
      </ActivityIndicator>
      <Text style={styles.texto}>{mensagem}</Text>
    </View>
    
  )
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    texto:{
      color:'#D62F3A'
    }
})
