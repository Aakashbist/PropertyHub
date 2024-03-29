import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Divider, Icon, Image } from 'react-native-elements';
import { getCurrentUser } from '../../../config/Firebase';
import AppRoute from '../../../resources/appRoute';
import colors from '../../../resources/colors';
import styles from '../../../resources/styles';
import { getChatRoomId, sendMessage, shouldCreateChatHistory } from '../../services/ChatService';
import { applyForProperty, checkAlreadyApplied, getPropertyById } from '../../services/PropertyService';
import { getOwnerById } from '../../services/UserService';
import { getNameInitials } from '../../utils/TextUtils';

const PropertyDetails = props => {
    const [property, setProperty] = useState(undefined);
    const [owner, setOwner] = useState(undefined);
    const [error, setError] = useState();
    const [applied, setApplied] = useState(false);
    const [showApplyProperty, setShowApplyProperty] = useState(false);

    useEffect(() => {
        const { propertyId } = props.navigation.state.params;
        if (propertyId) {
            getPropertyById(propertyId)
                .then(property => {
                    setProperty(property);
                    return getOwnerById(property.ownerId);
                })
                .then(owner => {
                    setOwner(owner);
                })
                .catch(error => {
                    setError(error);
                });
            const userId = getCurrentUser().uid
            if (userId) {
                checkAlreadyApplied(propertyId, userId)
                    .then((applied) => {
                        setApplied(applied);
                        setShowApplyProperty(true);
                    })
                    .catch((error) => {
                        setError(error);
                        setShowApplyProperty(false);
                    });
            }
        }
    }, []);

    applyProperty = ownerId => {
        if (property) {
            const userId = getCurrentUser().uid;
            const { propertyId } = props.navigation.state.params;

            console.log(property.id, userId, propertyId, "data 3");
            applyForProperty(propertyId, userId)
                .then(() => {
                    setApplied(true);
                    return shouldCreateChatHistory(userId, ownerId);
                })
                .then(() => {
                    const message = {
                        text: `Hello ! I am interested in this property \n\n${createPropertyReference(property)}`,
                        quickReplies: {
                            type: 'radio',
                            keepIt: false,
                            values: [
                                {
                                    title: 'What documents would you need?',
                                    value: 'documents',
                                },
                                {
                                    title: '😃',
                                    value: 'smiley',
                                },
                            ],
                        },
                    };
                    const chatRoomId = getChatRoomId(userId, ownerId);

                    sendMessage([message], chatRoomId).then(() => {
                        navigateToChatRoom(owner);
                    });
                }).catch(error => {
                    setError(error);
                    alert(error);
                });
        }
    };

    navigateToChatRoom = owner => {
        props.navigation.navigate(AppRoute.ChatRoom, {
            key: owner.id,
            title: owner.name,
        });
    };

    createPropertyReference = property => {
        return property.address;
    };

    const view = property ? (
        <View style={[styles.containerFull, { paddingBottom: 80 }]}>
            <View style={styles.card}>
                <Image style={[styles.cardImage, { resizeMode: 'cover' }]} source={{ uri: property.imageUrl }} PlaceholderContent={<ActivityIndicator />} />
            </View>

            <View style={{ marginHorizontal: 24, alignSelf: 'stretch' }}>
                <View
                    style={{
                        marginVertical: 16,
                        alignSelf: 'stretch',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <Icon name="map-marker" type="font-awesome" size={28} color={colors.secondary} iconStyle={{ marginEnd: 16, width: 40 }} />
                    <Text style={[styles.textSubHeading, { flexShrink: 1 }]}>{property.address}</Text>
                </View>

                <View
                    style={{ marginVertical: 16, alignSelf: 'stretch', flexDirection: 'row' }}>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignSelf: 'center',
                            flex: 1,
                            flexDirection: 'row',
                        }}>
                        <Icon name="bed" type="font-awesome" size={28} color={colors.secondary} iconStyle={{ marginEnd: 16, width: 40 }} />
                        <Text style={[styles.textSubHeading, { flexShrink: 1 }]}>{property.bedroom}</Text>
                    </View>

                    <View style={{ justifyContent: 'center', flex: 1, flexDirection: 'row' }}>
                        <Icon name="bath" type="font-awesome" size={24} color={colors.secondary} iconStyle={{ marginEnd: 16, width: 40 }} />
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

                {owner && (
                    <View>
                        <Divider style={{ marginVertical: 16 }} />
                        <Text style={styles.overline}>Property Owner</Text>
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 8 }}>
                            <Avatar rounded size="medium" title={getNameInitials(owner.name)} containerStyle={{ marginRight: 10 }} />
                            <Text
                                style={[
                                    styles.textSubHeading,
                                    {
                                        alignSelf: 'center',
                                        fontWeight: 'bold',
                                        fontSize: 24,
                                        flex: 1,
                                        marginTop: 8,
                                    },
                                ]}>
                                {owner.name}
                            </Text>
                            <Icon
                                name="comments"
                                type="font-awesome"
                                size={24}
                                color={colors.secondary}
                                containerStyle={{ alignSelf: 'center' }}
                                onPress={() => this.navigateToChatRoom(owner)}
                            />
                        </View>

                        <Divider style={{ marginTop: 16, marginBottom: 40 }} />

                        {
                            showApplyProperty && applied &&
                            <TouchableOpacity style={[styles.buttonDisabled, { alignSelf: 'center' }]} onPress={() => this.applyProperty(owner.id)}>
                                <Text style={styles.buttonTextDisabled}>Application Sent</Text>
                            </TouchableOpacity>
                        }
                        {
                            showApplyProperty && !applied &&
                            <TouchableOpacity style={[styles.button, { alignSelf: 'center' }]} onPress={() => this.applyProperty(owner.id)}>
                                <Text style={styles.buttonText}>Apply Property</Text>
                            </TouchableOpacity>
                        }
                    </View>
                )}
            </View>
        </View>
    ) : (
            <ActivityIndicator size="large" color={colors.primary} />
        );

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps={'always'} keyboardDismissMode={'on-drag'}>
            <View>{view}</View>
        </ScrollView>
    );
};

PropertyDetails.navigationOptions = props => ({
    title: 'Details',
    headerStyle: {
        backgroundColor: colors.primary,
    },
    headerTintColor: colors.white,
});

export default PropertyDetails;
