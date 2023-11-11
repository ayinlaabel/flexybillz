import React from "react";
import { BottomTab, authTabNavigatorProps, bottomRoute } from "./authRoute";

const AuthNavigation = () => {
  return (
    <BottomTab.Navigator {...authTabNavigatorProps}>
      {bottomRoute.map((tab: any) => (
        <BottomTab.Screen key={tab} {...tab} />
      ))}
    </BottomTab.Navigator>
  );
};

export default AuthNavigation;
