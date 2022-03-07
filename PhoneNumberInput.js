import React from 'react';
import {Text, StyleSheet, SafeAreaView, Button, View, TouchableOpacity} from 'react-native';
import PhoneInput from "react-native-phone-number-input";

const PhoneNumberInput = () => {
    return (
        <>  
        <SafeAreaView></SafeAreaView>
        <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flex: 1}}>

            <Text style={{fontSize: 24, fontWeight: '500'}}>What's your number?</Text>
            <View style={{paddingTop: 50}}></View>
            <PhoneInput defaultCode="US" placeholder="347-440-5562" style={{fontSize: 30}}></PhoneInput>
            <Text style={{fontSize: 13, paddingTop: 20}}>By pressing next you agree to our</Text>
            <View style={{paddingTop: 39}}></View>
            <TouchableOpacity style={{backgroundColor: '#16A2EF', borderRadius: 100, width: '50%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: "#FFFFFF", padding: 20, fontSize: 20, fontWeight: '400'}}>Next</Text>
            </TouchableOpacity>


        </View>

        </>

    )
};

const styles = StyleSheet.create({


});

export default PhoneNumberInput;