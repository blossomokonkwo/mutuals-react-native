import React from 'react';
import { Text, StyleSheet, SafeAreaView, Button, View, TouchableOpacity, Image } from 'react-native';
const {prompts} = require('../prompts');
const Onboard3 = ({navigation}) => {
    return (
        <>
            <SafeAreaView></SafeAreaView>
            <View style={{ backgroundColor: 'white', flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                <Text style={{marginLeft: 48, marginRight: 77, fontFamily: 'Roboto-Regular', fontSize: 20, fontWeight: '500'}}>Answer these questions to help us find people just like you. 🤞 </Text>
                <View style={{marginTop: 2}}></View>
                <Text style={{marginLeft: 48, marginRight: 77, fontFamily: 'Roboto-Regular', fontSize: 12, color: '#BDBDBD'}}>These are scientifically engineered to reveal the true you. Answer truthfully.</Text>
                <View style={{marginTop: 14}}></View>
                <Image source={require('../assets/images/onboardmeme1.png')} style={{marginLeft: 48}}></Image>
                <View style={{marginTop: 50}}></View>
                <TouchableOpacity style={{backgroundColor: '#16A2EF',alignItems: 'center', borderRadius: 100, alignSelf: 'flex-end', marginRight: 37}} onPress={() => {
                    navigation.navigate('Prompt', {currentIndex: 0, prompt: prompts[0]});
                }}>
                    <Text style={{color: "#FFFFFF",fontSize: 18, fontWeight: '400', fontFamily: 'Roboto-Regular', paddingVertical: 15, paddingHorizontal: 35}}>
                        Start Answering
                    </Text>
                </TouchableOpacity>
            </View>

        </>
    );
}

export default Onboard3;