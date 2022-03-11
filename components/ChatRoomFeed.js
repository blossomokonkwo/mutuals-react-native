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
    const recentMessage = item.recent_message;
    return <TouchableHighlight style={styles.itemContentView}>
        <View style={styles.itemContentViewMainHorizontalView}>
            <TouchableOpacity style={styles.itemAvatarView}>
                <Image source={require('../assets/images/BlankProfileAsset.png')} defaultSource={require('../assets/images/BlankProfileAsset.png')} style={{ width: 65, height: 65 }}>

                </Image>
            </TouchableOpacity>
            <View style={{ marginHorizontal: 10 }}></View>
            <View style={styles.itemContentViewTextVerticalView}>
                <Text style={styles.displayName}>
                    {
                        user ? user.display_name : ""
                    }
                </Text>
                <View style={{ marginTop: 5 }}></View>
                <Text style={{ color: '#BDBDBD', fontFamily: 'Roboto-Regular', fontSize: 13, marginRight: 28 }}>
                    {recentMessage.body}
                </Text>
            </View>
        </View>
    </TouchableHighlight>
};

const renderItem = ({ item }) => {
    return <Item item={item} />
};

const ChatRoomFeed = () => {
    const [items, setItems] = useState(null);
    const itemLimit = 100;
    const flatlist = useRef();

    useEffect(() => {
        fetchItems(itemLimit, 0)
            .then((data) => {
                setItems(data);
            })
            .catch((error) => {
                if (items !== undefined && items !== null && items.length > 0) {
                    setItems(items.splice(0, items.length));
                }

            })
    }
        , []
    )
    return (
        <SafeAreaView style={styles.mainView}>
            <FlatList ref={flatlist} style={styles.flatList} data={items} renderItem={renderItem} keyExtractor={(item) => item.id} refreshing={false} inverted={false} keyboardShouldPersistTaps='handled' keyboardDismissMode='on-drag' onRefresh={() => {
                flatlist.refreshing = true
                fetchItems(itemLimit, 0)
                    .then((data) => {
                        setItems(data);
                        flatlist.refreshing = false;
                    })
                    .catch((error) => {
                        if (items.length > 0) {
                            setItems(items.splice(0, items.length));
                        }
                        console.log(error);
                        flatlist.refreshing = false;
                    })
            }} ItemSeparatorComponent={() => <View style={{ backgroundColor: '#F0F0F0', height: 1 }}></View>} progressViewOffset={50} onEndReachedThreshold={0.5} onEndReached={() => {
                fetchItems(itemLimit, items.length)
                    .then((data) => {
                        console.log('Appending more content to flatlist!');
                        setItems(items.concat(data));
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }} />
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
    }
});

export default ChatRoomFeed;