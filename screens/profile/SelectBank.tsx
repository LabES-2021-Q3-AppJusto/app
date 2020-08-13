import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import { t } from '../../strings';
import DefaultButton from '../common/DefaultButton';
import DefaultInput from '../common/DefaultInput';
import { borders, texts, screens, colors } from '../common/styles';
import { BANKS } from './banks';
import { ProfileParamList } from './types';

type ScreenNavigationProp = StackNavigationProp<ProfileParamList, 'SelectBank'>;
type ScreenRouteProp = RouteProp<ProfileParamList, 'SelectBank'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

export default function ({ navigation, route }: Props) {
  //state
  const [bank, setBank] = useState<null | { bankId: string; bankName: string }>(null);
  const [bankSearch, setBankSearch] = useState('');
  const filteredBanks = BANKS.filter((bank) => bank.label.indexOf(bankSearch) !== -1);

  //handlers
  const selectBankHandler = useCallback(() => {
    if (!bank) return; // TODO: showToast
    navigation.navigate('ProfileBank', { bank: bank! });
  }, [bank]);
  //UI
  return (
    <View style={{ ...screens.lightGrey, paddingTop: 16 }}>
      <DefaultInput
        // defaultValue={initialAddress}
        value={bankSearch}
        title={t('Banco')}
        placeholder={t('Nome do seu banco')}
        onChangeText={setBankSearch}
        style={{ marginBottom: 32 }}
      />
      <Text style={{ ...texts.small, color: colors.darkGrey, marginBottom: 14 }}>
        {t('Últimos endereços utilizados')}
      </Text>
      <FlatList
        data={filteredBanks}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setBank({ bankId: item.value, bankName: item.label });
                setBankSearch(item.label);
              }}
            >
              <View style={styles.item}>
                <Text style={{ ...texts.medium }}>{item.label}</Text>
                <Text style={{ ...texts.medium }}> - {item.value}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.value}
      />
      <DefaultButton
        style={{ marginBottom: 16 }}
        title={t('Confirmar banco')}
        onPress={selectBankHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    ...borders.default,
    justifyContent: 'space-between',
  },
});
