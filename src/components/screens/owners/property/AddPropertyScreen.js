
import geoLocation from '@react-native-community/geolocation';
import { CheckBox, Container, Footer, Item, Picker, Switch } from 'native-base';
import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Image, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import Firebase from '../../../../config/Firebase';
import { Property, Coordinates } from '../../../../models/propertyModels';
import colors from '../../../../resources/colors';
import styles from '../../../../resources/styles';
import GeneralStatusBarColor from '../../../GeneralStatusBarColor';
import AppRoute from '../../../../resources/appRoute';
import ImagePicker from 'react-native-image-picker';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const AddProperty = {
    PROPERTY_DETAILS: 0,
    ADD_PROPERTY_SUCCESS: 1
}

const PropertyStatus = {
    RENTED: 'rented',
    VACANT: 'vacant'
}

const AddNewProperty = (props) => {


    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [destination, setDestination] = useState('');
    const [step, setStep] = useState(AddProperty.PROPERTY_DETAILS);
    const [predictions, setPrediction] = useState([]);
    const [unitContent, setUnitContent] = useState(false);
    const [value, setValue] = useState(false);
    const [mapView, setMapView] = useState(false);
    const [placeId, setPlaceID] = useState([])

    const [canAddProperty, setCanAddProperty] = useState('');
    const [unitNumber, setunitNumber] = useState('');
    const [bond, setBond] = useState('');
    const [rent, setRent] = useState('');
    const [numberOfBedrooms, setNumberOfBedrooms] = useState('');
    const [numberOfBathrooms, setNumberOfBathrooms] = useState('');
    const [image, setImage] = useState();
    const [address, setAddress] = useState([])


    useEffect(() => {
        let _canAddProperty = rent.length > 0 && bond.length > 0;
        if (canAddProperty !== _canAddProperty) {
            setCanAddProperty(_canAddProperty);
        }
    }, [rent, bond]);

    selectPropertyImage = () => {
        ImagePicker.showImagePicker({ noData: true, mediaType: 'photo' }, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {

                setImage(response.uri);

            }
        });
    }

    onPredictionSelected = place => {
        setDestination(place.description);
        setPlaceID(place.place_id);
        setAddress(place.description)
        setPrediction([]);
        loadCoordinatesByPlaceId(place.place_id);

    }

    unitInputBoxShow = () => {
        setValue(!value)
        setUnitContent(!unitContent)

    }

    navigateToPropertyList = () => {
        props.navigation.navigate(AppRoute.Property);

    }

    onDestinationQueryChange = async (destination) => {
        setDestination(destination);
        const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key= AIzaSyC8cfuosSdIXS9JrI5PWrtMYmCVFCGwwnM &input=${destination}&radius=2000`;
        try {
            const result = await fetch(apiUrl);
            const json = await result.json();
            setPrediction(json.predictions);
        }
        catch (error) {
            alert(">>" + error)
        };
    };

    loadCoordinatesByPlaceId = async (placeId) => {
        console.log(placeId)
        const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyC8cfuosSdIXS9JrI5PWrtMYmCVFCGwwnM&place_id=${placeId}&fields=geometry`
        try {
            const result = await fetch(apiUrl);
            const json = await result.json();
            setLatitude(json.result.geometry.location.lat);
            setLongitude(json.result.geometry.location.lng);
            console.log(latitude)
            console.log(longitude)
            setMapView(true);

        } catch (error) {

            alert(">>" + error)
        }
    }


    handleAddProperty = () => {
        let property, userDb;
        let currentUser = Firebase.auth().currentUser;

        property = new Property(address, unitNumber, numberOfBedrooms, numberOfBathrooms, rent, bond, image, latitude, longitude);
        userDb = 'property';
        Firebase.database().ref().child(userDb + '/' + currentUser.uid).push(property);
        setStep(AddProperty.ADD_PROPERTY_SUCCESS)

    }

    const suggestionView = predictions.map(item =>
        <TouchableOpacity
            onPress={() => this.onPredictionSelected(item)}>

            <Text key={item.id} style={styles.suggestion} value={destination}>
                {item.description}
            </Text>
        </TouchableOpacity >
    )

    let view = step === AddProperty.PROPERTY_DETAILS ? <View style={{ marginTop: 10 }}>
        <TextInput name="destination" style={styles.searchBox} placeholder="Enter Address" value={destination} onChangeText={destination => this.onDestinationQueryChange(destination)} ></TextInput>
        {suggestionView}
        {mapView ?
            <View>
                <MapView
                    style={{ flex: 1, height: 400 }}
                    intialRegion={{
                        latitude: 37.422,
                        longitude: -122.084,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}

                    region={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                    showsUserLocation={true}
                    showsCompass={true}
                >
                    <Marker

                        coordinate={{
                            latitude: latitude,
                            longitude: longitude
                        }}
                    />
                </MapView>

                <View style={{ flex: 1, marginTop: 15, }}>
                    <Item style={styles.containerFlexColumn}>
                        <Text style={{ fontSize: 15, marginTop: 20, padding: 20 }}>{address}</Text>
                        <Item style={styles.containerFlexRow}>
                            <CheckBox checked={true} style={{ borderRadius: 8, color: colors.green }} onPress={this.handleCheckBoxEvent} />
                            <Text style={{ fontSize: 15, padding: 12 }}>Property available</Text>
                        </Item>

                        <Item style={styles.containerFlexRow}>
                            <Text style={{ color: colors.black, padding: 5 }}>Is this a Flat/Unit?</Text>
                            <Switch value={value} onValueChange={this.unitInputBoxShow}></Switch>
                        </Item>{unitContent ?

                            <Item style={styles.containerFlexRow}>
                                <TextInput
                                    style={styles.unitInputBox}
                                    value={unitNumber}
                                    onChangeText={(unitNumber) => setunitNumber(unitNumber)}
                                    placeholder='Flat/Unit Number'
                                    autoCapitalize='none'
                                />
                            </Item> : null}

                        <Text style={{ alignItems: 'flex-start' }}>Number of Bedroom?</Text>
                        <Picker
                            mode="dropdown"
                            selectedValue={numberOfBedrooms}

                            placeholderIconColor='#000'

                            style={{ height: 50, width: 300, margin: 30, borderWidth: 4 }}
                            onValueChange={(itemValue, itemIndex) => setNumberOfBedrooms(itemValue)}>
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="5" value="4" />
                        </Picker>

                        <Text style={{ alignItems: 'flex-start' }}>Number of Bathroom?</Text>
                        <Picker
                            selectedValue={numberOfBathrooms}
                            style={{ borderColor: 'black', height: 50, width: 300, margin: 30, borderBottomWidth: 3 }}
                            placeholder="Select your SIM"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            onValueChange={(itemValue, itemIndex) => setNumberOfBathrooms(itemValue)}>
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="5" value="4" />
                        </Picker>


                        <TextInput
                            style={styles.unitInputBox}
                            value={rent}
                            onChangeText={(rent) => setRent(rent)}
                            placeholder='Rent Per Week'
                            autoCapitalize='none'
                        />
                        <TextInput
                            style={styles.unitInputBox}
                            value={bond}
                            onChangeText={(bond) => setBond(bond)}
                            placeholder='Bond Amount'
                            autoCapitalize='none'
                        />
                        {
                            image && <Image source={{ uri: image }} style={{ width: '80%', height: 100, resizeMode: 'contain' }} />
                        }


                        <TouchableOpacity onPress={this.selectPropertyImage} style={{ minWidth: '30%', backgroundColor: colors.blue, borderRadius: 3, height: 40, padding: 4, marginVertical: 5 }} >
                            <Text style={{ color: colors.white, fontSize: 20, backgroundColor: colors.blue, textAlign: "center" }}>import Image</Text>
                        </TouchableOpacity>

                    </Item>

                    <Footer style={canAddProperty ? styles.buttonWithChevron : styles.buttonWithChevronDisable}>
                        <TouchableOpacity
                            onPress={this.handleAddProperty}
                            disabled={!canAddProperty}>
                            <Text style={{ color: colors.white, marginBottom: 10, fontSize: 15 }}>Add Property</Text>
                        </TouchableOpacity>
                    </Footer>
                </View>
            </View> : null
        }
    </View > : step === AddProperty.ADD_PROPERTY_SUCCESS ? <React.Fragment>
        <Container style={styles.containerFull}>
            <Image style={{ width: 200, height: 250, margin: 10 }} source={require('../../../../assets/icon/homeIcon.png')} />
            <Text style={{ color: colors.green, marginBottom: 10, fontSize: 20 }}>Property Added</Text>
            <TouchableOpacity
                style={{
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
                onPress={navigateToPropertyList}>
                <Icon name='chevron-left' type='evilicon' color={colors.primary} />
                <Text style={styles.primaryText}>Go Back to Property</Text>
            </TouchableOpacity>

        </Container>
    </React.Fragment> : null;

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flex: 1 }}>
                <GeneralStatusBarColor backgroundColor={colors.primary} barStyle="light-content" />
                {view}
            </View >
        </ScrollView>
    )
}

export default AddNewProperty;

