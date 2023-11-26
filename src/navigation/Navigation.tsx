import React, { useEffect } from "react";
import AppNavigation from "./app-navigation/AppNavigation";
import { appState } from "../constants/app-state/appState";
import { useDispatch } from "react-redux";
import { setEmail, setUsername } from "../redux";
import {
  setInitialRoute,
  setPhoneNumber,
  setUser,
} from "../redux/slices/userSlice";

const Navigation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleAppState = async () => {
      const {
        email,
        phoneNumber,
        username,
        isLogOut,
        isLogin,
        isRegistered,
        isVerified,
        user,
      } = await appState();

      if (isRegistered) {
        dispatch(setEmail(email));
        dispatch(setUsername(username));
        dispatch(setPhoneNumber(phoneNumber));
        dispatch(setInitialRoute("Verification"));
      }
      if (isLogin && user) {
        dispatch(setUsername(username));
        dispatch(setInitialRoute("Dashboard"));
        dispatch(setUser(JSON.parse(user)));
      }
      if (isLogOut) {
        dispatch(setInitialRoute("Login"));
      }

      if (isVerified) {
        dispatch(setUsername(username));
        dispatch(setInitialRoute("SecurePin"));
      }
    };

    handleAppState();
  }, []);

  return <AppNavigation />;
};

export default Navigation;
