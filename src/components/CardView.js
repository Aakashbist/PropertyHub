import React from 'react';
import { Image, Text, TouchableOpacity } from "react-native"
import styles from "../resources/styles"
import { View } from 'native-base';



const Card = (props) => {
    return (
        <View>
            <TouchableOpacity style={styles.card}>
                <Image style={{ width: 200, height: 200, marginBottom: 30 }} source={require('../assets/icon/homeIcon.png')} />
                <Text style={styles.cardText}></Text>
            </TouchableOpacity>
        </View>
    )
}
export default Card;