
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import colors from '../../resources/colors';
import styles from '../../resources/styles';

const DashboardScreen = (props) => {
  const [search, setSearch] = useState('');
  const [properties, setProperties] = useState();

  useEffect(() => {

  }, []);

  return (
    <ScrollView>
      <SafeAreaView >
        <View style={styles.containerFull}>
          <Header
            barStyle="light-content"
            style={{ height: 150 }}
            backgroundColor={colors.blue}
            placement="left"
            leftComponent={{ icon: 'menu', color: colors.white, onPress: () => props.navigation.toggleDrawer() }}
            centerComponent={{ text: 'Dashboard', style: { fontSize: 20, color: colors.white } }}
            statusBarProps={{ translucent: true }}
          />

        </View>
      </SafeAreaView >
    </ScrollView>
  );
}

DashboardScreen.navigationOptions = (props) => ({
  drawerLabel: 'Dashboard',
  drawerIcon: ({ }) => (
    <Icon name='home'
      type='font-awesome'
      style={styles.drawerIcon}
    />
  ),
});

export default DashboardScreen;