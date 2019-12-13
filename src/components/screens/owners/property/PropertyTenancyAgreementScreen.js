import { Container } from 'native-base';
import React, { useState } from 'react';
import { Button } from 'react-native';
import Firebase from '../../../../config/Firebase';
import styles from '../../../../resources/styles';
import { getProperties } from '../../../firebase/PropertyRepository';


const PropertyTenancyAgreementScreen = (props) => {

    const [properties, setProperties] = useState([]);

    const currentUser = Firebase.auth().currentUser;


    handeldata = () => {
        getProperties(currentUser.uid)
            .then((data) => {
                setProperties(data);
                console.log(" from propert " + JSON.stringify(data));
            })
    }


    return (

        <Container style={styles.container}>


            <Button title="properties" onPress={this.handeldata} />
        </Container>

    )
}
export default PropertyTenancyAgreementScreen;