import React, { useEffect } from "react";
import {
  Container,
  ImageTag,
  Paragraph,
} from "../../../utils/shared/styled-components";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { backIcon, countryIcon, successIcon } from "../../../assets/icons";
import { SoildButton } from "../../../components/button";
import { colors } from "../../../utils";
import { SCREEN_HEIGHT } from "../../../constants";
import { convertToNaira } from "../../../utils/shared/helpers";
import { useNavigation, useRoute } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamsList } from "../../../navigation/app-navigation/appRoutes";
import { useSelector } from "react-redux";
import { selectTransaction } from "../../../redux/slices/userSlice";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

const Success = () => {
  const { replace, goBack } =
    useNavigation<StackNavigationProp<AppStackParamsList>>();
  const route = useRoute();
  const transation = useSelector(selectTransaction);
  const handleButton = () => {
    replace("Dashboard");
  };

  const handleGoBack = () => {
    goBack();
  };

  return (
    <Container height={JSON.stringify(SCREEN_HEIGHT)}>
      <SafeAreaView />
      <Container
        height={50}
        flexDirection="row"
        justify="space-between"
        items="center"
        px="15px"
      >
        <TouchableOpacity onPress={handleGoBack}>
          <Container width={40} height={20}>
            <ImageTag source={backIcon} resizeMode="contain" />
          </Container>
        </TouchableOpacity>
        <Paragraph
          size="18px"
          fontFamily="PoppinMedium"
          color={colors.brandColor}
        >
          Transaction Details
        </Paragraph>
        <Container width={40} height={20}>
          <ImageTag source={countryIcon} resizeMode="contain" />
        </Container>
      </Container>
      <Container px="20px">
        <Container
          mt="20px"
          pt="10px"
          pb="10px"
          pr="10px"
          pl="10px"
          width="100%"
          background={colors.whiteColor}
          items="center"
          rightBottomRadius="10"
          rightTopRadius="10"
          leftBottomRadius="10"
          leftTopRadius="10"
          gap="5"
        >
          <Container
            position="absolute"
            top="-15px"
            height={50}
            width={47}
            rightBottomRadius="100"
            rightTopRadius="100"
            leftBottomRadius="100"
            leftTopRadius="100"
            overflow="hidden"
          >
            <ImageTag source={transation.network.data_url} />
          </Container>
          <Paragraph mt="20px" textTransform="uppercase">
            {transation.network.data_name}
          </Paragraph>
          <Paragraph size="28px" fontFamily="PoppinSemiBold">
            {convertToNaira(transation.network.amount) + ".00"}
          </Paragraph>
          <Container flexDirection="row" items="center">
            <AntDesign
              name="checkcircle"
              color={colors.successColor}
              style={{ marginVertical: 0 }}
            />
            <Paragraph
              fontFamily="PoppinMedium"
              size="16px"
              color={colors.blackColor70}
            >
              Successful
            </Paragraph>
          </Container>
          <Container width="100%" px="10px" gap="5" mt="10px">
            <Container
              flexDirection="row"
              items="center"
              justify="space-between"
            >
              <Paragraph color={colors.blackColor70}>Payment Amount</Paragraph>
              <Paragraph fontFamily="PoppinSemiBold">
                {convertToNaira(transation.network.amount) + ".00"}
              </Paragraph>
            </Container>
            <Container
              flexDirection="row"
              items="center"
              justify="space-between"
            >
              <Paragraph color={colors.blackColor70}>Points Earned</Paragraph>
              <Paragraph fontFamily="PoppinSemiBold">+30</Paragraph>
            </Container>
          </Container>
        </Container>
        <Container
          mt="20px"
          pr="10px"
          pl="10px"
          pt="20px"
          pb="20px"
          width="100%"
          rightBottomRadius="10"
          rightTopRadius="10"
          leftBottomRadius="10"
          leftTopRadius="10"
          background={colors.whiteColor}
          gap="20"
        >
          <Container px="10px" flexDirection="row" justify="space-between">
            <Paragraph color={colors.blackColor70}>Recipient Mobile</Paragraph>
            <Paragraph>{transation.network.phone}</Paragraph>
          </Container>
          <Container px="10px" flexDirection="row" justify="space-between">
            <Paragraph color={colors.blackColor70}>Transaction Type</Paragraph>
            <Paragraph>{transation.type}</Paragraph>
          </Container>
          {transation.network.type === "Mobile Data" && (
            <Container px="10px" flexDirection="row" justify="space-between">
              <Paragraph color={colors.blackColor70}>Data Bundle</Paragraph>
              <Paragraph>{`${transation.network.name}-${
                transation.network.duration
              } ${convertToNaira(
                transation.network.amount.toString()
              )}`}</Paragraph>
            </Container>
          )}
          <Container px="10px" flexDirection="row" justify="space-between">
            <Paragraph color={colors.blackColor70}>Payment Method</Paragraph>
            <Paragraph>Balance</Paragraph>
          </Container>
          <Container px="10px" flexDirection="row" justify="space-between">
            <Paragraph color={colors.blackColor70}>Transaction ID</Paragraph>
            <Paragraph>{transation.requestId}</Paragraph>
          </Container>
          <Container px="10px" flexDirection="row" justify="space-between">
            <Paragraph color={colors.blackColor70}>Transaction Time</Paragraph>
            <Paragraph>{transation.date}</Paragraph>
          </Container>
        </Container>
      </Container>
      <Container
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        width="100%"
        px="20px"
      >
        <Container items="center" mb="20px">
          <Paragraph color={colors.blackColor70}>
            Any Questions about this transaction?
          </Paragraph>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Ionicons name="headset" color={colors.brandColor} />
            <Paragraph ml="3px" color={colors.brandColor}>
              Customer Support
            </Paragraph>
          </TouchableOpacity>
        </Container>
        <SoildButton
          background={colors.brandColor}
          height={60}
          width="100%"
          items="center"
          justify="center"
          color={colors.whiteColor}
          size="16px"
          rightBottomRadius="10"
          rightTopRadius="10"
          leftBottomRadius="10"
          leftTopRadius="10"
          onPress={handleButton}
        >
          Continue
        </SoildButton>
      </Container>
    </Container>
  );
};

export default Success;
