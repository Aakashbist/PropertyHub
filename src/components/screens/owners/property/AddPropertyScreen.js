
import { Container, Label, Picker, Input } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
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
import { getGooglePlaceAutocomplete, getGooglePlaceDetails } from '../../../services/GoogleService';
import { getdownloadImageUrl } from '../../../services/imageUploadService';


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
    const [bond, setBond] = useState();
    const [rent, setRent] = useState();
    const [numberOfBedrooms, setNumberOfBedrooms] = useState(1);
    const [numberOfBathrooms, setNumberOfBathrooms] = useState(1);
    //const [imageUrl, setImageUrl] = useState();
    const [address, setAddress] = useState([])
    const [imageFileName, setImageFileName] = useState();
    const [imageUri, setImageUri] = useState();


    useEffect(() => {
        let _canAddProperty = rent != null && bond != null && propertyType !== null;
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
                setImageUri(response.uri);
                setImageFileName(response.fileName)
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
        setStep(AddProperty.PROPERTY_DETAILS)
    }

    onDestinationQueryChange = (destination) => {
        setDestination(destination);
        getGooglePlaceAutocomplete(destination)
            .then((json) => {
                setPrediction(json.predictions);
            })
            .catch(error => console.log(error))
    };

    loadCoordinatesByPlaceId = (placeId) => {
        getGooglePlaceDetails(placeId)
            .then((json) => {
                setLatitude(json.result.geometry.location.lat);
                setLongitude(json.result.geometry.location.lng);
                setpropertyDescriptionView(true);
            })
            .catch(error => console.log(error))
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
    }

    clearFields = () => {
        setPropertyType(null)
        setDestination('');
        setAddress([]);
        setBond(1);
        setRent(1);
        setNumberOfBathrooms(1);
        setNumberOfBedrooms(1);
        setunitNumber('');
        setImageUri()
    }
    handleAddProperty = () => {
        let property, userDb;
        let currentUser = Firebase.auth().currentUser;
        getdownloadImageUrl(imageUri, imageFileName)
            .then((url) => {
                property = new Property(address, unitNumber, numberOfBedrooms, numberOfBathrooms, rent, bond, url, latitude, longitude)
                userDb = 'property';
                let propertyDbRef = Firebase.database().ref().child(userDb + '/' + currentUser.uid)
                propertyDbRef.push(property);
            }).then(() => {
                setStep(AddProperty.ADD_PROPERTY_SUCCESS)
                clearFields();

            })
            .catch(error => console.log(error));
    }

    const suggestionView = predictions.map(item =>
        <TouchableOpacity
            style={styles.suggestion}
            onPress={() => this.onPredictionSelected(item)}>
            <Text key={item.id} style={{ fontSize: 16 }}> {item.description}</Text>
        </TouchableOpacity >
    )

    let view = step === AddProperty.PROPERTY_DETAILS ?
        <View style={{ marginTop: 10 }}>
            <TextInput name="destination" style={styles.searchBox} placeholder="Enter Address"
                value={destination} onChangeText={destination => this.onDestinationQueryChange(destination)} />
            {suggestionView}
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
                            <Input
                                style={styles.inputBoxFull}
                                keyboardType='number-pad'
                                value={unitNumber}
                                onChangeText={(unitNumber) => setunitNumber(unitNumber)}
                                placeholder='Flat/Unit Number'
                                autoCapitalize='none' /> : null
                        }

                        <Input
                            style={styles.inputBoxFull}
                            value={rent}
                            keyboardType='number-pad'
                            onChangeText={(rent) => setRent(rent)}
                            placeholder='Rent Amount per Week ($)'
                            autoCapitalize='none'
                        />

                        <Input
                            style={styles.inputBoxFull}
                            value={bond}
                            keyboardType='number-pad'
                            onChangeText={(bond) => setBond(bond)}
                            placeholder='Bond Amount ($)'
                            autoCapitalize='none'
                        />

                        <View style={styles.containerFlexRow}>
                            <Label style={{ flex: 1 }}>Number of Bedroom</Label>
                            <Label style={{ fontSize: 18, }}>{numberOfBedrooms}</Label>
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
                            <Label style={{ fontSize: 18 }} >{numberOfBathrooms}</Label>
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
                            imageUri && <Image source={{ uri: imageUri }} style={{ width: '100%', height: 100, resizeMode: 'contain' }} />
                        }
                        <TouchableOpacity onPress={this.selectPropertyImage} style={{ justifyContent: 'flex-start', flexDirection: 'row', alignContent: 'center', margin: 10 }} >
                            <Text style={{ color: colors.primary, fontSize: 18 }}>Choose image..</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={this.handleAddProperty} disabled={!canAddProperty}>
                            <Text style={canAddProperty ? styles.buttonText : styles.buttonTextDisabled}>Add Property </Text>

                        </TouchableOpacity>

                    </View>
                </View> : null
            }
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
                <View style={{ flex: 1 }}>
                    <GeneralStatusBarColor backgroundColor={colors.primary} barStyle="light-content" />
                    {view}
                </View >
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddNewProperty;

