import React, { useEffect, useState } from 'react';
import { Button, Text, View, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import styles from '../../../resources/styles';
import { getAnyPropertyById } from '../../services/PropertyService';
import { Header, Image } from 'react-native-elements';
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
                    style={[styles.cardImage, { height: 400, resizeMode: 'stretch' }]}
                    source={{ uri: property.imageUrl }}
                    PlaceholderContent={<ActivityIndicator />}
                />
            </View>
            <Text>{property.address}</Text>
            <Button title='open drawer' onPress={() => props.navigation.toggleDrawer()} />
        </View > : <ActivityIndicator size="large" color={colors.primary} />;

    return (
        <View>
            <Header
                barStyle="light-content"
                backgroundColor={colors.blue}
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