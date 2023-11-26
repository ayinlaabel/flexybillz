import AuthNavigation from "@navigation/auth-navigation/AuthNavigation";
import {
  ParamListBase,
  StackNavigationState,
  RouteConfig,
} from "@react-navigation/core";
import { DefaultNavigatorOptions } from "@react-navigation/native";
import {
  StackNavigationOptions,
  StackNavigationEventMap,
  createStackNavigator,
} from "@react-navigation/stack";
import FingerPrintSetup from "@screens/finger-print/FingerPrintSetup";
import FundWallet from "@screens/fund-wallet/FundWallet";
import GetStarted from "@screens/get-started/GetStarted";
import Login from "@screens/login/Login";
import LoginWithPin from "@screens/login/LoginWithPin";
import EditProfile from "@screens/profile/edit-profile/EditProfile";
import Registration from "@screens/register/Registration";
import SecurePin from "@screens/secure-pin/SecurePin";
import VerifySecurePin from "@screens/secure-pin/VerifySecurePin";
import ChangePassword from "@screens/secure-pin/change-password/ChangePassword";
import ChangePin from "@screens/secure-pin/change-pin/ChangePin";
import ResetPassword from "@screens/secure-pin/reset-password/ResetPassword";
import Airtime from "@screens/services/buy-airtime/Airtime";
import BuyData from "@screens/services/buy-data/BuyData";
import Success from "@screens/services/success/Success";
import SelectVerificationMode from "@screens/verification/SelectVerificationMode";
import Verification from "@screens/verification/Verification";

export type AppStackParamsList = {
  GetStarted: undefined;
  Login: undefined;
  Signup: undefined;
  Verification: undefined;
  SecurePin: undefined;
  VerifySecurePin: { securePin: string };
  FingerPrintSetup: undefined;
  LoginWithPin: undefined;
  Dashboard: undefined;
  SelectVerificationMode: undefined;
  Airtime: undefined;
  SuccessAirtime: { amount: "" };
  Data: undefined;
  FundWallet: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
  ResetPassword: undefined;
  ChangePin: undefined;
  ResetPin: undefined;
};

type StackNavigatorOptions<ParamList extends ParamListBase> =
  DefaultNavigatorOptions<
    ParamList,
    StackNavigationState<ParamList>,
    StackNavigationOptions,
    StackNavigationEventMap
  >;

export type StackRouteType<ParamList extends ParamListBase> = Array<
  RouteConfig<
    ParamList,
    keyof ParamList,
    StackNavigationState<ParamList>,
    StackNavigationOptions,
    StackNavigationEventMap
  >
>;

type AppRouteStackType = StackRouteType<AppStackParamsList>;

export const appStackNavigatiorProps: Omit<
  StackNavigatorOptions<AppStackParamsList>,
  "children"
> = {
  screenOptions: {
    headerShown: false,
    cardOverlayEnabled: true,
    gestureEnabled: false,
  },
};

export const Stack = createStackNavigator<AppStackParamsList>();

export const appRoutes: AppRouteStackType = [
  {
    name: "GetStarted",
    component: GetStarted,
  },
  {
    name: "Login",
    component: Login,
  },
  {
    name: "Signup",
    component: Registration,
  },
  {
    name: "Verification",
    component: Verification,
  },
  {
    name: "SecurePin",
    component: SecurePin,
  },
  {
    name: "VerifySecurePin",
    component: VerifySecurePin,
  },
  {
    name: "FingerPrintSetup",
    component: FingerPrintSetup,
  },
  {
    name: "LoginWithPin",
    component: LoginWithPin,
  },
  {
    name: "Dashboard",
    component: AuthNavigation,
  },
  {
    name: "SelectVerificationMode",
    component: SelectVerificationMode,
  },
  {
    name: "Airtime",
    component: Airtime,
  },
  {
    name: "SuccessAirtime",
    component: Success,
  },
  {
    name: "Data",
    component: BuyData,
  },
  {
    name: "FundWallet",
    component: FundWallet,
  },
  {
    name: "EditProfile",
    component: EditProfile,
  },
  {
    name: "ChangePassword",
    component: ChangePassword,
  },
  {
    name: "ChangePin",
    component: ChangePin,
  },
  {
    name: "ResetPassword",
    component: ResetPassword,
  },
];
