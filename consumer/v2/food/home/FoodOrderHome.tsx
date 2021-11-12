import { BusinessAlgolia } from '@appjusto/types';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ApiContext, AppDispatch } from '../../../../common/app/context';
import { UnloggedParamList } from '../../../../common/screens/unlogged/types';
import { useSearch } from '../../../../common/store/api/search/useSearch';
import {
  updateCurrentLocation,
  updateCurrentPlace
} from '../../../../common/store/consumer/actions';
import { getConsumer, getCurrentLocation } from '../../../../common/store/consumer/selectors';
import { SearchFilter } from '../../../../common/store/consumer/types';
import { colors, padding } from '../../../../common/styles';
import { LoggedNavigatorParamList } from '../../types';
import { sectionsFromResults } from '../restaurant/list';
import { RestaurantList } from '../restaurant/list/RestaurantList';
import { FoodOrderNavigatorParamList } from '../types';
import { FoodOrderHomeHeader } from './FoodOrderHomeHeader';

type ScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<FoodOrderNavigatorParamList, 'FoodOrderHome'>,
  StackNavigationProp<LoggedNavigatorParamList & UnloggedParamList>
>;
type ScreenRouteProp = RouteProp<FoodOrderNavigatorParamList, 'FoodOrderHome'>;

type Props = {
  route: ScreenRouteProp;
  navigation: ScreenNavigationProp;
};

export const FoodOrderHome = ({ route, navigation }: Props) => {
  // params
  const { place } = route.params ?? {};
  // context
  const api = React.useContext(ApiContext);
  const dispatch = useDispatch<AppDispatch>();
  // redux store
  const currentLocation = useSelector(getCurrentLocation);
  const consumer = useSelector(getConsumer);
  // state
  const [filters, setFilters] = React.useState<SearchFilter[]>([]);
  const {
    results: restaurants,
    isLoading,
    refetch,
  } = useSearch<BusinessAlgolia>(true, 'restaurant', 'distance', filters, currentLocation, '');
  //test restaurants
  if (restaurants) {

    var restaurantsTest: BusinessAlgolia[] = [restaurants[0], restaurants[0], restaurants[0], restaurants[0], restaurants[0], restaurants[0]];
    restaurantsTest = restaurantsTest.map((restaurant, index) => {
      restaurant.name = "Restaurante " + index;
      restaurant.businessAddress.latlng = {
        latitude: ((currentLocation?.latitude ?? 0) + index), longitude: ((currentLocation?.longitude ?? 0) + index)
      }
      return restaurant;
    });
    // const restaurantsTest: BusinessAlgolia[] = [
    //   {
    //     objectID: "1",
    //     _geoloc: { lat: 0, lng: 0 },
    //     enabled: true,
    //     name: "Restaurante A",
    //     code: "Code A",
    //     managerEmail: "email",
    //     situation: "",
    //     onboarding: "",
    //     description: "",
    //     status: "open",
    //     businessAddress: {
    //       cep: "",
    //       address: "",
    //       number: "",
    //       additional: "",
    //       city: "",
    //       state: "",
    //       latlng: {
    //         latitude: currentLocation?.latitude ?? 0, longitude: currentLocation?.longitude ?? 0
    //       }
    //     },
    //     cuisine: "",
    //     deliveryRange: 20,
    //     statistics: {
    //       totalOrders: 0,
    //       averagePreparationTime: 0,
    //       averageTicketPrice: 0,
    //       averageWaitingTime: 0
    //     },
    //     createdOn: restaurants[0].createdOn
    //   }];
    const [refreshing, setRefreshing] = React.useState(false);
    // side effects
    React.useEffect(() => {
      if (place) {
        dispatch(updateCurrentLocation(undefined));
        dispatch(updateCurrentPlace(place));
      }
    }, [dispatch, place]);
    // handlers
    const refresh = async () => {
      setRefreshing(true);
      await api.search().clearCache();
      await refetch();
      setRefreshing(false);
    };
    // UI
    return (
      <RestaurantList
        sections={sectionsFromResults(restaurants, currentLocation)}
        ListHeaderComponent={
          <View style={{ backgroundColor: colors.white, paddingBottom: padding }}>
            <FoodOrderHomeHeader
              selectedCuisineId={filters.find(() => true)?.value}
              onLocationPress={() => {
                navigation.navigate('AddressComplete', {
                  returnParam: 'place',
                  returnScreen: 'FoodOrderHome',
                });
              }}
              onSearchPress={() => {
                navigation.navigate('RestaurantSearch');
              }}
              onCuisineSelect={(cuisine) => {
                setFilters(cuisine ? [{ type: 'cuisine', value: cuisine.name }] : []);
              }}
              consumer={consumer}
              onLogin={() => navigation.replace('WelcomeScreen')}
            />
          </View>
        }
        onSelect={(restaurantId) => {
          navigation.push('RestaurantNavigator', {
            restaurantId,
            screen: 'RestaurantDetail',
          });
        }}
        loading={isLoading}
        refreshing={refreshing}
        onRefresh={() => refresh()}
        onRecommend={() => navigation.navigate('RecommendRestaurant')}
      />
    );
  };
