import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../../resources/colors';
import styles from '../../resources/styles';
import TimeLine from 'react-native-timeline-flatlist';

const RentDetails = (props) => {

    const [rentHistory, setRentHistory] = useState([
        { time: '09:00', date: 'January 7,2020', title: 'Event 1', description: 'Event 1 Description' },
        { time: '10:45', date: 'January 21,2020', title: 'Event 2', description: 'Event 2 Description' },
        { time: '12:00', date: 'February 5,2020', title: 'Event 3', description: 'Event 3 Description' },
        { time: '14:00', date: 'February 15,2020', title: 'Event 4', description: 'Event 4 Description' },
        { time: '16:30', date: 'February 27,2020', title: 'Event 5', description: 'Event 5 Description' }
    ])

    return (
        <ScrollView>
            <View style={styles.timelineContainer} >
                <TimeLine
                    style={styles.list}
                    data={rentHistory}

                    {...console.log(rentHistory)}

                />
            </View>
        </ScrollView >
    );
}

RentDetails.navigationOptions = (props) => ({
    title: 'Rent History',
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

export default RentDetails;