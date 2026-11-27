import { View, Text, StyleSheet} from "react-native";

export default function Creditos() {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Este produto usa a API do TMDB, mas não é endossado nem certificado pelo TMDB.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center'
    },
    text:{
        fontSize: 8,
        fontWeight: 'bold',
        color:'#838383',
        textAlign: 'center'
    }
})
