import 'react-native-gesture-handler';
import  { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React, { FunctionComponent } from 'react';
import AppLoading from "expo-app-loading";
import { useFonts } from 'expo-font';
// import RootStack from './navigation/RootStack';
import RootNav from './navigation/RootNav';
import { AuthProvider } from './context/AuthContext';



const App: React.FC = () => {
  
  let loadedFonts = useFonts({
  "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf")
});

if (!loadedFonts) {
  return <AppLoading />
}
  return (
      <AuthProvider>
        <RootNav />
      </AuthProvider>
  );
}

const Gateway:FunctionComponent = () => {
  return (
      




  )
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