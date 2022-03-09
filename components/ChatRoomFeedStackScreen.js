import React, { useState, useRef } from "react";
import { Text, StyleSheet, SafeAreaView, Button, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import ChatRoomFeed from "./ChatRoomFeed";

const ChatRoomFeedStackScreen = () => {
    return (
            <Stack.Navigator>
            <Stack.Screen name="ChatRoomFeed" component={ChatRoomFeed} options={{headerLargeTitle: true, headerTitle: 'Messages', headerLargeTitleShadowVisible: false, headerLargeTitleStyle: {fontFamily: 'Roboto-Bold'}}}></Stack.Screen>
            </Stack.Navigator>
    );
};

export default ChatRoomFeedStackScreen;