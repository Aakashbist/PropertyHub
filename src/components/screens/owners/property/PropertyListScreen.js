import { Fab } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Firebase from '../../../../config/Firebase';
import AppRoute from '../../../../resources/appRoute';
import colors from '../../../../resources/colors';
import styles from '../../../../resources/styles';
import parseFirebaseError from '../../../errorParser/FirebaseErrorParser';
import { deletePropertiesWithId, propertyReference } from '../../../services/PropertyService';


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
                        <TouchableOpacity onPress={() => props.navigation.navigate(AppRoute.AddProperty, {
                            key: propertyId,
                            mode: "EDIT"
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
            <SafeAreaView >
                <View style={styles.containerFull}>
                    <Header
                        barStyle="light-content"
                        style={{ height: 150 }}
                        backgroundColor={colors.white}
                        placement="left"
                        leftComponent={{ icon: 'menu', color: colors.primary, onPress: () => props.navigation.toggleDrawer() }}
                        centerComponent={{ text: 'Property ', style: { fontSize: 20, color: colors.white } }}
                        statusBarProps={{ translucent: true }}
                    />
                    <Fab
                        active={true}
                        //containerStyle={{ position: 'absolute', bottom: 10, right: 10, backgroundColor: colors.primary }}
                        style={{ backgroundColor: colors.primary, bottom: 10, right: 10, position: 'absolute' }}
                        position='topRight'
                        onPress={() => props.navigation.navigate(AppRoute.AddProperty)}>
                        <Icon name="plus" type='font-awesome' color={colors.white} size={20} />
                    </Fab>
                    {view}

                </View>
            </SafeAreaView >
        </ScrollView>
    );
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