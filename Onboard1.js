import React from 'react';
import {Text, StyleSheet, SafeAreaView, Button, View} from 'react-native';


const Onboard1 = () => {
    return (
        <>
        <SafeAreaView ></SafeAreaView>
        <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flex: 1}}>
            <Text style={styles.text}>If you’re seeing this, 
you (and everyone else) have been invited to the private beta by <Text style={{fontWeight: 'bold', fontFamily: 'Roboto-Bold'}}>nihjea</Text>. 🤫 ✉️</Text>

            <Text style={styles.text}>We tried to <Text style={{fontWeight: 'bold', fontFamily: 'Roboto-Bold'}}>match mutuals</Text> with <Text style={{fontWeight: 'bold', fontFamily: 'Roboto-Bold'}}> google forms</Text> but got way too many submissions
            to keep track of. 😴</Text>


        <Text style={styles.text}>We decided to
         <Text style={{fontWeight: 'bold', fontFamily: 'Roboto-Bold'}}> create an app </Text> to 
        <Text style={{fontWeight: 'bold', fontFamily: 'Roboto-Bold'}}> automate </Text> that process. 
        <Text>{"\n"}Enjoy 🤓💖</Text>
         </Text>

         <View style={{paddingBottom: 179}}></View>

        <View style={styles.button}>
        <Button  title="Enter" color='white' onClick= {() => {
            // Navigation should transition
        }}></Button>
        </View>

        <Text style={{fontSize: 12, justifyContent: 'center', alignContent: 'center', flexDirection: 'row', padding: 10}}>Enter to begin</Text>
        </View>
         
        </>

    );
};



const styles = StyleSheet.create({
    text: {
        paddingTop: 30,
        paddingBottom: 5,
        paddingHorizontal: 70,
        alignContent: 'center',
        alignItems: 'center',
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
        color: '#000000'
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