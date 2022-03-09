import React, { useState, useRef } from "react";
import { Text, StyleSheet, SafeAreaView, Button, View, TouchableOpacity, Image, TextInput, ScrollView, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();


const DiscoverFeed = () => {
    return (
        <View style={styles.mainView}>
            <FlatList>
                
            </FlatList>
        </View>
    );
};

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: 'white',
        flex: 1
    },
    flatList: {

    }
});

export default DiscoverFeed;