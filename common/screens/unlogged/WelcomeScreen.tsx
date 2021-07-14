import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
  Dimensions,
  Keyboard,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { LocationDisclosureModal } from '../../../courier/approved/main/home/LocationDisclosureModal';
import { t } from '../../../strings';
import { ApiContext, AppDispatch } from '../../app/context';
import CheckField from '../../components/buttons/CheckField';
import DefaultButton from '../../components/buttons/DefaultButton';
import DefaultInput from '../../components/inputs/DefaultInput';
import ShowIf from '../../components/views/ShowIf';
import { IconIllustrationIntro } from '../../icons/icon-illustrationIntro';
import { IconLogoGreen } from '../../icons/icon-logoGreen';
import { IconMotoCycleBig } from '../../icons/icon-motocycle-big';
import { track, useSegmentScreen } from '../../store/api/track';
import { getExtra, getFlavor } from '../../store/config/selectors';
import { showToast } from '../../store/ui/actions';
import { getUIBusy } from '../../store/ui/selectors';
import { signInWithEmail, signInWithEmailAndPassword } from '../../store/user/actions';
import { colors, halfPadding, padding, screens, texts } from '../../styles';
import { validateEmail } from '../../utils/validators';
import { UnloggedParamList } from './types';

type ScreenNavigationProp = StackNavigationProp<UnloggedParamList, 'WelcomeScreen'>;
type ScreenRouteProp = RouteProp<UnloggedParamList, 'WelcomeScreen'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

export default function ({ navigation, route }: Props) {
  // context
  const api = React.useContext(ApiContext);
  const dispatch = useDispatch<AppDispatch>();
  // const tallerDevice = useTallerDevice();
  const { height } = Dimensions.get('window');
  const tallerDevice = height > 640;
  // redux store
  const busy = useSelector(getUIBusy);
  const flavor = useSelector(getFlavor);
  const extra = useSelector(getExtra);
  // state
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isPasswordShown, setPasswordShown] = React.useState(false);
  const [acceptedTerms, setAcceptTerms] = React.useState(false);
  // side effects
  useSegmentScreen('Welcome');

  // handlers
  const signInHandler = React.useCallback(async () => {
    Keyboard.dismiss();
    if (!acceptedTerms) {
      dispatch(showToast(t('Você precisa aceitar os termos para criar sua conta.'), 'error'));
      return;
    }
    if (validateEmail(email).status !== 'ok') {
      dispatch(showToast(t('Digite um e-mail válido.'), 'error'));
      return;
    }
    track('Signing in', { email });
    try {
      if (!isPasswordShown) {
        await dispatch(signInWithEmail(api)(email.trim(), extra.environment));
        navigation.navigate('SignInFeedback', { email });
      } else {
        await dispatch(signInWithEmailAndPassword(api)(email.trim(), password.trim()));
      }
    } catch (error) {
      console.log(error);
      dispatch(
        showToast(t('Não foi possível registrar. Verifique seu e-mail e tente novamente.'), 'error')
      );
    }
  }, [acceptedTerms, api, dispatch, email, extra.environment, navigation]);

  const welcomeMessage =
    flavor === 'consumer'
      ? t('Um movimento por relações mais justas no delivery.')
      : t('Ganhe mais, com autonomia e transparência.');
  // UI
  return (
    <SafeAreaView style={{ ...screens.default }}>
      <KeyboardAwareScrollView
        enableOnAndroid
        enableAutomaticScroll
        keyboardOpeningTime={0}
        extraHeight={Platform.select({ android: 32 })}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{ flex: 1, paddingHorizontal: padding }}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Pressable delayLongPress={2000} onLongPress={() => setPasswordShown(!isPasswordShown)}>
              <>
                <ShowIf test={tallerDevice && flavor === 'consumer'}>
                  {() => (
                    <View style={{ left: -12 }}>
                      <IconIllustrationIntro />
                    </View>
                  )}
                </ShowIf>
                <ShowIf test={tallerDevice && flavor === 'courier'}>
                  {() => (
                    <View style={{ left: -12 }}>
                      <IconMotoCycleBig />
                    </View>
                  )}
                </ShowIf>
                <View style={{ marginTop: 32 }}>
                  <IconLogoGreen />
                </View>
                <View style={{ marginTop: padding }}>
                  <Text style={[texts.x2l]}>{welcomeMessage}</Text>
                  <Text
                    style={[
                      texts.sm,
                      { color: colors.grey700, lineHeight: 21, marginTop: padding },
                    ]}
                  >
                    {t('Digite seu e-mail para entrar ou criar sua conta.')}
                  </Text>
                </View>
              </>
            </Pressable>
          </TouchableWithoutFeedback>

          <View style={{ marginTop: padding }}>
            <DefaultInput
              value={email}
              title={t('Acesse sua conta')}
              placeholder={t('Digite seu e-mail')}
              onChangeText={setEmail}
              keyboardType="email-address"
              blurOnSubmit
              autoCapitalize="none"
            />
            {isPasswordShown ? (
              <DefaultInput
                style={{ marginTop: padding }}
                value={password}
                title={t('Senha')}
                placeholder={t('Digite sua senha')}
                onChangeText={setPassword}
                keyboardType="visible-password"
                blurOnSubmit
                autoCapitalize="none"
              />
            ) : null}
          </View>
          <View
            style={{
              flexDirection: tallerDevice ? 'row' : 'column',
              alignItems: tallerDevice ? 'center' : 'flex-start',
              justifyContent: 'space-between',
              marginTop: padding,
            }}
          >
            <View>
              <CheckField
                checked={acceptedTerms}
                onPress={() => setAcceptTerms(!acceptedTerms)}
                text={t('Aceito os termos de uso do app')}
              />
            </View>
            <View style={{ marginTop: !tallerDevice ? halfPadding : 0 }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Terms');
                }}
              >
                <Text style={[texts.xs, { color: colors.green600 }]}>{t('Ler os termos')}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1 }} />
          <View style={{ marginTop: 32 }}>
            <DefaultButton
              disabled={validateEmail(email).status !== 'ok' || !acceptedTerms || busy}
              title={t('Entrar')}
              onPress={signInHandler}
              activityIndicator={busy}
              style={{ marginBottom: padding }}
            />
          </View>

          {flavor === 'courier' && <LocationDisclosureModal />}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
