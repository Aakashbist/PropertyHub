import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, ScrollView, Text, View, FlatList } from 'react-native';
import { Header, Icon, SearchBar, ListItem } from 'react-native-elements';
import colors from '../../../resources/colors';
import styles from '../../../resources/styles';
import { getPropertiesBySearch } from '../../services/PropertyService';
import useDebounce from '../../useDebounce';

const PropertySearch = (props) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [properties, setProperties] = useState();
  const [error, setError] = useState();

  const searchProperties = () => {
    getPropertiesBySearch(search)
      .then((properties) => {
        setProperties(properties);
      })
      .catch((error) => {
        setError(error);
      });
  }

  useEffect(() => {
    searchProperties();
  }, [debouncedSearch]);

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
          <SearchBar
            placeholder="Type Here..."
            onChangeText={(text) => setSearch(text)}
            value={search}
            lightTheme={true}
            platform="android"
          />
          <FlatList
            style={{ flex: 1, width: '100%' }}
            data={properties}
            renderItem={({ item }) => (
              <ListItem
                key={item.id}
                title={item.address}
                subtitle={item.address}
                leftAvatar={{ rounded: false, size: 'large', source: { uri: item.imageUrl } }}
                bottomDivider
                topDivider
              />
            )}
            keyExtractor={property => property.id}
          />
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
