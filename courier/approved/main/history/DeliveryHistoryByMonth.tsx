import { Order, WithId } from '@appjusto/types';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import ConfigItem from '../../../../common/components/views/ConfigItem';
import StatusBadge from '../../../../common/components/views/StatusBadge';
import { useObserveOrders } from '../../../../common/store/api/order/hooks/useObserveOrders';
import { useSegmentScreen } from '../../../../common/store/api/track';
import {
  getOrdersWithFilter,
  getOrderTime,
  isOrderOngoing,
} from '../../../../common/store/order/selectors';
import { getUser } from '../../../../common/store/user/selectors';
import { screens } from '../../../../common/styles';
import {
  formatCurrency,
  formatDate,
  formatTime,
  separateWithDot,
} from '../../../../common/utils/formatters';
import { ApprovedParamList } from '../../types';
import { MainParamList } from '../types';
import { DeliveriesNavigatorParamList } from './types';

type ScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<DeliveriesNavigatorParamList, 'DeliveryHistoryByMonth'>,
  CompositeNavigationProp<
    BottomTabNavigationProp<MainParamList, 'DeliveryHistory'>,
    StackNavigationProp<ApprovedParamList, 'MainNavigator'>
  >
>;
type ScreenRoute = RouteProp<DeliveriesNavigatorParamList, 'DeliveryHistoryByMonth'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRoute;
};

export default function ({ navigation, route }: Props) {
  // params
  const { year, month } = route.params;
  // app state
  const user = useSelector(getUser);
  // screen state
  // TO-DO: filter by date
  const options = React.useMemo(() => ({ courierId: user?.uid }), [user?.uid]);
  const orders = useObserveOrders(options);
  const filteredOrders = getOrdersWithFilter(orders, year, month);
  // side effects
  // tracking
  useSegmentScreen('DeliveryHistoryByMonth');
  // handlers
  const orderPressHandler = useCallback((order: WithId<Order>) => {
    if (isOrderOngoing(order)) {
      navigation.navigate('OngoingDeliveryNavigator', {
        screen: 'OngoingDelivery',
        params: {
          orderId: order.id!,
        },
      });
    } else {
      navigation.navigate('DeliverySummary', { orderId: order.id! });
    }
  }, []);
  // UI
  return (
    <View style={{ ...screens.config }}>
      <FlatList
        style={{ flex: 1 }}
        data={filteredOrders}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => {
          const time = getOrderTime(item);
          const totalFee = item.fare!.courier.value + (item.tip?.value ?? 0);
          const title = formatCurrency(totalFee);
          const subtitle = `Pedido ${item.code}\n${separateWithDot(
            formatDate(time),
            formatTime(time)
          )}`;
          return (
            <ConfigItem title={title} subtitle={subtitle} onPress={() => orderPressHandler(item)}>
              <StatusBadge order={item} />
            </ConfigItem>
          );
        }}
      />
    </View>
  );
}
