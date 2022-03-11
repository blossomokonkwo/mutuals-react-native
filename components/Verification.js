import * as Keychain from 'react-native-keychain';
import React, { useState, useRef } from "react";
import { Text, StyleSheet, SafeAreaView, Button, View, TouchableOpacity, TextInput, Settings } from 'react-native';
import { productionDomain } from "../networking/api_variables";
import SettingsKeys from '../util/settings/SettingsKeys';

const verifyToken = async (token, phoneNumber) => {
    return new Promise((resolve, reject) => {
        fetch(`${productionDomain}/signup/verify`, {
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
                if (response.ok) {
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

const createNewUser = async (phoneNumber) => {
    return new Promise((resolve, reject) => {
        fetch(`${productionDomain}/signup`, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json'
            },
            body: JSON.stringify({
                phone_number: phoneNumber,
            })
        })
            .then(async (response) => {
                if (response.ok) {
                    const data = await response.json();
                    const accessToken = data['access_token'];
                    const id = data['id'];
                    const uuid = data['uuid'];
                    try {
                        const idKey = SettingsKeys.user_id.rawValue;
                        const uuidKey = SettingsKeys.uuid.rawValue;
                        Settings.set({ idKey: id, uuidKey: uuid });
                        await Keychain.resetInternetCredentials(productionDomain);
                        await Keychain.setInternetCredentials(productionDomain, uuid, accessToken, { accessible: Keychain.ACCESSIBLE.AFTER_FIRST_UNLOCK });
                    } catch (error) {
                        reject(error);
                    }
                    resolve(data);
                } else {
                    reject(`Status error ${response.status}`);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const Verification = ({ route, navigation }) => {
    const [token, setToken] = useState('');
    const { phoneNumber } = route.params;
    return (
        <>
            <SafeAreaView></SafeAreaView>
            <View style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flex: 1 }}>

                <View style={{ alignSelf: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row', flexWrap: true }}>
                    <Text style={{ fontSize: 20, fontWeight: '500', marginLeft: 34, fontFamily: 'Roboto-Regular', color: "#000000" }}>Verify your number</Text>
                </View>
                <View style={{ marginTop: 10 }}></View>
                <View style={{ backgroundColor: '#F8F8F8', borderRadius: 10, marginHorizontal: 34, width: '85%', alignSelf: 'flex-start' }}>
                    <TextInput keyboardType='number-pad' style={styles.input} multiline={false} autoFocus={true} onChangeText={(text) => {
                        setToken(text);
                        console.log(token);
                    }}></TextInput>
                </View>
                <View style={{ marginTop: 27 }}></View>
                <TouchableOpacity style={{ backgroundColor: '#16A2EF', borderRadius: 100, width: '80%', justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                    if (token === '') {
                        return
                    }
                    verifyToken(token, phoneNumber)
                        .then(() => {
                            createNewUser(phoneNumber)
                                .then(() => {
                                    navigation.navigate('Onboard3');
                                })
                                .catch((error) => {
                                    console.log(error);
                                })
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }}>
                    <Text style={{ color: "#FFFFFF", padding: 20, fontSize: 18, fontWeight: '400', paddingVertical: 15, paddingHorizontal: 70 }}>verify and sign up</Text>
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