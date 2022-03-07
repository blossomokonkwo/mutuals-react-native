import React from 'react';
import {Text, StyleSheet, SafeAreaView, Button, View} from 'react-native';

const Onboard2 = () => {
    return (
        <>
            <SafeAreaView ></SafeAreaView>
            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flex: 1}}>
                <Text style={{fontSize: 18, fontWeight: '600', justifyContent: 'flex-start', alignItems: 'flex-start', paddingRight: 128}}>Here's how it goes:</Text>
                <Text style={styles.text}>You <Text style={{fontWeight: 'bold'}}>answer prompts</Text>. These are special prompts that give us a window into your soul, or something like that. 🤲🧬
                </Text>

                <Text style={styles.text}>Based on your prompt answers, our <Text style={{fontWeight: 'bold'}}>algorithm</Text> gives you a feed of answers from <Text style={{fontWeight: 'bold'}}>potential mutuals</Text>.</Text>
                <Text style={styles.text}>Like their answer to a prompt? <Text style={{fontWeight: 'bold'}}>Mutual them</Text>🗣‼️</Text>

                <View style={{paddingBottom: 109}}></View>

                <View style={styles.button}>
                    <Button title="Sign up and get started" color='white' onClick={() => {

                    }}>
                    </Button>
                </View>

            </View>
        
        </>
    );
};

const styles = StyleSheet.create({
    text: {
        paddingTop: 30,
        paddingBottom: 5,
        paddingLeft: 50,
        paddingRight: 80,
        // fontFamily: 'San Francisco',
        fontSize: 18,
        color: '#000000'
    },
    button: {
        backgroundColor: '#16A2EF',
        width: 316,
        height: 60,
        borderRadius: 100,
        fontSize: 20,
        alignItems: 'center',
        paddding: 30,
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: '700'
    }
});

export default Onboard2;