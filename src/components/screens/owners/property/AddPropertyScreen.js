
import { Container, Label, Picker } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Icon, Slider } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Firebase from '../../../../config/Firebase';
import { Property } from '../../../../models/propertyModels';
import AppRoute from '../../../../resources/appRoute';
import colors from '../../../../resources/colors';
import styles from '../../../../resources/styles';
import GeneralStatusBarColor from '../../../GeneralStatusBarColor';

const AddProperty = {
    PROPERTY_DETAILS: 0,
    ADD_PROPERTY_SUCCESS: 1
}

const PropertyType = {
    HOUSE: "House",
    UNIT: "Unit",
    APARTMENT: "Apartment"
}



const AddNewProperty = (props) => {


    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [destination, setDestination] = useState('');
    const [step, setStep] = useState(AddProperty.PROPERTY_DETAILS);
    const [predictions, setPrediction] = useState([]);
    const [unitContent, setUnitContent] = useState(false);
    const [value, setValue] = useState(false);
    const [propertyDescriptionView, setpropertyDescriptionView] = useState(false);
    const [placeId, setPlaceID] = useState([])

    const [propertyType, setPropertyType] = useState(null);
    const [canAddProperty, setCanAddProperty] = useState('');
    const [unitNumber, setunitNumber] = useState('');
    const [bond, setBond] = useState(34);
    const [rent, setRent] = useState(45);
    const [numberOfBedrooms, setNumberOfBedrooms] = useState(1);
    const [numberOfBathrooms, setNumberOfBathrooms] = useState(1);
    const [image, setImage] = useState();
    const [address, setAddress] = useState([])
    const [imageFileName, setImageFileName] = useState();

    useEffect(() => {

        let _canAddProperty = rent.length > 0 && bond.length > 0 && propertyType !== null;
        if (canAddProperty !== _canAddProperty) {
            setCanAddProperty(_canAddProperty);
        }
    }, [rent, bond, propertyType]);

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
                setImageFileName(response.fileName);

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
            console.log(error)
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
            setpropertyDescriptionView(true);

        } catch (error) {

            console.log(error)
        }
    }

    handlePropertyType = (value) => {
        switch (value) {
            case PropertyType.APARTMENT:
                setPropertyType(PropertyType.APARTMENT)
                setUnitContent(true)
                break;
            case PropertyType.HOUSE:
                setPropertyType(PropertyType.HOUSE)
                setUnitContent(false)
                break;
            case PropertyType.UNIT:
                setPropertyType(PropertyType.UNIT)
                setUnitContent(true)
                break;
            default:
                setPropertyType(null)
                setUnitContent(false)
                break;
        }
        console.log(propertyType)
    }
    handleAddProperty = () => {
        let property, userDb;
        let currentUser = Firebase.auth().currentUser;

        property = new Property(address, unitNumber, numberOfBedrooms, numberOfBathrooms, rent, bond, image, latitude, longitude);
        userDb = 'property';
        let propertyDbRef = Firebase.database().ref().child(userDb + '/' + currentUser.uid)

        propertyDbRef.push(property);
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

    let view = step === AddProperty.PROPERTY_DETAILS ?
        <View style={{ margin: 10 }}>
            <TextInput name="destination" style={styles.searchBox} placeholder="Enter Address"
                value={destination} onChangeText={destination => this.onDestinationQueryChange(destination)} />
            {suggestionView}
            {propertyDescriptionView ?
                <View>
                    <View >
                        <MapView
                            style={styles.map}
                            provider={PROVIDER_GOOGLE}
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
                            showsCompass={true} >
                            <Marker coordinate={{ latitude: latitude, longitude: longitude }} />
                        </MapView>
                    </View>
                    <Container style={styles.containerLeft}>

                        <View style={styles.containerFlexRow}>
                            <Icon name='location' type='evilicon' size={36} color={colors.blue} />
                            <Text style={styles.textSubHeading}>{address}</Text>
                        </View>

                        <View style={styles.inputBoxFull}>
                            <Picker
                                mode="dropdown"
                                selectedValue={propertyType === null ? "Select property type.." : propertyType}
                                onValueChange={(itemValue) => handlePropertyType(itemValue)}>
                                <Picker.Item label="Select property type.." value={null} />
                                <Picker.Item label="Unit" value={PropertyType.UNIT} />
                                <Picker.Item label="House" value={PropertyType.HOUSE} />
                                <Picker.Item label="Apartment" value={PropertyType.APARTMENT} />
                            </Picker>
                        </View>

                        {unitContent ?
                            <TextInput
                                style={styles.inputBoxFull}
                                keyboardType='number-pad'
                                value={unitNumber}
                                onChangeText={(unitNumber) => setunitNumber(unitNumber)}
                                placeholder='Flat/Unit Number'
                                autoCapitalize='none' /> : null
                        }

                        <TextInput
                            style={styles.inputBoxFull}
                            value={rent}
                            keyboardType='number-pad'
                            onChangeText={(rent) => setRent(rent)}
                            placeholder='Rent Amount per Week ($)'
                            autoCapitalize='none'
                        />

                        <TextInput
                            style={styles.inputBoxFull}
                            value={bond}
                            keyboardType='number-pad'
                            onChangeText={(bond) => setBond(bond)}
                            placeholder='Bond Amount ($)'
                            autoCapitalize='none'
                        />

                        <View style={styles.containerFlexRow}>
                            <Label style={{ flex: 1 }}>Number of Bedroom</Label>
                            <Label style={{ paddingStart: 20, fontSize: 18, disabled: true }} disabled={true}>{numberOfBedrooms}</Label>
                        </View>
                        <Slider
                            style={{ width: '100%', height: 40 }}
                            minimumValue={1}
                            maximumValue={5}
                            step={1}
                            maximumTrackTintColor={colors.darkWhite2}
                            minimumTrackTintColor={colors.primary}
                            value={numberOfBedrooms}
                            onValueChange={value => setNumberOfBedrooms(value)}
                        />

                        <View style={styles.containerFlexRow}>
                            <Label style={{ flex: 1 }}>Number of Bathroom</Label>
                            <Label style={{ fontSize: 18, disabled: true }} >{numberOfBathrooms}</Label>
                        </View>
                        <Slider
                            style={{ width: '100%', height: 40 }}
                            minimumValue={1}
                            maximumValue={5}
                            step={1}
                            maximumTrackTintColor={colors.darkWhite2}
                            minimumTrackTintColor={colors.primary}
                            value={numberOfBathrooms}
                            onValueChange={value => setNumberOfBathrooms(value)}
                        />

                        {
                            image && <Image source={{ uri: image }} style={{ width: '100%', height: 100, resizeMode: 'contain' }} />
                        }
                        <TouchableOpacity onPress={this.selectPropertyImage} style={{ justifyContent: 'flex-start', flexDirection: 'row', alignContent: 'center', margin: 10 }} >
                            <Text style={{ color: colors.primary, fontSize: 18 }}>Choose image..</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={this.handleAddProperty} disabled={!canAddProperty}>
                            <Text style={canAddProperty ? styles.buttonText : styles.buttonTextDisabled}>Add Property </Text>

                        </TouchableOpacity>

                    </Container>
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

