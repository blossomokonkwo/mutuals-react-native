import React, { useState, useRef } from "react";
import { Text, StyleSheet, SafeAreaView, Button, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DiscoverFeed from "./DiscoverFeed";
const Stack = createNativeStackNavigator();

const DiscoverFeedStackScreen = () => {
    return (
            <Stack.Navigator>
            <Stack.Screen name="DiscoverFeed" component={DiscoverFeed} options={{headerTitle: 'Discover', headerLargeTitle: true, headerLargeTitleShadowVisible: false, headerShadowVisible: true, headerLargeTitleStyle: {fontFamily: 'Roboto-Bold'}}}></Stack.Screen>
            </Stack.Navigator>
    );
};

export default DiscoverFeedStackScreen;