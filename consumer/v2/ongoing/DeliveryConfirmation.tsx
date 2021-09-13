import { OrderConfirmation } from '@appjusto/types';
import React from 'react';
import { Text, View } from 'react-native';
import { HorizontalSelectItem } from '../../../common/components/buttons/HorizontalSelect';
import PaddedView from '../../../common/components/containers/PaddedView';
import SingleHeader from '../../../common/components/texts/SingleHeader';
import { IconFastFood } from '../../../common/icons/icon-fast-food';
import { borders, colors, halfPadding, padding, texts } from '../../../common/styles';
import { t } from '../../../strings';

type Props = {
  data: HorizontalSelectItem[];
  selected: HorizontalSelectItem;
  onSelect: (value: HorizontalSelectItem) => void;
  switchValue: boolean;
  onChangeCodeDelivery: (value: boolean) => void;
  confirmation: OrderConfirmation | undefined;
};

export const DeliveryConfirmation = ({
  data,
  selected,
  onSelect,
  switchValue,
  onChangeCodeDelivery,
  confirmation,
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
          }}
        >
          <Text style={{ ...texts.x4l }}>{confirmation?.handshakeChallenge}</Text>
        </View>
        <PaddedView>
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
            <Text style={{ ...texts.sm }}>
              {t(
                'Se você está pedindo para outra pessoa, compartilhe o código direto por mensagem'
              )}
            </Text>
          </PaddedView>
        </PaddedView>
        <PaddedView style={{ backgroundColor: colors.grey50, flex: 1 }}>
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
