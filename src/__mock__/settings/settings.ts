import { AppStackParamsList } from "@navigation/app-navigation/appRoutes";

export interface AccountSettingItem {
  name: string;
  icon: string;
  iconType: string;
  path: keyof AppStackParamsList;
}
export const MockAccountSettings: AccountSettingItem[] = [
  {
    name: "Edit Profile",
    icon: "arrow-right",
    iconType: "SimpleLineIcons",
    path: "EditProfile",
  },
  {
    name: "Change Password",
    icon: "arrow-right",
    iconType: "SimpleLineIcons",
    path: "ChangePassword",
  },
  {
    name: "Change Pin",
    icon: "arrow-right",
    iconType: "SimpleLineIcons",
    path: "ChangePin",
  },
  {
    name: "My Rewards",
    icon: "arrow-right",
    iconType: "SimpleLineIcons",
    path: "Dashboard",
  },
  {
    name: "Push Notifications",
    icon: "toggle-switch-off-outline",
    iconType: "MaterialCommunityIcons",
    path: "Dashboard",
  },
  {
    name: "Set Fingerprint",
    icon: "toggle-switch-off-outline",
    iconType: "MaterialCommunityIcons",
    path: "Dashboard",
  },
];
