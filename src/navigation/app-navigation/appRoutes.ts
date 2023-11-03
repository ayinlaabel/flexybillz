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
import GetStarted from "../../screens/get-started/GetStarted";
import Login from "../../screens/login/Login";
import Registration from "../../screens/register/Registration";
import Verification from "../../screens/verification/Verification";
import SecurePin from "../../screens/secure-pin/SecurePin";
import VerifySecurePin from "../../screens/secure-pin/VerifySecurePin";

export type AppStackParamsList = {
  GetStarted: undefined;
  Login: undefined;
  Signup: undefined;
  Verification: undefined;
  SecurePin: undefined;
  VerifySecurePin: undefined;
};

type StackNavigatorOptions<ParamList extends ParamListBase> =
  DefaultNavigatorOptions<
    ParamList,
    StackNavigationState<ParamList>,
    StackNavigationOptions,
    StackNavigationEventMap
  >;

type StackRouteType<ParamList extends ParamListBase> = Array<
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
  initialRouteName: "GetStarted",
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
];
