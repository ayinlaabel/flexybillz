import React, { useEffect, useState, useCallback } from "react";
import {
  AppStackParamsList,
  Stack,
  appRoutes,
  appStackNavigatiorProps,
} from "./appRoutes";
import { useSelector, useDispatch } from "react-redux";
import {
  selectInitialRoute,
  setEmail,
  setPhoneNumber,
  setToken,
  setUsername,
} from "../../redux";
import { getData } from "../../utils";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { appState } from "../../constants/app-state/appState";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const AppNavigation = () => {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);
  const [route, setRoute] = useState<keyof AppStackParamsList>("GetStarted");
  const queryClient = new QueryClient();
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
        token,
      } = await appState();

      if (isRegistered) {
        dispatch(setEmail(email));
        dispatch(setUsername(username));
        dispatch(setPhoneNumber(phoneNumber));
        setRoute("SelectVerificationMode");
        setAppIsReady(true);
      }
      if (isLogin && !token) {
        dispatch(setUsername(username));
        setRoute("LoginWithPin");
        setAppIsReady(true);
      }
      if (isLogin && token) {
        dispatch(setUsername(username));
        dispatch(setToken(token));
        setRoute("Dashboard");
        setAppIsReady(true);
      }
      if (isLogOut) {
        setRoute("Login");
        setAppIsReady(true);
      }

      if (isVerified) {
        dispatch(setUsername(username));
        setRoute("Login");
        setAppIsReady(true);
      } else {
        setRoute("GetStarted");
        setAppIsReady(true);
      }
    };

    handleAppState();
  }, []);

  const onLoadRoutes = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <NavigationContainer onReady={onLoadRoutes}>
      <QueryClientProvider client={queryClient}>
        <Stack.Navigator initialRouteName={route} {...appStackNavigatiorProps}>
          {appRoutes.map((routeConfig: any) => (
            <Stack.Screen key={routeConfig} {...routeConfig} />
          ))}
        </Stack.Navigator>
      </QueryClientProvider>
    </NavigationContainer>
  );
};

export default AppNavigation;
