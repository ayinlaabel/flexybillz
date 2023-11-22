import React, { useState, useEffect } from "react";
import {
  Container,
  ImageTag,
  Paragraph,
} from "../../utils/shared/styled-components";
import { images } from "../../assets/images";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, getData, storeData } from "../../utils";
import StaticKeyboard from "../../components/keyboard/Keyboard";
import { Dimensions, ActivityIndicator } from "react-native";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamsList } from "../../navigation/app-navigation/appRoutes";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectUsername } from "../../redux";
import { useToast } from "react-native-toast-notifications";
import { userLoginWithPin } from "../../networking/getQuery";
import {
  setFirstName,
  setToken,
  setUsername,
} from "../../redux/slices/userSlice";

const LoginWithPin = () => {
  const [pin, setPin] = useState<string[]>([]);
  const [firstName, setfirstName] = useState<string | null>("");
  const [username, setusername] = useState<string | null>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { navigate, replace } =
    useNavigation<StackNavigationProp<AppStackParamsList>>();

  const [fingerPrint, setFingerPrint] = useState<boolean>(false);

  const toast = useToast();

  const user = useSelector(selectUser);
  const userId = useSelector(selectUsername);

  const dispatch = useDispatch();

  useEffect(() => {
    const getFirstName = async () => {
      const firstName = await getData("firstName");
      const username = await getData("username");
      setfirstName(firstName);
      setusername(username);
    };

    getFirstName();
  }, []);

  const { height: SCREEN_HEIGHT } = Dimensions.get("window");

  const handleKeyboardValues = async (text: string) => {
    if (pin.length < 4) {
      setPin([...pin, text]);
    }

    if (pin.length === 3) {
      const walletPin = [...pin, text].join("").toString();

      setIsLoading(true);
      const { data } = await userLoginWithPin({
        userId: username,
        walletPin: walletPin,
      });

      if (!data.success) {
        toast.show(data.message, { type: "custom_danger" });
        setIsLoading(false);
        setPin([]);
      } else {
        // toast.show(data.message, { type: "custom_success" });
        dispatch(setFirstName(data.data.firstName));
        dispatch(setUsername(data.data.userId));
        dispatch(setToken(data.data.token.token));
        await storeData("token", data.data.token.token);
        setIsLoading(false);
        replace("Dashboard");
        setPin([]);
      }
    }
  };

  const handleDelete = () => {};

  const handleFingerPrint = () => {
    toast.show("Comming Soon", { type: "custom_danger" });
  };
  return (
    <Container
      height={JSON.stringify(SCREEN_HEIGHT)}
      background={colors.whiteColor}
    >
      <SafeAreaView />
      <Container
        height={"100%"}
        py="30px"
        items="center"
        justify="space-between"
      >
        <Container items="center">
          <Container
            height={150}
            width={140}
            rightBottomRadius="100"
            rightTopRadius="100"
            leftBottomRadius="100"
            leftTopRadius="100"
            overflow="hidden"
          >
            <ImageTag source={images.avatar} />
          </Container>
          <Container mt="20px">
            <Paragraph
              size="26px"
              fontFamily="PoppinBold"
              color={colors.brandColor}
              textAlign="center"
            >
              Welcome Back
            </Paragraph>
            <Paragraph textAlign="center">{firstName}</Paragraph>
          </Container>
        </Container>
        <Container>
          {isLoading ? (
            <ActivityIndicator color={colors.brandColor} size={40} />
          ) : (
            <Container
              height={70}
              flexDirection="row"
              gap="10"
              items="center"
              justify="center"
            >
              <Paragraph
                size="50px"
                color={pin[0] ? colors.blackColor : colors.lightGrayColor}
                fontFamily="PoppinMedium"
              >
                *
              </Paragraph>
              <Paragraph
                size="50px"
                color={pin[1] ? colors.blackColor : colors.lightGrayColor}
                fontFamily="PoppinMedium"
              >
                *
              </Paragraph>
              <Paragraph
                size="50px"
                color={pin[2] ? colors.blackColor : colors.lightGrayColor}
                fontFamily="PoppinMedium"
              >
                *
              </Paragraph>
              <Paragraph
                size="50px"
                color={pin[3] ? colors.blackColor : colors.lightGrayColor}
                fontFamily="PoppinMedium"
              >
                *
              </Paragraph>
            </Container>
          )}
          <StaticKeyboard
            sendValues={handleKeyboardValues}
            handleDelete={handleDelete}
            handleFingerPrint={handleFingerPrint}
            isSignOut={true}
            isFingerPrint={true}
          />
          {fingerPrint && Alert.alert("1")}
        </Container>
      </Container>
    </Container>
  );
};

export default LoginWithPin;
