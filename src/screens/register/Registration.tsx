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
import { colors } from "../../utils";
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

const Registration = () => {
  const [accepted, setAccepted] = useState<boolean>(false);
  const { goBack } = useNavigation<StackNavigationProp<AppStackParamsList>>();
  const handleGoBack = () => {
    goBack();
  };
  const handleChange = () => {};
  return (
    <Container background={colors.whiteColor}>
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
      <ScrollView>
        <Container mt="20px" px="15px" mb="20px">
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
                  onChange={handleChange}
                  placeholder="John"
                />
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
                  onChange={handleChange}
                  placeholder="Doe"
                />
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
                onChange={handleChange}
                placeholder="johndoe@example.com"
              />
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
                  onChange={handleChange}
                  placeholder="johndoe"
                />
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
                  height={50}
                  rightTopRadius="5px"
                  leftTopRadius="5px"
                  rightBottomRadius="5px"
                  leftBottomRadius="5px"
                  px="15px"
                  onChange={handleChange}
                  placeholder="+234 81 234 5678"
                />
              </Container>
            </Container>
            <Container flexDirection="row" width="100%" justify="space-between">
              <Container my="10px" width="48%">
                <Paragraph
                  mb="5px"
                  color={colors.brandColor}
                  fontFamily="PoppinRegular"
                >
                  Gender
                </Paragraph>
                <DefaultInput
                  height={50}
                  rightTopRadius="5px"
                  leftTopRadius="5px"
                  rightBottomRadius="5px"
                  leftBottomRadius="5px"
                  px="15px"
                  onChange={handleChange}
                  placeholder="Male"
                />
              </Container>
              <Container my="10px" width="48%">
                <Paragraph
                  mb="5px"
                  color={colors.brandColor}
                  fontFamily="PoppinRegular"
                >
                  Select Country
                </Paragraph>
                <DefaultInput
                  height={50}
                  rightTopRadius="5px"
                  leftTopRadius="5px"
                  rightBottomRadius="5px"
                  leftBottomRadius="5px"
                  px="15px"
                  onChange={handleChange}
                  placeholder="Nigeria"
                />
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
                  onChange={handleChange}
                  placeholder="password"
                />
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
                  onChange={handleChange}
                  placeholder="confirm password"
                />
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
              onPress={() => {}}
              items="center"
              justify="center"
              size="17px"
              color={colors.whiteColor}
              background={colors.brandColor}
              fontFamily="PoppinSemiBold"
            >
              Register
            </SoildButton>
          </Container>
        </Container>
      </ScrollView>
    </Container>
  );
};

export default Registration;
