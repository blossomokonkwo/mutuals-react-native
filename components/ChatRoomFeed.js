import React, { useState, useRef, useEffect } from "react";
import { Text, StyleSheet, SafeAreaView, Button, View, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import * as Keychain from 'react-native-keychain';
import {productionDomain} from "../networking/api_variables"


const fetchItems = async (limit, offset) => {
    const credential = await Keychain.getInternetCredentials(productionDomain);
    const token = credential.password;
    return fetch(`${productionDomain}/chat_rooms?` + new URLSearchParams({offset: offset, limit: limit}), {
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

const ChatRoomFeed = () => {
    const [items, setItems] = useState(null);
    const itemLimit = 100; 
return (
    <SafeAreaView style={styles.mainView}>
        {
            useEffect( () => {
                fetchItems(itemLimit, 0)
                .then((data) => {
                    setItems(data);
                    return (
                            <FlatList data={items}>
                                
                            </FlatList>
                    );
                })
                .catch((error) => {
                    if(items !== undefined && items !== null && items.length > 0) {
                        setItems(items.splice(0, items.length));
                    }
                    console.log("Rendering out error view");
                    return (
                        <View style={{flex: 1, alignSelf: 'center', height: '50%'}}>
                            <Text>Not Found</Text>
                        </View>
                    )
                    console.log(error);
                })
                }
                , []
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
    }
});

export default ChatRoomFeed;