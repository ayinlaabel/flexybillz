import { AccountSettingItem } from "@mocks/settings/settings";

export interface AccountSettingProps {
  item: AccountSettingItem;
  index?: number;
}

export enum IconTypeProps {
  SWITCHICON = "MaterialCommunityIcons",
  ARROWICON = "SimpleLineIcons",
}

export enum SettingName {
  PUSHNOTIFICATION = "Push Notifications",
  SETFINGERPRINT = "Set Fingerprint",
}
