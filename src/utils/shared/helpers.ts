import AsyncStorage from "@react-native-async-storage/async-storage";

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
