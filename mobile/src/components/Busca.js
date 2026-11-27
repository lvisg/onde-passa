import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Busca({termo, buscando, onTermoAlterado, onLimpar}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.campo}
        value={termo}
        onChangeText={onTermoAlterado}
        placeholder="Digite o título de um filme"
        placeholderTextColor="#838383" />
      {buscando ? <ActivityIndicator size='small' color='#D62F3A' style={styles.indicador}></ActivityIndicator> : null}
      {termo !== '' ?
        <Pressable onPress={onLimpar} style={styles.limpar}>
          <Text style={styles.textoLimpar}>✕</Text>
        </Pressable>
      : null}
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
  indicador: {
    marginLeft: 10
  },
  limpar: {
    paddingHorizontal: 10
  },
  textoLimpar: {
    color: '#b4b4b4',
    fontSize: 18
  }
})
