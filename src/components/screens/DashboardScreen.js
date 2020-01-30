import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { Picker, ScrollView, Slider, TouchableOpacity, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import TimeLine from 'react-native-timeline-flatlist';
import { getCurrentUser, getCurrentUserClaims, getServerTimestamp } from '../../config/Firebase';
import colors from '../../resources/colors';
import styles from '../../resources/styles';
import { getPropertyById, propertyReference } from '../services/PropertyService';

const Dashboard = (props) => {

  const date = moment.unix(1580034146345 / 1000).format("DD MMM hh:mm a")
  const [rentDue, setRentDue] = useState();
  const [isOwner, setIsOwner] = useState();
  const [properties, setProperties] = useState([]);
  const [property, setProperty] = useState({});
  const [address, setAddress] = useState({});
  const [propertyKey, setPropertyKey] = useState();
  const [dashboardComponentVisible, setDashboardComponentVisible] = useState(false);
  const [rentHistory, setRentHistory] = useState([
    { time: date, description: ' 250', title: 'Rent Collected' },
    { time: date, description: '250', title: 'rent Collected' },
    { time: date, description: '250', title: 'Rent Collected' },
    { time: date, description: '250', title: 'rent Collected' },
    { time: date, description: '250', title: 'Rent Collected' }
  ])

  const currentUser = getCurrentUser().uid;
  useEffect(() => {
    nextRentPaymentDay();
    getCurrentUserClaims().then((isOwner) => setOwner(isOwner));
    getListOfProperties();
  }, [rentDue]);


  setPropertiesInState = (propertiesList) => {
    setProperties(propertiesList);
  }

  getListOfProperties = () => {
    if (currentUser !== null) {
      propertyReference(currentUser, setPropertiesInState)
    }
  };

  setOwner = (value) => {
    setIsOwner(value);
  }

  updateDashBoardView = (property) => {
    setPropertyKey(property.id)
    getPropertyById(property.id).then((data) => {
      setProperty(data);
      setAddress(data.address)
      setDashboardComponentVisible(true);

    })
      .catch(error => console.log(error));
  }

  renderPicker = (properties) => {
    return properties.map(property =>
      < Picker.Item key={property.id} label={property.address} value={property} />
    )
  }

  payRent = () => {
    const paid = {
      time: getServerTimestamp(), description: ' 250', title: 'Rent paid'
    }
  }

  nextRentPaymentDay = () => {
    //will get in from server
    const calculateDifference = new Date("February 1, 2020").getTime() - new Date().getTime();    //Future date - current date
    const dueDate = Math.floor(calculateDifference / (1000 * 60 * 60 * 24));
    setRentDue(dueDate)
  }

  const view =
    <View style={[styles.containerLeft]}>
      {properties !== null &&
        <View style={[styles.inputBoxFull, { padding: 16 }]}>
          < Picker
            mode="dialogue"
            selectedValue={property.address}
            onValueChange={(property) => updateDashBoardView(property)}>
            <Picker.Item label="select address" value={null} />
            {renderPicker(properties)}
          </Picker>
        </View>
      }
      {isOwner && dashboardComponentVisible &&
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
      {!isOwner &&
        <Fragment>
          <View style={[styles.dashboardViewWithShadow, { flexDirection: 'column', padding: 16 }]}>
            <View style={styles.containerFlexRow}>
              <Text style={[styles.textSubHeading, { flex: 1, fontSize: 21, color: colors.green }]}>Upcoming Rent</Text>
              <Icon
                name="update"
                type="material"
                size={34}
                color={colors.green}
              />
            </View>

            <View>
              <Text style={[styles.textSubHeading]}> Amount: $450 </Text>
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

Dashboard.navigationOptions = (props) => ({
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

export default Dashboard;


