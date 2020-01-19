import { Fab } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, TouchableOpacity, View } from 'react-native';
import { Icon, Text, Card } from 'react-native-elements';
import { Firebase, getCurrentUser } from '../../../../config/Firebase';
import AppRoute from '../../../../resources/appRoute';
import colors from '../../../../resources/colors';
import styles from '../../../../resources/styles';
import { deletePropertiesWithId, propertyReference } from '../../../services/PropertyService';
import parseFirebaseError from '../../../errorParser/FirebaseErrorParser';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';

const PropertyListScreen = (props) => {
    const [properties, setProperties] = useState([]);

    const currentUser = getCurrentUser().uid;

    setPropertiesInState = (propertiesList) => {
        setProperties(propertiesList);
    }

    getListOfProperties = () => {
        if (currentUser !== null) {
            propertyReference(currentUser, setPropertiesInState)
        }
    };

    useEffect(() => {
        getListOfProperties();
    }, [])


    deleteProperties = (propertyId) => {
        Alert.alert(
            'Delete Address',
            'Are you sure want to delete this address ?',
            [
                { text: 'Cancel' },
                {
                    text: 'OK', onPress: () => deletePropertiesWithId(propertyId)
                        .catch(error => {
                            errorMessage = parseFirebaseError(error);
                            Alert.alert(errorMessage);
                        })
                },
            ],
            { cancelable: false }
        )
    }


    let view = properties == null ? <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
        <Text style={{ fontSize: 28 }}> Properties </Text>
        <Text style={{ fontSize: 18, marginTop: 16 }}> No available  properties </Text>
    </View> :
        <React.Fragment>
            <FlatList
                style={[styles.cardContainer, {}]}
                data={properties}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card
                        image={{ uri: item.imageUrl }}>
                        <View style={styles.containerFlexRow}>
                            <Text style={{ flex: 1, fontSize: 16 }}>{item.address}</Text>
                            <TouchableOpacity
                                style={{ marginHorizontal: 4 }}
                                onPress={this.openDocumentPicker}
                                onPress={() => props.navigation.navigate(AppRoute.AddProperty,
                                    {
                                        key: item.id,
                                        mode: 'EDIT'
                                    })}
                            >
                                <Icon name='edit' type='entypo' size={20} color={colors.primaryDark} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ marginHorizontal: 4 }}
                                onPress={() => this.deleteProperties(item.id)}>
                                <Icon name='trash' type='entypo' size={20} color={colors.primaryDark} />
                            </TouchableOpacity>

                        </View>
                        <Text style={{ flex: 1, fontSize: 16 }}>Rent ${item.rent}</Text>
                    </Card>
                )}
            />
        </React.Fragment>


    return (
        <View style={{ flex: 1, backgroundColor: '#f4f4f4' }}>
            <SafeAreaView>
                <ScrollView>
                    <View style={[styles.containerLeft, { paddingBottom: 16, flexDirection: 'column' }]} >
                        {view}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

PropertyListScreen.navigationOptions = (props) => ({
    title: 'Property list',
    drawerIcon: ({ }) => (
        <Icon name='home'
            type='font-awesome'
            style={styles.drawerIcon}
        />
    ),
});

export default PropertyListScreen;