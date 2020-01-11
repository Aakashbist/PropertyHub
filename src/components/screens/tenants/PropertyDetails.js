import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import styles from '../../../resources/styles';
import { getAnyPropertyById } from '../../services/PropertyService';
import { Header, Image, Button, Icon, Divider } from 'react-native-elements';
import colors from '../../../resources/colors';

const PropertyDetails = (props) => {
    const [property, setProperty] = useState(undefined);
    const [error, setError] = useState();

    useEffect(() => {
        const { propertyId } = props.navigation.state.params;
        if (propertyId) {
            getAnyPropertyById(propertyId)
                .then((property) => {
                    console.log("prop", property)
                    setProperty(property);
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
                    <View style={{ marginRight: 60, alignSelf: 'stretch', flexDirection: 'row' }}>
                        <Icon name='bed' type='font-awesome' size={28} color={colors.secondary} iconStyle={{ marginEnd: 16, width: 40 }} />
                        <Text style={[styles.textSubHeading, { flexShrink: 1 }]}>{property.bedroom}</Text>
                    </View>

                    <View style={{ alignSelf: 'stretch', flexDirection: 'row' }}>
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
            <Header
                barStyle="light-content"
                containerStyle={{ borderBottomColor: colors.primaryDark }}
                backgroundColor={colors.primary}
                placement="left"
                leftComponent={{ icon: 'arrow-back', type: 'material', color: colors.white, onPress: () => props.navigation.pop() }}
                centerComponent={{ text: 'Details', style: { fontSize: 20, color: colors.white } }}
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
                <View>
                    {view}
                </View>
            </ScrollView>
        </View>
    );
}

export default PropertyDetails;