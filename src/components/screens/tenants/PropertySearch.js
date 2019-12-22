import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import colors from '../../../resources/colors';
import styles from '../../../resources/styles';

const PropertySearch = (props) => {
  return (
    <ScrollView>
      <SafeAreaView >
        <View style={styles.containerFull}>
          <Header
            barStyle="light-content"
            backgroundColor={colors.blue}
            placement="left"
            leftComponent={{ icon: 'menu', color: colors.white, onPress: () => props.navigation.toggleDrawer() }}
            centerComponent={{ text: 'Property Lookup', style: { fontSize: 20, color: colors.white } }}
            statusBarProps={{ translucent: true }}
          />
          <Text>Property Search Screen</Text>
        </View>
      </SafeAreaView >
    </ScrollView>
  );
}

PropertySearch.navigationOptions = (props) => ({
  drawerLabel: 'Property Lookup',
  drawerIcon: ({ }) => (
    <Icon name='search'
      type='font-awesome'
      style={styles.drawerIcon}
    />
  ),
});

export default PropertySearch;
