import React from 'react';
import type {Node} from 'react';
import Onboard1 from './Onboard1.js';
import Onboard2 from './Onboard2.js';
import PhoneNumberInput from './PhoneNumberInput.js';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Button,
  FlatList
} from 'react-native';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <>
    <Onboard1></Onboard1>
  {/* // <NavigationContainer>
  //   <Stack.Navigator>
  //     <Stack.Screen name="Onboard1" component={Onboard1} options={{title: "Home"}}></Stack.Screen>
  //   </Stack.Navigator>
  // </NavigationContainer> */}
  </>
  );

};

export default App;

