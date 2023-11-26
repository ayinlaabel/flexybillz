import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import Navigation from "./src/navigation/Navigation";
import { customFonts } from "./src/assets/fonts";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { ToastProvider } from "react-native-toast-notifications";
import { Container, Paragraph } from "./src/utils/shared/styled-components";
import { colors } from "./src/utils";
import AntDesign from "react-native-vector-icons/AntDesign";
import CacheManager from "react-native-cached-image";

const App = () => {
  const [loaded] = useFonts(customFonts);

  if (!loaded) {
    return null;
  }
  // useEffect(() => {
  //   const clearImageCache = async () => {
  //     // await CacheManager.clearCache();
  //     // Force a re-render to reflect the changes
  //     // You might need to refresh the state or re-fetch the data
  //   };

  //   clearImageCache();
  // }, []);
  return (
    <Provider store={store}>
      <ToastProvider
        placement="top"
        duration={5000}
        animationType="slide-in"
        animationDuration={250}
        textStyle={{ fontSize: 20 }}
        offset={50}
        offsetTop={30}
        offsetBottom={40}
        swipeEnabled={true}
        renderType={{
          custom_danger: (toast) => (
            <Container
              height={100}
              width="80%"
              rightBottomRadius="20px"
              rightTopRadius="20px"
              leftBottomRadius="20px"
              leftTopRadius="20px"
              background={colors.dangerColor}
              items="center"
              justify="center"
            >
              <AntDesign
                name="closecircleo"
                size={100}
                style={{ position: "absolute", left: 0 }}
                color={colors.blackColor10}
              />
              <Paragraph color={colors.whiteColor}>{toast.message}</Paragraph>
            </Container>
          ),
          custom_success: (toast) => (
            <Container
              height={100}
              width="80%"
              rightBottomRadius="20px"
              rightTopRadius="20px"
              leftBottomRadius="20px"
              leftTopRadius="20px"
              background={colors.successColor}
              items="center"
              justify="center"
            >
              <AntDesign
                name="checkcircleo"
                size={100}
                style={{ position: "absolute", left: 0 }}
                color={colors.blackColor10}
              />
              <Paragraph color={colors.whiteColor}>{toast.message}</Paragraph>
            </Container>
          ),
        }}
      >
        <Navigation />
      </ToastProvider>
    </Provider>
  );
};
export default App;
