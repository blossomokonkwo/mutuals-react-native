import React, { useState, useRef } from "react";
import { Text, StyleSheet, SafeAreaView, Button, View, TouchableOpacity } from 'react-native';
import PhoneInput from "react-native-phone-number-input";
import parsePhoneNumber from 'libphonenumber-js'
const { productionDomain, inProduction } = require('./networking/api_variables.js');

const validatePhoneNumber = (text) => {
    return new Promise((resolve, reject) => {
        fetch(`${productionDomain}/signup/validate`, {
            method: 'Post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phone_number: text
            })
        })
            .then((response) => {
                if (!response.ok) {
                    reject(`Status code error ${response.status}`);
                } else {
                    resolve();
                }
            })
            .catch((error) => {
                reject(error);
                console.error(error);
            });
    });
};

const sendVerificationToken = (text) => {
    return new Promise((resolve, reject) => {
        fetch(`${productionDomain}/signup/send-token`, {
            method: 'Post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phone_number: text
            })
        })
            .then((response) => {
                if (response.ok) {
                    resolve();
                } else {
                    reject(`Status code error ${response.status}`);
                }
            })
            .catch((error) => {
                reject(error);
                console.error(error);
            })
    });
};

const PhoneNumberInput = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [valid, setValid] = useState(false);
    const phoneInput = useRef();
    return (
        <>
            <SafeAreaView></SafeAreaView>
            <View style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flex: 1 }}>
                <View style={{ alignSelf: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row', flexWrap: true }}>
                    <Text style={{ fontSize: 20, fontWeight: '500', marginLeft: 38, fontFamily: 'Roboto-Regular', color: "#000000" }}>What's your number?</Text>
                </View>
                <View style={{ paddingTop: 6 }}></View>
                <PhoneInput ref={phoneInput} defaultCode="US" placeholder="347-440-5562" defaultValue={phoneNumber} style={{ fontSize: 30 }} autoFocus withDarkTheme onChangeFormattedText={(text) => {
                    setPhoneNumber(text);
                }}></PhoneInput>
                <Text style={{ fontSize: 13, marginTop: 20, color: '#828282', textAlign: 'center' }}>By tapping send verification code, you are agreeing to our <Text style={{ color: '#828282', fontFamily: 'Roboto-Regular', fontSize: 13, fontWeight: 'bold' }} onPress={() => {

                }}>Terms of Service</Text> and <Text style={{ color: '#828282', fontFamily: 'Roboto-Regular', fontSize: 13, fontWeight: 'bold' }} onPress={() => {

                }}>Privacy policy</Text></Text>
                <View style={{ paddingTop: 26 }}></View>
                <TouchableOpacity style={{ backgroundColor: '#16A2EF', borderRadius: 100, width: '85%', justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                    if (phoneNumber === "") {
                        return
                    }
                    const isValid = parsePhoneNumber(phoneNumber).isValid();;
                    setValid(isValid);
                    if (isValid) {
                        validatePhoneNumber(phoneNumber)
                            .then(() => {
                                sendVerificationToken(phoneNumber)
                                    .then((response) => {
                                        navigation.navigate('Verification', { phoneNumber: phoneNumber });
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }
                }}>
                    <Text style={{ color: "#FFFFFF", padding: 20, fontSize: 18, fontWeight: '400', paddingVertical: 15, paddingHorizontal: 70 }}>send verification code</Text>
                </TouchableOpacity>


            </View>

        </>

    )
};

const styles = StyleSheet.create({


});

export default PhoneNumberInput;