import React from "react";
import { useFonts } from "expo-font";
import Navigation from "./src/navigation/Navigation";
import { customFonts } from "./src/assets/fonts";

const App = () => {
  const [loaded] = useFonts(customFonts);

  if (!loaded) {
    return null;
  }
  return <Navigation />;
};
export default App;
