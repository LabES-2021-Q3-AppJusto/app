import { PushMessageData } from '@appjusto/types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Linking from 'expo-linking';
import { useURL } from 'expo-linking';
import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import * as icons from '../../../assets/icons';
import { ApiContext } from '../../../common/app/context';
import { track } from '../../../common/store/api/track';
import { halfPadding, padding, texts } from '../../../common/styles';
import { t } from '../../../strings';
import { LoggedNavigatorParamList } from '../types';
import OrderHistory from './history/OrderHistory';
import Home from './home/Home';
import Profile from './profile/Profile';
import { MainNavigatorParamList } from './types';
import { useNotificationHandler } from './useNotificationHandler';

type ScreenNavigationProp = StackNavigationProp<LoggedNavigatorParamList, 'MainNavigator'>;

const Tab = createBottomTabNavigator<MainNavigatorParamList>();

export const MainNavigator = () => {
  // context
  const navigation = useNavigation<ScreenNavigationProp>();
  const api = React.useContext(ApiContext);
  // handlers
  const handler = React.useCallback(
    (data: PushMessageData, clicked?: boolean, remove?: () => void) => {
      if (data.action === 'order-update') {
        if (clicked) {
          remove!();
          navigation.navigate('OngoingOrderNavigator', {
            screen: 'OngoingOrder',
            params: {
              orderId: data.orderId,
            },
          });
        }
      } else if (data.action === 'order-chat') {
        if (clicked) {
          remove!();
          navigation.navigate('OngoingOrderNavigator', {
            screen: 'OngoingOrder',
            params: {
              orderId: data.orderId,
              chatFrom: data.from,
            },
          });
        }
      }
    },
    [navigation]
  );
  useNotificationHandler('order-update', handler);
  useNotificationHandler('order-chat', handler);
  const deeplink = useURL();
  React.useEffect(() => {
    if (!deeplink) return;
    track('Deeplink navigator', {
      deeplink,
    });
    const parsedURL = Linking.parse(deeplink);
    if (!parsedURL?.path) return;
    track('Deeplink navigator', {
      parsedURL: parsedURL.path,
    });
    const r = /\/r\/([-a-zA-Z0-9]+)/.exec(parsedURL.path);
    if (!r) return;
    const [_, value] = r;
    track('Deeplink navigator', {
      value,
    });
    api
      .business()
      .fetchBusiness(value)
      .then((business) => {
        if (business) {
          navigation.navigate('FoodOrderNavigator', {
            screen: 'RestaurantNavigator',
            params: {
              restaurantId: business.id,
              screen: 'RestaurantDetail',
            },
          });
        }
      });
  }, [deeplink, api, navigation]);
  const { width } = Dimensions.get('window');
  // UI
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          height: 65,
          paddingVertical: 20,
          paddingHorizontal: padding,
          width,
        },
        tabStyle: {
          height: 24,
          alignContent: 'flex-start',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                left: -16,
              }}
            >
              <Image
                source={focused ? icons.homeFocused : icons.home}
                style={{
                  height: 24,
                  width: 24,
                  marginRight: halfPadding,
                }}
              />
              <Text style={{ ...texts.xs, fontFamily: focused ? 'BarlowBold' : 'BarlowMedium' }}>
                {t('Início')}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="OrderHistory"
        component={OrderHistory}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                left: -8,
              }}
            >
              <Image
                source={focused ? icons.ordersFocused : icons.orders}
                style={{
                  height: 24,
                  width: 24,
                  marginRight: halfPadding,
                }}
              />
              <Text style={{ ...texts.xs, fontFamily: focused ? 'BarlowBold' : 'BarlowMedium' }}>
                {t('Seus pedidos')}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <Image
                source={focused ? icons.userFocused : icons.user}
                style={{
                  height: 24,
                  width: 24,
                  marginRight: halfPadding,
                }}
              />
              <Text style={{ ...texts.xs, fontFamily: focused ? 'BarlowBold' : 'BarlowMedium' }}>
                {t('Sua conta')}
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
