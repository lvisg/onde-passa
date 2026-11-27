import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Busca({termo, onTermoAlterado, onBuscar, onLimpar}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.campo}
        value={termo}
        onChangeText={onTermoAlterado}
        placeholder="Digite o título de um filme"
        placeholderTextColor="#838383" />
      {termo !== '' ?
        <Pressable onPress={onLimpar} style={styles.limpar}>
          <Text style={styles.textoLimpar}>✕</Text>
        </Pressable>
      : null}
      <Pressable onPress={onBuscar} style={styles.botao}>
        <Text style={styles.textoBotao}>Buscar</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 8
  },
  campo: {
    flex: 1,
    backgroundColor: '#2a2326',
    color: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  limpar: {
    paddingHorizontal: 10
  },
  textoLimpar: {
    color: '#b4b4b4',
    fontSize: 18
  },
  botao: {
    backgroundColor: '#D62F3A',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginLeft: 6
  },
  textoBotao: {
    color: '#ffffff',
    fontWeight: 'bold'
  }
})
