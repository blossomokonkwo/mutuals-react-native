
import React, { useState, useRef } from "react";
import { Text, StyleSheet, SafeAreaView, Button, View, TouchableOpacity, TextInput, Modal } from 'react-native';
const ErrorModal = (props) => {
    return (
        <Modal animationType={'slide'} onDismiss={props.onDismiss} onOrientationChange={props.onOrientationChange} onShow={props.onShow} transparent={props.transparent}>
            <View>
                <View>

                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({

outerView: {

},
modalView: {

},
modalText: {

},
textStyle: {
    
}

});

export default ErrorModal;