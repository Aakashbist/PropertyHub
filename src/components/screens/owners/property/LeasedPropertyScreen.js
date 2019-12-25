import React, { useState } from 'react';
import { Text, View } from 'react-native';
import styles from '../../../../resources/styles';


const PropertyLeasedScreen = (props) => {

    const [propertiesLeased, setPropertiesLeased] = useState([]);

    let view = propertiesLeased.length === 0 ? <View style={styles.container}>
        <Text style={{ fontSize: 18 }}> No rented properties </Text>
    </View> :
        null;

    return (
        <View style={styles.containerFull} >
            {view}
        </View>
    )
}
export default PropertyLeasedScreen;