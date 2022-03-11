import React, { useState, useRef, useEffect } from "react";
import { Text, StyleSheet, SafeAreaView, Button, View, TouchableOpacity, Image, TextInput, ScrollView, FlatList, Keyboard, dismissKeyboard, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Keychain from 'react-native-keychain';
import {productionDomain} from "../networking/api_variables";
import Icon from "react-native-vector-icons/MaterialIcons";



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

const sendMessage = async (item, userId, message) => {
    const credential = await Keychain.getInternetCredentials(productionDomain);
    const token = credential.password;
    return fetch(`${productionDomain}/prompts/${item.prompt.id}/answers/${item.id}/messages`, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            user_id: userId,
            message: message
        })
    })
    .then((response) => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error(response.status);
        }
    })
    .then((data) => {return data})

};

const Item = ({item}) => {
    const [message, setMessage] = useState('');
    const promptBody = item.prompt.body;
    const answerBody = item.body;
    const user = item.user;
    const displayName = item.user.display_name;
    const inputView = useRef();
    return (
        <View style={styles.itemContentView}>
            <View style={styles.stackView}>
                <View style={styles.profileView}>
                    <TouchableOpacity style={styles.avatarView}>
                        <Image defaultSource={require('../assets/images/BlankProfileAsset.png')} source={{uri: 'user.avatar_url', cache: 'force-cache'}} height={styles.avatarView.height} width={styles.avatarView.width}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                     <Text style={styles.displayName}>{displayName}</Text>
                    </TouchableOpacity>
                </View>
            <Text style={styles.promptText}>{promptBody}</Text>
            <Text style={styles.answerText}>{answerBody}</Text>
            <View style={{marginBottom: 10}}></View>
            <View style={styles.textInputView}>
            <TextInput ref={inputView} style={styles.textInput} placeholder={"Reply..."} multiline={true} onChangeText={(text) => {
                setMessage(text);
            }}>

            </TextInput>
            <TouchableOpacity style={{backgroundColor: '#0581DC', height: 28, width: 28, borderRadius: 15, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginRight: 10, flexShrink: 0}} onPress={() => {
                console.log('Pressed send message button');
                Keyboard.dismiss(); // dismiss the keyboard
                inputView.current.clear(); // Clear the input view
                console.log('This is the message', message);
                sendMessage(item, user.id, message)
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    console.log(error);
                });
            }}>
                <Icon name={"arrow-upward"} size={15} color={'white'}></Icon>
            </TouchableOpacity>
            </View>
            </View>
        </View>
    )
};

const renderItem = ({  item  }) => {
    return <Item item={item}/>
};

const DiscoverFeed = () => {
    const [items, setItems] = useState(null);
    let itemLimit = 100; 
    const flatlist = useRef();


    useEffect( () => {
        fetchItems(itemLimit, 0)
        .then((data) => {
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
            <FlatList ref={flatlist} style={styles.flatList} data={items} keyExtractor={(item) => item.id} refreshing={false} inverted={false} keyboardShouldPersistTaps='handled' keyboardDismissMode='on-drag' onRefresh={() => {
                flatlist.refreshing = true 
                fetchItems(itemLimit, 0)
                .then((data) => {
                    setItems(data);
                    flatlist.refreshing = false;
                })
                .catch((error) => {
                    if(items.length > 0) {
                        setItems(items.splice(0, items.length));
                    }
                    console.log(error);
                    flatlist.refreshing = false;
                })
                
                
                }} renderItem={renderItem} ItemSeparatorComponent={() => <View style={{backgroundColor: '#F0F0F0', height: 1}}></View>} progressViewOffset={50} onEndReachedThreshold={0.5} onEndReached={() => {
                    fetchItems(itemLimit, items.length)
                    .then((data) => {
                        console.log('Appending more content to flatlist!');
                        setItems(items.concat(data));
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                }}>
                
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
        backgroundColor: 'white', paddingVertical: '40%', marginBottom: 10
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
    },
    profileView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 19,
        alignItems: 'center'
    },
    avatarView: {
        backgroundColor: "#F0F0F0",
        height: 40,
        width: 40,
        borderRadius: 20,
        marginRight: 10
    },
    displayName: {
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        fontWeight: 'normal'
    }
});

export default DiscoverFeed;