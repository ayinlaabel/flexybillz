import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Container,
  ImageTag,
  Paragraph,
} from "../../../utils/shared/styled-components";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../utils";
import { backIcon, countryIcon } from "../../../assets/icons";
import {
  AirtimeProps,
  renderAirtimeItem,
  renderDataItem,
} from "../../../components/modals/interface";
import { useSelector } from "react-redux";
import {
  selectPhoneNumber,
  selectToken,
  selectUser,
  selectUsername,
} from "../../../redux";
import {
  buyData,
  getAvailableData,
  getNetwork,
} from "../../../networking/getQuery";
import DefaultInput from "../../../components/input/DefaultInput";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../constants";
import {
  NestableScrollContainer,
  NestableDraggableFlatList,
} from "react-native-draggable-flatlist";
import {
  MockNetwork,
  MockNetworkData,
} from "../../../__mock__/services/service";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamsList } from "../../../navigation/app-navigation/appRoutes";
import { BuyDataProps } from "./interface";
import { convertToNaira, getProvider } from "../../../utils/shared/helpers";
import { useToast } from "react-native-toast-notifications";
import AirtimeModal from "../../../components/modals/AirtimeModal";
import PinModal from "../../../components/modals/PinModal";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const BuyData = () => {
  const user = useSelector(selectUser);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataVariation, setDataVariation] =
    useState<AirtimeProps[]>(MockNetworkData);
  const [availableData, setAvailableData] = useState<BuyDataProps[]>([]);
  const [network, setNetwork] = useState<boolean>(false);
  const [selectedNetwork, setSelectedNetwork] = useState<AirtimeProps>(
    MockNetworkData[1]
  );
  const [phone, setPhone] = useState<string>("0" + user.phoneNumber);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [airtimeModal, setAirtimeModal] = useState<boolean>(false);
  const { goBack } = useNavigation<StackNavigationProp<AppStackParamsList>>();
  const [selectedData, setSelectedData] = useState<BuyDataProps>();
  const [pinModal, setPinModal] = useState<boolean>(false);
  const token = useSelector(selectToken);

  const toast = useToast();
  const userName = useSelector(selectUsername);

  const handleGoBack = () => {
    goBack();
  };

  const handleBuyData = async (data: BuyDataProps) => {
    if (phone.length !== 11) {
      toast.show("invalid phone number", { type: "custom_danger" });
    } else {
      // let newPhone = "0" + phone;
      // const { data: res } = await buyData(token, {
      //   userName,
      //   serviceID: data.serviceID,
      //   amount: data.variation_amount,
      //   phone: newPhone,
      //   variation_code: data.variation_code,
      //   billersCode: "FlexyBillz",
      // });
      // console.log(data);
      // console.log("res", res);
      console.log(phone);
      setAirtimeModal(true);
    }
  };

  const __renderAvailableData = ({ item, index }: renderDataItem) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          handleBuyData(item);
          setSelectedData(item);
        }}
      >
        <Container
          width={SCREEN_WIDTH / 3 - 20}
          height={120}
          items="center"
          justify="center"
          background={colors.whiteColor}
          gap="3"
          rightBottomRadius="5px"
          rightTopRadius="5px"
          leftBottomRadius="5px"
          leftTopRadius="5px"
        >
          <Paragraph size="18px" fontFamily="PoppinMedium">
            {item.name}
          </Paragraph>
          <Paragraph color={colors.blackColor50} fontFamily="PoppinMedium">
            {item.duration}
          </Paragraph>
          <Paragraph
            color={colors.brandColor}
            fontFamily="PoppinSemiBold"
            size="16px"
          >
            {convertToNaira(item.variation_amount.toString())}
          </Paragraph>
        </Container>
      </TouchableOpacity>
    );
  };

  const __renderNetwork = ({ item }: renderAirtimeItem) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setNetwork(false);
          setSelectedNetwork(item);
        }}
      >
        <Container
          flexDirection="row"
          height={50}
          items="center"
          justify="space-between"
        >
          <Container flexDirection="row" items="center">
            <Container
              height={30}
              width={27}
              rightBottomRadius="100"
              rightTopRadius="100"
              leftBottomRadius="100"
              leftTopRadius="100"
              overflow="hidden"
              mr="10px"
            >
              <ImageTag source={item.data_url} />
            </Container>
            <Paragraph> {item.data_values} </Paragraph>
          </Container>
          {selectedNetwork?.data_values === item.data_values ? (
            <AntDesign
              name="checkcircle"
              color={colors.successColor}
              size={20}
            />
          ) : (
            <Container
              height={20}
              width={17}
              rightBottomRadius="100"
              rightTopRadius="100"
              leftBottomRadius="100"
              leftTopRadius="100"
              border="1px"
              borderColor={colors.blackColor40}
            />
          )}
        </Container>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const provider: AirtimeProps | null = await getProvider(phone);
      if (provider !== null || undefined) {
        setSelectedNetwork(provider);
      }

      console.log("provider", provider);
      const { data } = await getAvailableData(
        selectedNetwork?.data_keys,
        token
      );

      if (!data.success) {
        console.log(data);

        setIsLoading(false);
      } else {
        setIsLoading(false);

        console.log(provider);
        setAvailableData(data.data);
      }
    };

    console.log("phone", phone);
    getData();
  }, [phone]);
  return (
    <Container height={JSON.stringify(SCREEN_HEIGHT)} position="relative">
      <SafeAreaView>
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
            Buy Data Bundle
          </Paragraph>
          <Container width={40} height={20}>
            <ImageTag source={countryIcon} resizeMode="contain" />
          </Container>
        </Container>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Container width={SCREEN_WIDTH} height="100%" mb="20px">
            <Container pr="15px" pl="15px" pt="10px" pb="10px">
              <Container
                flexDirection="row"
                pb="10px"
                items="center"
                justify="space-between"
                width="100%"
                gap="10"
                borderBottom="1px"
                borderColor={colors.blackColor50}
              >
                <Container
                  height={40}
                  gap="10"
                  flexDirection="row"
                  items="center"
                >
                  <TouchableOpacity
                    onPress={() => {
                      console.log(true);
                      setNetwork(true);
                    }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Container
                      height={35}
                      width={32}
                      rightBottomRadius="100"
                      rightTopRadius="100"
                      leftBottomRadius="100"
                      leftTopRadius="100"
                      overflow="hidden"
                    >
                      <ImageTag source={selectedNetwork?.data_url} />
                    </Container>
                    <MaterialIcons name="keyboard-arrow-down" size={20} />
                  </TouchableOpacity>
                  <Container width="80%">
                    <DefaultInput
                      background="transparent"
                      defaultValue={phone}
                      height="100%"
                      placeholder="Please enter phone number"
                      size="20px"
                      fontFamily="PoppinBold"
                      onChangeText={(e) => setPhone(e)}
                    />
                  </Container>
                </Container>
                <TouchableOpacity>
                  <FontAwesome5 name="user-plus" size={20} />
                </TouchableOpacity>
              </Container>
            </Container>
            <Container>
              <Container px="15px">
                <Paragraph color={colors.blackColor40}>
                  Enjoy unlimited rewards when you buy data from the FlexyBillz
                  app everyday.
                </Paragraph>
              </Container>
              <Container items="center" my="10px">
                <Paragraph fontFamily="PoppinMedium" size="16px">
                  ENJOY MASSIVE DISCOUNTS
                </Paragraph>
              </Container>
              <Container items="center">
                {isLoading && <ActivityIndicator />}
                {!isLoading ? (
                  availableData !== null ? (
                    <FlatList
                      data={availableData}
                      renderItem={__renderAvailableData}
                      keyExtractor={(_, index) => `sub_${index}`}
                      numColumns={3}
                      snapToInterval={Dimensions.get("screen").width}
                      contentContainerStyle={{ gap: 10, alignItems: "center" }}
                      columnWrapperStyle={{ gap: 10 }}
                      snapToAlignment="start"
                      decelerationRate={"fast"}
                    />
                  ) : (
                    <Paragraph>No data available for this network</Paragraph>
                  )
                ) : null}
              </Container>
            </Container>
          </Container>
        </ScrollView>
      </SafeAreaView>
      {network && (
        <Container
          background={colors.blackColor50}
          position="absolute"
          top="120px"
          left="0"
          right="-10"
          bottom="0"
        >
          <Container
            width="100%"
            background={colors.whiteColor}
            pt="10px"
            pb="10px"
            pr="40px"
            pl="20px"
            rightBottomRadius="30px"
            leftBottomRadius="30px"
          >
            <FlatList data={MockNetworkData} renderItem={__renderNetwork} />
          </Container>
        </Container>
      )}
      <AirtimeModal
        showContent={airtimeModal}
        handleCloseModal={setAirtimeModal}
        incoming={{
          amount: selectedData?.variation_amount,
          userName,
          ...selectedNetwork,
          type: "Mobile Data",
        }}
        handleNextModal={setPinModal}
      />
      <PinModal
        showContent={pinModal}
        handleCloseModal={setPinModal}
        incoming={{
          ...selectedData,
          amount: selectedData?.variation_amount,
          phone,
          userName,
          ...selectedNetwork,
          type: "Mobile Data",
        }}

        // handleResetForm={() => formik.resetForm()}
      />
    </Container>
  );
};

export default BuyData;
