import React, { useState } from "react";
import {
  Container,
  ImageTag,
  Paragraph,
} from "../../utils/shared/styled-components";
import { images } from "../../assets/images";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../utils";
import StaticKeyboard from "../../components/keyboard/Keyboard";
import { Dimensions } from "react-native";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamsList } from "../../navigation/app-navigation/appRoutes";
import { useSelector } from "react-redux";
import { selectUser, selectUsername } from "../../redux";
import { useToast } from "react-native-toast-notifications";

const LoginWithPin = () => {
  const [pin, setPin] = useState<string[]>([]);

  const { navigate } = useNavigation<StackNavigationProp<AppStackParamsList>>();

  const [fingerPrint, setFingerPrint] = useState<boolean>(false);

  const toast = useToast();

  const user = useSelector(selectUser);
  const userId = useSelector(selectUsername);

  const { height: SCREEN_HEIGHT } = Dimensions.get("window");

  const handleKeyboardValues = (text: string) => {
    console.log(text);
    if (pin.length < 4) {
      setPin([...pin, text]);
    }

    if (pin.length === 3) {
      const walletPin = [...pin, text].length;
      console.log("Wallet", walletPin);
    }

    if (pin.length === 4) {
      toast.show("not bad", { type: "custom_success" });
    }
  };

  const handleDelete = () => {};

  const handleFingerPrint = () => {
    navigate("Dashboard");
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
            <Paragraph textAlign="center">{user?.firstName}</Paragraph>
          </Container>
        </Container>
        <Container>
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
