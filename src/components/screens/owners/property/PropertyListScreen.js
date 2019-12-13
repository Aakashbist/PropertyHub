import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, TouchableOpacity, RecyclerViewBackedScrollViewComponent } from 'react-native';
import { Container, Header, Content, Item, Input, Form, Label } from 'native-base';
import { ButtonGroup } from 'react-native-elements';
import Firebase from '../../../../config/Firebase';
import AppRoute from '../../../../resources/appRoute';
import colors from '../../../../resources/colors';
import styles from '../../../../resources/styles';
import { getProperties } from '../../../firebase/PropertyRepository';
const Property = {
    PROPERTY_LIST: 'Property List',
    ADD_Property: 'Add Property'
}



const PropertyListScreen = (props) => {
    const [properties, setProperties] = useState([
        {
            "address": "25 Railway street",
            "title": "villa"
        },

        {
            "address": "67 Rocky point rd",
            "title": "House"
        },
        {
            "address": "5 paramata rd",
            "title": "Unit"
        }]);
    const [status, setStatus] = useState();
    const currentUser = Firebase.auth().currentUser;

    getListofProperties = () => {
        getProperties(currentUser.uid)
            .then((data) => {
                setProperties(data);
                console.log(JSON.stringify(data))
            })
    }


    const _status = [Property.PROPERTY_LIST, Property.ADD_Property]
    updateIndex = (index) => {
        let status = _status[index];
        setStatus(status);
        switch (status) {
            case Property.ADD_Property:
                props.navigation.navigate(AppRoute.AddProperty)
                break;
            case Property.PROPERTY_LIST:

                break;
        }
    }


    let view = properties.length === 0 ? <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
    </View> : null;
    // <FlatList
    //     style={styles.cardContainer}
    //     data={properties}
    //     keyExtractor={(item) => item.title}
    //     renderItem={({ item }) => (
    //         <TouchableOpacity style={styles.card}>
    //             <Image style={{ width: 200, height: 250, margin: 10 }} source={require('../../../../assets/icon/homeIcon.png')} />
    //             <Text style={styles.cardText}>{item.address}</Text>
    //             <Text style={styles.cardText}>{item.title}</Text>
    //         </TouchableOpacity>
    //     )}
    // />
    return (
        <View style={styles.container} >
            <Form>
                <Container>
                    <Content>
                        <Item>

                            <Input
                                placeholder="address"
                                onChange={status => setStatus(status)} />
                        </Item>
                        <Item>
                            <Label> Property Address</Label>
                            <Input
                                placeholder="address" />
                        </Item>
                        <Item>
                            <Label> Property Address</Label>
                            <Input
                                placeholder="address" />
                        </Item>
                    </Content>
                </Container>

            </Form>
            {/* <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={_status.indexOf(status)}
                buttons={_status}
                selectedTextStyle={{ fontSize: 18 }}
                textStyle={{ color: colors.darkWhite2 }}
                innerBorderStyle={{ color: colors.green }}
                selectedButtonStyle={{ backgroundColor: colors.green }}
                containerStyle={{ width: '80%', height: 60 }} />

            {view} */}

        </View>
    )
}
export default PropertyListScreen;