import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { Picker, ScrollView, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import TimeLine from 'react-native-timeline-flatlist';
import { getCurrentUser } from '../../../config/Firebase';
import colors from '../../../resources/colors';
import styles from '../../../resources/styles';
import { propertyReference } from '../../services/PropertyService';
import _ from "lodash";
import { getRentHistory } from '../../services/RentService';

const OwnerDashboard = (props) => {
    const [properties, setProperties] = useState([]);
    const [property, setProperty] = useState({});
    const [dashboardComponentVisible, setDashboardComponentVisible] = useState(false);
    const [rentHistory, setRentHistory] = useState([])

    const currentUser = getCurrentUser().uid;

    useEffect(() => {
        getProperties();

    }, []);

    getProperties = () => {
        if (currentUser !== null) {
            propertyReference(currentUser, setPropertiesInState)
        }

    }

    setPropertiesInState = (propertiesList) => {
        setProperties(propertiesList);
    }

    updateDashBoardView = (propertyId) => {
        if (propertyId) {
            const data = properties.find(property => property.id === propertyId)
            if (data) {
                setProperty(data);
                getRentHistory(data.id).then(history => {
                    setRentHistory(history);
                });
                setDashboardComponentVisible(true);
            }
        }
        else {
            setProperty({});
            setDashboardComponentVisible(false);
        }
    }

    renderLastTransaction = (history) => {
        var lastPayment = _.last(history);
        if (lastPayment) {
            return (

                <Text style={{ fontSize: 15, paddingVertical: 8, flex: 1 }}> Last Transaction : {lastPayment.time}</Text>
            )
        }
        else {
            return (

                <Text style={{ fontSize: 15, paddingVertical: 8, flex: 1 }}> No transaction yet.</Text>
            )
        }
    }

    renderPicker = (properties) => {
        return properties.map(property =>
            < Picker.Item key={property.id} label={property.address} value={property.id} />
        )
    }

    const view =
        <View style={[styles.containerLeft]}>
            {properties &&
                <View style={[styles.inputBoxFull, { padding: 16 }]}>
                    < Picker
                        mode='dropdown'
                        selectedValue={property.id}
                        onValueChange={(propertyId) => updateDashBoardView(propertyId)}>
                        <Picker.Item label="select address" value={null} />
                        {renderPicker(properties)}
                    </Picker>
                </View>
            }

            {dashboardComponentVisible &&
                <Fragment>
                    <View style={[styles.dashboardViewWithShadow, { flexDirection: 'column', padding: 16 }]}>
                        <View style={[styles.containerFlexRow, { marginHorizontal: 5 }]}>
                            <Text style={{ flex: 1, fontSize: 21, color: colors.blue }}>Rent collection History</Text>
                            <Icon
                                name="timeline"
                                type="material"
                                size={34}
                                color={colors.blue}
                            />
                        </View>
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {renderLastTransaction(rentHistory)}
                            </View>
                            <TimeLine
                                style={styles.list}
                                data={rentHistory}
                                showtime={false}

                            />
                        </View>
                    </View>
                </Fragment>

            }
        </View >


    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.darkWhite1 }}
            keyboardShouldPersistTaps={'always'} keyboardDismissMode={'on-drag'}>
            <View >
                {view}
            </View>
        </ScrollView>
    );
}

OwnerDashboard.navigationOptions = (props) => ({

    drawerLabel: 'Dashboard',
    drawerIcon: ({ tintColor }) => (
        <Icon name='th'
            type='font-awesome'
            style={styles.drawerIcon}
            color={tintColor}
        />
    ),

    title: 'Dashboard',
    headerStyle: {
        backgroundColor: colors.primary,
    },
    headerTintColor: colors.white,
    headerLeft: () => (
        <Icon
            name='menu'
            type='entypo'
            color={colors.white}
            onPress={() => props.navigation.toggleDrawer()} />
    ),
    headerLeftContainerStyle: {
        marginHorizontal: 16
    }
});

export default OwnerDashboard;


