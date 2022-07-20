import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Boards from '../pages/boards';
import Board from '../pages/board';

const Stack = createNativeStackNavigator();

export default function Main() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Boards" component={Boards} />
        <Stack.Screen name="Board" component={Board} />
      </Stack.Navigator>
  );
}