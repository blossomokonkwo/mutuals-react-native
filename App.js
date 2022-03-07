import React from 'react';
import type {Node} from 'react';
import Onboard1 from './Onboard1.js';
import Onboard2 from './Onboard2.js';
import PhoneNumberInput from './PhoneNumberInput.js';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Button
} from 'react-native';

const App = () => {
  return (
  <>

    <PhoneNumberInput />
  </>
  );

};

export default App;

