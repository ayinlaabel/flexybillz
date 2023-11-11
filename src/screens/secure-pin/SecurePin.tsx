import React, { useState } from "react";
import { Dimensions, ScrollView, TouchableOpacity } from "react-native";
import {
  Container,
  ImageTag,
  Paragraph,
} from "../../utils/shared/styled-components";
import { colors } from "../../utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { backIcon } from "../../assets/icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamsList } from "../../navigation/app-navigation/appRoutes";
import { useNavigation, useRoute } from "@react-navigation/core";
import StaticKeyboard from "../../components/keyboard/Keyboard";
import { SoildButton } from "../../components/button";

const SecurePin = () => {
  const [pin, setPin] = useState<string[]>([]);

  const { height: SCREEN_HEIGHT } = Dimensions.get("window");

  const { navigate, goBack } =
    useNavigation<StackNavigationProp<AppStackParamsList>>();

  const handleGoBack = () => {
    goBack();
  };

  const handleSubmit = () => {
    if (pin.length === 4) {
      navigate("VerifySecurePin", { securePin: pin.join("") });
    }
  };

  const handleKeyboard = (values: string) => {
    console.log(values);
    if (pin.length < 4) {
      setPin([...pin, values]);
    }

    console.log(pin);
  };
  const handleDelete = () => {
    let newPin = pin;
    if (pin.length > 0) {
      newPin.pop();
      setPin([...newPin]);
    }
  };
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
            Secure Pin
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
              Create your secured pin
            </Paragraph>
            <Paragraph textAlign="center">
              You will need this pin to process transactions on
              <Paragraph color={colors.brandColor} fontFamily="PoppinBold">
                {" "}
                FlexyBillz
              </Paragraph>
            </Paragraph>
          </Container>
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

export default SecurePin;
