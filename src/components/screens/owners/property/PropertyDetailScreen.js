import React, { useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import styles from '../../../../resources/styles';
import { Image } from 'native-base';
import { Icon } from 'react-native-elements';
import { getPropertyById } from '../../../services/PropertyService';
import {Firebase, getCurrentUser} from '../../../../config/Firebase';


const PropertyDetailScreen = (props) => {
    const [properties, setProperties] = useState([]);

    const currentUser = getCurrentUser.uid;

    useEffect(() => {
        if (props.navigation.state.params) {
            const { key } = props.navigation.state.params;
            getProperty(key);
        }
    }, [])
    getProperty = (key) => {
        getPropertyById(currentUser, key).then((data) => {
            setProperties(data);
        }).catch((error) => console.log(error));
    }
    return (
        <View style={styles.containerFull} >
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
        </View>
    )
}
export default PropertyDetailScreen;