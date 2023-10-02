import  { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppLoading from "expo-app-loading";
import { useFonts } from 'expo-font';
import RootStack from './navigation/RootStack';



const App: React.FC = () => {
  
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

export default App;