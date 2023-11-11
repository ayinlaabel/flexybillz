import React, { useState } from "react";
import { TouchableOpacity, Dimensions, ActivityIndicator } from "react-native";
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
import Icon from "react-native-vector-icons/FontAwesome";
import OtpInput from "../../components/input/OTPInput";
import { useFormik } from "formik";
import { confirmOtpEmail, sendOtpEmail } from "../../networking/getQuery";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEmail,
  selectPhoneNumber,
  selectUser,
  selectUsername,
} from "../../redux";
import { removeData, storeData } from "../../utils/shared/helpers";
import { appState, appStateType } from "../../constants/app-state/appState";

import { useToast } from "react-native-toast-notifications";

const Verification = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const email = useSelector(selectEmail);
  const phoneNumber = useSelector(selectPhoneNumber);
  const username = useSelector(selectUsername);

  const { navigate, goBack } =
    useNavigation<StackNavigationProp<AppStackParamsList>>();

  const toast = useToast();

  const handleGoBack = () => {
    goBack();
  };

  const handleChange = (e: any) => {
    console.log(e);
    formik.values.otp = e;
    formik.handleSubmit();
  };

  const handleResend = async () => {
    setIsLoading(true);
    const { data } = await sendOtpEmail({ email });
    if (!data.success) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  const { height: SCREEN_HEIGHT } = Dimensions.get("window");

  const formik = useFormik({
    initialValues: { otp: "" },
    onSubmit: async (values) => {
      setIsLoading(true);
      const { data } = await confirmOtpEmail({ email, otp: values.otp });

      if (!data.success) {
        setIsLoading(false);
        setMessage(data.message);
        toast.show(
          "Invalid OTP, OTP does not match with the one sent to your email",
          { type: "custom_danger" }
        );
        console.log(data);
      } else {
        await removeData(appStateType.isRegistered);
        await storeData(appStateType.isVerified, "true");
        navigate("SecurePin");
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
              {email}
            </Paragraph>
          </Container>
          <Container justify="center" items="center">
            <OtpInput length={4} onChange={handleChange} />
          </Container>
          <Container mt="40px">
            <Container>
              <Paragraph>Didn’t get verification code?</Paragraph>
            </Container>
            {isLoading ? (
              <ActivityIndicator size={20} />
            ) : (
              <Container>
                <TouchableOpacity activeOpacity={0.9} onPress={handleResend}>
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
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => navigate("GetStarted")}
                >
                  <Container
                    mt="5px"
                    flexDirection="row"
                    items="center"
                    justify="center"
                  >
                    <Paragraph
                      ml="5px"
                      fontFamily="PoppinBold"
                      color={colors.brandColor}
                    >
                      Go Back
                    </Paragraph>
                  </Container>
                </TouchableOpacity>
              </Container>
            )}
          </Container>
        </Container>
      </ScrollView>
    </Container>
  );
};

export default Verification;
