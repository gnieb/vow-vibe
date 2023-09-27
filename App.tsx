import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Screens/Home';
import AppLoading from "expo-app-loading";
import { useFonts } from 'expo-font';



export default function App() {
  
  let loadedFonts = useFonts({
  "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf")
});

if (!loadedFonts) {
  return <AppLoading />
}
  return (
    <View style={styles.container}>
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
