import { OrderConfirmation } from '@appjusto/types';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Switch, Text, TouchableOpacity, View } from 'react-native';
import PaddedView from '../../../common/components/containers/PaddedView';
import SingleHeader from '../../../common/components/texts/SingleHeader';
import { IconFastFood } from '../../../common/icons/icon-fast-food';
import { borders, colors, halfPadding, padding, texts } from '../../../common/styles';
import { t } from '../../../strings';

type Props = {
  switchValue: boolean;
  onChangeCodeDelivery: (value: boolean) => void;
  confirmation: OrderConfirmation | undefined;
  onShareCode?: () => void;
};

export const DeliveryConfirmation = ({
  switchValue,
  onChangeCodeDelivery,
  confirmation,
  onShareCode,
}: Props) => {
  return (
    <View style={{ backgroundColor: colors.white, paddingTop: halfPadding, flex: 1 }}>
      <View style={{ flex: 1 }}>
        <SingleHeader title={t('Código de confirmação da entrega')} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: padding,
            flex: 1,
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ ...texts.x4l, color: switchValue ? colors.black : colors.grey500 }}>
            {confirmation?.handshakeChallenge}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                ...borders.default,
                backgroundColor: colors.white,
                marginTop: padding,
                borderColor: colors.black,
                borderWidth: 1.5,
                borderRadius: 32,
                marginBottom: 12,
              }}
            >
              <Switch
                trackColor={{ false: colors.white, true: colors.white }}
                ios_backgroundColor={colors.white}
                value={switchValue}
                thumbColor={switchValue ? colors.green500 : colors.yellow}
                onValueChange={onChangeCodeDelivery}
              />
            </View>
            <Text style={{ ...texts.sm, marginLeft: halfPadding }}>
              {switchValue ? t('Código ativado') : t('Código desativado')}
            </Text>
          </View>
        </View>
        <View
          style={{ paddingBottom: padding, paddingHorizontal: padding, paddingTop: halfPadding }}
        >
          <Text style={{ ...texts.xs, color: colors.grey700 }}>
            {t(
              'Na entrega, informe os 4 primeiros dígitos do seu celular. Se preferir, você pode desativar o código'
            )}
          </Text>
          <PaddedView
            half
            style={{
              marginTop: padding,
              backgroundColor: colors.grey50,
              flexDirection: 'row',
              alignItems: 'center',
              ...borders.default,
              borderColor: colors.grey50,
            }}
          >
            <View
              style={{
                height: 24,
                width: 24,
                borderRadius: 12,
                backgroundColor: colors.green500,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="share-social-outline" size={14} />
            </View>
            <TouchableOpacity onPress={onShareCode} style={{ width: '90%' }}>
              <View style={{ width: '100%' }}>
                <Text style={{ ...texts.sm, paddingLeft: halfPadding }}>
                  {t(
                    'Se você está pedindo para outra pessoa, compartilhe o código direto por mensagem'
                  )}
                </Text>
              </View>
            </TouchableOpacity>
          </PaddedView>
        </View>
        <PaddedView
          style={{
            backgroundColor: colors.grey50,
            flex: 1,
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <IconFastFood />
            <View style={{ marginLeft: padding, width: '75%' }}>
              <Text style={{ ...texts.sm }}>
                {t('Lembre-se: o entregador não deve cobrar nada ao entregar seu pedido')}
              </Text>
              <Text style={{ ...texts.xs, marginTop: halfPadding, color: colors.grey700 }}>
                {t(
                  'Não é necessário nenhum pagamento adicional no momento da entrega. Se isso acontecer, relate o problema para nós.'
                )}
              </Text>
            </View>
          </View>
        </PaddedView>
      </View>
    </View>
  );
};
