import React, { useState } from "react";
import { TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import SwipeUpDownModal from "react-native-swipe-modal-up-down";
import { ModalProps } from "./interface";
import { Container, Paragraph } from "../../utils/shared/styled-components";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../utils";
import { convertToNaira } from "../../utils/shared/helpers";
import { SCREEN_WIDTH } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUsername } from "../../redux";
import { buyAirtime, buyData, verifyPin } from "../../networking/getQuery";
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamsList } from "../../navigation/app-navigation/appRoutes";
import { setTransaction } from "../../redux/slices/userSlice";

const PinModal = ({
  showContent,
  handleCloseModal,
  incoming,
  handleResetForm,
}: ModalProps) => {
  const [animate, setAnimate] = useState<boolean>(false);
  const [pinLength, setPinLength] = useState<string[]>(["", "", "", ""]);
  const keyboardKey = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ""];
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [pin, setPin] = useState<string[]>([]);
  const userName = useSelector(selectUsername);
  const token = useSelector(selectToken);

  const toast = useToast();
  const dispatch = useDispatch();

  const { navigate } = useNavigation<StackNavigationProp<AppStackParamsList>>();

  const handleBackSpace = () => {
    const newPin = pin;
    if (pin.length >= 1) {
      newPin.pop();
      setPin([...newPin]);
    }

    console.log(pin.length);
  };
  const handleKeyBoard = async (data: string) => {
    if (pin.length < 4) {
      setPin([...pin, data]);
    }
    console.log(keyboardKey);
    if (pin.length === 3) {
      setIsVerifying(true);
      const walletPin = [...pin, data].join("");
      const { data: res } = await verifyPin(
        {
          userName,
          walletPin,
        },
        token
      );

      if (!res.success) {
        setIsVerifying(false);
        toast.show(res.message, { type: "custom_danger" });
        setPin([]);
      } else {
        switch (incoming.type) {
          case "Airtime":
            console.log({
              serviceID: incoming.serviceID,
              amount: JSON.parse(incoming.amount),
              userName: incoming.userName,
              phone: incoming.phone,
            });
            const { data: airtime } = await buyAirtime(token, {
              serviceID: incoming.serviceID,
              amount: JSON.parse(incoming.amount),
              userName: incoming.userName,
              phone: incoming.phone,
            });

            if (!airtime.success) {
              setIsVerifying(false);
              toast.show(airtime.message, { type: "custom_danger" });
            } else {
              handleCloseModal(false);
              setAnimate(false);
              setIsVerifying(false);
              setPin([]);
              handleResetForm();
              const { content, ...others } = airtime.data;
              dispatch(
                setTransaction({
                  ...content.transactions,
                  ...others,
                  ...airtime.data.transaction_date,
                  network: { ...incoming },
                })
              );
              navigate("SuccessAirtime", { amount: incoming.amount });
            }
            break;
          case "Mobile Data":
            const { data: mobileData } = await buyData(token, {
              userName,
              serviceID: incoming.serviceID,
              amount: incoming.variation_amount,
              phone: incoming.phone,
              variation_code: incoming.variation_code,
              billersCode: "FlexyBillz",
            });
            console.log(incoming.phone);
            if (!mobileData.success) {
              setPin([]);
              setIsVerifying(false);
              toast.show(mobileData.message, { type: "custom_danger" });
            } else {
              handleCloseModal(false);
              setAnimate(false);
              setIsVerifying(false);
              setPin([]);
              const { content, ...others } = mobileData.data;
              console.log(mobileData.data);
              dispatch(
                setTransaction({
                  ...content.transactions,
                  ...others,
                  ...mobileData.data.transaction_date,
                  network: { ...incoming },
                })
              );
              // handleResetForm();
              navigate("SuccessAirtime", { amount: incoming.amount });
            }
            break;
          default:
            break;
        }
      }
    }
  };

  const __renderKeyboard = ({ item }: any) => {
    return item === "" ? (
      pin.length > 0 ? (
        <TouchableOpacity onPress={handleBackSpace}>
          <Container
            height={70}
            width={SCREEN_WIDTH / 3 - 20}
            background={colors.whiteColor}
            items="center"
            justify="center"
            rightTopRadius="10px"
            rightBottomRadius="10px"
            leftTopRadius="10px"
            leftBottomRadius="10px"
          >
            <Ionicons name="backspace-outline" size={20} />
          </Container>
        </TouchableOpacity>
      ) : null
    ) : (
      <TouchableOpacity onPress={() => handleKeyBoard(item)}>
        <Container
          height={70}
          width={SCREEN_WIDTH / 3 - 20}
          background={colors.whiteColor}
          items="center"
          justify="center"
          rightTopRadius="10px"
          rightBottomRadius="10px"
          leftTopRadius="10px"
          leftBottomRadius="10px"
        >
          <Paragraph size="20px">{item}</Paragraph>
        </Container>
      </TouchableOpacity>
    );
  };
  const __renderPinModal = () => {
    return (
      <Container
        position="absolute"
        bottom="0"
        background={colors.whiteColor}
        width="100%"
      >
        <TouchableOpacity
          onPress={() => {
            handleCloseModal(false);
            setAnimate(false);
          }}
        >
          <Container py="20px" ml="20px">
            <Feather name="x" size={20} />
          </Container>
        </TouchableOpacity>
        <Container items="center" gap="20">
          <Paragraph size="24px" fontFamily="PoppinMedium">
            {convertToNaira(incoming.amount)}
          </Paragraph>
          {isVerifying ? (
            <ActivityIndicator size={20} color={colors.brandColor} />
          ) : (
            <Container flexDirection="row" gap="10">
              <Container
                height={60}
                border="1px"
                width={57}
                borderColor={colors.blackColor20}
                rightTopRadius="5px"
                rightBottomRadius="5px"
                leftBottomRadius="5px"
                leftTopRadius="5px"
                items="center"
                justify="center"
              >
                {pin[0] ? (
                  <Container
                    height={30}
                    width={27}
                    rightBottomRadius="100"
                    rightTopRadius="100"
                    leftBottomRadius="100"
                    leftTopRadius="100"
                    background={colors.blackColor}
                  />
                ) : null}
              </Container>
              <Container
                height={60}
                border="1px"
                width={57}
                borderColor={colors.blackColor20}
                rightTopRadius="5px"
                rightBottomRadius="5px"
                leftBottomRadius="5px"
                leftTopRadius="5px"
                items="center"
                justify="center"
              >
                {pin[1] ? (
                  <Container
                    height={30}
                    width={27}
                    rightBottomRadius="100"
                    rightTopRadius="100"
                    leftBottomRadius="100"
                    leftTopRadius="100"
                    background={colors.blackColor}
                  />
                ) : null}
              </Container>
              <Container
                height={60}
                border="1px"
                width={57}
                borderColor={colors.blackColor20}
                rightTopRadius="5px"
                rightBottomRadius="5px"
                leftBottomRadius="5px"
                leftTopRadius="5px"
                items="center"
                justify="center"
              >
                {pin[2] ? (
                  <Container
                    height={30}
                    width={27}
                    rightBottomRadius="100"
                    rightTopRadius="100"
                    leftBottomRadius="100"
                    leftTopRadius="100"
                    background={colors.blackColor}
                  />
                ) : null}
              </Container>
              <Container
                height={60}
                border="1px"
                width={57}
                borderColor={colors.blackColor20}
                rightTopRadius="5px"
                rightBottomRadius="5px"
                leftBottomRadius="5px"
                leftTopRadius="5px"
                items="center"
                justify="center"
              >
                {pin[3] ? (
                  <Container
                    height={30}
                    width={27}
                    rightBottomRadius="100"
                    rightTopRadius="100"
                    leftBottomRadius="100"
                    leftTopRadius="100"
                    background={colors.blackColor}
                  />
                ) : null}
              </Container>
            </Container>
          )}
          <TouchableOpacity>
            <Paragraph color={colors.brandColor}>Forget Pin</Paragraph>
          </TouchableOpacity>
          <Container
            width="100%"
            background={colors.lightGrayColor50}
            pt="20px"
            pb="20px"
          >
            <FlatList
              data={keyboardKey}
              extraData={keyboardKey}
              renderItem={__renderKeyboard}
              numColumns={3}
              contentContainerStyle={{
                gap: 10,
                alignItems: `${pin.length > 0 ? "flex-end" : "center"}`,
                justifyContent: "center",
                alignSelf: "center",
              }}
              columnWrapperStyle={{ gap: 10 }}
            />
          </Container>
        </Container>
      </Container>
    );
  };
  return (
    <TouchableOpacity
      onPress={() => {
        setAnimate(false);
        handleCloseModal(false);
      }}
    >
      <SwipeUpDownModal
        PressToanimate={animate}
        modalVisible={showContent}
        ContentModal={__renderPinModal()}
        marginTop={20}
        onClose={() => {
          setAnimate(false);
          handleCloseModal(false);
        }}
      />
    </TouchableOpacity>
  );
};

export default PinModal;
