import React, { useEffect, useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import {
  Container,
  ImageTag,
  Paragraph,
} from "../../utils/shared/styled-components";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../assets/images";
import {
  notificationIcon,
  supportIcon,
  transferIcon,
} from "../../assets/icons";
import { colors } from "../../utils";
import Icon from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import services from "../../constants/data/services";
import ServiceCard from "../../components/service-card/ServiceCard";
import { convertToNaira, getData } from "../../utils/shared/helpers";
import Entypo from "react-native-vector-icons/Entypo";
// import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import {
  selectToken,
  selectUser,
  selectUsername,
  setToken,
  setUser,
} from "../../redux";
import { getUserByUserName } from "../../networking/getQuery";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamsList } from "../../navigation/app-navigation/appRoutes";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants";
import { AuthTabParamsList } from "@navigation/auth-navigation/authRoute";
const Dashboard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transaction, setTransaction] = useState<any[]>();

  const { navigate, replace } =
    useNavigation<StackNavigationProp<AppStackParamsList>>();
  const { navigate: authNavigate, replace: authReplace } =
    useNavigation<StackNavigationProp<AuthTabParamsList>>();

  const token = useSelector(selectToken);
  const username = useSelector(selectUsername);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    const getUserDetails = async () => {
      const { data } = await getUserByUserName(username, token);
      if (data.success) {
        dispatch(setUser(data.data));
        console.log(data.data);
        setIsLoading(false);
      } else {
        replace("Login");
      }
    };

    getUserDetails();
  }, []);

  return (
    <Container>
      <SafeAreaView />
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={"dark-content"}
      />
      <Container
        height={60}
        pr="10px"
        pt="10px"
        pl="10px"
        pb="10px"
        my="10px"
        flexDirection="row"
        items="center"
        justify="space-between"
      >
        <Container flexDirection="row" items="center">
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => authNavigate("Profile")}
          >
            <Container
              height={40}
              width={35}
              rightBottomRadius="100"
              rightTopRadius="100"
              leftBottomRadius="100"
              leftTopRadius="100"
              mr="10px"
              overflow="hidden"
            >
              <ImageTag
                source={
                  user?.photoUrl
                    ? { uri: user.photoUrl, cache: "only-if-cached" }
                    : images.avatar
                }
              />
            </Container>
          </TouchableOpacity>
          <Paragraph
            size="18px"
            fontFamily="PoppinSemiBold"
            color={colors.brandColor}
          >
            Hi, {user?.firstName ? user?.firstName : "Annonymos"}
          </Paragraph>
        </Container>
        <Container flexDirection="row" gap="10">
          <Container height={25} width={20}>
            <ImageTag source={supportIcon} resizeMode="contain" />
          </Container>
          <Container height={25} width={20}>
            <ImageTag source={notificationIcon} resizeMode="contain" />
          </Container>
        </Container>
      </Container>
      <Container px="15px">
        <Container
          height={220}
          width="100%"
          background={colors.brandColor}
          rightBottomRadius="10px"
          rightTopRadius="10px"
          leftBottomRadius="10px"
          leftTopRadius="10px"
          pt="15px"
          pb="15px"
          pr="20px"
          pl="20px"
          justify="space-between"
        >
          <Container flexDirection="row" justify="space-between">
            <Container>
              <Container flexDirection="row" items="center">
                <Paragraph color={colors.whiteColor}>Wallet Balance</Paragraph>
                <TouchableOpacity>
                  <Container ml="10px">
                    <Icon name="eye" size={20} color={colors.whiteColor} />
                  </Container>
                </TouchableOpacity>
              </Container>
              <Container>
                <Paragraph mb="0px" size="32px" color={colors.whiteColor}>
                  {isLoading ? (
                    <Container py="10px" items="center">
                      <ActivityIndicator color={colors.whiteColor} />
                    </Container>
                  ) : (
                    convertToNaira(user?.balance)
                  )}
                </Paragraph>
                <Paragraph mt="-10px" color={colors.whiteColor}>
                  & cashback {convertToNaira(user?.balance)}
                </Paragraph>
              </Container>
            </Container>
            <Container>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Paragraph color={colors.whiteColor}>
                  Transaction History
                </Paragraph>
                <Entypo
                  name="chevron-right"
                  size={15}
                  color={colors.whiteColor}
                />
              </TouchableOpacity>
            </Container>
          </Container>
          <Container flexDirection="row" gap="10" justify="space-around">
            <Container items="center">
              <TouchableOpacity
                onPress={() => navigate("FundWallet")}
                style={{ alignItems: "center" }}
              >
                <Container
                  height={40}
                  width={40}
                  background={colors.whiteColor}
                  rightBottomRadius="5px"
                  rightTopRadius="5px"
                  leftBottomRadius="5px"
                  leftTopRadius="5px"
                  mb="5px"
                  items="center"
                  justify="center"
                >
                  <Icon name="plus" size={20} color={colors.brandColor} />
                </Container>
                <Paragraph color={colors.whiteColor} size="12px">
                  Add Money
                </Paragraph>
              </TouchableOpacity>
            </Container>
            <Container items="center">
              <Container
                height={40}
                width={40}
                background={colors.whiteColor}
                rightBottomRadius="5px"
                rightTopRadius="5px"
                leftBottomRadius="5px"
                leftTopRadius="5px"
                mb="5px"
                items="center"
                justify="center"
              >
                <Container width={"30%"} height={"30%"}>
                  <ImageTag source={transferIcon} />
                </Container>
              </Container>
              <Paragraph color={colors.whiteColor} size="12px">
                Gift User
              </Paragraph>
            </Container>
            <Container items="center">
              <Container
                height={40}
                width={40}
                background={colors.whiteColor}
                rightBottomRadius="5px"
                rightTopRadius="5px"
                leftBottomRadius="5px"
                leftTopRadius="5px"
                mb="5px"
                items="center"
                justify="center"
              >
                <MaterialIcons
                  name="person-add-alt-1"
                  size={20}
                  color={colors.brandColor}
                />
              </Container>
              <Paragraph color={colors.whiteColor} size="12px">
                Agent
              </Paragraph>
            </Container>
          </Container>
        </Container>
        <Container mt="20px">
          <Paragraph
            size="18px"
            fontFamily="PoppinMedium"
            color={colors.brandColor}
          >
            Services
          </Paragraph>
          <Container
            pr="15px"
            pt="25px"
            pl="15px"
            pb="25px"
            rightBottomRadius="15px"
            rightTopRadius="15px"
            leftBottomRadius="15px"
            leftTopRadius="15px"
            background={colors.whiteColor}
          >
            <FlatList
              data={services}
              renderItem={({ item }: any) => <ServiceCard item={item} />}
              numColumns={4}
              keyExtractor={(_, index) => `sub_${index}`}
              contentContainerStyle={{ gap: 30 }}
              columnWrapperStyle={{ gap: 15 }}
            />
          </Container>
          <Container height={150}>
            <ImageTag source={images.banner} resizeMode="contain" />
          </Container>
          <Container px="10px">
            <Container
              flexDirection="row"
              justify="space-between"
              items="center"
            >
              <Paragraph
                size="18px"
                fontFamily="PoppinMedium"
                color={colors.brandColor}
              >
                Recent Transaction
              </Paragraph>

              <Paragraph fontFamily="PoppinMedium" color={colors.brandColor}>
                see all
              </Paragraph>
            </Container>
            {transaction ? null : (
              <Container pt="20px" pb="20px" pr="20px" pl="20px" items="center">
                <Paragraph color={colors.blackColor80}>
                  No transaction records found.
                </Paragraph>
                <Paragraph color={colors.blackColor80}>
                  Get started by making a transaction.
                </Paragraph>
              </Container>
            )}
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default Dashboard;
