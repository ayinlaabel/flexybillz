import React, { useState } from "react";
import { Container, Paragraph } from "@utils/shared/styled-components";
import { TouchableOpacity } from "react-native";
import SwipeUpDownModal from "react-native-swipe-modal-up-down";
import { ModalProps } from "@components/modals/interface";
import { colors } from "@utils/index";
import DefaultInput from "@components/input/DefaultInput";
import { SoildButton } from "@components/button";
import { sendTokenEmail } from "@networking/getQuery";
import { useFormik } from "formik";
import { useToast } from "react-native-toast-notifications";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamsList } from "@navigation/app-navigation/appRoutes";
import { useNavigation } from "@react-navigation/core";
import { resetPasswordEmailSchema } from "@schema/resetPassword.schema";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setFromRoute } from "@redux/index";

const ResetPasswordModal = ({ showContent, handleCloseModal }: ModalProps) => {
  const [isReset, setIsReset] = useState<boolean>(false);
  const [animate, setAnimate] = useState<boolean>(false);

  const { navigate } = useNavigation<StackNavigationProp<AppStackParamsList>>();

  const toast = useToast();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: resetPasswordEmailSchema,
    onSubmit: async (values) => {
      setIsReset(true);
      const { data } = await sendTokenEmail({ email: values.email });

      if (!data.success) {
        toast.show(data.message, { type: "custom_danger" });
        console.log(data);
        setIsReset(false);
      } else {
        handleCloseModal(false);
        dispatch(setFromRoute("Login"));
        setIsReset(false);
        dispatch(setEmail(values.email));
        navigate("ResetPassword");
      }
    },
  });

  const __renderResetPassword = () => {
    return (
      <Container
        height={300}
        background={colors.whiteColor}
        position="absolute"
        bottom="0"
        width="100%"
        rightTopRadius="20px"
        leftTopRadius="20px"
        pt="20px"
      >
        <Container
          width={50}
          height={4}
          background={colors.brandColor}
          style={{ alignSelf: "center" }}
          rightBottomRadius="100"
          leftTopRadius="100"
          leftBottomRadius="100"
          rightTopRadius="100"
        />
        <Container pt="10px" pr="20px" pl="20px">
          <Paragraph
            size="20px"
            fontFamily="PoppinSemiBold"
            color={colors.blackColor70}
            textAlign="center"
          >
            Reset Password
          </Paragraph>
          <Container py="10px">
            <Paragraph size="16px">Email</Paragraph>
            <DefaultInput
              placeholder="Please enter your registered email"
              height={60}
              size="16px"
              mt="10px"
              px="15px"
              rightTopRadius="10px"
              rightBottomRadius="10px"
              leftBottomRadius="10px"
              leftTopRadius="10px"
              onChangeText={formik.handleChange("email")}
            />
            {formik.errors.email && (
              <Paragraph color={colors.dangerColor}>
                {formik.errors.email}
              </Paragraph>
            )}
          </Container>
          <Container py="15px">
            <SoildButton
              items="center"
              justify="center"
              background={colors.brandColor}
              size="16px"
              color={colors.whiteColor}
              height={60}
              rightTopRadius="10px"
              rightBottomRadius="10px"
              leftBottomRadius="10px"
              leftTopRadius="10px"
              isLoading={isReset}
              onPress={formik.handleSubmit}
            >
              Submit
            </SoildButton>
          </Container>
        </Container>
      </Container>
    );
  };
  return (
    <TouchableOpacity>
      <SwipeUpDownModal
        PressToanimate={animate}
        modalVisible={showContent}
        marginTop={20}
        ContentModal={__renderResetPassword()}
        onClose={() => {
          handleCloseModal(false);
          setAnimate(false);
        }}
      />
    </TouchableOpacity>
  );
};

export default ResetPasswordModal;
