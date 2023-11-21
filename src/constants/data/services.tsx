import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { colors } from "../../utils";
import { Container, ImageTag } from "../../utils/shared/styled-components";
import { referEarnIcon } from "../../assets/icons";

const services = [
  {
    name: "Airtime",
    icon: <Ionicons name="call" size={12} color={colors.brandColor} />,
    path: "Airtime",
  },
  {
    name: "Data",
    icon: <FontAwesome5 name="wifi" size={12} color={colors.brandColor} />,
    path: "Data",
  },
  {
    name: "Electricity",
    icon: <FontAwesome5 name="lightbulb" size={12} color={colors.brandColor} />,
    path: "Airtime",
  },
  {
    name: "Cable Tv",
    icon: <FontAwesome name="tv" size={12} color={colors.brandColor} />,
    path: "Airtime",
  },
  {
    name: "Travel",
    icon: (
      <FontAwesome5
        name="plane-departure"
        size={12}
        color={colors.brandColor}
      />
    ),
    path: "Airtime",
  },
  {
    name: "Hotel",
    icon: <FontAwesome5 name="hotel" size={12} color={colors.brandColor} />,
    path: "Airtime",
  },
  {
    name: "Refer & Earn",
    icon: <ImageTag source={referEarnIcon} resizeMode="contain" />,
    path: "Airtime",
  },
  {
    name: "More",
    icon: (
      <Feather name="more-horizontal" size={12} color={colors.brandColor} />
    ),
    path: "Airtime",
  },
];

export const allServices = [
  {
    name: "Airtime",
    icon: <Ionicons name="call" size={30} color={colors.brandColor} />,
    path: "Airtime",
  },
  {
    name: "Data",
    icon: <FontAwesome5 name="wifi" size={30} color={colors.brandColor} />,
    path: "Data",
  },
  {
    name: "Electricity",
    icon: <FontAwesome5 name="lightbulb" size={30} color={colors.brandColor} />,
    path: "Airtime",
  },
  {
    name: "Cable Tv",
    icon: <FontAwesome name="tv" size={30} color={colors.brandColor} />,
    path: "Airtime",
  },
  {
    name: "Internet",
    icon: <FontAwesome5 name="dribbble" size={30} color={colors.brandColor} />,
    path: "Airtime",
  },
  {
    name: "Travel",
    icon: (
      <MaterialIcons
        name="airplanemode-active"
        size={30}
        color={colors.brandColor}
      />
    ),
    path: "Airtime",
  },
  {
    name: "Insurance",
    icon: <FontAwesome5 name="cross" size={30} color={colors.brandColor} />,
    path: "Airtime",
  },
  {
    name: "Betting",
    icon: <Feather name="target" size={30} color={colors.brandColor} />,
    path: "Airtime",
  },
  {
    name: "Education",
    icon: (
      <FontAwesome5 name="book-reader" size={30} color={colors.brandColor} />
    ),
    path: "Airtime",
  },
  {
    name: "Religion",
    icon: <FontAwesome5 name="church" size={30} color={colors.brandColor} />,
    path: "Airtime",
  },
  {
    name: "Refer & Earn",
    icon: <FontAwesome5 name="plus" size={30} color={colors.brandColor} />,
    path: "Airtime",
  },
  {
    name: "Gift User",
    icon: (
      <MaterialIcons name="people-alt" size={30} color={colors.brandColor} />
    ),
    path: "Airtime",
  },
];

export default services;
