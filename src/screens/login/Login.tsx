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
import DefaultInput from "../../components/input/DefaultInput";
import {
  arrowDownIcon,
  backIcon,
  countryIcon,
  radioIcon,
} from "../../assets/icons";
import { colors } from "../../utils";
import { SoildButton } from "../../components/button";
import { AppStackParamsList } from "../../navigation/app-navigation/appRoutes";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginCarousel from "../../components/carousel/login-carousel/LoginCarousel";
import Icon from "react-native-vector-icons/Fontisto";

const Login = () => {
  const [rememberMe, setRememberMe] = useState<boolean>();
  const { goBack, navigate } =
    useNavigation<StackNavigationProp<AppStackParamsList>>();

  const handleGoBack = () => {
    goBack();
  };

  const handleChange = () => {};
  return (
    <Container background={colors.whiteColor}>
      <StatusBar barStyle="dark-content" translucent={true} />
      <SafeAreaView />
      <Container px="20px">
        <Container height={50} justify="center">
          <TouchableOpacity onPress={handleGoBack}>
            <Container width={40} height={20}>
              <ImageTag source={backIcon} resizeMode="contain" />
            </Container>
          </TouchableOpacity>
        </Container>
        <Container
          flexDirection="row"
          justify="space-between"
          items="center"
          px="15px"
          mt="40px"
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
        <Container px="15px">
          <Container my="10px">
            <Paragraph
              mb="5px"
              color={colors.brandColor}
              fontFamily="PoppinRegular"
            >
              Email or Mobile Number
            </Paragraph>
            <DefaultInput
              height={50}
              rightTopRadius="5px"
              leftTopRadius="5px"
              rightBottomRadius="5px"
              leftBottomRadius="5px"
              px="15px"
              onChange={handleChange}
              placeholder="Enter your email or phone number"
            />
          </Container>
          <Container my="10px">
            <Paragraph
              mb="5px"
              color={colors.brandColor}
              fontFamily="PoppinRegular"
            >
              Password
            </Paragraph>
            <DefaultInput
              keyboardType="numeric"
              height={50}
              rightTopRadius="5px"
              leftTopRadius="5px"
              rightBottomRadius="5px"
              leftBottomRadius="5px"
              px="15px"
              onChange={handleChange}
              placeholder="Enter your secured pin"
            />
          </Container>
          <Container my="15px" flexDirection="row" justify="space-between">
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <Container flexDirection="row">
                <Container
                  height={20}
                  width={20}
                  mr="5px"
                  items="center"
                  justify="center"
                >
                  <Icon
                    name={rememberMe ? "radio-btn-active" : "radio-btn-passive"}
                    size={15}
                    color={colors.brandColor}
                  />
                </Container>
                <Paragraph
                  mb="5px"
                  color={colors.brandColor}
                  fontFamily="PoppinRegular"
                >
                  Remember me
                </Paragraph>
              </Container>
            </TouchableOpacity>
            <Container flexDirection="row">
              <Paragraph
                mb="5px"
                color={colors.brandColor}
                fontFamily="PoppinRegular"
              >
                Login with
              </Paragraph>
              <TouchableOpacity>
                <Paragraph
                  mb="5px"
                  ml="3px"
                  color={colors.brandColor}
                  fontFamily="PoppinSemiBold"
                >
                  Fingerprint
                </Paragraph>
              </TouchableOpacity>
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
            Login
          </SoildButton>
          <Container my="15px" items="flex-end">
            <TouchableOpacity activeOpacity={0.9} onPress={() => {}}>
              <Paragraph
                mb="5px"
                color={colors.brandColor}
                fontFamily="PoppinRegular"
              >
                Forgot Password?
              </Paragraph>
            </TouchableOpacity>
          </Container>
        </Container>
        <Container flexDirection="row" justify="center" items="center">
          <Paragraph mb="5px" fontFamily="PoppinRegular">
            New to FexyBillz?
          </Paragraph>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              navigate("Signup");
            }}
          >
            <Paragraph
              mb="5px"
              ml="3px"
              color={colors.brandColor}
              fontFamily="PoppinSemiBold"
            >
              Sign up now.
            </Paragraph>
          </TouchableOpacity>
        </Container>
      </Container>
      <Container width="100%">
        <LoginCarousel />
      </Container>
    </Container>
  );
};

export default Login;
