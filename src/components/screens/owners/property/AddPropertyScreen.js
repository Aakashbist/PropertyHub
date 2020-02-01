import { once } from 'lodash';
import moment from 'moment';
import { Container, Label, Picker } from 'native-base';
import React, { Fragment, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, DatePickerAndroid, FlatList, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Avatar, Divider, Icon, Overlay, SearchBar, Slider } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { getCurrentUser } from '../../../../config/Firebase';
import { Property } from '../../../../models/propertyModels';
import AppRoute from '../../../../resources/appRoute';
import colors from '../../../../resources/colors';
import PropertyType from '../../../../resources/propertyType';
import styles from '../../../../resources/styles';
import { getGooglePlaceAutocomplete, getGooglePlaceDetails } from '../../../services/GoogleService';
import { createProperty, getPropertyById, getUsersWhoAppliedProperty, leaseProperty, updateProperty } from '../../../services/PropertyService';
import { createRentHistory } from '../../../services/RentService';
import { getDownloadUrl } from '../../../services/UploadService';
import { getUserById } from '../../../services/UserService';
import parseFirebaseError from '../../../errorParser/FirebaseErrorParser';
import { getNameInitials } from '../../../utils/TextUtils';

const AddProperty = {
    PROPERTY_DETAILS: 0,
    ADD_PROPERTY_SUCCESS: 1
};

const AddNewProperty = (props) => {

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [destination, setDestination] = useState('');
    const [step, setStep] = useState(AddProperty.PROPERTY_DETAILS);
    const [predictions, setPrediction] = useState([]);
    const [unitContent, setUnitContent] = useState(false);
    const [value, setValue] = useState(false);
    const [propertyDescriptionView, setPropertyDescriptionView] = useState(false);
    const [placeId, setPlaceID] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [propertyType, setPropertyType] = useState(null);
    const [canAddProperty, setCanAddProperty] = useState('');
    const [unitNumber, setUnitNumber] = useState('');
    const [bond, setBond] = useState();
    const [rent, setRent] = useState();
    const [bedroom, setBedroom] = useState(1);
    const [bathroom, setBathroom] = useState(1);
    const [address, setAddress] = useState([]);
    const [imageFileName, setImageFileName] = useState();
    const [imageUri, setImageUri] = useState();
    const [propertyKey, setPropertyKey] = useState();
    const [propertyDescription, setPropertyDescription] = useState();
    const [error, setError] = useState();

    // leased User data
    const [leased, setLeased] = useState(false);
    const [showLeasedUserPicker, setShowLeasedUserPicker] = useState(false);
    const [interstedUsers, setInterestedUsers] = useState([]);
    const [appliers, setAppliers] = useState([]);
    const [leasedStartDate, setLeasedStartDate] = useState();
    const [leasedEndDate, setLeasedEndDate] = useState();
    const [canLeasedProperty, setCanLeasedProperty] = useState('');

    const currentUser = getCurrentUser().uid;

    useEffect(() => {
        if (props.navigation.state.params) {
            const { key, mode } = props.navigation.state.params;
            getProperty(key, mode);
            getUsersWhoAppliedProperty(key)
                .then((data) => {
                    setAppliers(data)
                })
                .catch((error) => setError(error));
        }
        return () => setShowLeasedUserPicker(false);
    }, []);

    useEffect(() => {
        alert(error);
    }, [error]);


    useEffect(() => {
        let _canAddProperty = rent !== null && bond !== null && propertyType !== null && propertyDescription !== null && imageUri !== null && !isLoading;
        if (canAddProperty !== _canAddProperty) {
            setCanAddProperty(_canAddProperty);
        }
    }, [rent, bond, propertyType, isLoading, imageUri]);

    getProperty = (key, mode) => {
        getPropertyById(key).then((data) => {
            setPropertyFields(data, mode, key);

        }).catch((error) => console.log(error));
    };


    getProperty = (key, mode) => {
        getPropertyById(key).then((data) => {
            setPropertyFields(data, mode, key);

        }).catch((error) => console.log(error));
    };

    selectPropertyImage = () => {
        ImagePicker.showImagePicker({ noData: true, mediaType: 'photo' }, (response) => {
            setImageUri(response.uri);
            console.log(response.uri);
            setImageFileName(response.fileName);
        });
    };

    onPredictionSelected = place => {
        setDestination(place.description);
        setPlaceID(place.place_id);
        setAddress(place.description);
        setPrediction([]);
        loadCoordinatesByPlaceId(place.place_id);
    };

    unitInputBoxShow = () => {
        setValue(!value);
        setUnitContent(!unitContent);
    };

    navigateToPropertyList = () => {
        props.navigation.navigate(AppRoute.PropertyList);
        setStep(AddProperty.PROPERTY_DETAILS);
    };

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
            .catch(error => setError(error));
    };


    openDatePicker = async () => {
        try {
            var today = moment()
            var dateAfterSixMonth = moment(today).add(6, "months").toDate();
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date(),
                minDate: new Date(),
                maxDate: dateAfterSixMonth
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                var startOfLeased = moment([year, month, day]).format('ll');
                var endOfLeased = moment(startOfLeased).add(6, "months").format('ll');
                setLeasedStartDate(startOfLeased);
                setLeasedEndDate(endOfLeased);
                setError(undefined);
            }

        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
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
                    Alert.alert(errorMessage);
                }
            })
            .catch(error => setError(error));
    };

    handleOnPropertyTypeChange = (value) => {
        switch (value) {
            case PropertyType.APARTMENT:
                setPropertyType(PropertyType.APARTMENT);
                setUnitContent(true);
                break;
            case PropertyType.HOUSE:
                setPropertyType(PropertyType.HOUSE);
                setUnitContent(false);
                break;
            case PropertyType.UNIT:
                setPropertyType(PropertyType.UNIT);
                setUnitContent(true);
                break;
            default:
                setPropertyType(null);
                setUnitContent(false);
                break;
        }
    };

    setPropertyFields = (data, mode, key) => {
        if (mode === "EDIT") {
            setEditMode(true);
            setPropertyKey(key);
            handleOnPropertyTypeChange(data.propertyType);
            setAddress(data.address);
            setBond(data.bond);
            setRent(data.rent);
            setBathroom(data.bathroom);
            setBedroom(data.bedroom);
            setUnitNumber(data.unitNumber);
            setLeased(data.leased);
            setLatitude(data.lat);
            setLongitude(data.lng);
            setPropertyDescriptionView(true);
            setImageUri(data.imageUrl);
            setPropertyDescription(data.propertyDescription);
            setLeased(data.leased);
        }
    };

    clearFields = () => {
        setPropertyType(null);
        setDestination('');
        setAddress([]);
        setBond(1);
        setRent(1);
        setBathroom(1);
        setBedroom(1);
        setUnitNumber('');
        setImageUri();
        setPropertyDescription();
        setPropertyDescriptionView(false);
    };

    handleAddProperty = () => {
        setIsLoading(true);
        let property;
        getDownloadUrl(imageUri, imageFileName)
            .then((url) => {
                property = new Property(leased, address, unitNumber, bedroom, bathroom, propertyType, propertyDescription,
                    rent, bond, url, latitude, longitude, currentUser);
                return createProperty(property)
            })
            .then((key) => {
                setStep(AddProperty.ADD_PROPERTY_SUCCESS);
            })
            .catch(error => {
                let errorMessage = parseFirebaseError(error);
                setError(errorMessage);
            })
            .finally(() => {
                clearFields();
                setIsLoading(false);
            });
    };

    handleUpdateProperty = () => {
        setIsLoading(true);
        let property;
        property = new Property(leased, address, unitNumber, bedroom, bathroom, propertyType, propertyDescription,
            rent, bond, imageUri, latitude, longitude, currentUser);
        setIsLoading(false);
        updateProperty(property, propertyKey)
            .then(navigateToPropertyList())
            .catch(error => {
                let errorMessage = parseFirebaseError(error);
                setError(errorMessage);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    onMarkAsLeasedClicked = () => {
        if (leasedStartDate !== undefined) {
            if (appliers) {
                let promises = [];

                appliers.forEach(item => {
                    promises.push(getUserById(item.applicatorId));
                });

                Promise.all(promises)
                    .then((value) => {
                        console.log(value, "values sss");
                        setInterestedUsers(value);
                        setShowLeasedUserPicker(true);
                    })
                    .catch((error) => setError(error));
            }
        }
        else {
            setError("please choose Leased Start date")
        }
    }
    onSetLeasedUser = (userId) => {
        const { key, mode } = props.navigation.state.params;
        leaseProperty(key, userId).then(() => {
            setShowLeasedUserPicker(false);
        });
    }

    createLeasedProperty = (tenantId) => {
        setShowLeasedUserPicker(false);
        const property = {
            leased: true
        }
        initiateRentHistory(tenantId);
        updateProperty(property, propertyKey)
            .then(() => {
                leaseProperty(propertyKey, tenantId, leasedStartDate, leasedEndDate)
                    .then(() => props.navigation.navigate(AppRoute.PropertyList));
            })
            .catch(error => console.log(error))

    }

    onFocusedChange = () => {
        setFocused(true);
    };

    initiateRentHistory = (tenantId) => {
        createRentHistory(propertyKey, tenantId, leasedStartDate);
    }

    const suggestionView = predictions.map(item =>
        <TouchableOpacity
            style={styles.suggestion}
            onPress={() => this.onPredictionSelected(item)}>
            <Icon name='location' type='evilicon' size={36} color={colors.green} />
            <Text key={item.id} style={{ fontSize: 16 }}> {item.description}</Text>
        </TouchableOpacity >
    );

    var searchBarAndSuggestions = <View>
        <SearchBar
            placeholder="Type Here..."
            onChangeText={destination => this.onDestinationQueryChange(destination)}
            value={destination}
            lightTheme={true}
            platform="android"
        />
        {suggestionView}
    </View>;

    var markAsLeased = (editMode && step === AddProperty.PROPERTY_DETAILS && appliers.length > 0) ? (
        <React.Fragment>
            <TouchableOpacity
                style={[leased ? styles.buttonDisabled : styles.button, { alignSelf: 'center' }]}
                onPress={this.onMarkAsLeasedClicked}
                disabled={leased}
            >
                <Text style={leased ? styles.buttonTextDisabled : styles.buttonText}>Mark As Leased</Text>
            </TouchableOpacity>
            <Overlay
                isVisible={showLeasedUserPicker}
                onBackdropPress={() => setShowLeasedUserPicker(false)}
                windowBackgroundColor="rgba(255, 255, 255, .5)"
                onRequestClose={() => setShowLeasedUserPicker(false)}
                overlayBackgroundColor={colors.white}
                height={200}>
                <View style={{ flex: 1, flexShrink: 1 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ flex: 1, fontSize: 24, flexGrow: 1 }}> Choose a tenant </Text>
                        <Icon name='close' type='evilicon' size={36} color={colors.primaryDark} onPress={() => setShowLeasedUserPicker(false)} />
                    </View>
                    {interstedUsers && <FlatList
                        style={styles.cardContainer}
                        data={interstedUsers}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View >
                                <TouchableOpacity
                                    onPress={() => createLeasedProperty(item.id)}
                                    style={{ flex: 1, flexDirection: 'row', alignContent: 'center', padding: 16 }}>
                                    <Avatar rounded
                                        overlayContainerStyle={{ backgroundColor: colors.primaryDark }}
                                        title={getNameInitials(item.name)} containerStyle={{ marginRight: 16 }} />
                                    <Text style={[styles.textSubHeading, {
                                        alignSelf: 'center',
                                        fontWeight: 'bold',
                                        fontSize: 16,
                                        flex: 1
                                    }]}>{item.name}</Text>
                                </TouchableOpacity>
                                <Divider />
                            </View>
                        )}
                    />}
                </View>
            </Overlay>
        </React.Fragment>
    ) : null;

    var view = null;
    if (isLoading) {
        view = <ActivityIndicator
            style={{ flex: 1, justifyContent: 'center', height: 600 }}
            size="large" color={colors.green} />;
    } else {
        switch (step) {
            case AddProperty.PROPERTY_DETAILS:
                view = <View>
                    {!editMode ? searchBarAndSuggestions : null}

                    {propertyDescriptionView ?
                        <View>
                            <MapView
                                style={styles.map}
                                provider={PROVIDER_GOOGLE}
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

                            <View style={[styles.containerLeft, { paddingHorizontal: 16 }]}>
                                <View style={{ marginVertical: 32, alignSelf: 'stretch', justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Icon name='location' type='evilicon' size={36} color={colors.secondary} iconStyle={{ marginEnd: 16 }} />
                                    <Text style={[styles.textSubHeading, { flexShrink: 1 }]}>{address}</Text>
                                </View>

                                <View style={styles.inputBoxFull}>
                                    <Picker
                                        mode="dropdown"
                                        enabled={editMode ? false : true}
                                        selectedValue={propertyType === null ? "Property type" : propertyType}
                                        onValueChange={(itemValue) => handleOnPropertyTypeChange(itemValue)}>
                                        <Picker.Item label="Property type" value={null} />
                                        <Picker.Item label="Unit" value={PropertyType.UNIT} />
                                        <Picker.Item label="House" value={PropertyType.HOUSE} />
                                        <Picker.Item label="Apartment" value={PropertyType.APARTMENT} />
                                    </Picker>
                                </View>

                                {
                                    unitContent ? <TextInput
                                        style={styles.inputBoxFull}
                                        keyboardType='number-pad'
                                        value={unitNumber}
                                        onChangeText={(unitNumber) => setUnitNumber(unitNumber)}
                                        placeholder='Flat/Unit Number'
                                        autoCapitalize='none' /> : null
                                }

                                <TextInput
                                    style={styles.inputBoxFull}
                                    multiline={true}
                                    value={propertyDescription}
                                    onChangeText={(description) => setPropertyDescription(description)}
                                    placeholder='Description'
                                    autoCapitalize='none'

                                />

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
                                    <Label style={[styles.overline, { flex: 1 }]}>Bedrooms</Label>
                                    <Label style={styles.overline}>{bedroom}</Label>
                                </View>

                                <Slider
                                    style={{ width: '100%', height: 40 }}
                                    minimumValue={1}
                                    maximumValue={5}
                                    step={1}
                                    maximumTrackTintColor={colors.darkWhite2}
                                    minimumTrackTintColor={colors.secondary}
                                    thumbTintColor={colors.secondary}
                                    value={bedroom}
                                    onValueChange={value => setBedroom(value)}
                                />

                                <View style={styles.containerFlexRow}>
                                    <Label style={[styles.overline, { flex: 1 }]}>Bathrooms</Label>
                                    <Label style={styles.overline} >{bathroom}</Label>
                                </View>

                                <Slider
                                    style={{ width: '100%', height: 40 }}
                                    minimumValue={1}
                                    maximumValue={5}
                                    step={1}
                                    maximumTrackTintColor={colors.darkWhite2}
                                    minimumTrackTintColor={colors.secondary}
                                    thumbTintColor={colors.secondary}
                                    value={bathroom}
                                    onValueChange={value => setBathroom(value)}
                                />

                                {
                                    imageUri &&
                                    <Image source={{ uri: imageUri }} style={{ width: '100%', height: 100, resizeMode: 'contain' }} />
                                }
                                {editMode ?
                                    <Fragment>
                                        <View style={[styles.containerFlexRow, { alignContent: 'center' }]}>
                                            <TouchableOpacity
                                                style={[leased ? styles.buttonDisabled : styles.button, { alignSelf: 'center', marginRight: 4 }]}
                                                onPress={this.openDatePicker}
                                                disable={leased}>
                                                <Text style={leased ? styles.buttonTextDisabled : styles.buttonText}>Leased From</Text>
                                            </TouchableOpacity>
                                            {markAsLeased}
                                        </View>
                                        <View style={[styles.containerFlexRow, { alignContent: 'center' }]}>
                                            {
                                                leasedStartDate !== undefined &&
                                                <Label style={{ color: colors.success, fontSize: 15 }}> Leasing From: {leasedEndDate}</Label>
                                            }{
                                                error &&
                                                < Label style={{ color: colors.danger, fontSize: 15 }}>{error}</Label>
                                            }
                                        </View>
                                        <TouchableOpacity
                                            style={[styles.button, { alignSelf: 'center' }]}
                                            onPress={this.handleUpdateProperty}>
                                            <Text style={styles.buttonText}>Update Property </Text>
                                        </TouchableOpacity>
                                    </Fragment> :
                                    <Fragment>
                                        <TouchableOpacity
                                            onPress={this.selectPropertyImage}
                                            style={{ justifyContent: 'flex-start', flexDirection: 'row', alignContent: 'center', margin: 10 }} >
                                            <Text style={{ color: colors.primary, fontSize: 18 }}>Add a photo</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[canAddProperty ? styles.button : styles.buttonDisabled, { alignSelf: 'center' }]}
                                            onPress={this.handleAddProperty}
                                            disabled={!canAddProperty}>
                                            <Text style={canAddProperty ? styles.buttonText : styles.buttonTextDisabled}>Add Property </Text>
                                        </TouchableOpacity>
                                    </Fragment>
                                }

                            </View>
                        </View> : null
                    }
                </View >
                break;
            case AddProperty.ADD_PROPERTY_SUCCESS:
                view = <Container style={styles.containerFull}>
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
                break;
        }
    }

    return (
        <ScrollView >
            <SafeAreaView>
                <View style={{ flex: 1 }}>
                    {view}

                </View >
            </SafeAreaView>
        </ScrollView >
    );
};

export default AddNewProperty;

