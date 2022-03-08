import React, { useState, useRef } from "react";
import { Text, StyleSheet, SafeAreaView, Button, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';


const postAnswerToPrompt = async (answer, promptId) => {
    await new Promise((resolve, reject) => {

    });
};

const {prompts} = require('../prompts');
const Prompt = ({route, navigation}) => {
    const [answer, setAnswer] = useState('');
    const { prompt, currentIndex} = route.params;
    return (
        <>
            <SafeAreaView></SafeAreaView>
            <ScrollView style={{backgroundColor: 'white'}}>
            <View style={{backgroundColor: 'white', flexDirection: 'column', paddingTop: '40%', flex: 1}}>
                <Text style={{marginLeft: 35, marginRight: 39, fontFamily: 'Roboto-Regular', fontSize: 18, fontWeight: '500'}}>
                {prompt['header']}
                </Text>
                <View style={{marginTop: 2}}></View>
                <Text style={{marginLeft: 35, marginRight: 39, fontFamily: 'Roboto-Regular', fontSize: 12, color: '#BDBDBD'}}>{prompt['subtitle']}</Text>
                <View style={{marginTop: 14}}></View>
            <View style={{backgroundColor: '#F8F8F8', borderRadius: 10, marginHorizontal: 34, width: '85%', alignSelf: 'flex-start'}}>
                <TextInput keyboardType='ascii-capable' style={styles.input} multiline={true} onChangeText={(text) => {
                    setAnswer(text);
                }}>
                </TextInput>
                </View>
                <View style={{marginTop: 27}}></View>
                
                <TouchableOpacity style={{backgroundColor: '#16A2EF', alignItems: 'center', borderRadius: 100, alignSelf: 'flex-end', marginRight: 37}} onPress={() => {
                    if(prompts.length > currentIndex + 1) {
                        const prompt = prompts[currentIndex + 1];
                        navigation.push('Prompt', {currentIndex: currentIndex+1, prompt: prompt});
                    } else {
                        navigation.navigate('TikTokDisplayName')
                    }
                }}>
                    <Text style={{color: "#FFFFFF",fontSize: 18, fontWeight: '400', fontFamily: 'Roboto-Regular', paddingVertical: 15, paddingHorizontal: 29}}>
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