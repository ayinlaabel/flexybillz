import React from "react";
import { SoildButton } from "@components/button";
import DefaultInput from "@components/input/DefaultInput";
import { selectToken, selectUser } from "@redux/index";
import { colors } from "@utils/index";
import {
  Container,
  ImageTag,
  Paragraph,
} from "@utils/shared/styled-components";
import { SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { images } from "@assets/images";
import Octicons from "react-native-vector-icons/Octicons";
import Feather from "react-native-vector-icons/Feather";
import { SCREEN_HEIGHT } from "@constants/index";
import { useFormik } from "formik";
import { postChangePassword, postChangeWalletPin } from "@networking/getQuery";
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamsList } from "@navigation/app-navigation/appRoutes";
import changePasswordSchema from "../../../schema/changePassword.schema";
import changeWalletSchema from "@schema/changeWalletPin.schema";

const ChangePin = () => {
  const { replace, goBack } =
    useNavigation<StackNavigationProp<AppStackParamsList>>();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const toast = useToast();

  const handleGoBack = () => {
    goBack();
  };

  const formik = useFormik({
    initialValues: {
      oldWalletPin: "",
      newWalletPin: "",
      confirmNewWalletPin: "",
    },
    validationSchema: changeWalletSchema,
    onSubmit: async (values) => {
      const userName = user.userName;
      const { confirmNewWalletPin, ...res } = values;
      console.log({ userName, ...res });
      const { data } = await postChangeWalletPin({ userName, ...res }, token);

      if (!data.success) {
        toast.show(data.message, { type: "custom_danger" });
      } else {
        toast.show(data.message, { type: "custom_success" });
        replace("Dashboard");
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
          Change Pin
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
                source={
                  user.photoUrl
                    ? { uri: user.photoUrl }
                    : images.avatar
                }
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
              <Paragraph>Current Pin</Paragraph>
              <DefaultInput
                height={55}
                px="10px"
                defaultValue={formik.values.oldWalletPin}
                rightBottomRadius="10px"
                rightTopRadius="10px"
                leftTopRadius="10px"
                leftBottomRadius="10px"
                onChangeText={formik.handleChange("oldWalletPin")}
              />
              {formik.errors.oldWalletPin && formik.touched.oldWalletPin && (
                <Paragraph color={colors.dangerColor} size="12px">
                  {formik.errors.oldWalletPin}
                </Paragraph>
              )}
            </Container>
            <Container>
              <Paragraph>New Pin</Paragraph>
              <DefaultInput
                height={55}
                defaultValue={formik.values.newWalletPin}
                px="10px"
                rightBottomRadius="10px"
                rightTopRadius="10px"
                leftTopRadius="10px"
                leftBottomRadius="10px"
                onChangeText={formik.handleChange("newWalletPin")}
              />
              {formik.errors.newWalletPin && formik.touched.newWalletPin && (
                <Paragraph color={colors.dangerColor} size="12px">
                  {formik.errors.newWalletPin}
                </Paragraph>
              )}
            </Container>
            <Container>
              <Paragraph>Confirm New Pin</Paragraph>
              <DefaultInput
                height={55}
                px="10px"
                defaultValue={formik.values.confirmNewWalletPin}
                rightBottomRadius="10px"
                rightTopRadius="10px"
                leftTopRadius="10px"
                leftBottomRadius="10px"
                onChangeText={formik.handleChange("confirmNewWalletPin")}
              />
              {formik.errors.confirmNewWalletPin &&
                formik.touched.confirmNewWalletPin && (
                  <Paragraph color={colors.dangerColor} size="12px">
                    {formik.errors.confirmNewWalletPin}
                  </Paragraph>
                )}
            </Container>
            <Container flexDirection="row" justify="flex-end">
              <TouchableOpacity>
                <Paragraph color={colors.brandColor}>
                  Forget Pin? Reset
                </Paragraph>
              </TouchableOpacity>
            </Container>
            <Container
              position="absolute"
              bottom="10"
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

export default ChangePin;
