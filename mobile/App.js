import { StyleSheet } from 'react-native';
import Cabecalho from './src/components/Cabecalho';
import Creditos from './src/components/Creditos';
import {
SafeAreaProvider,
SafeAreaView,
} from 'react-native-safe-area-context'

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Cabecalho></Cabecalho>
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
    }
});
