import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import styles from '../../../../resources/styles';
import { Header } from 'react-native-elements';
import colors from '../../../../resources/colors';
import { getPropertyById } from '../../../services/PropertyService';
import Firebase from '../../../../config/Firebase';


const PropertyLeasedScreen = (props) => {

    const [propertiesLeased, setPropertiesLeased] = useState([]);
    const currentUser = Firebase.auth().currentUser.uid;
    useEffect(() => {
        if (props.navigation.state.params) {
            const { key, mode } = props.navigation.state.params;
            console.log(key)
            getProperty(key);
        }
    }, [])
    getProperty = (key) => {
        getPropertyById(currentUser, key).then((data) => {
            setProperties(data);
            console.log(data, "details")
        }).catch((error) => console.log(error));
    }
    let view = propertiesLeased.length === 0 ? <View style={styles.container}>
        <Text style={{ fontSize: 18 }}> No rented properties </Text>
    </View> :
        null;

    return (
        <View style={styles.containerFull} >
            <Header
                barStyle="light-content"
                style={{ height: 150 }}
                backgroundColor={colors.white}
                placement="left"
                leftComponent={{ icon: 'menu', color: colors.primary, onPress: () => props.navigation.toggleDrawer() }}
                centerComponent={{ text: 'Property ', style: { fontSize: 20, color: colors.white } }}
                statusBarProps={{ translucent: true }}
            />
            {view}
        </View>
    )
}
export default PropertyLeasedScreen;