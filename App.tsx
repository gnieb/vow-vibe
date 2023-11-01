import 'react-native-gesture-handler';
import  { StyleSheet } from 'react-native';
import React, { FunctionComponent } from 'react';
import {RootNav} from './navigation/RootNav';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MiniRootNav } from './navigation/RootNav';

const App: React.FC = () => {
  
  return (
      <AuthProvider>
        <Gateway />
      </AuthProvider>
  );
}

const Gateway:FunctionComponent = () => {

  const {authState } = useAuth();
  
  return (

    <>
    {authState?.authenticated ? <RootNav /> : <MiniRootNav />}
    </>

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