import { StyleSheet, Text, View } from 'react-native';
import AppLoading from "expo-app-loading";
import { useFonts } from 'expo-font';
import RootStack from './navigation/RootStack';



export default function App() {
  
  let loadedFonts = useFonts({
  "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf")
});

if (!loadedFonts) {
  return <AppLoading />
}
  return (
   <RootStack />
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
