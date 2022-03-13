import { Text, StyleSheet, SafeAreaView, Button, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { productionDomain } from "./networking/api_variables";
export const getPrompts = async () => {
   fetch(`${productionDomain}/prompts`, {
      method: 'Get',
      headers: {
         accpet: 'application/json'
      }
   }).then(async (response) => {
      if (response.ok) {
         const data = await response.json();
         return data;
      } else {
         return null;
      }
   })
};