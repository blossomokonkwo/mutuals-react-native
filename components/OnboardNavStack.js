import React, { useEffect } from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboard1 from './Onboard1.js';
import Onboard2 from './Onboard2.js';
import Onboard3 from './Onboard3.js';
import Prompt from './Prompt.js';
import PhoneNumberInput from './PhoneNumberInput.js';
import Verification from './Verification.js';
import TikTokDisplayName from './TikTokDisplayName.js';
const Stack = createNativeStackNavigator();
import getPrompts from '../networking/prompts';
import { OnboardingContext } from '../context'
import { productionDomain } from "../networking/api_variables";


export default OnboardNavStack = () => {
    const [prompts, setPrompts] = useState(null);

    useEffect(() => {
        fetch(`${productionDomain}/prompts`, {
            method: 'Get',
            headers: {
                accpet: 'application/json'
            }
        }).then(async (response) => {
            if (response.ok) {
                const data = await response.json();
                setPrompts(data);
            } else {
                setPrompts(null);
            }
        })
    }, [])

    return (
        <NavigationContainer>
            <OnboardingContext.Provider value={prompts}>
                <Stack.Navigator initialRouteName="Onboard1" >
                    <Stack.Screen name="Onboard1" component={Onboard1} options={{ headerTitle: '', headerShown: true, headerBackVisible: false, headerShadowVisible: false, headerStyle: { color: 'white' } }}></Stack.Screen>
                    <Stack.Screen name="Onboard2" component={Onboard2} options={{ headerTitle: '', headerShown: true, headerBackVisible: true, headerTintColor: 'black', headerShadowVisible: false, headerStyle: { color: 'white' } }}></Stack.Screen>
                    <Stack.Screen name="PhoneNumberInput" component={PhoneNumberInput} options={{ headerTitle: 'Sign up', headerShow: false, headerBackVisible: true, headerTintColor: 'black', headerShadowVisible: false, headerStyle: { color: 'white' } }}></Stack.Screen>
                    <Stack.Screen name="Verification" component={Verification} options={{ headerTitle: 'Sign up', headerShow: false, headerBackVisible: true, headerBackTitle: '', headerShadowVisible: false, headerTintColor: 'black', headerStyle: { color: 'white' } }}></Stack.Screen>
                    {
                        prompts ? (
                            <>
                                <Stack.Screen name="Onboard3" component={Onboard3} options={{ headerTitle: 'Set up your profile', headerShow: false, headerBackVisible: true, headerBackTitle: '', headerShadowVisible: false, headerTintColor: 'black', headerStyle: { color: 'white' } }}></Stack.Screen>
                                <Stack.Screen name="Prompt" component={Prompt} options={{ headerTitle: 'Set up your profile', headerShow: false, headerBackVisible: true, headerBackTitle: '', headerShadowVisible: false, headerTintColor: 'black', headerStyle: { color: 'white' } }}></Stack.Screen>
                            </>

                        ) : (null)
                    }
                    <Stack.Screen name="TikTokDisplayName" component={TikTokDisplayName} options={{ headerTitle: 'Set up your profile', headerShow: false, headerBackTitle: '', headerBackVisible: false, headerTintColor: 'black', headerShadowVisible: false, headerStyle: { color: 'white' } }}></Stack.Screen>
                </Stack.Navigator>
            </OnboardingContext.Provider>
        </NavigationContainer >
    )
};

