import React, { useState } from "react";
import { TouchableOpacity, FlatList, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Container,
  ImageTag,
  Paragraph,
} from "@utils/shared/styled-components";
import { SCREEN_HEIGHT } from "@constants/index";
import { colors } from "@utils/index";
import { images } from "@assets/images";
import { useSelector } from "react-redux";
import { selectUser } from "@redux/index";
import { supportIconWhite } from "@assets/icons";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { convertToNaira } from "@utils/shared/helpers";
import { SoildButton } from "@components/button";
import { AccountSettingProps, IconTypeProps, SettingName } from "./interface";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { MockAccountSettings } from "@mocks/settings/settings";

const Profile = () => {
  const [hideBalance, setHideBalance] = useState<boolean>(false);
  const [hasFigerPrint, setHasFingerPrint] = useState<boolean>(false);
  const [hasPushNotification, setHasPushNotification] =
    useState<boolean>(false);

  const user = useSelector(selectUser);

  const handleSetPushNotification = () => {
    setHasPushNotification(!hasPushNotification);
  };

  const handleSetFingerPrint = () => {
    setHasFingerPrint(!hasFigerPrint);
  };

  const __renderAccountSettings = ({ item }: AccountSettingProps) => {
    const handleNavigation = () => {};
    const handleMatchIcon = () => {
      switch (item.name) {
        case SettingName.PUSHNOTIFICATION:
          return (
            <MaterialCommunityIcons
              name={hasPushNotification ? "toggle-switch" : item.icon}
              color={
                hasPushNotification ? colors.brandColor : colors.blackColor50
              }
              size={30}
            />
          );
        case SettingName.SETFINGERPRINT:
          return (
            <MaterialCommunityIcons
              name={hasFigerPrint ? "toggle-switch" : item.icon}
              color={hasFigerPrint ? colors.brandColor : colors.blackColor50}
              size={30}
            />
          );

        default:
          break;
      }
    };
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          switch (item.name) {
            case SettingName.PUSHNOTIFICATION:
              handleSetPushNotification();
              break;
            case SettingName.SETFINGERPRINT:
              handleSetFingerPrint();
              break;
            default:
              handleNavigation;
              break;
          }
        }}
      >
        <Container
          flexDirection="row"
          justify="space-between"
          items="center"
          height={55}
        >
          <Paragraph size="16px">{item.name}</Paragraph>
          {item.iconType === IconTypeProps.ARROWICON ? (
            <SimpleLineIcons name={item.icon} />
          ) : (
            handleMatchIcon()
          )}
        </Container>
      </TouchableOpacity>
    );
  };

  return (
    <Container height="100%" pb="70px">
      <StatusBar backgroundColor={colors.brandColor} style="light" />
      <SafeAreaView />
      <Container
        background={colors.brandColor}
        width="100%"
        height={240}
        pt="10px"
        pb="20px"
        pr="20px"
        pl="20px"
        zIndex={999}
      >
        <Container flexDirection="row" justify="space-between" items="center">
          <Container flexDirection="row" items="center">
            <Container
              height={35}
              width={32}
              rightBottomRadius="100"
              rightTopRadius="100"
              leftBottomRadius="100"
              leftTopRadius="100"
              overflow="hidden"
              mr="10px"
            >
              <ImageTag source={images.avatar} />
            </Container>
            <Paragraph size="15px" color={colors.whiteColor}>
              Hi, {user.firstName}
            </Paragraph>
          </Container>
          <Container flexDirection="row" gap="10" items="center">
            <Container height={25} width={20}>
              <ImageTag source={supportIconWhite} resizeMode="contain" />
            </Container>
            <Feather name="bell" size={20} color={colors.whiteColor} />
          </Container>
        </Container>
        <Container my="20px">
          <Container flexDirection="row" items="center">
            <Paragraph mr="10px" color={colors.whiteColor}>
              Wallet Balance
            </Paragraph>
            <TouchableOpacity onPress={() => setHideBalance(!hideBalance)}>
              <Entypo
                name={hideBalance ? "eye" : "eye-with-line"}
                color={colors.whiteColor}
                size={14}
              />
            </TouchableOpacity>
          </Container>
          <Container>
            <Paragraph size="28px" color={colors.whiteColor}>
              {hideBalance
                ? "***"
                : convertToNaira(user.balance.toString()) + ".00"}
            </Paragraph>
            <Paragraph color={colors.whiteColor}>
              & Cashback points 🪙 1200
            </Paragraph>
          </Container>
        </Container>
        <Container
          height={80}
          background={colors.whiteColor}
          width="100%"
          rightBottomRadius="20px"
          rightTopRadius="20px"
          leftBottomRadius="20px"
          leftTopRadius="20px"
          flexDirection="row"
          items="center"
          justify="space-between"
          pl="15px"
          pr="15px"
          zIndex={99}
        >
          <Container flexDirection="row" items="center">
            <Container
              height="70%"
              width={55}
              background={colors.brandColor}
              rightBottomRadius="5px"
              rightTopRadius="5px"
              leftBottomRadius="5px"
              leftTopRadius="5px"
              items="center"
              justify="center"
            >
              <Ionicons
                name="gift-outline"
                size={35}
                color={colors.whiteColor}
              />
            </Container>
            <Container ml="10px">
              <Paragraph
                size="18px"
                fontFamily="PoppinMedium"
                color={colors.brandColor}
                mb="-5px"
              >
                Daily bonus
              </Paragraph>
              <Paragraph size="12px" color={colors.blackColor50}>
                Get {convertToNaira("500")} daily at random
              </Paragraph>
            </Container>
          </Container>
          <SoildButton
            pt="5px"
            pb="5px"
            pr="15px"
            pl="15px"
            rightBottomRadius="100"
            rightTopRadius="100"
            leftBottomRadius="100"
            leftTopRadius="100"
            color={colors.whiteColor}
            background={colors.brandColor}
            onPress={() => {}}
          >
            Get Now
          </SoildButton>
        </Container>
      </Container>
      <ScrollView>
        <Container zIndex={9} mt="40px" px="20px">
          <Paragraph
            size="16px"
            fontFamily="PoppinMedium"
            color={colors.brandColor}
          >
            Account Settings
          </Paragraph>
          <Container
            background={colors.whiteColor}
            pt="20px"
            pb="20px"
            pr="20px"
            pl="20px"
            rightBottomRadius="10px"
            rightTopRadius="10px"
            leftBottomRadius="10px"
            leftTopRadius="10px"
          >
            <FlatList
              data={MockAccountSettings}
              renderItem={__renderAccountSettings}
              contentContainerStyle={{ gap: 5 }}
            />
          </Container>
          <Container my="10px" pl="20px" pr="20px">
            <Paragraph
              size="16px"
              fontFamily="PoppinMedium"
              color={colors.brandColor}
            >
              More
            </Paragraph>
            <Container
              height={50}
              width="100%"
              flexDirection="row"
              items="center"
              justify="space-between"
            >
              <Paragraph size="16px">About us</Paragraph>
              <SimpleLineIcons name="arrow-right" />
            </Container>
            <Container
              height={50}
              width="100%"
              flexDirection="row"
              items="center"
              justify="space-between"
            >
              <Paragraph size="16px">Privacy policy</Paragraph>
              <SimpleLineIcons name="arrow-right" />
            </Container>
            <Container
              height={50}
              width="100%"
              flexDirection="row"
              items="center"
              justify="space-between"
            >
              <Paragraph size="16px">Terms and conditions</Paragraph>
              <SimpleLineIcons name="arrow-right" />
            </Container>
          </Container>
          <Container items="center" my="20px">
            <SoildButton
              height={50}
              width={130}
              background={colors.brandColor}
              color={colors.whiteColor}
              size="16px"
              fontFamily="PoppinMedium"
              items="center"
              justify="center"
              rightBottomRadius="100"
              rightTopRadius="100"
              leftBottomRadius="100"
              leftTopRadius="100"
              onPress={() => {}}
            >
              Logout
            </SoildButton>
          </Container>
        </Container>
      </ScrollView>
    </Container>
  );
};

export default Profile;
