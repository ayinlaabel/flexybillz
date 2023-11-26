import React, { useState } from "react";
import {
  TouchableOpacity,
  FlatList,
  ScrollView,
  StatusBar,
} from "react-native";
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
import {
  convertToNaira,
  logger,
  removeData,
  storeData,
} from "@utils/shared/helpers";
import { SoildButton } from "@components/button";
import { AccountSettingProps, IconTypeProps, SettingName } from "./interface";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { MockAccountSettings } from "@mocks/settings/settings";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamsList } from "@navigation/app-navigation/appRoutes";
import { appStateType } from "@constants/app-state/appState";
import { postSetFingerPrint } from "@networking/getQuery";
import { useToast } from "react-native-toast-notifications";

const Profile = () => {
  const [hideBalance, setHideBalance] = useState<boolean>(true);
  const [hasPushNotification, setHasPushNotification] =
    useState<boolean>(false);

  const toast = useToast();

  const user = useSelector(selectUser);
  const [hasFigerPrint, setHasFingerPrint] = useState<boolean>(
    user?.isFingerPrint
  );

  const { replace, navigate } =
    useNavigation<StackNavigationProp<AppStackParamsList>>();

  const handleSignOut = async () => {
    await removeData(appStateType.isLogin);
    await storeData(appStateType.isLogOut, "true");
    replace("Login");
  };

  const handleSetPushNotification = () => {
    setHasPushNotification(!hasPushNotification);
  };

  const handleSetFingerPrint = async () => {
    const { data } = await postSetFingerPrint({
      userId: user.userName,
      isFingerPrint: !hasFigerPrint,
    });

    if (!data.success) {
      toast.show(data.message, { type: "custom_danger" });
    } else {
      toast.show("Finger Print set successfully.", { type: "custom_success" });
      setHasFingerPrint(!hasFigerPrint);
    }
  };

  const __renderAccountSettings = ({ item }: AccountSettingProps) => {
    const handleNavigation = () => {
      navigate(item.path);
    };
    const handleMatchIcon = () => {
      switch (item.name) {
        case SettingName.PUSHNOTIFICATION:
          return hasPushNotification ? (
            <Container justify="center">
              <Container
                height={20}
                width={50}
                background={colors.brandColor90}
                rightBottomRadius="100"
                rightTopRadius="100"
                leftBottomRadius="100"
                leftTopRadius="100"
              />
              <Container
                height={30}
                width={27}
                background={colors.brandColor}
                rightBottomRadius="100"
                rightTopRadius="100"
                leftBottomRadius="100"
                leftTopRadius="100"
                shadow
                position="absolute"
                right="0"
              />
            </Container>
          ) : (
            <Container justify="center">
              <Container
                height={20}
                width={50}
                background={colors.lightGrayColor}
                rightBottomRadius="100"
                rightTopRadius="100"
                leftBottomRadius="100"
                leftTopRadius="100"
              />
              <Container
                height={30}
                width={27}
                background={colors.whiteColor}
                rightBottomRadius="100"
                rightTopRadius="100"
                leftBottomRadius="100"
                leftTopRadius="100"
                shadow
                position="absolute"
              />
            </Container>
          );
        case SettingName.SETFINGERPRINT:
          return hasFigerPrint ? (
            <Container justify="center">
              <Container
                height={20}
                width={50}
                background={colors.brandColor90}
                rightBottomRadius="100"
                rightTopRadius="100"
                leftBottomRadius="100"
                leftTopRadius="100"
              />
              <Container
                height={30}
                width={27}
                background={colors.brandColor}
                rightBottomRadius="100"
                rightTopRadius="100"
                leftBottomRadius="100"
                leftTopRadius="100"
                shadow
                position="absolute"
                right="0"
              />
            </Container>
          ) : (
            <Container justify="center">
              <Container
                height={20}
                width={50}
                background={colors.lightGrayColor}
                rightBottomRadius="100"
                rightTopRadius="100"
                leftBottomRadius="100"
                leftTopRadius="100"
              />
              <Container
                height={30}
                width={27}
                background={colors.whiteColor}
                rightBottomRadius="100"
                rightTopRadius="100"
                leftBottomRadius="100"
                leftTopRadius="100"
                shadow
                position="absolute"
              />
            </Container>
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
              handleNavigation();
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
      <SafeAreaView />
      <StatusBar
        translucent
        backgroundColor={colors.brandColor}
        barStyle="light-content"
      />
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
              <ImageTag
                source={
                  user?.photoUrl
                    ? { uri: user.photoUrl, cache: "only-if-cached" }
                    : images.avatar
                }
              />
            </Container>
            <Paragraph size="15px" color={colors.whiteColor}>
              Hi, {user?.firstName}
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
                name={hideBalance ? "eye-with-line" : "eye"}
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
            <Ionicons name="gift" size={35} color={colors.brandColor} />
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
              onPress={handleSignOut}
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
