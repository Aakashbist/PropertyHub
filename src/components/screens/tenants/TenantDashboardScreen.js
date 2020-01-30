import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { Picker, ScrollView, Slider, TouchableOpacity, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import TimeLine from 'react-native-timeline-flatlist';
import { getCurrentUser, getServerTimestamp } from '../../../config/Firebase';
import colors from '../../../resources/colors';
import styles from '../../../resources/styles';
import { getLeasedPropertiesByTenantId, getPropertyById } from '../../services/PropertyService';
import { getRentHistory } from '../../services/RentService';


const TenantDashboard = (props) => {
    const date = moment.unix(1580034146345 / 1000).format("DD MMM hh:mm a")
    const [rentDue, setRentDue] = useState();
    const [properties, setProperties] = useState([]);
    const [pickerSelectedValue, setPickerSelectedValue] = useState([]);
    const [property, setProperty] = useState({});
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
        const promises = [];
        getLeasedPropertiesByTenantId(currentUser)
            .then(results => {
                results.forEach(data => {
                    promises.push(
                        new Promise((resolve, reject) => {
                            getPropertyById(data.propertyId)
                                .then(value => {
                                    console.log(value, "cccc")
                                    resolve(value);
                                }).catch(error => reject(error))
                        })
                    )
                });
                Promise.all(promises).then((values) => {
                    setProperties(values);
                })
            })

    }


    updateDashBoardView = (propertyAddress) => {
        setPickerSelectedValue(propertyAddress);
        if (propertyAddress !== null) {
            const pp = properties.filter(
                property => {
                    if (property.address === propertyAddress) {
                        console.log(property.id, "ccc");
                        return {
                            property: property,
                            id: property.id
                        };
                    }
                });
            console.log(pp, "xxxx");


            pp.map(property => {
                getRentHistory(property.id).then((lastrent) => {

                })
                setProperty(property);
            })
            setDashboardComponentVisible(true);
        }
        else {
            setProperty({});
            setDashboardComponentVisible(false);
        }
    }

    renderPicker = (properties) => {
        return properties.map(property =>
            < Picker.Item key={property.id} label={property.address} value={property.address} />
        )
    }

    payRent = () => {

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
                        selectedValue={pickerSelectedValue}
                        onValueChange={(propertyAddress) => updateDashBoardView(propertyAddress)}>
                        <Picker.Item label="select address" value={null} />
                        {renderPicker(properties)}
                    </Picker>
                </View>
            }

            {dashboardComponentVisible &&
                <Fragment>
                    <View style={[styles.dashboardViewWithShadow, { flexDirection: 'column', padding: 16 }]}>
                        <View style={styles.containerFlexRow}>
                            <Text style={[styles.textSubHeading, { flex: 1, fontSize: 21, color: colors.green }]}>Upcoming Rent </Text>
                            <Icon
                                name="update"
                                type="material"
                                size={34}
                                color={colors.green}
                            />
                        </View>

                        <View>
                            <Text style={[styles.textSubHeading]}> Amount: ${property.rent} </Text>
                            <Slider
                                style={{ width: '100%', height: 50 }}
                                minimumValue={1}
                                maximumValue={15}
                                step={1}
                                disabled={true}
                                maximumTrackTintColor={colors.danger}
                                minimumTrackTintColor={colors.primaryDark}
                                thumbTintColor={colors.secondary}
                                value={rentDue}
                            />

                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 5 }}>
                                <Icon
                                    name="bolt"
                                    type="font-awesome"
                                    size={24}
                                    color={colors.warning}
                                />
                                <Text style={[styles.textSubHeading, { paddingVertical: 20, flex: 1 }]}>Due in {rentDue} Days </Text>
                                <TouchableOpacity
                                    style={[styles.button, { margin: 8 }]}
                                    onPress={() => payRent()}
                                >
                                    <Text style={[styles.buttonText, {}]}>Pay</Text>

                                </TouchableOpacity >
                            </View>
                        </View>
                    </View>

                    <View style={[styles.dashboardViewWithShadow, { flexDirection: 'column', padding: 16 }]}>
                        <View style={[styles.containerFlexRow, { marginHorizontal: 5 }]}>
                            <Text style={{ flex: 1, fontSize: 21, color: colors.blue }}>Rent Paid</Text>
                            <Icon
                                name="timeline"
                                type="material"
                                size={34}
                                color={colors.blue}
                            />
                        </View>
                        <View>
                            <Text style={[styles.textSubHeading]}> Total: $450 </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 15, paddingVertical: 8, flex: 1 }}> Last Transaction : {date}</Text>
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

TenantDashboard.navigationOptions = (props) => ({

    drawerLabel: 'Dashboard',
    drawerIcon: ({ tintColor }) => (
        <Icon name='th'
            type='font-awesome'
            style={styles.drawerIcon}
            color={tintColor}
        />
    )
});

export default TenantDashboard;

