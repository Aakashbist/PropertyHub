import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View, TouchableOpacity, Alert } from 'react-native';
import { ButtonGroup, Icon } from 'react-native-elements';
import Firebase from '../../../../config/Firebase';
import AppRoute from '../../../../resources/appRoute';
import colors from '../../../../resources/colors';
import styles from '../../../../resources/styles';
import { getProperties, deletePropertiesWithId } from '../../../firebase/PropertyRepository';


const PropertyListScreen = (props) => {
    const [properties, setProperties] = useState([]);
    const currentUser = Firebase.auth().currentUser.uid;


    setPropertiesInState = (propertiesList) => {
        setProperties(propertiesList);
        console.log("from setPropertiesState", propertiesList);
    }

    getListofProperties = () => {
        if (currentUser !== null) {
            getProperties(currentUser, setPropertiesInState)

        }
    };
    useEffect(() => {
        getListofProperties();
    }, [])

    deleteProperties = (propertyId) => {
        Alert.alert(
            'Delete Address',
            'Are you sure want to delete this address ?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'OK', onPress: () => deletePropertiesWithId(currentUser, propertyId)
                        .catch(error => console.log(error))
                },
            ],
            { cancelable: false }
        )
    }
    let view = properties == null ? <View style={styles.container}>
        <Text style={{ fontSize: 18 }}> No available  properties </Text>
    </View> :
        <FlatList
            style={styles.cardContainer}
            data={properties}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    <Image style={styles.cardImage} source={{ uri: item.imageUrl }} />
                    <View style={styles.containerFlexRow}>
                        <Text style={{ flex: 1, fontSize: 16 }}>{item.address}</Text>
                        <TouchableOpacity onPress={() => this.deleteProperties(item.id)}>
                            <Icon name='trash' type='evilicon' size={36} color={colors.red} />
                        </TouchableOpacity>

                    </View>
                    <Text style={styles.cardText}>${item.rent}</Text>
                </View>
            )}
        />

    return (
        <View style={styles.containerFull} >
            {view}
        </View>
    )
}
export default PropertyListScreen;