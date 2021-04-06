import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ActivityIndicator, SectionList, TouchableOpacity, View } from 'react-native';
import SingleHeader from '../../../../../common/components/texts/SingleHeader';
import { useMenu } from '../../../../../common/store/api/business/hooks/useMenu';
import {
  useContextBusiness,
  useContextBusinessId,
} from '../../../../../common/store/context/business';
import { useContextActiveOrder } from '../../../../../common/store/context/order';
import { colors, halfPadding, padding, screens } from '../../../../../common/styles';
import { RestaurantHeader } from '../../common/RestaurantHeader';
import { ProductListItem } from '../product/ProductListItem';
import { RestaurantNavigatorParamList } from '../types';
import { CartButton } from './CartButton';

type ScreenNavigationProp = StackNavigationProp<RestaurantNavigatorParamList>;
// type ScreenRouteProp = RouteProp<RestaurantNavigatorParamList, 'RestaurantDetail'>;

type Props = {
  navigation: ScreenNavigationProp;
  // route: ScreenRouteProp;
};

export const RestaurantDetail = React.memo(({ navigation }: Props) => {
  // context
  const restaurant = useContextBusiness();
  const activeOrder = useContextActiveOrder();
  // state
  const menu = useMenu(useContextBusinessId());
  // side effects
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: restaurant?.name ?? '',
    });
  }, [navigation, restaurant]);

  // UI
  const sections =
    menu?.map((category) => ({
      title: category.name,
      data: category.items ?? [],
    })) ?? [];
  if (!restaurant)
    return (
      <View style={screens.centered}>
        <ActivityIndicator size="large" color={colors.green500} />
      </View>
    );
  return (
    <View style={{ ...screens.default }}>
      <SectionList
        style={{ flex: 1 }}
        keyExtractor={(item) => item.id}
        sections={sections}
        ListHeaderComponent={
          <View style={{ marginBottom: halfPadding }}>
            <RestaurantHeader
              restaurant={restaurant}
              onPress={() => navigation.navigate('AboutRestaurant')}
              canNavigate
            />
          </View>
        }
        renderSectionHeader={({ section }) => (
          <View style={{ marginTop: padding }}>
            <SingleHeader title={section.title} />
          </View>
        )}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('ItemDetail', { productId: item.id })}
            >
              <ProductListItem key={item.id} product={item} />
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity onPress={() => navigation.navigate('FoodOrderCheckout')}>
        <CartButton order={activeOrder} />
      </TouchableOpacity>
    </View>
  );
});
