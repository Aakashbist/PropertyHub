import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import styles from '../../../resources/styles';
import { getPropertyById } from '../../services/PropertyService';
import { getOwnerById } from '../../services/UserService';
import { Header, Image, Button, Icon, Divider, Badge, Avatar } from 'react-native-elements';
import colors from '../../../resources/colors';
import AppRoute from '../../../resources/appRoute';
import { getNameInitials } from '../../utils/TextUtils';

const PropertyDetails = (props) => {
    const [property, setProperty] = useState(undefined);
    const [owner, setOwner] = useState(undefined);
    const [error, setError] = useState();

    useEffect(() => {
        const { propertyId } = props.navigation.state.params;
        if (propertyId) {
            getPropertyById(propertyId)
                .then((property) => {
                    console.log("prop", property)
                    setProperty(property);
                    return getOwnerById(property.ownerId);
                })
                .then((owner) => {
                    console.log(owner, 'ower');
                    setOwner(owner)
                })
                .catch((error) => {
                    console.log("null", error)
                    setError(error);
                })
        }
    }, []);


    const view = property ?
        <View style={[styles.containerFull, { paddingBottom: 80 }]}>
            <View style={styles.card}>
                <Image
                    style={[styles.cardImage, { resizeMode: 'cover' }]}
                    source={{ uri: property.imageUrl }}
                    PlaceholderContent={<ActivityIndicator />}
                />
            </View>

            <View style={{ marginHorizontal: 24, alignSelf: 'stretch' }}>

                <View style={{ marginVertical: 16, alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name='map-marker' type='font-awesome' size={28} color={colors.secondary} iconStyle={{ marginEnd: 16, width: 40 }} />
                    <Text style={[styles.textSubHeading, { flexShrink: 1 }]}>{property.address}</Text>
                </View>

                <View style={{ marginVertical: 16, alignSelf: 'stretch', flexDirection: 'row' }}>
                    <View style={{ justifyContent: 'center', alignSelf: 'center', flex: 1, flexDirection: 'row' }}>
                        <Icon name='bed' type='font-awesome' size={28} color={colors.secondary} iconStyle={{ marginEnd: 16, width: 40 }} />
                        <Text style={[styles.textSubHeading, { flexShrink: 1 }]}>{property.bedroom}</Text>
                    </View>

                    <View style={{ justifyContent: 'center', flex: 1, flexDirection: 'row' }}>
                        <Icon name='bath' type='font-awesome' size={24} color={colors.secondary} iconStyle={{ marginEnd: 16, width: 40 }} />
                        <Text style={[styles.textSubHeading, { flexShrink: 1 }]}>{property.bathroom}</Text>
                    </View>
                </View>

                <Divider style={{ marginVertical: 16 }} />
                <Text style={styles.overline}>Fixed Initial Bond</Text>
                <Text style={[styles.textSubHeading, { fontWeight: 'bold', fontSize: 32 }]}>${property.bond}</Text>

                <Divider style={{ marginVertical: 16 }} />
                <Text style={styles.overline}>Rented Weekly</Text>
                <Text style={[styles.textSubHeading, { fontWeight: 'bold', fontSize: 32 }]}>${property.rent}</Text>

                <Divider style={{ marginVertical: 16 }} />
                <Text style={styles.overline}>Description</Text>
                <Text style={[styles.textSubHeading, { fontWeight: 'bold', fontSize: 18, flexShrink: 1, marginTop: 8 }]}>{property.propertyDescription}</Text>

                {owner && <View>
                    <Divider style={{ marginVertical: 16 }} />
                    <Text style={styles.overline}>Property Owner</Text>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 8 }}>
                        <Avatar rounded size="medium"
                            title={getNameInitials(owner.name)} containerStyle={{ marginRight: 10 }} />
                        <Text style={[styles.textSubHeading, {
                            alignSelf: 'center',
                            fontWeight: 'bold',
                            fontSize: 24,
                            flex: 1,
                            marginTop: 8
                        }]}>{owner.name}</Text>
                        <Icon name='comments' type='font-awesome' size={24} color={colors.secondary}
                            containerStyle={{ alignSelf: 'center' }} onPress={() => props.navigation.navigate(AppRoute.ChatRoom, { key: owner.id, title: owner.name })} />
                    </View>
                </View>
                }

                <Divider style={{ marginTop: 16, marginBottom: 40 }} />

                <TouchableOpacity
                    style={[styles.button, { alignSelf: 'center' }]}
                // onPress={this.handleAddProperty}
                >
                    <Text style={styles.buttonText}>Apply Property</Text>
                </TouchableOpacity>
            </View>
        </View > : <ActivityIndicator size="large" color={colors.primary} />;

    return (
        <View>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
                <View>
                    {view}
                </View>
            </ScrollView>
        </View>
    );
}

PropertyDetails.navigationOptions = (props) => ({
    title: 'Details',
    headerStyle: {
        backgroundColor: colors.primary,
    },
    headerTintColor: colors.white,
});


export default PropertyDetails;