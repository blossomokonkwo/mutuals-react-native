import React, { useState, useRef, useEffect } from "react";
import { Text, StyleSheet, SafeAreaView, Button, View, TouchableOpacity, Image, TextInput, FlatList, dismissKeyboard, TouchableHighlight } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { productionDomain } from "../networking/api_variables"


const fetchItems = async (limit, offset) => {
    const credential = await Keychain.getInternetCredentials(productionDomain);
    const token = credential.password;
    return fetch(`${productionDomain}/chat_rooms?` + new URLSearchParams({ offset: offset, limit: limit }), {
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

const Item = ({ item }) => {
    const user = item.chat_room_users[0];
    if (item.recent_message) {
        const recentMessage = item.recent_message;
        const messageBody = recentMessage.body;
        const answer = recentMessage.answer;
        if (answer) {
            const prompt = answer.prompt;
            return (
                <View style={{ marginVertical: '10%', flexDirection: 'column', flex: 1, justifyContent: 'flex-start' }}>
                    <View style={{ marginHorizontal: 37, marginBottom: 20, flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', marginBottom: 20 }}>
                            <TouchableOpacity style={{ backgroundColor: '#F0F0F0', height: 50, width: 50, borderRadius: 50 / 2 }}>
                                <Image source={{ uri: recentMessage.user.avatar_url }}></Image>
                            </TouchableOpacity>
                            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 15, fontWeight: '500', textAlign: 'auto', marginLeft: 10 }}>{recentMessage.user.display_name}
                                <Text style={{ fontWeight: 'normal', fontFamily: 'Roboto-Regular', fontSize: 15 }}> replied... </Text>
                            </Text>
                        </View>

                        <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 17, fontWeight: '400' }}>{recentMessage.body}</Text>

                    </View>

                    <View style={{ marginHorizontal: 37, flexDirection: 'column', flex: 1, justifyContent: 'flex-start' }}>
                        <Text style={styles.promptText}>{prompt.title}</Text>
                        <Text style={styles.answerText}>{answer.body}</Text>
                    </View>
                </View>
            )
        } else {
            return <View></View>
        }
    } else {
        return <View></View>
    }
};

const renderItem = ({ item }) => {
    return <Item item={item} />
};

const ChatRoomFeed = () => {
    const [items, setItems] = useState(null);
    const itemLimit = 10;
    const flatlist = useRef();

    useEffect(() => {
        fetchItems(itemLimit, 0)
            .then((data) => {
                setItems(data);
            })
            .catch((error) => {
                setItems(null);
            })
    }
        , []
    )
    return (
        <SafeAreaView style={styles.mainView}>
            {
                items ? (
                    <FlatList ref={flatlist} style={styles.flatList} data={items} renderItem={renderItem} keyExtractor={(item) => item.id} refreshing={false} inverted={false} keyboardShouldPersistTaps='handled' keyboardDismissMode='on-drag' onRefresh={() => {
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
                    }} ItemSeparatorComponent={() => <View style={{ backgroundColor: '#F0F0F0', height: 1 }}></View>} progressViewOffset={50} onEndReachedThreshold={0.5} onEndReached={() => {
                        fetchItems(itemLimit, items.length)
                            .then((data) => {
                                setItems(items.concat(data));
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    }} />
                ) : (
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: '500' }}>No Replies Yet</Text>
                            <View style={{marginTop: 10}}></View>
                            <TouchableOpacity onPress={() => {
                                fetchItems(itemLimit, 0)
                                .then((data) => {
                                    setItems(data);
                                })
                                .catch((error) => {
                                    setItems(null);
                                    console.log(error);
                                })
                            }}>
                                <Text style={{color: '#057AE7'}}>Tap to retry</Text>
                            </TouchableOpacity>
                        </View>

                    )
            }
        </SafeAreaView>
    )

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
        backgroundColor: 'white', paddingVertical: '5%', marginBottom: 10
    },
    itemContentViewMainHorizontalView: {
        flexDirection: 'row',
        flex: 1,
        marginHorizontal: 28,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'nowrap'
    },
    itemContentViewTextVerticalView: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        marginRight: 28
    },
    itemAvatarView: {
        // backgroundColor: '#F0F0F0',
        height: 65,
        width: 65,
        borderRadius: 65 / 2
    },
    displayName: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        fontWeight: '500'
    },
    promptText: {
        fontSize: 13,
        fontWeight: '400',
        textAlign: 'auto',
        fontFamily: 'Roboto-Regular',
        marginBottom: 6
    },
    answerText: {
        fontSize: 15,
        fontWeight: 'normal',
        textAlign: 'auto',
        fontFamily: 'Roboto-Regular',
        color: 'gray'
    },
});

export default ChatRoomFeed;