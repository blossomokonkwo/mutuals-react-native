import React, { useState, useRef, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DiscoverFeedStackScreen from './DiscoverFeedStackScreen';
import ChatRoomFeedStackScreen from "./ChatRoomFeedStackScreen";
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const MainTabBar = () => {
    const setScreenOptions = (route) => {
        return {
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name == 'Discover') {
                    return <MaterialIcon name={focused ? "home" : "home"} color={color} size={size} />
                } else if (route.name == 'Replies') {
                    return <IonIcon name={focused ? "ios-chatbubbles-sharp" : "ios-chatbubbles-outline"} color={color} size={size} />
                }
            },
            tabBarActiveTintColor: 'black',
            tabBarInActiveTintColor: 'gray',
            tabBarShowLabel: true,
        }
    };

    return (
        // <>
        <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => setScreenOptions(route)}>
                <Tab.Screen name="Discover" component={DiscoverFeedStackScreen} options={{ headerTitle: '', headerShadowVisible: false, headerShown: false }}></Tab.Screen>
                <Tab.Screen name="Replies" component={ChatRoomFeedStackScreen} options={{ headerTitle: '', headerShadowVisible: false, headerShown: false }}></Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
        // </>
    );
};

export default MainTabBar;