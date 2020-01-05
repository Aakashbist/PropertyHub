
import { Container, Label, Picker } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { Icon, Input, Slider } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Firebase from '../../../../config/Firebase';
import { Property } from '../../../../models/propertyModels';
import AppRoute from '../../../../resources/appRoute';
import colors from '../../../../resources/colors';
import PropertyType from '../../../../resources/propertyType';
import styles from '../../../../resources/styles';
import parseFirebaseError from '../../../errorParser/FirebaseErrorParser';
import parseMapApiError from '../../../errorParser/MapApiErrorParser';
import { getGooglePlaceAutocomplete, getGooglePlaceDetails } from '../../../services/GoogleService';
import { getDownloadImageUrl } from '../../../services/imageUploadService';
import { getPropertyById } from '../../../services/PropertyService';

const AddProperty = {
    PROPERTY_DETAILS: 0,
    ADD_PROPERTY_SUCCESS: 1
}

const AddNewProperty = (props) => {

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [destination, setDestination] = useState('');
    const [step, setStep] = useState(AddProperty.PROPERTY_DETAILS);
    const [predictions, setPrediction] = useState([]);
    const [unitContent, setUnitContent] = useState(false);
    const [value, setValue] = useState(false);
    const [propertyDescriptionView, setPropertyDescriptionView] = useState(false);
    const [placeId, setPlaceID] = useState([])
    const [editMode, setEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [propertyType, setPropertyType] = useState(null);
    const [canAddProperty, setCanAddProperty] = useState('');
    const [unitNumber, setUnitNumber] = useState('');
    const [bond, setBond] = useState();
    const [rent, setRent] = useState();
    const [bedroom, setBedroom] = useState(1);
    const [bathroom, setBathroom] = useState(1);
    const [address, setAddress] = useState([])
    const [imageFileName, setImageFileName] = useState();
    const [imageUri, setImageUri] = useState();
    const [focused, setFocused] = useState(false)
    const [error, setError] = useState("All fields are required *");

    const currentUser = Firebase.auth().currentUser.uid;

    useEffect(() => {
        if (props.navigation.state.params) {
            const { key, mode } = props.navigation.state.params;
            getProperty(key, mode);
        }
    }, [])

    useEffect(() => {
        let _canAddProperty = rent != null && bond != null && propertyType != null && imageUri != null && !isLoading;
        if (canAddProperty !== _canAddProperty) {
            setCanAddProperty(_canAddProperty);
        }
    }, [rent, bond, propertyType, isLoading, imageUri]);

    getProperty = (key, mode) => {
        console.log(key, "ADD properties on edit click", currentUser)
        getPropertyById(currentUser, key).then((data) => {
            setPropertyFields(data, mode);
            console.log(data, "addProperty")

        }).catch((error) => console.log(error));
    }

    selectPropertyImage = () => {
        ImagePicker.showImagePicker({ noData: true, mediaType: 'photo' }, (response) => {
            setImageUri(response.uri);
            setImageFileName(response.fileName)
        })
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
        setStep(AddProperty.PROPERTY_DETAILS)
    }

    onDestinationQueryChange = (destination) => {
        setDestination(destination);
        getGooglePlaceAutocomplete(destination)
            .then((json) => {
                if (json.status === "OK") {
                    setPrediction(json.predictions);
                } else {
                    let errorMessage = parseMapApiError(json);
                    Alert.alert(errorMessage);
                }
            })
            .catch(error => setError(error))
    };

    getPostalCode = (json) => {
        const addressComponents = json.result.address_components;
        for (let i = 0; i < addressComponents.length; i++) {
            const typesArray = addressComponents[i].types;
            for (let j = 0; j < typesArray.length; j++) {
                if (typesArray[j].toString() === "postal_code") {
                    const postalCode = addressComponents[i].long_name;
                    console.log("postal code = ", postalCode)
                }
                if (typesArray[j].toString() === "locality") {
                    const locality = addressComponents[i].long_name;
                    console.log("locality  = ", locality)
                }
            }
        }
    }

    loadCoordinatesByPlaceId = (placeId) => {
        getGooglePlaceDetails(placeId)
            .then((json) => {
                if (json.status === "OK") {
                    setLatitude(json.result.geometry.location.lat);
                    setLongitude(json.result.geometry.location.lng);
                    setPropertyDescriptionView(true);
                } else {
                    let errorMessage = parseMapApiError(json);
                    Alert.alert(errorMessage)
                }
            })
            .catch(error => { console.log(JSON.stringify(json.status), "then"); setError(error) })
    }

    handleOnPropertyTypeChange = (value) => {
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
    }

    setPropertyFields = (data, mode) => {
        if (mode === "EDIT") {
            setEditMode(true)
        }
        handleOnPropertyTypeChange(data.propertyType);
        setAddress(data.address);
        setBond(data.bond);
        setRent(data.rent);
        setBathroom(data.bathroom);
        setBedroom(data.bedroom);
        setUnitNumber(data.unitNumber);
        setLatitude(data.lat);
        setLongitude(data.lng);
        setPropertyDescriptionView(true);
    }

    clearFields = () => {
        setp(null)
        setDestination('');
        setAddress([]);
        setBond(1);
        setRent(1);
        setBathroom(1);
        setBedroom(1);
        setUnitNumber('');
        setImageUri()
    }

    handleAddProperty = () => {
        setIsLoading(true);
        let property, userDb;
        getDownloadImageUrl(imageUri, imageFileName)
            .then((url) => {
                property = new Property(address, unitNumber, bedroom, bathroom, propertyType,
                    rent, bond, url, latitude, longitude)
                userDb = 'property';
                let propertyDbRef = Firebase.database().ref().child(userDb + '/' + currentUser)
                propertyDbRef.push(property)
                    .then(() => {
                        clearFields();
                        setStep(AddProperty.ADD_PROPERTY_SUCCESS);
                    })
                    .catch(error => {
                        errorMessage = setError(parseFirebaseError(error))
                        setError(errorMessage)
                    });
            })
            .catch(error => {
                let errorMessage = parseFirebaseError(error);
                setError(errorMessage);
            })
            .finally(() => {
                setIsLoading(false)
            });
    }
    onFocusedChange = () => {
        setFocused(true)
    }

    const suggestionView = predictions.map(item =>
        <TouchableOpacity
            style={styles.suggestion}
            onPress={() => this.onPredictionSelected(item)}>
            <Icon name='location' type='evilicon' size={36} color={colors.green} />
            <Text key={item.id} style={{ fontSize: 16 }}> {item.description}</Text>
        </TouchableOpacity >
    )

    let errorView = error ? <Text style={{ marginBottom: 5, fontSize: 16, color: colors.textColorError }}>{error}</Text> : null;

    view = isLoading ? <ActivityIndicator style={{ flex: 1, justifyContent: 'center', height: 600 }} size="large" color={colors.green} /> : step === AddProperty.PROPERTY_DETAILS ?
        <View style={{ marginTop: 10 }}>
            {
                !editMode ?
                    <View style={{ marginTop: 10 }}>
                        <Input
                            placeholder='Type here..'
                            leftIcon={focused ?
                                <Icon
                                    type='evilicon'
                                    name='chevron-left'
                                    size={36}
                                    color={colors.blue}
                                    onPress={() => props.navigation.goBack()}
                                /> :
                                <Icon
                                    type='evilicon'
                                    name='navicon'
                                    size={36}
                                    onPress={() => props.navigation.toggleDrawer()}
                                    color={colors.primary}
                                />
                            }
                            onFocus={onFocusedChange}
                            onChangeText={destination => this.onDestinationQueryChange(destination)}
                            value={destination}
                        />

                        {suggestionView}
                    </View> : null}

            {propertyDescriptionView ?
                <View>
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

                    <View style={styles.containerLeft}>

                        <View style={styles.containerFlexRow}>
                            <Icon name='location' type='evilicon' size={36} color={colors.green} />
                            <Text style={styles.textSubHeading}>{address}</Text>
                        </View>

                        {errorView}

                        <View style={styles.inputBoxFull}>
                            <Picker
                                mode="dropdown"
                                selectedValue={propertyType === null ? "Select property type.." : propertyType}
                                onValueChange={(itemValue) => handleOnPropertyTypeChange(itemValue)}>
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
                                onChangeText={(unitNumber) => setUnitNumber(unitNumber)}
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
                            <Label style={{ fontSize: 18, }}>{bedroom}</Label>
                        </View>
                        <Slider
                            style={{ width: '100%', height: 40 }}
                            minimumValue={1}
                            maximumValue={5}
                            step={1}
                            maximumTrackTintColor={colors.darkWhite2}
                            minimumTrackTintColor={colors.primary}
                            value={bedroom}
                            onValueChange={value => setBedroom(value)}
                        />

                        <View style={styles.containerFlexRow}>
                            <Label style={{ flex: 1 }}>Number of Bathroom</Label>
                            <Label style={{ fontSize: 18 }} >{bathroom}</Label>
                        </View>
                        <Slider
                            style={{ width: '100%', height: 40 }}
                            minimumValue={1}
                            maximumValue={5}
                            step={1}
                            maximumTrackTintColor={colors.darkWhite2}
                            minimumTrackTintColor={colors.primary}
                            value={bathroom}
                            onValueChange={value => setBathroom(value)}
                        />

                        {
                            imageUri &&
                            <Image source={{ uri: imageUri }} style={{ width: '100%', height: 100, resizeMode: 'contain' }} />
                        }

                        <TouchableOpacity
                            onPress={this.selectPropertyImage}
                            style={{ justifyContent: 'flex-start', flexDirection: 'row', alignContent: 'center', margin: 10 }} >
                            <Text style={{ color: colors.primary, fontSize: 18 }}>Choose image..</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.handleAddProperty}
                            disabled={!canAddProperty}>
                            <Text style={canAddProperty ? styles.buttonText : styles.buttonTextDisabled}>Add Property </Text>

                        </TouchableOpacity>

                    </View>
                </View> : null}

        </View > : step === AddProperty.ADD_PROPERTY_SUCCESS ?
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

            </Container> : null;

    return (
        <SafeAreaView>
            <ScrollView >
                <View style={{ flex: 1, width: '100%' }}>
                    {view}
                </View >
            </ScrollView>
        </SafeAreaView >
    )
}

export default AddNewProperty;

