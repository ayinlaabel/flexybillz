import React, { useEffect, useState } from "react";
import { TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import {
  Container,
  ImageTag,
  Paragraph,
} from "../../../utils/shared/styled-components";
import { colors } from "../../../utils";
import { backIcon, countryIcon } from "../../../assets/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MockNetwork,
  MockServiceAmount,
} from "../../../__mock__/services/service";
import { convertToNaira, getProvider } from "../../../utils/shared/helpers";
import DefaultInput from "../../../components/input/DefaultInput";
import { SCREEN_HEIGHT } from "../../../constants";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamsList } from "../../../navigation/app-navigation/appRoutes";
import { SoildButton } from "../../../components/button";
import { Dropdown } from "react-native-element-dropdown";
import { style } from "../../../utils/shared/styled-components/styles";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { selectToken, selectUser, selectUsername } from "../../../redux";
import { aritimeSchema } from "../../../schema/airtime.schema";
import { BuyAirtimeProps } from "../../../networking/interface";
import { buyAirtime } from "../../../networking/getQuery";
import { useToast } from "react-native-toast-notifications";
import NetworkModal from "../../../components/modals/Network.modal";
import { AirtimeProps } from "../../../components/modals/interface";
import AirtimeModal from "../../../components/modals/AirtimeModal";
import PinModal from "../../../components/modals/PinModal";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { buyAirtimeValues } from "./interface";
import { styles } from "./style";

const Airtime = () => {
  const user = useSelector(selectUser);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showNetworkModal, setShowNetworkModal] = useState<boolean>(false);
  const [selectedNetwork, setSelectedNetwork] = useState<AirtimeProps>();
  const [airtimeModal, setAirtimeModal] = useState<boolean>(false);
  const [pinModal, setPinModal] = useState<boolean>(false);
  const [amountIsSelected, setAmountIsSelected] = useState<any>();

  const { goBack, navigate, replace } =
    useNavigation<StackNavigationProp<AppStackParamsList>>();
  const handleGoBack = () => {
    goBack();
  };

  const userName = useSelector(selectUsername);
  const token = useSelector(selectToken);

  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      ...buyAirtimeValues,
      phone: "0" + user.phoneNumber,
      serviceID: selectedNetwork?.airtime_keys,
    },
    validationSchema: aritimeSchema,
    onSubmit: async (values) => {
      // setIsLoading(true);
      values.serviceID = selectedNetwork?.airtime_keys;
      setAirtimeModal(true);
    },
  });

  const handleSelectedNetwork = (data: AirtimeProps) => {
    setSelectedNetwork(data);
    formik.values.serviceID = data.data_keys;
  };

  const renderNetwork = ({ name, icon }: any) => {
    return (
      <Container
        pr="10px"
        pl="10px"
        pt="10px"
        pb="10px"
        height={60}
        flexDirection="row"
        items="center"
      >
        <Container
          height={25}
          width={22}
          rightBottomRadius="100"
          leftBottomRadius="100"
          rightTopRadius="100"
          leftTopRadius="100"
          mr="10px"
        >
          <ImageTag source={icon} />
        </Container>
        <Paragraph size="16px">{name}</Paragraph>
      </Container>
    );
  };
  const handleSubmit = () => {};
  useEffect(() => {
    setAmountIsSelected({});
    formik.values = {
      ...buyAirtimeValues,
      phone: "0" + user.phoneNumber,
      serviceID: selectedNetwork?.airtime_keys,
    };
  }, []);
  useEffect(() => {
    const getNetworkProvider = async () => {
      const provider = await getProvider(formik.values.phone);
      if (provider !== undefined || null) {
        setSelectedNetwork(provider);
        formik.values.serviceID = provider?.airtime_keys;
      }
    };
    getNetworkProvider();
  }, [formik.values.phone]);
  return (
    <Container
      background={colors.whiteColor}
      height={JSON.stringify(SCREEN_HEIGHT)}
    >
      <SafeAreaView />
      <Container
        height={50}
        flexDirection="row"
        justify="space-between"
        items="center"
        px="15px"
        background={colors.whiteColor}
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
          Airtime
        </Paragraph>
        <Container width={40} height={20}>
          <ImageTag source={countryIcon} resizeMode="contain" />
        </Container>
      </Container>
      <Container px="20px" mt="10px">
        <Container>
          <Paragraph>Choose an amount</Paragraph>
          <Container items="center" mt="10px">
            <FlatList
              data={MockServiceAmount}
              renderItem={({ item }: any) => (
                <TouchableOpacity
                  onPress={() => {
                    if (!amountIsSelected || amountIsSelected != item) {
                      formik.values.amount = item.name;
                      setAmountIsSelected(item);
                    } else {
                      setAmountIsSelected(null);
                    }
                  }}
                >
                  <Container
                    items="center"
                    justify="center"
                    height={50}
                    width={120}
                    background={
                      amountIsSelected === item
                        ? colors.brandColor
                        : colors.grayColor
                    }
                    rightBottomRadius="10px"
                    rightTopRadius="10px"
                    leftBottomRadius="10px"
                    leftTopRadius="10px"
                  >
                    <Paragraph
                      color={
                        amountIsSelected === item
                          ? colors.whiteColor
                          : colors.blackColor
                      }
                      size="15px"
                    >
                      {convertToNaira(item.name)}
                    </Paragraph>
                  </Container>
                </TouchableOpacity>
              )}
              numColumns={3}
              contentContainerStyle={{ gap: 10 }}
              columnWrapperStyle={{ gap: 10 }}
            />
          </Container>
        </Container>

        <Container mt="20px">
          <Paragraph>Amount</Paragraph>
          <DefaultInput
            height={55}
            placeholder={`${convertToNaira("0.00")}`}
            defaultValue={formik.values.amount}
            keyboardType="numeric"
            px="10px"
            rightBottomRadius="10px"
            rightTopRadius="10px"
            leftBottomRadius="10px"
            leftTopRadius="10px"
            mt="10px"
            onChangeText={formik.handleChange("amount")}
          />
          {formik.errors.amount && formik.touched.amount && (
            <Paragraph color="red">{formik.errors.amount}</Paragraph>
          )}
        </Container>
        <Container mt="20px">
          <Container flexDirection="row" justify="space-between">
            <Paragraph>Phone Number</Paragraph>
            <Paragraph>Choose Contact</Paragraph>
          </Container>
          <DefaultInput
            height={55}
            placeholder="Enter phone number"
            defaultValue={formik.values.phone}
            px="10px"
            keyboardType="numeric"
            rightBottomRadius="10px"
            rightTopRadius="10px"
            leftBottomRadius="10px"
            leftTopRadius="10px"
            mt="10px"
            onChangeText={formik.handleChange("phone")}
          />
          {formik.errors.phone && formik.touched.phone && (
            <Paragraph color="red">{formik.errors.phone}</Paragraph>
          )}
        </Container>
        <Container mt="20px">
          <Paragraph>Choose Network</Paragraph>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setShowNetworkModal(true)}
          >
            <Container
              height={55}
              width="100%"
              background={colors.grayColor}
              rightBottomRadius="10px"
              rightTopRadius="10px"
              leftBottomRadius="10px"
              leftTopRadius="10px"
              flexDirection="row"
              items="center"
              justify="space-between"
              px="10px"
            >
              <Paragraph>{selectedNetwork?.data_values}</Paragraph>
              <Container flexDirection="row" gap="5" items="center">
                <Container
                  height={30}
                  width={27}
                  rightBottomRadius="100"
                  rightTopRadius="100"
                  leftBottomRadius="100"
                  leftTopRadius="100"
                  overflow="hidden"
                >
                  <ImageTag source={selectedNetwork?.data_url} />
                </Container>
                <MaterialIcons name="keyboard-arrow-down" size={20} />
              </Container>
            </Container>
          </TouchableOpacity>
          {formik.errors.serviceID && formik.touched.serviceID && (
            <Paragraph color="red">{formik.errors.serviceID}</Paragraph>
          )}
        </Container>
      </Container>
      <Container
        height={55}
        px="20px"
        position="absolute"
        bottom="10px"
        left="0"
        right="0"
      >
        <SoildButton
          background={colors.brandColor}
          height="100%"
          color={colors.whiteColor}
          textAlign="center"
          items="center"
          justify="center"
          size="18px"
          onPress={formik.handleSubmit}
          rightBottomRadius="100"
          rightTopRadius="100"
          leftBottomRadius="100"
          leftTopRadius="100"
          fontFamily="PoppinMedium"
          isLoading={isLoading}
        >
          Next
        </SoildButton>
      </Container>
      {showNetworkModal && (
        <NetworkModal
          showContent={showNetworkModal}
          handleCloseModal={setShowNetworkModal}
          data={handleSelectedNetwork}
          selectedNetwork={selectedNetwork}
        />
      )}
      {airtimeModal && (
        <AirtimeModal
          showContent={airtimeModal}
          handleCloseModal={setAirtimeModal}
          incoming={{
            ...formik.values,
            userName,
            ...selectedNetwork,
            type: "Airtime",
          }}
          handleNextModal={setPinModal}
        />
      )}
      {pinModal && (
        <PinModal
          showContent={pinModal}
          handleCloseModal={setPinModal}
          incoming={{
            ...formik.values,
            userName,
            ...selectedNetwork,
            type: "Airtime",
          }}
          handleResetForm={() => formik.resetForm()}
        />
      )}
    </Container>
  );
};

export default Airtime;
