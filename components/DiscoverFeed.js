import React, { useState, useRef, useEffect } from "react";
import { Text, StyleSheet, SafeAreaView, Button, View, TouchableOpacity, Image, TextInput, ScrollView, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Keychain from 'react-native-keychain';

import {productionDomain} from "../networking/api_variables"
import Icon from "react-native-vector-icons/MaterialIcons";
const Stack = createNativeStackNavigator();



const fetchItems = async (limit, offset) => {
    const credential = await Keychain.getInternetCredentials(productionDomain);
    const token = credential.password;
    return  fetch(`${productionDomain}/?` + new URLSearchParams({limit: limit, offset: offset}), {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            if(response.ok) {
                return response.json();
            } else {
                throw new Error(response.status);
            }
        })
        .then((data) => {
            return data;
        })
};

const renderItem = ({  item  }) => {
    console.log(item.id);
    const promptBody = item.prompt.body;
    const answerBody = item.body;
    return (
        <View style={{backgroundColor: 'white', paddingVertical: '40%', marginBottom: 10}}>
            <View style={styles.stackView}>
            <Text style={styles.promptText}>{promptBody}</Text>
            <Text style={styles.answerText}>{answerBody}</Text>
            <View style={{marginBottom: 10}}></View>
            <View style={styles.textInputView}>
            <TextInput style={styles.textInput} placeholder={"Reply..."} multiline={true}>

            </TextInput>
            <TouchableOpacity style={{backgroundColor: '#0581DC', height: 28, width: 28, borderRadius: 15, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginRight: 10, flexShrink: 0}}>
                <Icon name={"arrow-upward"} size={15} color={'white'}></Icon>
            </TouchableOpacity>
            </View>
            </View>
        </View>
    )
};

const DiscoverFeed = () => {
    const [items, setItems] = useState(null);
    let itemOffset = 0;
    let itemLimit = 10; 

    useEffect( () => {
        fetchItems(itemLimit, itemOffset)
        .then((data) => {
            itemOffset = 0;
            setItems(data);
        })
        .catch((error) => {
            if(items.length > 0) {
                setItems(items.splice(0, items.length));
            }
            console.log(error);
        })
        }
        , []
    )
    return (
        <SafeAreaView style={styles.mainView}>
            <FlatList style={styles.flatList} data={items} keyExtractor={(item) => item.id} refreshing={false} onRefresh={() => {
                fetchItems(itemLimit, itemOffset)
                .then((data) => {
                    itemOffset = 0;
                    setItems(data);
                })
                .catch((error) => {
                    if(items.length > 0) {
                        setItems(items.splice(0, items.length));
                    }
                    console.log(error);
                })
                
                
                }} renderItem={renderItem} ItemSeparatorComponent={() => <View style={{backgroundColor: '#F0F0F0', height: 1}}></View>}>
                
            </FlatList>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: 'white',
        flex: 1
    },
    flatList: {
        flex: 1
    },
    itemContentView: {

    },
    stackView: {
        marginHorizontal: 37,
        justifyContent: 'flex-start',
        flex: 1,
        flexDirection: 'column',
    },
    promptText: {
        fontSize: 13,
        fontWeight: '500',
        textAlign: 'auto',
        fontFamily: 'Roboto-Regular',
        marginBottom: 6
    },
    answerText: {
        fontSize: 18,
        fontWeight: 'normal',
        textAlign: 'auto',
        fontFamily: 'Roboto-Regular'
    },
    textInput: {
        paddingTop: 12,
        paddingBottom: 12,
        paddingHorizontal: 10,
        alignSelf: 'center',
        flexShrink: 1
    },
    textInputView: {
        backgroundColor: '#F0F0F0', borderRadius: 20, width: '95%', alignSelf: 'flex-start', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'
    }
});

export default DiscoverFeed;