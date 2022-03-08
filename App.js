import React from 'react';
import type { Node } from 'react';
import Onboard1 from './Onboard1.js';
import Onboard2 from './Onboard2.js';
import Onboard3 from './components/Onboard3.js';
import Prompt from './components/Prompt.js';
import PhoneNumberInput from './PhoneNumberInput.js';
import Verification from './components/Verification.js';
import TikTokDisplayName from './components/TikTokDisplayName.js';
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
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboard1">
          <Stack.Screen name="Onboard1" component={Onboard1} options={{ headerTitle: '', headerShown: true, headerBackVisible: false, headerShadowVisible: false, headerStyle: { color: 'white' } }}></Stack.Screen>
          <Stack.Screen name="Onboard2" component={Onboard2} options={{ headerTitle: '', headerShown: true, headerBackVisible: true, headerShadowVisible: false, headerStyle: { color: 'white' } }}></Stack.Screen>
          <Stack.Screen name="PhoneNumberInput" component={PhoneNumberInput} options={{headerTitle: 'Sign up', headerShow: false, headerBackVisible: true, headerTintColor: 'black', headerShadowVisible: false, headerStyle: {color: 'white'}}}></Stack.Screen>
          <Stack.Screen name="Verification" component={Verification} options={{headerTitle: 'Sign up', headerShow: false, headerBackVisible: true, headerBackTitle: '', headerShadowVisible: false, headerTintColor: 'black', headerStyle: {color: 'white'}}}></Stack.Screen>
          <Stack.Screen name="Onboard3" component={Onboard3} options={{headerTitle: 'Set up your profile', headerShow: false, headerBackVisible: true, headerBackTitle: '', headerShadowVisible: false, headerTintColor: 'black', headerStyle: {color: 'white'}}}></Stack.Screen>
          <Stack.Screen name="Prompt" component={Prompt} options={{headerTitle: 'Set up your profile', headerShow: false, headerBackVisible: true, headerBackTitle: '', headerShadowVisible: false, headerTintColor: 'black', headerStyle: {color: 'white'}}}></Stack.Screen>
          <Stack.Screen name="TikTokDisplayName" component={TikTokDisplayName} options={{headerTitle: 'Set up your profile', headerShow: false, headerBackTitle: '', headerBackVisible: true, headerTintColor: 'black', headerShadowVisible: false, headerStyle: {color: 'white'}}}></Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );

};

export default App;

