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
  userId: string | null;
  walletPin: string;
}
