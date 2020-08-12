import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { t } from '../../../strings';
import BackButton from '../../common/buttons/BackButton';
import ProfileCards from '../../profile/ProfileCards';
import ProfileEdit from '../../profile/ProfileEdit';
import ConsumerHome from './ConsumerHome';
import AddressComplete from './orders/AddressComplete';
import CreateOrderP2P from './orders/p2p-order/CreateOrderP2P';
import { HomeStackParamList } from './types';
import OrderFeedback from './orders/OrderFeedback';

const Stack = createStackNavigator<HomeStackParamList>();
export default function () {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ConsumerHome"
        component={ConsumerHome}
        options={{ headerShown: false, title: '' }}
      />
      <Stack.Screen
        name="CreateOrderP2P"
        component={CreateOrderP2P}
        options={({ navigation }) => ({
          title: t('Novo pedido'),
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        })}
      />
      <Stack.Screen
        name="AddressComplete"
        component={AddressComplete}
        options={({ navigation }) => ({
          title: t('Adicionar endereço'),
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        })}
      />
      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEdit}
        options={({ navigation }) => ({
          title: t('Seus dados'),
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        })}
      />
      <Stack.Screen
        name="ProfileCards"
        component={ProfileCards}
        options={({ navigation }) => ({
          title: t('Formas de pagamento'),
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        })}
      />
      <Stack.Screen
        name="OrderFeedback"
        component={OrderFeedback}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
