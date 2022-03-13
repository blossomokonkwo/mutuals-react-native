import React, { useState, useRef, useContext } from "react";
import { Text, StyleSheet, SafeAreaView, Button, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Keychain from 'react-native-keychain';
import DiscoverFeed from "./DiscoverFeed";
import { productionDomain } from '../networking/api_variables';
const Stack = createNativeStackNavigator();
import { UserAuthContext } from '../context';

const DiscoverFeedStackScreen = (props) => {
    const dispatch = useContext(UserAuthContext);
    return (
        <Stack.Navigator>
            <Stack.Screen name="DiscoverFeed" component={DiscoverFeed} options={{
                headerTitle: 'Discover', headerRight: () => (
                    <TouchableOpacity onPress={async () => {
                        const credential = await Keychain.resetInternetCredentials(productionDomain);
                        dispatch({ type: 'SIGN_OUT' })
                    }}>
                        <Text style={{ color: '#057AE7', fontSize: 17 }}>Sign out</Text>

                    </TouchableOpacity>
                )
            }}></Stack.Screen>
        </Stack.Navigator>
    );
};

export default DiscoverFeedStackScreen;