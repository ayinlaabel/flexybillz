import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./app-navigation/AppNavigation";

const Navigation = () => {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
};

export default Navigation;
