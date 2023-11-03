import React from "react";
import { TouchableOpacity, Dimensions } from "react-native";
import {
  Container,
  ImageTag,
  Paragraph,
} from "../../utils/shared/styled-components";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../utils";
import { backIcon } from "../../assets/icons";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamsList } from "../../navigation/app-navigation/appRoutes";
import { ScrollView } from "react-native-gesture-handler";
import DefaultInput from "../../components/input/DefaultInput";
import Icon from "react-native-vector-icons/FontAwesome";
import OtpInput from "../../components/input/OTPInput";

const Verification = () => {
  const { navigate, goBack } =
    useNavigation<StackNavigationProp<AppStackParamsList>>();
  const handleGoBack = () => {
    goBack();
  };

  const handleChange = () => {};

  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
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
        <Container mt="30px" items="center">
          <Paragraph
            textAlign="center"
            size="20px"
            color={colors.brandColor}
            fontFamily="PoppinMedium"
            mb="10px"
          >
            Verify
          </Paragraph>
          <Container width="80%">
            <Paragraph textAlign="center">
              A verification code has been sent to your registered email:
              testemail@gmail.com
            </Paragraph>
          </Container>
          <Container justify="center" items="center">
            <OtpInput length={6} onChange={handleChange} />
          </Container>
          <Container mt="40px">
            <Container>
              <Paragraph>Didn’t get verification code?</Paragraph>
            </Container>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigate("SecurePin")}
            >
              <Container
                mt="5px"
                flexDirection="row"
                items="center"
                justify="center"
              >
                <Icon name="recycle" size={15} color={colors.brandColor} />
                <Paragraph
                  ml="5px"
                  fontFamily="PoppinBold"
                  color={colors.brandColor}
                >
                  Resend Code
                </Paragraph>
              </Container>
            </TouchableOpacity>
          </Container>
        </Container>
      </ScrollView>
    </Container>
  );
};

export default Verification;
