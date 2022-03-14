import React from 'react';
import { Text, StyleSheet, SafeAreaView, Button, View, TouchableOpacity } from 'react-native';


const Onboard1 = ({ navigation }) => {
    return (
        <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flex: 1, backgroundColor: 'white' }}>
            <Text style={styles.text}>If you’re seeing this, you (and everyone else) have been invited to the private beta by 
                <Text style={{ fontWeight: 'bold', fontFamily: 'Roboto-Bold' }}>nihjea</Text>. 
                🤫 ✉️
            </Text>

            <Text style={styles.text}>We tried to <Text style={{ fontWeight: 'bold', fontFamily: 'Roboto-Bold' }}>match mutuals</Text> with <Text style={{ fontWeight: 'bold', fontFamily: 'Roboto-Bold' }}> google forms</Text> but got way too many submissions
            to keep track of. 😴</Text>


            <Text style={styles.text}>We decided to
                <Text style={{ fontWeight: 'bold', fontFamily: 'Roboto-Bold' }}> create an app </Text> to
                <Text style={{ fontWeight: 'bold', fontFamily: 'Roboto-Bold' }}> automate </Text> that process.
                <Text>{"\n"}Enjoy 🤓💖</Text>
            </Text>

            <View style={{ marginBottom: '40%' }}></View>

            <TouchableOpacity style={styles.button} onPress={() => {
                navigation.navigate('Onboard2')
            }}>
                <Text style={{ color: "#FFFFFF", padding: 20, fontSize: 18, fontWeight: '400', paddingVertical: 15, paddingHorizontal: 70 }}>Enter</Text>
            </TouchableOpacity>

            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 12, justifyContent: 'center', alignContent: 'center', flexDirection: 'row', padding: 10 }}>Enter to begin</Text>
        </SafeAreaView>


    );
};



const styles = StyleSheet.create({
    text: {
        alignSelf: 'flex-start',
        marginTop: 30,
        marginBottom: 5,
        marginHorizontal: 70,
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
        color: '#000000',
        textAlign: 'auto'
    },
    button: {
        backgroundColor: '#16A2EF',
        width: 316,
        height: 60,
        borderRadius: 100,
        alignItems: 'center',
        paddding: 30,
        flexDirection: 'row',
        justifyContent: 'center'
    }



});

export default Onboard1;
