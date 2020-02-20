import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { Icon, ListItem, SearchBar } from 'react-native-elements';
import SafeAreaView from 'react-native-safe-area-view';
import AppRoute from '../../../resources/appRoute';
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
  };

  useEffect(() => {
    searchProperties();
  }, [debouncedSearch]);

  return (
    <ScrollView keyboardShouldPersistTaps={'always'} keyboardDismissMode={'on-drag'}>
      <SafeAreaView>
        <View style={styles.containerFull}>
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
                onPress={() => props.navigation.push(AppRoute.PropertyDetailsTenant, { propertyId: item.id })}
              />
            )}
            keyExtractor={property => property.id}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

PropertySearch.navigationOptions = (props) => ({
  title: 'Property Lookup',
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

export default PropertySearch;
