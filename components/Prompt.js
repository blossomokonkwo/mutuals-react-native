import React, { useState, useRef, createContext, useContext } from "react";
import { Text, StyleSheet, SafeAreaView, Button, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import CurrentUser from "../data/models/CurrentUser";
import { productionDomain } from "../networking/api_variables";
import { OnboardingContext, UserAuthContext } from '../context';
import * as Keychain from 'react-native-keychain';
import { Settings } from "react-native";

const postAnswerToPrompt = async (answer, promptId) => {
    const credential = await Keychain.getInternetCredentials(productionDomain);
    const password = credential.password;
    return new Promise((resolve, reject) => {
        fetch(`${productionDomain}/prompts/${promptId}/answers`, {
            method: 'Post',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${password}`
            },
            body: JSON.stringify({
                answer: answer,
                prompt_id: promptId
            })
        })
            .then((response) => {
                if (response.ok) {
                    resolve();
                } else {
                    reject(`Status error ${response.status}`);
                }
            })
            .catch((error) => {
                reject(error);
            })
    });
};

const Prompt = ({ route, navigation }) => {
    const [answer, setAnswer] = useState('');
    const { prompt, currentIndex } = route.params;
    const prompts = useContext(OnboardingContext);
    return (
        <>
            <SafeAreaView></SafeAreaView>
            <ScrollView style={{ backgroundColor: 'white' }}>
                <View style={{ backgroundColor: 'white', flexDirection: 'column', paddingTop: '40%', flex: 1 }}>
                    <Text style={{ marginLeft: 35, marginRight: 39, fontFamily: 'Roboto-Regular', fontSize: 18, fontWeight: '500' }}>
                        {prompt['title']}
                    </Text>
                    {
                        prompt['subtitle'] ? (
                            <View style={{ marginTop: 2 }}>
                                <Text style={{ marginLeft: 35, marginRight: 39, fontFamily: 'Roboto-Regular', fontSize: 12, color: '#BDBDBD' }}>{prompt['subtitle']}</Text>
                            </View>

                        ) : (null)
                    }
                    <View style={{ marginTop: 14 }}></View>
                    <View style={{ backgroundColor: '#F8F8F8', borderRadius: 10, marginHorizontal: 34, paddingTop: 12, width: '85%', alignSelf: 'flex-start' }}>
                        <TextInput keyboardType='ascii-capable' style={styles.input} multiline={true} onChangeText={(text) => {
                            setAnswer(text);
                        }}>
                        </TextInput>
                    </View>
                    <View style={{ marginTop: 27 }}></View>

                    <TouchableOpacity style={{ backgroundColor: '#16A2EF', alignItems: 'center', borderRadius: 100, alignSelf: 'flex-end', marginRight: 37 }} onPress={() => {
                        const prompt = prompts[currentIndex];
                        postAnswerToPrompt(answer, prompt.id)
                            .then(() => {
                                if (prompts.length > currentIndex + 1) {
                                    const prompt = prompts[currentIndex + 1];
                                    navigation.push('Prompt', { currentIndex: currentIndex + 1, prompt: prompt });
                                } else {
                                    Settings.set({ "completed_onboarding": true });
                                    navigation.navigate('TikTokDisplayName')
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    }}>
                        <Text style={{ color: "#FFFFFF", fontSize: 18, fontWeight: '400', fontFamily: 'Roboto-Regular', paddingVertical: 15, paddingHorizontal: 29 }}>
                            Next
                    </Text>
                    </TouchableOpacity>
                    <SafeAreaView></SafeAreaView>
                </View>
            </ScrollView>

        </>
    );
};
const styles = StyleSheet.create({
    input: {
        maxWidth: '80%',
        fontSize: 16,
        padding: 20,
        fontFamily: 'Roboto-Regular',
    }



});

export default Prompt;