import React from "react";
import { Stack, appRoutes, appStackNavigatiorProps } from "./appRoutes";

const AppNavigation = () => {
  return (
    <Stack.Navigator {...appStackNavigatiorProps}>
      {appRoutes.map((routeConfig: any) => (
        <Stack.Screen key={routeConfig} {...routeConfig} />
      ))}
    </Stack.Navigator>
  );
};

export default AppNavigation;
