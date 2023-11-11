import React from "react";
import {
  BottomTabNavigationEventMap,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  ParamListBase,
  RouteConfig,
  TabNavigationState,
} from "@react-navigation/core";
import { DefaultNavigatorOptions } from "@react-navigation/native";
import Dashboard from "../../screens/dashboard/Dashboard";
import Reward from "../../screens/reward/Reward";
import Services from "../../screens/services/Services";
import Wallet from "../../screens/wallet/Wallet";
import Profile from "../../screens/profile/Profile";
import { Container, Paragraph } from "../../utils/shared/styled-components";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../utils";
import BottomTabs from "../../components/bottom-tab/BottomTabs";

export type AuthTabParamsList = {
  Home: undefined;
  Reward: undefined;
  Services: undefined;
  Wallet: undefined;
  Profile: undefined;
};

type TabNavigatorOptions<ParamList extends ParamListBase> =
  DefaultNavigatorOptions<
    ParamList,
    TabNavigationState<ParamList>,
    BottomTabNavigationOptions,
    BottomTabNavigationEventMap
  >;

export type TabRouteType<ParamList extends ParamListBase> = Array<
  RouteConfig<
    ParamList,
    keyof ParamList,
    TabNavigationState<ParamList>,
    BottomTabNavigationOptions,
    BottomTabNavigationEventMap
  >
>;

type AuthRouteTabType = TabRouteType<AuthTabParamsList>;

export const authTabNavigatorProps: Omit<
  TabNavigatorOptions<AuthTabParamsList>,
  "children"
> = {
  initialRouteName: "Home",
  screenOptions: {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: {
      position: "absolute",
      height: 65,
      paddingTop: 10,
    },
  },
};

export const BottomTab = createBottomTabNavigator<AuthTabParamsList>();

const HomeIcon = ({ focused }: any) => {
  return (
    <Feather
      name="home"
      size={20}
      color={focused ? colors.brandColor : colors.blackColor50}
    />
  );
};
const RewardIcon = ({ focused }: any) => {
  return (
    <MaterialCommunityIcons
      name="gift"
      size={20}
      color={focused ? colors.brandColor : colors.blackColor50}
    />
  );
};
const WalletIcon = ({ focused }: any) => {
  return (
    <Ionicons
      name="wallet-outline"
      size={20}
      color={focused ? colors.brandColor : colors.blackColor50}
    />
  );
};
const ServicesIcon = ({ focused }: any) => {
  return (
    <AntDesign
      name="appstore-o"
      size={20}
      color={focused ? colors.brandColor : colors.blackColor50}
    />
  );
};
const ProfileIcon = ({ focused }: any) => {
  return (
    <Feather
      name="user"
      size={20}
      color={focused ? colors.brandColor : colors.blackColor50}
    />
  );
};

export const bottomRoute: AuthRouteTabType = [
  {
    name: "Home",
    component: Dashboard,
    options: {
      tabBarIcon: ({ focused }) => (
        <BottomTabs Icon={HomeIcon} name="Home" focused={focused} />
      ),
    },
  },
  {
    name: "Reward",
    component: Reward,
    options: {
      tabBarIcon: ({ focused }) => (
        <BottomTabs Icon={RewardIcon} name="Reward" focused={focused} />
      ),
    },
  },
  {
    name: "Services",
    component: Services,
    options: {
      tabBarIcon: ({ focused }) => (
        <BottomTabs Icon={ServicesIcon} name="Services" focused={focused} />
      ),
    },
  },
  {
    name: "Wallet",
    component: Wallet,
    options: {
      tabBarIcon: ({ focused }) => (
        <BottomTabs Icon={WalletIcon} name="Wallet" focused={focused} />
      ),
    },
  },
  {
    name: "Profile",
    component: Profile,
    options: {
      tabBarIcon: ({ focused }) => (
        <BottomTabs Icon={ProfileIcon} name="Profile" focused={focused} />
      ),
    },
  },
];
