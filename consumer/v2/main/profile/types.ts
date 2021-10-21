import { IuguCustomerPaymentMethod } from '@appjusto/types/payment/iugu';
import { ProfileEditParamList } from '../../../../common/screens/profile/CommonProfileEdit';
import { ProfileEraseParamList } from '../../../../common/screens/profile/ProfileErase';
import { ProfileAddCardParamList } from './ProfileAddCard';
import { ProfilePaymentMethodsParamList } from './ProfilePaymentMethods';

export type ProfileParamList = {
  ProfileEdit?: {
    returnScreen?: 'FoodOrderCheckout' | 'CreateOrderP2P' | 'ProfileAddCard';
    returnNextScreen?: 'FoodOrderCheckout' | 'CreateOrderP2P';
  };
  PaymentMethodDetail: {
    paymentData: IuguCustomerPaymentMethod;
  };
  Terms: undefined;
  AboutApp: undefined;
  RequestProfileEdit: undefined;
} & ProfileEraseParamList &
  ProfilePaymentMethodsParamList &
  ProfileAddCardParamList &
  ProfileEditParamList;
