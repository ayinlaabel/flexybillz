import React, { useState } from "react";
import { colors, logger } from "@utils/index";
import {
  Container,
  ImageTag,
  Paragraph,
} from "@utils/shared/styled-components";
import { SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import Octicons from "react-native-vector-icons/Octicons";
import { SCREEN_HEIGHT } from "@constants/index";
import DefaultInput from "@components/input/DefaultInput";
import { useSelector } from "react-redux";
import { selectEmail, selectFromRoute, selectUser } from "@redux/index";
import { images } from "@assets/images";
import { useFormik } from "formik";
import { SoildButton } from "@components/button";
import resetPasswordSchema from "@schema/resetPassword.schema";
import { postResetPassword, sendTokenEmail } from "@networking/getQuery";
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthTabParamsList } from "@navigation/auth-navigation/authRoute";
import { AppStackParamsList } from "@navigation/app-navigation/appRoutes";

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isReset, setIsReset] = useState<boolean>(false);

  const { replace, goBack, navigate } =
    useNavigation<StackNavigationProp<AuthTabParamsList>>();
  const { replace: appReplace } =
    useNavigation<StackNavigationProp<AppStackParamsList>>();
  const user = useSelector(selectUser);
  const email = useSelector(selectEmail);
  const fromRoute = useSelector(selectFromRoute);

  const toast = useToast();

  const handleGoBack = () => {
    goBack();
  };
  const handleResendToken = async () => {
    setIsReset(true);
    const { data } = await sendTokenEmail({ email: email });

    if (!data.success) {
      toast.show(data.message, { type: "custom_danger" });
      setIsReset(false);
    } else {
      setIsReset(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: email,
      newPassword: "",
      confirmPassword: "",
      token: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      const { data } = await postResetPassword(values);

      if (!data.success) {
        toast.show(data.message, { type: "custom_danger" });
        setIsLoading(false);
      } else {
        if (!fromRoute) {
          setIsLoading(false);
          navigate("Profile");
        } else {
          appReplace("Login");
        }
      }
    },
  });
  return (
    <Container>
      <SafeAreaView />

      <Container
        position="absolute"
        width="100%"
        top="0"
        background={colors.brandColor}
        height={300}
      />
      <Container
        flexDirection="row"
        justify="space-between"
        items="center"
        pr="20px"
        pl="20px"
        pt="40px"
        pb="40px"
      >
        <TouchableOpacity onPress={handleGoBack}>
          <Octicons name="arrow-left" color={colors.whiteColor} size={30} />
        </TouchableOpacity>
        <Paragraph
          size="18px"
          fontFamily="PoppinMedium"
          color={colors.whiteColor}
        >
          Reset Password
        </Paragraph>
        <Container width={40} height={20}>
          {/* <ImageTag source={countryIcon} resizeMode="contain" /> */}
        </Container>
      </Container>
      <Container
        items="center"
        width="100%"
        height="100%"
        background={colors.whiteColor}
        rightTopRadius="20px"
        leftTopRadius="20px"
        pt="20px"
        pb="20px"
      >
        <Container pb="20px" background={colors.whiteColor}>
          <Container
            height={100}
            width={90}
            rightBottomRadius="100"
            rightTopRadius="100"
            leftBottomRadius="100"
            leftTopRadius="100"
          >
            <Container
              height={100}
              width={90}
              rightBottomRadius="100"
              rightTopRadius="100"
              leftBottomRadius="100"
              leftTopRadius="100"
              overflow="hidden"
            >
              <ImageTag
                source={user?.photoUrl ? { uri: user.photoUrl } : images.avatar}
              />
            </Container>
          </Container>
        </Container>
        <ScrollView>
          <Container
            height={JSON.stringify(SCREEN_HEIGHT - 290)}
            pr="20px"
            pl="20px"
            mb="150px"
            mt="50px"
            gap="20"
          >
            <Container>
              <Paragraph>Reset Password Token</Paragraph>
              <DefaultInput
                height={55}
                px="10px"
                defaultValue={formik.values.token}
                rightBottomRadius="10px"
                rightTopRadius="10px"
                leftTopRadius="10px"
                leftBottomRadius="10px"
                onChangeText={formik.handleChange("token")}
              />
            </Container>
            <Container>
              <Paragraph>New Password</Paragraph>
              <DefaultInput
                height={55}
                defaultValue={formik.values.newPassword}
                px="10px"
                rightBottomRadius="10px"
                rightTopRadius="10px"
                leftTopRadius="10px"
                leftBottomRadius="10px"
                onChangeText={formik.handleChange("newPassword")}
              />
              {formik.errors.newPassword && formik.touched.newPassword && (
                <Paragraph color={colors.dangerColor} size="12px">
                  {formik.errors.newPassword}
                </Paragraph>
              )}
            </Container>
            <Container>
              <Paragraph>Confirm New Password</Paragraph>
              <DefaultInput
                height={55}
                px="10px"
                defaultValue={formik.values.confirmPassword}
                rightBottomRadius="10px"
                rightTopRadius="10px"
                leftTopRadius="10px"
                leftBottomRadius="10px"
                onChangeText={formik.handleChange("confirmPassword")}
              />
              {formik.errors.confirmPassword &&
                formik.touched.confirmPassword && (
                  <Paragraph color={colors.dangerColor} size="12px">
                    {formik.errors.confirmPassword}
                  </Paragraph>
                )}
            </Container>
            <Container items="flex-end">
              <TouchableOpacity activeOpacity={0.9} onPress={handleResendToken}>
                <Paragraph color={colors.brandColor}>Resend token</Paragraph>
              </TouchableOpacity>
            </Container>
            <Container
              position="absolute"
              bottom="35px"
              left="0"
              right="0"
              items="center"
            >
              <Container width="100%" px="20px">
                <SoildButton
                  items="center"
                  justify="center"
                  height={60}
                  size="16px"
                  width="100%"
                  fontFamily="PoppinMedium"
                  color={colors.whiteColor}
                  rightBottomRadius="10px"
                  rightTopRadius="10px"
                  leftBottomRadius="10px"
                  leftTopRadius="10px"
                  background={colors.brandColor}
                  isLoading={isLoading}
                  onPress={formik.handleSubmit}
                >
                  Update
                </SoildButton>
              </Container>
            </Container>
          </Container>
        </ScrollView>
      </Container>
    </Container>
  );
};

export default ResetPassword;
