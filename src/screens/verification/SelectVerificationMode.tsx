import React from "react";
import { TouchableOpacity } from "react-native";
import {
  Container,
  ImageTag,
  Paragraph,
} from "../../utils/shared/styled-components";
import { SCREEN_HEIGHT } from "../../constants";
import { backIcon } from "../../assets/icons";
import { colors } from "../../utils";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamsList } from "../../navigation/app-navigation/appRoutes";
import { sendOtpEmail } from "../../networking/getQuery";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../assets/images";
import { SoildButton } from "../../components/button";
import { useDispatch, useSelector } from "react-redux";
import { selectEmail, selectPhoneNumber } from "../../redux";

const SelectVerificationMode = () => {
  const { navigate, goBack } =
    useNavigation<StackNavigationProp<AppStackParamsList>>();

  const dispatch = useDispatch();
  const email = useSelector(selectEmail);
  const phoneNumber = useSelector(selectPhoneNumber);

  const handleGoBack = () => {
    goBack();
  };

  const handleSendWhatsAppOtp = async () => {};

  const handleSendEmailOtp = async () => {
    const { data } = await sendOtpEmail({ email });
    navigate("Verification");
  };
  return (
    <Container
      height={JSON.stringify(SCREEN_HEIGHT)}
      pb="40px"
      background={colors.whiteColor}
    >
      <SafeAreaView />
      <Container height="100%" justify="space-between">
        <Container>
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
          <Container items="center">
            <Paragraph
              size="20px"
              fontFamily="PoppinMedium"
              color={colors.brandColor}
            >
              Choose verification method
            </Paragraph>
            <Paragraph color={colors.lightGrayColor}>
              Choose verification Method
            </Paragraph>
          </Container>
        </Container>
        <Container height={250}>
          <ImageTag source={images.verifyImage} resizeMode="contain" />
        </Container>
        <Container px="10px" gap="10px">
          <SoildButton
            height={60}
            width="100%"
            background={colors.brandColor}
            color={colors.whiteColor}
            items="center"
            justify="center"
            size="18px"
            rightBottomRadius="30px"
            rightTopRadius="30px"
            leftBottomRadius="30px"
            leftTopRadius="30px"
            onPress={handleSendWhatsAppOtp}
          >
            Verify with WhatsApp
          </SoildButton>
          <SoildButton
            height={60}
            width="100%"
            background={colors.blackColor}
            color={colors.whiteColor}
            items="center"
            justify="center"
            size="18px"
            rightBottomRadius="30px"
            rightTopRadius="30px"
            leftBottomRadius="30px"
            leftTopRadius="30px"
            onPress={handleSendEmailOtp}
          >
            Verify with email
          </SoildButton>
        </Container>
      </Container>
    </Container>
  );
};

export default SelectVerificationMode;
