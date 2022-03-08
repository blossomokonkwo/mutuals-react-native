import React, { useState, useRef } from "react";
import { Text, StyleSheet, SafeAreaView, Button, View, TouchableOpacity, TextInput } from 'react-native';
import { productioDomain } from "../networking/api_variables";

const sendToken = async (token, phoneNumber) => {
    await new Promise((resolve, reject) => {
        fetch(`${productioDomain}/signup/send-token`, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json'
            },
            body: JSON.stringify({
                phone_number: phoneNumber,
                token: token
            })
        })
        .then((response) => {
            if(response.ok) {
                resolve();
            } else {
                reject(`Status error ${response.status}`);
            }
        })
        .catch((error) => {
            reject(error);
        });
    });
};

const Verification = ({route, navigation}) => {
    const [token, setToken] = useState('');
    const {phoneNumber} = route.params;
    return (
        <>
            <SafeAreaView></SafeAreaView>
            <View style={{backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flex: 1}}>

            <View style={{alignSelf: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row', flexWrap: true}}>
            <Text style={{fontSize: 20, fontWeight: '500', marginLeft: 34, fontFamily: 'Roboto-Regular', color: "#000000"}}>Verify your number</Text>
            </View>
            <View style={{marginTop: 10}}></View>
            <View style={{backgroundColor: '#F8F8F8', borderRadius: 10, marginHorizontal: 34, width: '85%', alignSelf: 'flex-start'}}>
            <TextInput keyboardType='number-pad' style={styles.input} multiline={false} onChangeText={(text) => {
                setToken(text);
                console.log(token);
            }}></TextInput>
            </View>
            <View style={{marginTop: 27}}></View>
            <TouchableOpacity style={{backgroundColor: '#16A2EF', borderRadius: 100, width: '80%', justifyContent: 'center', alignItems: 'center'}} onPress={() => {
                if(token === '') {
                    return
                }
                sendToken(token, phoneNumber)
                .then(() => {
                    navigation.navigate('Onboard3');
                })
                .catch((error) => {

                });
            }}>
                <Text style={{color: "#FFFFFF", padding: 20, fontSize: 18, fontWeight: '400', paddingVertical: 15, paddingHorizontal: 70}}>verify and sign up</Text>
            </TouchableOpacity>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    input: {
        maxWidth: '80%',  
        fontSize: 16,
        padding: 20   
    }



});

export default Verification;