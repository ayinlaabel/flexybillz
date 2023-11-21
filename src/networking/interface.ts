export interface ResponseProps {
  success: boolean;
  message: string;
  data: any;
}

export interface UserProps {
  phoneNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  password: string;
  userName: string;
  address?: string;
  state?: string;
  referedBy?: string;
  gender: string;
  confirmPassword: string;
}

export interface EmailOtpProps {
  email: string;
}

export interface ConfirmEmailOtpProps {
  email: string;
  otp: string;
}

export interface SetSecurePinProps {
  userName: string;
  walletPin: string;
}

export interface UserLoginProps {
  username: string;
  password: string;
}

export interface UserLoginWithPinProps {
  userName?: string | null;
  userId?: string | null;
  walletPin: string;
}

export interface BuyAirtimeProps {
  userName: string;
  amount: number;
  serviceID: string;
  phone: string;
}

export interface BuyDataProps {
  userName: string;
  serviceID: string;
  amount: number;
  phone: string;
  billersCode: string;
  variation_code: string;
}
