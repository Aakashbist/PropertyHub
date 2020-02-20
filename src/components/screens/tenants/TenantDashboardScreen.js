import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { Picker, ScrollView, Slider, TouchableOpacity, View } from 'react-native';
import { Icon, Text, Header } from 'react-native-elements';
import TimeLine from 'react-native-timeline-flatlist';
import { getCurrentUser } from '../../../config/Firebase';
import colors from '../../../resources/colors';
import styles from '../../../resources/styles';
import { getLeasedPropertiesByTenantId, getPropertyById } from '../../services/PropertyService';
import { getRentHistory, createRentHistory } from '../../services/RentService';
import { _ } from "lodash";


const TenantDashboard = (props) => {
    const [rentDue, setRentDue] = useState(null);
    const [properties, setProperties] = useState([]);
    const [property, setProperty] = useState({});
    const [propertyKey, setPropertyKey] = useState();
    const [dashboardComponentVisible, setDashboardComponentVisible] = useState(false);
    const [rentHistory, setRentHistory] = useState([])

    const currentUser = getCurrentUser().uid;

    useEffect(() => {
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
                                    value.leasedStartDate = data.leasedStartDate,
                                        value.id = data.propertyId
                                    resolve(value);
                                }).catch(error => reject(error))
                        })
                    )
                });
                Promise.all(promises).then((values) => {
                    setProperties(values);
                    setPropertyKey(propertyKey);
                })
            });
    }

    updateDashBoardView = (propertyId) => {
        if (propertyId) {
            const data = properties.find(property => property.id === propertyId)
            if (data) {
                setProperty(data);
                nextRentPaymentDay(data.leasedStartDate);
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
        return properties.map(property => (
            < Picker.Item key={property.id} label={property.address} value={property.id} />
        ))
    }

    payRent = () => {
        createRentHistory(property.id, currentUser, property.rent);
        //  { time: date, description: '250', title: 'Rent Collected' },
    }

    nextRentPaymentDay = (leasedStartDate) => {
        if (leasedStartDate < new Date().getTime()) {
            const dateDifferenceInMilliSec = new Date(moment(leasedStartDate).format('ll')).getTime() - new Date().getTime();
            const numberOfDaysAfterLeased = Math.floor(dateDifferenceInMilliSec / (1000 * 60 * 60 * 24));
            const dueDate = Math.floor(14 - (Math.abs(numberOfDaysAfterLeased) % 14) + 1)
            setRentDue(dueDate)
        }
        else {
            setRentDue(null)
        }
    }

    const dueDateView = rentDue === null ?
        <Text style={[styles.textSubHeading, { paddingVertical: 20, flex: 1 }]}>No due date yet</Text> :
        <Text style={[styles.textSubHeading, { paddingVertical: 20, flex: 1 }]}>Due in {rentDue} Days </Text>

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

                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 4 }}>
                                <Icon
                                    name="bolt"
                                    type="font-awesome"
                                    size={24}
                                    color={colors.warning}
                                />
                                {dueDateView}
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
                            <Text style={{ flex: 1, fontSize: 21, color: colors.blue }}>Rent Paid History</Text>
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


