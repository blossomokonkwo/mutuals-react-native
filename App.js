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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Keychain from 'react-native-keychain';
import MainTabBar from './components/MainTabBar.js';
import { productionDomain } from './networking/api_variables.js';
import SplashScreen from './components/SplashScreen.js';
const Stack = createNativeStackNavigator();



const App = () => {
  const [state, dispatch] = React.useReducer((prevState, action) => {
    switch (action.type) {
      case 'RESTORE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false
        }
        break;
      case 'SIGN_IN':
        return {
          ...prevState,
          isSignOut: false,
          userToken: action.token
        }
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignOut: true,
            userToken: null
          }
  
      default:
        break;
    }
  }, {isLoading: true, isSignOut: true, userToken: null});

  React.useEffect(() => {
    const fetchToken = async () => {
      let userToken;
      try {
        userToken = await Keychain.getInternetCredentials(productionDomain);
      } catch (error) {
        // Restoring token failed
      }
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };
    fetchToken();
  }, []);

  const authContext = React.useMemo(() => ({
    signIn: async (data) => {

    },
    signOut: () => {

    },
    signup: () => {

    }
  }))

  if (state.isLoading) {
    return <SplashScreen></SplashScreen>
  } else if (state.userToken == null) {
    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Onboard1">
            <Stack.Screen name="Onboard1" component={Onboard1} options={{ headerTitle: '', headerShown: true, headerBackVisible: false, headerShadowVisible: false, headerStyle: { color: 'white' } }}></Stack.Screen>
            <Stack.Screen name="Onboard2" component={Onboard2} options={{ headerTitle: '', headerShown: true, headerBackVisible: true, headerTintColor: 'black', headerShadowVisible: false, headerStyle: { color: 'white' } }}></Stack.Screen>
            <Stack.Screen name="PhoneNumberInput" component={PhoneNumberInput} options={{headerTitle: 'Sign up', headerShow: false, headerBackVisible: true, headerTintColor: 'black', headerShadowVisible: false, headerStyle: {color: 'white'}}}></Stack.Screen>
            <Stack.Screen name="Verification" component={Verification} options={{headerTitle: 'Sign up', headerShow: false, headerBackVisible: true, headerBackTitle: '', headerShadowVisible: false, headerTintColor: 'black', headerStyle: {color: 'white'}}}></Stack.Screen>
            <Stack.Screen name="Onboard3" component={Onboard3} options={{headerTitle: 'Set up your profile', headerShow: false, headerBackVisible: true, headerBackTitle: '', headerShadowVisible: false, headerTintColor: 'black', headerStyle: {color: 'white'}}}></Stack.Screen>
            <Stack.Screen name="Prompt" component={Prompt} options={{headerTitle: 'Set up your profile', headerShow: false, headerBackVisible: true, headerBackTitle: '', headerShadowVisible: false, headerTintColor: 'black', headerStyle: {color: 'white'}}}></Stack.Screen>
            <Stack.Screen name="TikTokDisplayName" component={TikTokDisplayName} options={{headerTitle: 'Set up your profile', headerShow: false, headerBackTitle: '', headerBackVisible: false, headerTintColor: 'black', headerShadowVisible: false, headerStyle: {color: 'white'}}}></Stack.Screen>
          </Stack.Navigator>
            {/* <Stack.Screen name="MainTabBar" component={MainTabBar} options={{headerTitle: '', headerShow: false, headerBackTitle: '', headerBackVisible: false, headerShadowVisible: false, headerStyle: {color: 'white'}}}></Stack.Screen> */}
        </NavigationContainer>
    );
  } else {
    return <MainTabBar></MainTabBar>
  };
};

export default App;

