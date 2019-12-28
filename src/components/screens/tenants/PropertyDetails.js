import React from 'react';
import { Button, Text, View } from 'react-native';
import styles from '../../../resources/styles';

const PropertyDetails = (props) => {
    const { propertyId } = props.navigation.state.params;

    return (
        <View style={styles.container}>
            <Text>Property Details Screen {propertyId}</Text>
            <Button title='open drawer' onPress={() => props.navigation.toggleDrawer()}></Button>
        </View >
    );
}

export default PropertyDetails;