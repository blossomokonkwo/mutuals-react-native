import React from 'react';
import {Text, StyleSheet, SafeAreaView, Button, View} from 'react-native';
import PhoneInput from "react-native-phone-number-input";

const PhoneNumberInput = () => {
    return (
        <>  
        <SafeAreaView></SafeAreaView>
        <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>

            <Text>What's your number?</Text>
            <PhoneInput defaultCode="US" defaultValue="347-440-5562"></PhoneInput>


        </View>

        </>

    )
};

const styles = StyleSheet.create({


});

export default PhoneNumberInput;