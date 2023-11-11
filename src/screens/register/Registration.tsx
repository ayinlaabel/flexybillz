import React, { useState } from "react";
import { TouchableOpacity, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Container,
  ImageContainer,
  ImageTag,
  Paragraph,
} from "../../utils/shared/styled-components";
import { SoildButton } from "../../components/button";
import { colors, storeData } from "../../utils";
import {
  arrowDownIcon,
  backIcon,
  countryIcon,
  radioIcon,
} from "../../assets/icons";
import DefaultInput from "../../components/input/DefaultInput";
import { AppStackParamsList } from "../../navigation/app-navigation/appRoutes";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { InputType } from "../../components/input/interface";
import Icon from "react-native-vector-icons/Fontisto";
import { Dropdown } from "react-native-element-dropdown";
import { countries } from "../../constants";
import { styles } from "../../utils/shared/styled-components/styles";
import genders from "../../constants/data/genders";
import { useFormik } from "formik";
import { registerForm } from "./interface";
import { sendOtpEmail, userRegistration } from "../../networking/getQuery";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { registrationSchema } from "../../schema";
import { useDispatch } from "react-redux";
import { setEmail, setPhoneNumber, setUsername } from "../../redux";
import { appStateType } from "../../constants/app-state/appState";
import { useToast } from "react-native-toast-notifications";

const Registration = () => {
  const [accepted, setAccepted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const { navigate, goBack } =
    useNavigation<StackNavigationProp<AppStackParamsList>>();

  const toast = useToast();

  const handleGoBack = () => {
    goBack();
  };

  const formik = useFormik({
    initialValues: registerForm,
    validationSchema: registrationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      const { data } = await userRegistration(values);

      if (!data.success) {
        setIsLoading(false);
        toast.show("Something went wrong!", { type: "custom_danger" });
      } else {
        setIsLoading(false);

        dispatch(setEmail(values.email));
        dispatch(setUsername(values.userName));
        dispatch(setPhoneNumber(values.phoneNumber));
        await storeData(appStateType.isRegistered, "true");
        await storeData("email", values.email);
        await storeData("username", values.userName);
        await storeData("phoneNumber", values.phoneNumber);
        toast.show("Registeration was successful", { type: "custom_success" });
        navigate("SelectVerificationMode");
      }
    },
  });

  const renderCountries = (item: any) => {
    return (
      <Container height={50} px="15px" justify="center">
        <Paragraph>{item.name}</Paragraph>
      </Container>
    );
  };

  const renderGender = (item: any) => {
    return (
      <Container height={50} px="15px" justify="center">
        <Paragraph>{item.name}</Paragraph>
      </Container>
    );
  };
  return (
    <>
      {/* <Container background={colors.whiteColor}> */}
      <StatusBar barStyle="dark-content" translucent={true} />
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
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Container
          pt="20px"
          pr="15px"
          pl="15px"
          pb="20px"
          background={colors.whiteColor}
        >
          <Container height="100%" px="15px">
            <Container
              flexDirection="row"
              justify="space-between"
              items="center"
            >
              <Container>
                <Paragraph
                  color={colors.brandColor}
                  size="20px"
                  fontFamily="PoppinSemiBold"
                >
                  Welcome to FlexyBillz
                </Paragraph>
              </Container>
              <Container flexDirection="row" items="center">
                <ImageContainer height={30} width={30}>
                  <ImageTag source={countryIcon} resizeMode="contain" />
                </ImageContainer>
                <ImageContainer height={10} width={30}>
                  <ImageTag source={arrowDownIcon} resizeMode="contain" />
                </ImageContainer>
              </Container>
            </Container>
            <Container flexDirection="row" width="100%" justify="space-between">
              <Container my="10px" width="48%">
                <Paragraph
                  mb="5px"
                  color={colors.brandColor}
                  fontFamily="PoppinRegular"
                >
                  First Name
                </Paragraph>
                <DefaultInput
                  height={50}
                  rightTopRadius="5px"
                  leftTopRadius="5px"
                  rightBottomRadius="5px"
                  leftBottomRadius="5px"
                  px="15px"
                  value={formik.values.firstName}
                  onChangeText={formik.handleChange("firstName")}
                  placeholder="John"
                />
                {formik.errors.firstName && formik.touched.firstName && (
                  <Paragraph size="12px" color={"red"}>
                    {formik.errors.firstName}
                  </Paragraph>
                )}
              </Container>
              <Container my="10px" width="48%">
                <Paragraph
                  mb="5px"
                  color={colors.brandColor}
                  fontFamily="PoppinRegular"
                >
                  Last Name
                </Paragraph>
                <DefaultInput
                  height={50}
                  rightTopRadius="5px"
                  leftTopRadius="5px"
                  rightBottomRadius="5px"
                  leftBottomRadius="5px"
                  px="15px"
                  onChangeText={formik.handleChange("lastName")}
                  placeholder="Doe"
                />
                {formik.errors.lastName && formik.touched.lastName && (
                  <Paragraph size="12px" color={"red"}>
                    {formik.errors.lastName}
                  </Paragraph>
                )}
              </Container>
            </Container>
            <Container my="10px">
              <Paragraph
                mb="5px"
                color={colors.brandColor}
                fontFamily="PoppinRegular"
              >
                Email Address
              </Paragraph>
              <DefaultInput
                height={50}
                rightTopRadius="5px"
                leftTopRadius="5px"
                rightBottomRadius="5px"
                leftBottomRadius="5px"
                px="15px"
                onChangeText={formik.handleChange("email")}
                placeholder="johndoe@example.com"
              />
              {formik.errors.email && formik.touched.email && (
                <Paragraph size="12px" color={"red"}>
                  {formik.errors.email}
                </Paragraph>
              )}
            </Container>
            <Container flexDirection="row" width="100%" justify="space-between">
              <Container my="10px" width="48%">
                <Paragraph
                  mb="5px"
                  color={colors.brandColor}
                  fontFamily="PoppinRegular"
                >
                  Username
                </Paragraph>
                <DefaultInput
                  height={50}
                  rightTopRadius="5px"
                  leftTopRadius="5px"
                  rightBottomRadius="5px"
                  leftBottomRadius="5px"
                  px="15px"
                  onChangeText={formik.handleChange("userName")}
                  placeholder="johndoe"
                />
                {formik.errors.userName && formik.touched.userName && (
                  <Paragraph size="12px" color={"red"}>
                    {formik.errors.userName}
                  </Paragraph>
                )}
              </Container>
              <Container my="10px" width="48%">
                <Paragraph
                  mb="5px"
                  color={colors.brandColor}
                  fontFamily="PoppinRegular"
                >
                  Gender
                </Paragraph>
                <Dropdown
                  style={styles.dropDownContainer}
                  data={genders}
                  labelField="name"
                  valueField="value"
                  placeholder="Select Gender"
                  placeholderStyle={styles.placeholder}
                  renderItem={renderGender}
                  onChange={(e) => {
                    formik.values.gender = e.value;
                  }}
                />
                {formik.errors.gender && formik.touched.firstName && (
                  <Paragraph size="12px" color={"red"}>
                    {formik.errors.gender}
                  </Paragraph>
                )}
              </Container>
            </Container>
            <Container flexDirection="row" width="100%" justify="space-between">
              <Container my="10px" width="48%">
                <Paragraph
                  mb="5px"
                  color={colors.brandColor}
                  fontFamily="PoppinRegular"
                >
                  Select Country
                </Paragraph>
                <Dropdown
                  style={styles.dropDownContainer}
                  data={countries}
                  onChange={(e) => {
                    formik.values.country = e.name;
                  }}
                  placeholderStyle={styles.placeholder}
                  labelField="name"
                  valueField="name"
                  renderItem={renderCountries}
                />
                {formik.errors.country && formik.touched.country && (
                  <Paragraph size="12px" color={"red"}>
                    {formik.errors.country}
                  </Paragraph>
                )}
              </Container>
              <Container my="10px" width="48%">
                <Paragraph
                  mb="5px"
                  color={colors.brandColor}
                  fontFamily="PoppinRegular"
                >
                  Phone Number
                </Paragraph>
                <DefaultInput
                  inputType="phone"
                  height={50}
                  rightTopRadius="5px"
                  leftTopRadius="5px"
                  rightBottomRadius="5px"
                  leftBottomRadius="5px"
                  px="15px"
                  onChangeText={formik.handleChange("phoneNumber")}
                  placeholder="81 234 5678"
                />
                {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                  <Paragraph size="12px" color={"red"}>
                    {formik.errors.phoneNumber}
                  </Paragraph>
                )}
              </Container>
            </Container>
            <Container>
              <Container my="10px">
                <Paragraph
                  mb="5px"
                  color={colors.brandColor}
                  fontFamily="PoppinRegular"
                >
                  Password
                </Paragraph>
                <DefaultInput
                  inputType="password"
                  height={50}
                  rightTopRadius="5px"
                  leftTopRadius="5px"
                  rightBottomRadius="5px"
                  leftBottomRadius="5px"
                  px="15px"
                  onChangeText={formik.handleChange("password")}
                  placeholder="password"
                />
                {formik.errors.password && formik.touched.password && (
                  <Paragraph size="12px" color={"red"}>
                    {formik.errors.password}
                  </Paragraph>
                )}
              </Container>
              <Container my="10px">
                <Paragraph
                  mb="5px"
                  color={colors.brandColor}
                  fontFamily="PoppinRegular"
                >
                  Confirm Password
                </Paragraph>
                <DefaultInput
                  inputType={InputType.PASSWORD}
                  height={50}
                  rightTopRadius="5px"
                  leftTopRadius="5px"
                  rightBottomRadius="5px"
                  leftBottomRadius="5px"
                  px="15px"
                  onChangeText={formik.handleChange("confirmPassword")}
                  placeholder="confirm password"
                />
                {formik.errors.confirmPassword &&
                  formik.touched.confirmPassword && (
                    <Paragraph size="12px" color={"red"}>
                      {formik.errors.confirmPassword}
                    </Paragraph>
                  )}
              </Container>
            </Container>
            <Container my="15px" flexDirection="row" justify="space-between">
              <Container flexDirection="row">
                <Container
                  height={20}
                  width={20}
                  mr="5px"
                  items="center"
                  justify="center"
                >
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      setAccepted(!accepted);
                    }}
                  >
                    <Icon
                      name={accepted ? "radio-btn-active" : "radio-btn-passive"}
                      size={15}
                      color={colors.brandColor}
                    />
                  </TouchableOpacity>
                </Container>
                <Container flexDirection="row">
                  <Paragraph mb="5px" fontFamily="PoppinRegular">
                    I have read and accepted the
                    <Paragraph
                      mb="5px"
                      color={colors.brandColor}
                      fontFamily="PoppinRegular"
                    >
                      Terms and Conditions and Privacy Policy
                    </Paragraph>
                  </Paragraph>
                </Container>
              </Container>
            </Container>
            <SoildButton
              height={55}
              rightBottomRadius="15px"
              rightTopRadius="15px"
              leftBottomRadius="15px"
              leftTopRadius="15px"
              onPress={formik.handleSubmit}
              items="center"
              justify="center"
              size="17px"
              color={colors.whiteColor}
              background={colors.brandColor}
              fontFamily="PoppinSemiBold"
              isLoading={isLoading}
            >
              Register
            </SoildButton>
            <Container
              flexDirection="row"
              items="center"
              justify="center"
              py="10px"
            >
              <Paragraph>Already have an account? </Paragraph>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigate("Login")}
              >
                <Paragraph color={colors.brandColor} fontFamily="PoppinMedium">
                  Login
                </Paragraph>
              </TouchableOpacity>
            </Container>
          </Container>
        </Container>
      </ScrollView>
      {/* </Container> */}
    </>
  );
};

export default Registration;
