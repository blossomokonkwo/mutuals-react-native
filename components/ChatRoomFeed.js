import React, { useState, useRef } from "react";
import { Text, StyleSheet, SafeAreaView, Button, View, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';

const ChatRoomFeed = () => {
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

export default ChatRoomFeed;