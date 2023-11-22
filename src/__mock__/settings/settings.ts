export interface AccountSettingItem {
  name: string;
  icon: string;
  iconType: string;
  path: string;
}
export const MockAccountSettings: AccountSettingItem[] = [
  {
    name: "Edit Profile",
    icon: "arrow-right",
    iconType: "SimpleLineIcons",
    path: "",
  },
  {
    name: "Change Password",
    icon: "arrow-right",
    iconType: "SimpleLineIcons",
    path: "",
  },
  {
    name: "Change Pin",
    icon: "arrow-right",
    iconType: "SimpleLineIcons",
    path: "",
  },
  {
    name: "My Rewards",
    icon: "arrow-right",
    iconType: "SimpleLineIcons",
    path: "",
  },
  {
    name: "Push Notifications",
    icon: "toggle-switch-off-outline",
    iconType: "MaterialCommunityIcons",
    path: "",
  },
  {
    name: "Set Fingerprint",
    icon: "toggle-switch-off-outline",
    iconType: "MaterialCommunityIcons",
    path: "",
  },
];
