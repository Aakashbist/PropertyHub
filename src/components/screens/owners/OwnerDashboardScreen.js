import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { Picker, ScrollView, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import TimeLine from 'react-native-timeline-flatlist';
import { getCurrentUser } from '../../../config/Firebase';
import colors from '../../../resources/colors';
import styles from '../../../resources/styles';
import { propertyReference } from '../../services/PropertyService';


const OwnerDashboard = (props) => {

    const date = moment.unix(1580034146345 / 1000).format("DD MMM hh:mm a")
    const [rentDue, setRentDue] = useState();
    const [properties, setProperties] = useState([]);
    const [property, setProperty] = useState({});
    const [pickerSelectedValue, setPickerSelectedValue] = useState();

    const [dashboardComponentVisible, setDashboardComponentVisible] = useState(false);
    const [rentHistory, setRentHistory] = useState([
        { time: date, description: '250', title: 'Rent Collected' },
        { time: date, description: '300', title: 'rent paid' },
        { time: date, description: '550', title: 'Rent Collected' },
        { time: date, description: '650', title: 'rent Collected' },
        { time: date, description: '750', title: 'Rent Collected' }
    ])

    const currentUser = getCurrentUser().uid;

    useEffect(() => {
        nextRentPaymentDay();
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
                setDashboardComponentVisible(true);
            }
        }
        else {
            setProperty({});
            setDashboardComponentVisible(false);
        }
    }


    renderPicker = (properties) => {
        return properties.map(property =>
            < Picker.Item key={property.id} label={property.address} value={property.id} />
        )
    }

    nextRentPaymentDay = () => {
        //will get in from server
        const calculateDifference = new Date("February 1, 2020").getTime() - new Date().getTime();    //Future date - current date
        const dueDate = Math.floor(calculateDifference / (1000 * 60 * 60 * 24));
        setRentDue(dueDate)
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
                            <Text style={{ flex: 1, fontSize: 21, color: colors.blue }}>Rent collected</Text>
                            <Icon
                                name="timeline"
                                type="material"
                                size={34}
                                color={colors.blue}
                            />
                        </View>
                        <View>
                            <Text style={[styles.textSubHeading]}> Total: $5000 </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 15, paddingVertical: 8, flex: 1 }}> Last Transaction : {date} </Text>
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
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.darkWhite1, margin: 10 }}>
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


