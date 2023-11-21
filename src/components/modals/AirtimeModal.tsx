import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import SwipeUpDownModal from "react-native-swipe-modal-up-down";
import {
  Container,
  ImageTag,
  Paragraph,
} from "../../utils/shared/styled-components";
import { ModalProps } from "./interface";
import { colors } from "../../utils";
import { convertToNaira } from "../../utils/shared/helpers";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SoildButton } from "../button";

const AirtimeModal = ({
  showContent,
  handleCloseModal,
  incoming,
  handleNextModal,
}: ModalProps) => {
  const [animate, setAnimate] = useState<boolean>(false);
  const [useCashBack, setUseCashBack] = useState<boolean>(false);

  const user = useSelector(selectUser);

  const handlePinModal = () => {
    handleCloseModal(false);
  };

  const __renderAirtimeModal = () => {
    return (
      <Container
        background={colors.whiteColor}
        width="100%"
        position="absolute"
        bottom="0"
        pt="40px"
        pb="10px"
        rightTopRadius="50px"
        leftTopRadius="50px"
      >
        <TouchableOpacity
          style={{ position: "absolute", top: 30, left: 30 }}
          onPress={() => {
            handleCloseModal(false);
            setAnimate(false);
          }}
        >
          <Feather name="x" size={25} />
        </TouchableOpacity>
        <Container items="center">
          <Paragraph size="30px" fontFamily="PoppinSemiBold">
            {convertToNaira(incoming?.amount) + ".00"}
          </Paragraph>
        </Container>
        <Container px="20px" gap="20" mt="20px">
          <Container flexDirection="row" items="center" justify="space-between">
            <Paragraph fontFamily="PoppinMedium">Phone Number</Paragraph>
            <Container flexDirection="row" items="center">
              <Container
                height={30}
                width={27}
                rightBottomRadius="100"
                rightTopRadius="100"
                leftBottomRadius="100"
                leftTopRadius="100"
                mr="5px"
                overflow="hidden"
              >
                <ImageTag source={incoming.data_url} />
              </Container>
              <Paragraph>{incoming.type}</Paragraph>
            </Container>
          </Container>
          <Container flexDirection="row" items="center" justify="space-between">
            <Paragraph fontFamily="PoppinMedium">Amount</Paragraph>
            <Paragraph>{convertToNaira(incoming.amount) + ".00"}</Paragraph>
          </Container>
          <Container flexDirection="row" items="center" justify="space-between">
            <Paragraph fontFamily="PoppinMedium">Bonus to Earn</Paragraph>
            <Paragraph>{"+" + convertToNaira("1") + " cashback"}</Paragraph>
          </Container>
          <Container flexDirection="row" items="center" justify="space-between">
            <Paragraph fontFamily="PoppinMedium">Cashback Bal.</Paragraph>
            <Container flexDirection="row" items="center">
              <Paragraph mr="10px">
                {"+" + convertToNaira(user.balance)}
              </Paragraph>
              <TouchableOpacity
                onPress={() => {
                  setUseCashBack(!useCashBack);
                }}
              >
                <MaterialCommunityIcons
                  name={
                    useCashBack ? "toggle-switch" : "toggle-switch-off-outline"
                  }
                  size={25}
                  color={colors.brandColor}
                />
              </TouchableOpacity>
            </Container>
          </Container>
        </Container>
        <Container items="center" gap="10" px="30px" mt="20px">
          <Paragraph>Payment Method</Paragraph>
          <Container
            flexDirection="row"
            items="center"
            justify="space-between"
            width="100%"
            height={55}
            pr="20px"
            pl="20px"
            background={colors.lightGrayColor50}
            rightBottomRadius="20"
            rightTopRadius="20"
            leftBottomRadius="20"
            leftTopRadius="20"
          >
            <Container flexDirection="row">
              <Entypo
                name="wallet"
                size={15}
                style={{ marginRight: 10 }}
                color={colors.brandColor}
              />
              <Paragraph fontFamily="PoppinMedium">Balance</Paragraph>
            </Container>
            <Paragraph fontFamily="PoppinMedium">
              {convertToNaira(user.balance) + ".00"}
            </Paragraph>
          </Container>

          <Container width="100%" mt="20px">
            <SoildButton
              height={55}
              textAlign="center"
              items="center"
              justify="center"
              width="100%"
              rightBottomRadius="20px"
              rightTopRadius="20px"
              leftBottomRadius="20px"
              leftTopRadius="20px"
              background={colors.brandColor}
              color={colors.whiteColor}
              fontFamily="PoppinMedium"
              size="16px"
              onPress={() => {
                handleCloseModal(false);
                setAnimate(false);
                handleNextModal(true);
              }}
            >
              Continue
            </SoildButton>
          </Container>
        </Container>
      </Container>
    );
  };
  return (
    <TouchableOpacity>
      <SwipeUpDownModal
        PressToanimate={animate}
        modalVisible={showContent}
        marginTop={20}
        ContentModal={__renderAirtimeModal()}
        onClose={() => {
          handleCloseModal(false);
          setAnimate(false);
        }}
      />
    </TouchableOpacity>
  );
};

export default AirtimeModal;
