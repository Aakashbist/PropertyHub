import React from 'react';
import { Button, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import colors from '../../../resources/colors';
import styles from '../../../resources/styles';

const PropertySearch = (props) => {
  return (
    <SafeAreaView >
      <ScrollView>
        <View style={styles.containerFull}>
          <Header
            statusBarProps={{ barStyle: 'light-content', backgroundColor: colors.green }}
            barStyle="light-content" // or directly
            backgroundColor={colors.blue}
            leftComponent={{ icon: 'menu' }}
            centerComponent={{ text: 'MY TITLE' }}
            rightComponent={{ icon: 'home' }}

          />
          <Text>Property Search Screen</Text>
          <Button title='open drawer' onPress={() => this.props.navigation.toggleDrawer()}></Button>
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}

PropertySearch.navigationOptions = (props) => ({
  drawerLabel: 'Property',
  drawerIcon: ({ }) => (
    <Icon name='user'
      type='font-awesome'
      style={styles.drawerIcon}
    />
  ),
});

export default PropertySearch;
