import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Boards from '../pages/boards';
import Board from '../pages/board';
import Login from '../pages/login';
import { AuthContext } from '../context/AuthContext';
import { ActivityIndicator } from 'react-native';

const Stack = createNativeStackNavigator();

export default function Main() {
  const { token } = useContext(AuthContext);

  if (token === undefined) {
    return <ActivityIndicator />;
  }

  return (
    <Stack.Navigator>
      {token ?
        <>
          <Stack.Screen name="Boards" component={Boards} />
          <Stack.Screen name="Board" component={Board} />
        </>
        :
        <Stack.Screen name="Login" component={Login} />
      }
    </Stack.Navigator>
  );
}