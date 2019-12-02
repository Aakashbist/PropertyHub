
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, MapView } from 'react-native';
import styles from '../../resources/styles';
import geoLocation from '@react-native-community/geolocation';
import { TextInput } from 'react-native-gesture-handler';

const Property = (props) => {
    const [latitude, setlatitude] = useState(0);
    const [longitude, setlongitude] = useState(0);
    const [destination, setdestination] = useState('');
    const [predictions, setpredictions] = useState([]);



    useEffect(() => {
        geoLocation.getCurrentPosition(position => {
            setlatitude(position.coords.latitude);
            setlongitude(position.coords.longitude);
        })
    }, [latitude, longitude]);

    handleSuggestion = value => {
        setdestination(value);
        setpredictions([]);

    }

    onChangeDestination = async (destination) => {
        setdestination(destination);
        const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyC8cfuosSdIXS9JrI5PWrtMYmCVFCGwwnM
    &input=${destination}&location=${latitude},${longitude}&radius=2000`;
        try {
            const result = await fetch(apiUrl);
            const json = await result.json();
            setpredictions(json.predictions);
        }
        catch (error) {
            alert(error)
        };

    };


    const suggestionView =
        predictions.map(item =>
            <TouchableOpacity
                onPress={() => this.handleSuggestion(item.description)}>
                <Text style={styles.suggestion} value={destination}>
                    {item.description}
                </Text>
            </TouchableOpacity>)
    return (
        <View >
            <TextInput style={styles.searchBox} placeholder="Enter Address" value={destination} onChangeText={destination => this.onChangeDestination(destination)} ></TextInput>
            {suggestionView}

        </View>
    );
}

export default Property;

