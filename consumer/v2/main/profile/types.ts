import { IuguCustomerPaymentMethod } from 'appjusto-types/payment/iugu';
import { ProfileEraseParamList } from '../../../../common/screens/profile/ProfileErase';
import { ProfileAddCardParamList } from './ProfileAddCard';
import { ProfilePaymentMethodsParamList } from './ProfilePaymentMethods';

export type ProfileParamList = {
  ProfileEdit: {
    firstOrder?: boolean;
    returnScreen?: 'FoodOrderCheckout' | 'CreateOrderP2P';
  };
  PaymentMethodDetail: {
    paymentData: IuguCustomerPaymentMethod;
  };
  Terms: undefined;
} & ProfileEraseParamList &
  ProfilePaymentMethodsParamList &
  ProfileAddCardParamList;
