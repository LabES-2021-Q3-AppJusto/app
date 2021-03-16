import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Fleet, Place, WithId } from 'appjusto-types';
import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ApiContext, AppDispatch } from '../../../common/app/context';
import useObserveOrder from '../../../common/store/api/order/hooks/useObserveOrder';
import { getConsumer } from '../../../common/store/consumer/selectors';
import { showToast } from '../../../common/store/ui/actions';
import { screens } from '../../../common/styles';
import { LoggedNavigatorParamList } from '../types';
import { P2POrderHeader } from './P2POrderHeader';
import P2POrderPager from './P2POrderPager';
import { P2POrderNavigatorParamList } from './types';

type ScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<P2POrderNavigatorParamList, 'CreateOrderP2P'>,
  StackNavigationProp<LoggedNavigatorParamList>
>;
type ScreenRouteProp = RouteProp<P2POrderNavigatorParamList, 'CreateOrderP2P'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

export default function ({ navigation, route }: Props) {
  // params
  const { params } = route;
  // context
  const api = React.useContext(ApiContext);
  const dispatch = useDispatch<AppDispatch>();
  // redux store
  const consumer = useSelector(getConsumer)!;
  // state
  const [orderId, setOrderId] = React.useState<string>();
  const { order } = useObserveOrder(orderId);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = React.useState(
    consumer.paymentChannel?.mostRecentPaymentMethodId
  );
  const [isLoading, setLoading] = React.useState(false);
  // side effects
  // whenever route changes when interacting with other screens
  React.useEffect(() => {
    console.log('CreateOrderP2P useEffect; params: ', params);
    (async () => {
      if (params?.orderId) {
        setOrderId(params.orderId);
        navigation.setParams({
          orderId: undefined,
        });
      }
      if (params?.origin) {
        if (!order) {
          try {
            setLoading(true);
            const newOrder = await api.order().createOrderP2P(consumer, params.origin);
            setLoading(false);
            setOrderId(newOrder.id);
          } catch (error) {
            console.error(error);
            dispatch(showToast(error.toString(), 'error'));
          }
        } else if (orderId) {
          // backend is handling this case, keep it here just while is being tested
          // if address is the same, update only additionalInfo to avoid losing
          // const origin: Place =
          //   params.origin.address.description === order.origin?.address.description
          //     ? { ...order.origin, additionalInfo: params.origin.additionalInfo }
          //     : params.origin;
          // api.order().updateOrder(orderId, { origin });
          await api.order().updateOrder(orderId, { origin: params.origin });
        }
        navigation.setParams({
          origin: undefined,
        });
      }
      if (order && orderId && params?.destination) {
        await api.order().updateOrder(orderId, { destination: params.destination });
        navigation.setParams({
          destination: undefined,
        });
      }
      if (params?.paymentMethodId) {
        setSelectedPaymentMethodId(params?.paymentMethodId);
        navigation.setParams({
          paymentMethodId: undefined,
        });
      }
    })();
  }, [api, consumer, dispatch, navigation, order, orderId, params]);

  // handlers
  // navigate to 'AddressComplete' to enter address
  const navigateToAddressComplete = React.useCallback(
    (returnParam: string, value?: Place) => {
      navigation.navigate('AddressComplete', {
        returnScreen: 'CreateOrderP2P',
        returnParam,
        value,
      });
    },
    [navigation]
  );
  // navigate to ProfileAddCard or ProfilePaymentMethods to add or select payment method
  const navigateToFillPaymentInfo = React.useCallback(() => {
    // if user has no payment method, go direct to 'AddCard' screen
    if (!selectedPaymentMethodId) {
      navigation.navigate('ProfileAddCard', { returnScreen: 'CreateOrderP2P' });
    } else {
      navigation.navigate('ProfilePaymentMethods', { returnScreen: 'CreateOrderP2P' });
    }
  }, [navigation, selectedPaymentMethodId]);
  // navigate to FleetDetail
  const navigateFleetDetail = React.useCallback(
    (fleet: WithId<Fleet>) => {
      navigation.navigate('FleetDetail', { fleetId: fleet.id });
    },
    [navigation]
  );
  // navigate to TransportableItems
  const navigateToTransportableItems = React.useCallback(() => {
    navigation.navigate('TransportableItems');
  }, [navigation]);
  // confirm order
  const placeOrderHandler = async (fleetId: string) => {
    if (!orderId) return;
    if (!selectedPaymentMethodId) return;
    try {
      setLoading(true);
      await api.order().placeOrder({
        orderId,
        payableWith: 'credit_card',
        paymentMethodId: selectedPaymentMethodId,
        fleetId,
      });
      setLoading(false);
      navigation.replace('OngoingOrderNavigator', {
        screen: 'OngoingOrderConfirming',
        params: { orderId },
      });
    } catch (error) {
      console.warn(error.toString());
      dispatch(showToast(error.toString(), 'error'));
    }
  };

  // UI
  return (
    <View style={{ ...screens.default }}>
      <P2POrderHeader order={order} />
      <P2POrderPager
        order={order}
        isLoading={isLoading}
        selectedPaymentMethodId={selectedPaymentMethodId}
        navigateToAddressComplete={navigateToAddressComplete}
        navigateToFillPaymentInfo={navigateToFillPaymentInfo}
        navigateFleetDetail={navigateFleetDetail}
        navigateToTransportableItems={navigateToTransportableItems}
        placeOrder={placeOrderHandler}
      />
    </View>
  );
}
