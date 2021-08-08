import { CompositeNavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import DefaultButton from '../../../../common/components/buttons/DefaultButton';
import PaddedView from '../../../../common/components/containers/PaddedView';
import { useMarketplaceAccountInfo } from '../../../../common/store/api/courier/account/useMarketplaceAccountInfo';
import { borders, colors, padding, texts } from '../../../../common/styles';
import { t } from '../../../../strings';
import { ApprovedParamList } from '../../types';
import { MainParamList } from '../types';

type ScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MainParamList, 'DeliveryHistory'>,
  StackNavigationProp<ApprovedParamList>
>;
type ScreenRoute = RouteProp<MainParamList, 'DeliveryHistory'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRoute;
};

export const MarketplaceAccountInfo = () => {
  // context
  const navigation = useNavigation<ScreenNavigationProp>();
  // side effects
  const info = useMarketplaceAccountInfo();
  // handlers
  const withdrawHandler = () => null;
  const advanceHandler = () =>
    navigation.navigate('DeliveriesNavigator', {
      screen: 'Receivables',
      params: {
        receivableBalance: info!.receivable_balance,
      },
    });
  // UI
  return (
    <View>
      <PaddedView>
        {info === undefined ? (
          <ActivityIndicator size="large" color={colors.green500} />
        ) : (
          <View>
            <PaddedView
              style={{
                ...borders.default,
                borderColor: colors.white,
                backgroundColor: colors.white,
              }}
            >
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ ...texts.sm, color: colors.grey700 }}>
                    {t('Disponível para saque')}
                  </Text>
                </View>
                <Text style={{ ...texts.x4l }}>{info.balance_available_for_withdraw}</Text>
                <DefaultButton
                  style={{ marginTop: padding }}
                  title={t('Transferir para conta')}
                  onPress={withdrawHandler}
                />
              </View>
            </PaddedView>
            <PaddedView
              style={{
                ...borders.default,
                borderColor: colors.white,
                backgroundColor: colors.white,
                marginTop: padding,
              }}
            >
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ ...texts.sm, color: colors.grey700 }}>{t('Em faturamento')}</Text>
                </View>
                <Text style={{ ...texts.x4l }}>{info.receivable_balance}</Text>
                <DefaultButton
                  style={{ marginTop: padding }}
                  title={t('Antecipar valores')}
                  onPress={advanceHandler}
                />
              </View>
            </PaddedView>
          </View>
        )}
      </PaddedView>
    </View>
  );
};
