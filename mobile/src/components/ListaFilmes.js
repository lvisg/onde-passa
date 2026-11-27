import { FlatList, View, StyleSheet, Text } from "react-native";
import CartaoFilme from "./CartaoFilme";

export default function ListaFilmes({titulo, filmes, onSelecionar}) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
      <FlatList
        data={filmes}
        keyExtractor={(f) => String(f.id)}
        renderItem={({ item }) => (
          <CartaoFilme
            poster={item.poster}
            titulo={item.titulo}
            ano={item.ano}
            nota={item.nota}
            onSelecionar={() => onSelecionar(item.id)}
          />
        )}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 2,
    flex:1
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D62F3A',
    textAlign: 'center',
    marginBottom:15
  },
})
