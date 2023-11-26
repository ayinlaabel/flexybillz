import AsyncStorage from "@react-native-async-storage/async-storage";
import { MockNetworkData } from "../../__mock__/services/service";
import { appStateType } from "@constants/app-state/appState";
import { useNavigation } from "@react-navigation/core";

export const logger = (...value: any[]) => {
  if (__DEV__) {
    console.log(...value);
  } else {
    //log this to somewhere for tracking
  }
};

export const storeData = async (key: string, data: any) => {
  await AsyncStorage.setItem(key, data);
  return;
};

export const getData = async (key: string) => {
  return await AsyncStorage.getItem(key);
};

export const removeData = async (key: string) => {
  await AsyncStorage.removeItem(key);
  return;
};

export const convertToNaira = (amount: string) => {
  return `\u20A6${amount}`;
};

export const getProvider = (phone: string) => {
  if (
    phone.startsWith("0703") ||
    phone.startsWith("0706") ||
    phone.startsWith("07025") ||
    phone.startsWith("07026") ||
    phone.startsWith("0704") ||
    phone.startsWith("0803") ||
    phone.startsWith("0806") ||
    phone.startsWith("0813") ||
    phone.startsWith("0816") ||
    phone.startsWith("0810") ||
    phone.startsWith("0814") ||
    phone.startsWith("0903") ||
    phone.startsWith("0906") ||
    phone.startsWith("0913") ||
    phone.startsWith("0916") ||
    phone.startsWith("0801")
  ) {
    return MockNetworkData[1];
  } else if (
    phone.startsWith("0805") ||
    phone.startsWith("0705") ||
    phone.startsWith("0905") ||
    phone.startsWith("0806") ||
    phone.startsWith("0706") ||
    phone.startsWith("0813") ||
    phone.startsWith("0810") ||
    phone.startsWith("0814") ||
    phone.startsWith("0816") ||
    phone.startsWith("0915") ||
    phone.startsWith("0811") ||
    phone.startsWith("0815")
  ) {
    return MockNetworkData[2];
  } else if (
    phone.startsWith("0809") ||
    phone.startsWith("0909") ||
    phone.startsWith("0817") ||
    phone.startsWith("0818") ||
    phone.startsWith("0908")
  ) {
    return MockNetworkData[0];
  } else if (
    phone.startsWith("0802") ||
    phone.startsWith("0902") ||
    phone.startsWith("0701") ||
    phone.startsWith("0808") ||
    phone.startsWith("0708") ||
    phone.startsWith("0812") ||
    phone.startsWith("0901") ||
    phone.startsWith("0904") ||
    phone.startsWith("0907") ||
    phone.startsWith("0912")
  ) {
    return MockNetworkData[3];
  } else {
    return null;
  }
};
