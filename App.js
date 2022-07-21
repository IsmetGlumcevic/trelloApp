import React from 'react';
import { Platform, UIManager } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import Main from './src/navigation/main';
import { LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AuthContextProvider from './src/context/AuthContext';

LogBox.ignoreLogs(['Warning: ...']);

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}


function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AuthContextProvider>
          <Main />
        </AuthContextProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;