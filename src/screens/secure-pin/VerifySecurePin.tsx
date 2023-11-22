import React, { useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamsList } from "../../navigation/app-navigation/appRoutes";
import { useNavigation, useRoute } from "@react-navigation/core";
import { Dimensions, ScrollView, TouchableOpacity } from "react-native";
import {
  Container,
  ImageTag,
  Paragraph,
} from "../../utils/shared/styled-components";
import { colors } from "../../utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { backIcon } from "../../assets/icons";
import StaticKeyboard from "../../components/keyboard/Keyboard";
import { SoildButton } from "../../components/button";
import { useFormik } from "formik";
import { confirmPinSchema } from "../../schema";
import {
  getUserByUserName,
  setSecurePin,
  userLoginWithPin,
} from "../../networking/getQuery";
import { selectUsername, setUser } from "../../redux";
import { useSelector, useDispatch } from "react-redux";
import { removeData, storeData } from "../../utils/shared/helpers";
import { appStateType } from "../../constants/app-state/appState";
import {
  selectToken,
  setFirstName,
  setToken,
} from "../../redux/slices/userSlice";

const VerifySecurePin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pin, setPin] = useState<string[]>([]);
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const route = useRoute();

  const { securePin } = route.params;

  const username = useSelector(selectUsername);

  const dispatch = useDispatch();

  const { navigate, goBack } =
    useNavigation<StackNavigationProp<AppStackParamsList>>();

  const handleGoBack = () => {
    goBack();
  };
  const handleSubmit = () => {
    if (pin.length === 4) {
      formik.values.confirmPin = pin.join("");
      formik.handleSubmit();
    }
  };

  const handleKeyboard = (values: string) => {
    if (pin.length < 4) {
      setPin([...pin, values]);
    }
  };
  const handleDelete = () => {
    let newPin = pin;
    if (pin.length > 0) {
      newPin.pop();
      setPin([...newPin]);
    }
  };

  const formik = useFormik({
    initialValues: { pin: securePin, confirmPin: "" },
    validationSchema: confirmPinSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      const { data } = await setSecurePin({
        userName: username,
        walletPin: values.pin,
      });

      if (!data.success) {
        setIsLoading(false);
      } else {
        const { data } = await userLoginWithPin({
          userId: username,
          walletPin: values.pin,
        });
        if (!data.success) {
          setIsLoading(false);
          await removeData(appStateType.isVerified);
          await storeData(appStateType.isLogOut, "true");
          navigate("Login");
        } else {
          setIsLoading(false);
          await removeData(appStateType.isVerified);
          await storeData(appStateType.isLogin, "true");
          dispatch(setFirstName(data.data.firstName));
          dispatch(setToken(data.data.token.token));
          navigate("FingerPrintSetup");
        }
      }
    },
  });
  return (
    <Container
      height={JSON.stringify(SCREEN_HEIGHT)}
      background={colors.whiteColor}
    >
      <SafeAreaView />
      <Container
        height={50}
        justify="center"
        px="15px"
        background={colors.whiteColor}
      >
        <TouchableOpacity onPress={handleGoBack}>
          <Container width={40} height={20}>
            <ImageTag source={backIcon} resizeMode="contain" />
          </Container>
        </TouchableOpacity>
      </Container>
      <ScrollView>
        <Container mt="30px" items="center" width={"100%"}>
          <Paragraph
            textAlign="center"
            size="20px"
            color={colors.brandColor}
            fontFamily="PoppinMedium"
            mb="10px"
          >
            Verify You Pin
          </Paragraph>
          <Container width="75%">
            <Paragraph
              textAlign="center"
              size="16px"
              color={colors.brandColor}
              fontFamily="PoppinMedium"
              mb="5px"
              mt="30px"
            >
              Verify your secured pin
            </Paragraph>
            <Paragraph textAlign="center">
              Re-enter your pin for confirmation
            </Paragraph>
          </Container>
          {formik.errors && (
            <Paragraph size="12px" color={"red"}>
              {formik.errors.confirmPin}
            </Paragraph>
          )}
          <Container mt="30px">
            <Container flexDirection="row" gap="10">
              <Container
                height={60}
                width={55}
                background={colors.grayColor}
                rightBottomRadius="10px"
                rightTopRadius="10px"
                leftBottomRadius="10px"
                leftTopRadius="10px"
                items="center"
                justify="center"
              >
                <Paragraph>{pin[0]}</Paragraph>
              </Container>
              <Container
                height={60}
                width={55}
                background={colors.grayColor}
                rightBottomRadius="10px"
                rightTopRadius="10px"
                leftBottomRadius="10px"
                leftTopRadius="10px"
                items="center"
                justify="center"
              >
                <Paragraph>{pin[1]}</Paragraph>
              </Container>
              <Container
                height={60}
                width={55}
                background={colors.grayColor}
                rightBottomRadius="10px"
                rightTopRadius="10px"
                leftBottomRadius="10px"
                leftTopRadius="10px"
                items="center"
                justify="center"
              >
                <Paragraph>{pin[2]}</Paragraph>
              </Container>
              <Container
                height={60}
                width={55}
                background={colors.grayColor}
                rightBottomRadius="10px"
                rightTopRadius="10px"
                leftBottomRadius="10px"
                leftTopRadius="10px"
                items="center"
                justify="center"
              >
                <Paragraph>{pin[3]}</Paragraph>
              </Container>
            </Container>
          </Container>
          <StaticKeyboard
            sendValues={handleKeyboard}
            handleDelete={handleDelete}
            mt="30px"
          />
          <Container width={"100%"} px="20px">
            <SoildButton
              height={55}
              rightBottomRadius="15px"
              rightTopRadius="15px"
              leftBottomRadius="15px"
              leftTopRadius="15px"
              onPress={handleSubmit}
              items="center"
              justify="center"
              size="17px"
              isLoading={isLoading}
              color={colors.whiteColor}
              background={colors.brandColor}
              fontFamily="PoppinSemiBold"
            >
              Continue
            </SoildButton>
          </Container>
        </Container>
      </ScrollView>
    </Container>
  );
};

export default VerifySecurePin;
