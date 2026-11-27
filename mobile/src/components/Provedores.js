import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Provedores({titulo, provedores}) {
  if(provedores.length == 0){
    return null
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
      <ScrollView horizontal>
        {provedores.map((provedor) => (
          <View key={provedor.nome} style={styles.item}>
            <Image source={{uri: provedor.logo}} style={styles.logo}></Image>
            <Text numberOfLines={2} style={styles.nome}>{provedor.nome}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12
  },
  titulo: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 8
  },
  item: {
    width: 72,
    alignItems: 'center',
    marginRight: 8
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 10
  },
  nome: {
    color: '#b4b4b4',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 4
  }
})
