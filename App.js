import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Main from './src/navigation/main';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); 

function App() {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
}

export default App;