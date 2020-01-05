import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import Firebase from '../../../../config/Firebase';
import AppRoute from '../../../../resources/appRoute';
import colors from '../../../../resources/colors';
import styles from '../../../../resources/styles';
import { deletePropertiesWithId, propertyReference } from '../../../services/PropertyService';
import parseFirebaseError from '../../../errorParser/FirebaseErrorParser';
import { Header } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

const PropertyListScreen = (props) => {
    const [properties, setProperties] = useState([]);

    const currentUser = Firebase.auth().currentUser.uid;

    setPropertiesInState = (propertiesList) => {
        setProperties(propertiesList);
    }

    getListofProperties = () => {
        if (currentUser !== null) {
            propertyReference(currentUser, setPropertiesInState)
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
                { text: 'Cancel' },
                {
                    text: 'OK', onPress: () => deletePropertiesWithId(currentUser, propertyId)
                        .catch(error => {
                            errorMessage = parseFirebaseError(error);
                            Alert.alert(errorMessage);
                        })
                },
            ],
            { cancelable: false }
        )
    }


    let view = properties == null ? <View style={{ flex: 1, justifyContent: "center" }}>
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
                        <TouchableOpacity onPress={() => props.navigation.navigate(AppRoute.AddProperty,
                            {
                                key: item.id,
                                mode: 'EDIT'
                            })}>
                            <Icon name='pencil' type='evilicon' size={36} color={colors.blue} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.deleteProperties(item.id)}>
                            <Icon name='trash' type='evilicon' size={36} color={colors.red} />
                        </TouchableOpacity>

                    </View>
                    <Text style={styles.cardText}>${item.rent}</Text>
                </View>
            )}
        />

    return (
        <ScrollView>
            <View style={styles.containerFull} >
                {view}
            </View>
        </ScrollView>
    )
}

export default PropertyListScreen;