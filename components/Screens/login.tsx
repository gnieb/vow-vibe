import { StatusBar } from 'expo-status-bar';
import { FunctionComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Login:FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <Text>LOG IN WILL BE HERE</Text>
      <StatusBar style="auto" />
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

export default Login;