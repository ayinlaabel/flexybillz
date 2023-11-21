import { getData } from "../../utils";

export enum appStateType {
  isRegistered = "IsRegistered",
  isLogOut = "isLogOut",
  isVerified = "isVerified",
  isLogin = "isLogin",
}

export const appState = async () => {
  const isRegistered = await getData(appStateType.isRegistered);
  const isLogOut = await getData(appStateType.isLogOut);
  const isVerified = await getData(appStateType.isVerified);
  const isLogin = await getData(appStateType.isLogin);
  const email = await getData("email");
  const username = await getData("username");
  const phoneNumber = await getData("phoneNumber");
  const token = await getData("token");

  if (isRegistered) {
    return {
      email,
      username,
      phoneNumber,
      isRegistered,
    };
  } else if (isLogOut) {
    return {
      isLogOut,
      email,
      username,
    };
  } else if (isVerified) {
    return {
      email,
      username,
      phoneNumber,
      isVerified,
    };
  } else if (isLogin) {
    return {
      email,
      username,
      phoneNumber,
      isLogin,
      token
    };
  } else {
    return {
      email,
      username,
      phoneNumber,
      isRegistered,
    };
  }
};
