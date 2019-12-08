
import React, { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Text, ScrollView, TouchableOpacity, Button } from 'react-native';
import styles from '../../resources/styles';
import geoLocation from '@react-native-community/geolocation';
import { TextInput } from 'react-native-gesture-handler';
import { Container, Item, CheckBox, Body } from 'native-base';
import { ButtonGroup, Icon } from 'react-native-elements';
import colors from '../../resources/colors';
import GeneralStatusBarColor from '../GeneralStatusBarColor';

const AddProperty = {
    ADDRESS: true,
    PROPERTYTYPE: 0,
    PROPERTYSTATUS: 1,
}


const Property = (props) => {
    const [latitude, setlatitude] = useState(0);
    const [longitude, setlongitude] = useState(0);
    const [destination, setdestination] = useState('');
    const [propertyTypeContent, setPropertyTypeContent] = useState(false);
    const [step, setStep] = useState([AddProperty.ADDRESS]);
    const [propertyStatusContent, setPropertyStatusContent] = useState(false);
    const [predictions, setpredictions] = useState([]);
    const [unitNumber, setunitNumber] = useState('');
    const [check, setCheck] = useState(true);


    geoLocation.getCurrentPosition(position => {
        setlatitude(position.coords.latitude);
        setlongitude(position.coords.longitude);
    });

    handleSuggestion = value => {
        setdestination(value);
        setpredictions([]);
        setStep(AddProperty.PROPERTYTYPE)
        // setPropertyTypeContent(!propertyTypeContent)

    }
    componentHideAndShow = () => {
        setPropertyTypeContent(!propertyTypeContent)
    }


    onChangeDestination = async (destination) => {
        setdestination(destination);
        const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key= AIzaSyC8cfuosSdIXS9JrI5PWrtMYmCVFCGwwnM &input=${destination}&location=${latitude},${longitude}&radius=2000`;
        try {
            const result = await fetch(apiUrl);
            const json = await result.json();
            setpredictions(json.predictions);
        }
        catch (error) {
            alert(error)
        };

    };

    handleCheckEvent = () => {
        setCheck(!check);
    }

    const suggestionView =
        predictions.map(item =>
            <TouchableOpacity
                onPress={() => this.handleSuggestion(item.description)}>
                <Text style={styles.suggestion} value={destination}>
                    {item.description}
                </Text>
            </TouchableOpacity>)

    let view = step === AddProperty.ADDRESS ?
        <Container >
            <TextInput name="destination" style={styles.searchBox} placeholder="Enter Address" value={destination} onChangeText={destination => this.onChangeDestination(destination)} ></TextInput>
            {suggestionView}
        </Container> : step === AddProperty.PROPERTYTYPE ? <Container>
            <Text style={{ color: colors.primaryDark, textAlign: 'right', fontSize: 25, marginTop: 20 }}>More About Your Property</Text>
            <Item>
                <CheckBox checked={check} onPress={this.handleCheckEvent} />
                <Body >
                    <Text style={{ color: colors.green, padding: 20 }}>{destination}</Text>

                </Body>
            </Item>

            <Text style={{ color: colors.black, padding: 20 }}>Is this a Flat/Unit?</Text>
            <Item style={{ flexDirection: 'row' }}>

                <TextInput
                    style={styles.unitInputBox}
                    value={unitNumber}
                    onChangeText={(unitNumber) => setunitNumber(unitNumber)}
                    placeholder='Flat/Unit Number'
                    autoCapitalize='none'
                />
                <TouchableOpacity
                    style={styles.unitButton}

                >
                    <Text style={styles.buttonText}>update premise </Text>
                </TouchableOpacity>
            </Item>
            <TouchableOpacity style={styles.buttonNext}
                onPress={() => setStep(AddProperty.PROPERTYSTATUS)}
                alert={propertyStatusContent}>
                <Text style={styles.buttonText}>Next</Text>
                <Icon name='chevron-right' type='evilicon' color={colors.white} />
            </TouchableOpacity>

        </Container> : step === AddProperty.PROPERTYSTATUS ? <Text>propertyStatusContent</Text> : null;

    return (
        <View style={{ flex: 1 }}>
            <GeneralStatusBarColor backgroundColor={colors.primary} barStyle="light-content" />
            {view}

            {/* <Container >
                <TextInput name="destination" style={styles.searchBox} placeholder="Enter Address" value={destination} onChangeText={destination => this.onChangeDestination(destination)} ></TextInput>
                {suggestionView}
            </Container>
            {
                propertyTypeContent ?
                    <Container>
                        <Text style={{ color: colors.primaryDark, textAlign: 'right', fontSize: 25, marginTop: 20 }}>More About Your Property</Text>
                        <Item>
                            <CheckBox checked={check} onPress={this.handleCheckEvent} />
                            <Body >
                                <Text style={{ color: colors.green, padding: 20 }}>{destination}</Text>

                            </Body>
                        </Item>

                        <Text style={{ color: colors.black, padding: 20 }}>Is this a Flat/Unit?</Text>
                        <Item style={{ flexDirection: 'row' }}>

                            <TextInput
                                style={styles.unitInputBox}
                                value={unitNumber}
                                onChangeText={(unitNumber) => setunitNumber(unitNumber)}
                                placeholder='Flat/Unit Number'
                                autoCapitalize='none'
                            />
                            <TouchableOpacity
                                style={styles.unitButton}

                            >
                                <Text style={styles.buttonText}>update premise </Text>
                            </TouchableOpacity>
                        </Item>
                        <TouchableOpacity style={styles.buttonNext}
                            onPress={() => setPropertyStatusContent(!propertyStatusContent)}
                            alert={propertyStatusContent}>
                            <Text style={styles.buttonText}>Next</Text>
                            <Icon name='chevron-right' type='evilicon' color={colors.white} />
                        </TouchableOpacity>

                    </Container>
                    : null
            }{propertyStatusContent ? <Text>propertyStatusContent</Text> : null
            } */}
        </View >
    )
}

export default Property;

