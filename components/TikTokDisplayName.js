
import React, { useState, useRef } from "react";
import { Text, StyleSheet, SafeAreaView, Button, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { productionDomain } from "../networking/api_variables";
const {authToken} = require('../');
const uploadTikTokUsername = async (username) => {
    await new Promise((resolve, reject) => {
        fetch(`${productionDomain}/users`, {
            method: 'Put',
            headers: {
                'Content-Type' : 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${authToken}`
            }, 
            body: JSON.stringify({
                display_name: username
            })
        })
        .then((response) => {
            if(!response.ok) {                
                reject(`Status code error ${response.status}`);
            } else {
                // console.log(response);
                resolve();
            }
        })
        .catch((error) => {
            reject(error);
            console.error(error);
        });
    });
};

const TikTokDisplayName = ({navigation}) => {
    const [username, setUsername] = useState('');
    return (
        <>
            <SafeAreaView></SafeAreaView>
            {/* <View> */}
            <View style={{backgroundColor: 'white', flexDirection: 'column', paddingTop: '40%', flex: 1}}>
                <Text style={{marginLeft: 35, marginRight: 39, fontFamily: 'Roboto-Regular', fontSize: 18, fontWeight: '500'}}>
                What’s your tiktok username? 
                </Text>
                <View style={{marginTop: 2}}></View>
                <Text style={{marginLeft: 35, marginRight: 39, fontFamily: 'Roboto-Regular', fontSize: 12, color: '#BDBDBD'}}>This is how new mutuals will find you!</Text>
                <View style={{marginTop: 14}}></View>
            <View style={{backgroundColor: '#F8F8F8', borderRadius: 10, marginHorizontal: 34, width: '85%', alignSelf: 'flex-start'}}>
                <TextInput keyboardType='ascii-capable' style={styles.input} multiline={false} onChangeText={(text) => {
                    setUsername(text);
                }}>
                </TextInput>
                </View>
                <View style={{marginTop: 27}}></View>
                
                <TouchableOpacity style={{backgroundColor: '#16A2EF', alignItems: 'center', borderRadius: 100, alignSelf: 'flex-end', marginRight: 37}} onPress={() => {
                    // if(prompts.length > currentIndex + 1) {
                    //     const prompt = prompts[currentIndex + 1];
                    //     navigation.push('Prompt', {currentIndex: currentIndex+1, prompt: prompt});
                    // } else {
                    //     navigation.navigate('TikTokDisplayName')
                    // }
                    uploadTikTokUsername(username)
                    .then(() => {
                        navigation.navigate('');
                    })
                    .catch((error) => {

                    });
                }}>
                    <Text style={{color: "#FFFFFF",fontSize: 18, fontWeight: '400', fontFamily: 'Roboto-Regular', paddingVertical: 15, paddingHorizontal: 29}}>
                        Next
                    </Text>
                </TouchableOpacity>
            </View>





            {/* </View> */}

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

export default TikTokDisplayName;