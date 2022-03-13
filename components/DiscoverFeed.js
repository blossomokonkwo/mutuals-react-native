import React, { useState, useRef, useEffect } from "react";
import { Text, StyleSheet, SafeAreaView, Button, View, TouchableOpacity, Image, TextInput, ScrollView, FlatList, Keyboard, dismissKeyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Keychain from 'react-native-keychain';
import { productionDomain } from "../networking/api_variables";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ampInstance } from '../App';



const fetchItems = async (limit, offset) => {
    const credential = await Keychain.getInternetCredentials(productionDomain);
    const token = credential.password;
    return fetch(`${productionDomain}/?` + new URLSearchParams({ limit: limit, offset: offset }), {
        method: 'Get',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then((response) => {
            if (response.ok) {
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
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.status);
            }
        })
        .then((data) => { return data })

};

const Item = ({ item }) => {
    const [message, setMessage] = useState('');
    const promptTitle = item.prompt.title;
    const answerBody = item.body;
    const user = item.user;
    const displayName = item.user.display_name;
    const inputView = useRef();
    return (
        <View style={styles.itemContentView}>
            <View style={styles.stackView}>
                <View style={styles.profileView}>
                    <TouchableOpacity style={styles.avatarView}>
                        <Image defaultSource={require('../assets/images/BlankProfileAsset.png')} source={{ uri: 'user.avatar_url', cache: 'force-cache' }} height={styles.avatarView.height} width={styles.avatarView.width}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        ampInstance.logEvent('Pressed Display name', {'user_id': item.user.id, 'display_name': item.user.display_name})
                        .then((loggedEvent) => {
                            loggedEvent ? (console.log("Logged pressed display name event!")) : (console.log("Failed to log pressed display name event"))
                        })
                        .catch((error) => {
                            console.log(`An error occured when logging event: ${error}`);
                        })
                    }}>
                        <Text style={styles.displayName}>{displayName}</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.promptText}>{promptTitle}</Text>
                <Text style={styles.answerText}>{answerBody}</Text>
                <View style={{ marginBottom: 10 }}></View>
                <View style={styles.textInputView}>
                    <TextInput ref={inputView} style={styles.textInput} placeholder={"Reply..."} multiline={true} autoCorrect={false} autoCapitalize={'none'} onChangeText={(text) => {
                        setMessage(text);
                    }}>

                    </TextInput>
                    <TouchableOpacity style={{ backgroundColor: '#0581DC', height: 28, width: 28, borderRadius: 15, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginRight: 10, flexShrink: 0 }} onPress={() => {
                        Keyboard.dismiss(); // dismiss the keyboard
                        inputView.current.clear(); // Clear the input view
                        console.log('This is the message', message);
                        sendMessage(item, user.id, message)
                            .then((data) => {
                                console.log(data);
                                ampInstance.logEvent('Reply to prompt/answer', { 'prompt_id': item.prompt.id, 'answer_id': item.id, 'user_id': item.user.id })
                                    .then((sentEvent) => {
                                        sentEvent ? (console.log("Logged reply event!")) : (console.log('Failed to log reply event!'))
                                    })
                                    .catch((error) => {
                                        console.log(`An error occured when logging event: ${error}`);
                                    })
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

const renderItem = ({ item }) => {
    return <Item item={item} />
};

const DiscoverFeed = () => {
    const [items, setItems] = useState(null);
    let itemLimit = 100;
    const flatlist = useRef();


    useEffect(() => {
        fetchItems(itemLimit, 0)
            .then((data) => {
                setItems(data);
            })
            .catch((error) => {
                setItems(null);
                console.log(error);
            })
    }
        , []
    )
    return (
        <SafeAreaView style={styles.mainView}>
            {
                items ? (
                <FlatList ref={flatlist} style={styles.flatList} data={items} keyExtractor={(item) => item.id} refreshing={false} inverted={false} keyboardShouldPersistTaps='handled' keyboardDismissMode='on-drag' onRefresh={() => {
                    flatlist.refreshing = true
                    fetchItems(itemLimit, 0)
                        .then((data) => {
                            setItems(data);
                            flatlist.refreshing = false;
                        })
                        .catch((error) => {
                            setItems(null);
                            console.log(error);
                            flatlist.refreshing = false;
                        })
    
    
                }} renderItem={renderItem} ItemSeparatorComponent={() => <View style={{ backgroundColor: '#F0F0F0', height: 1 }}></View>} progressViewOffset={50} onEndReachedThreshold={0.5} onEndReached={() => {
                    fetchItems(itemLimit, items.length)
                        .then((data) => {
                            setItems(items.concat(data));
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                }}>
    
                </FlatList>
                )
                :
                (
                    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 20, fontWeight: '500'}}>Nothing to discover yet!</Text>
                        <View style={{marginTop: 10}}></View>
                        <TouchableOpacity onPress={() => {
                            fetchItems(itemLimit, 0)
                            .then((data) => {
                                setItems(data);
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                        }}>
                        <Text style={{color: '#057AE7'}}>Tap to Retry</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
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
        flexShrink: 1,
        flex: 1
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