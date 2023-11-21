import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import {
  Container,
  ImageTag,
  Paragraph,
} from "../../utils/shared/styled-components";
import { TouchableOpacity } from "react-native";
import SwipeUpDownModal from "react-native-swipe-modal-up-down";
import { AirtimeProps, ModalProps, renderAirtimeItem } from "./interface";
import { colors } from "../../utils";
import { useSelector } from "react-redux";
import { selectToken } from "../../redux";
import { getNetwork } from "../../networking/getQuery";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import { MockNetworkData } from "../../__mock__/services/service";

const NetworkModal = ({
  showContent,
  handleCloseModal,
  data,
  selectedNetwork,
}: ModalProps) => {
  const [animate, setAnimate] = useState<boolean>(false);
  const [networkReady, setNetworkReady] = useState<boolean>(false);
  const [network, setNetwork] = useState<AirtimeProps[]>(MockNetworkData);
  const [sNetwork, setSNetwork] = useState<AirtimeProps>(selectedNetwork);

  const token = useSelector(selectToken);

  // useEffect(() => {
  //   const GetNetwork = async () => {
  //     const { data } = await getNetwork(token);
  //     if (!data.success) {
  //       console.log(data);
  //     } else {
  //       console.log(data.data.airtime);
  //       setNetwork(data.data.airtime);
  //       setNetworkReady(true);
  //     }
  //   };

  //   GetNetwork();
  // }, []);

  const __rendetNetwork = ({ item }: renderAirtimeItem) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSNetwork(item);
          handleCloseModal(false);
          data(item);
        }}
      >
        <Container
          flexDirection="row"
          items="center"
          justify="space-between"
          height={60}
          borderBottom="1px"
          borderColor={colors.blackColor10}
          px="20px"
        >
          <Container flexDirection="row" items="center">
            <Container
              height={30}
              width={27}
              rightBottomRadius="100"
              rightTopRadius="100"
              leftBottomRadius="100"
              leftTopRadius="100"
              mr="10px"
              overflow="hidden"
            >
              <ImageTag source={item.data_url} />
            </Container>
            <Paragraph>{item.data_values}</Paragraph>
          </Container>
          <Container>
            {selectedNetwork !== item ? (
              <Container
                height={20}
                width={17}
                rightBottomRadius="100"
                rightTopRadius="100"
                leftBottomRadius="100"
                leftTopRadius="100"
                border="1px"
                borderColor={colors.blackColor50}
              />
            ) : (
              <AntDesign
                name="checkcircle"
                color={colors.successColor}
                size={20}
              />
            )}
          </Container>
        </Container>
      </TouchableOpacity>
    );
  };
  const __renderNetworkModal = () => {
    return (
      <Container
        background={colors.whiteColor}
        width={"100%"}
        position="absolute"
        bottom="0"
      >
        <Container
          justify="center"
          pt="20px"
          pb="20px"
          pr="20px"
          pl="20px"
          flexDirection="row"
        >
          <Paragraph fontFamily="PoppinSemiBold" size="20px">
            Choose Network
          </Paragraph>
          <TouchableOpacity
            onPress={() => {
              setAnimate(false);
              handleCloseModal(false);
            }}
            style={{ position: "absolute", left: 20, alignSelf: "center" }}
          >
            <Feather name="x" size={25} />
          </TouchableOpacity>
        </Container>

        <Container mt="10px">
          <FlatList
            data={network}
            renderItem={__rendetNetwork}
            contentContainerStyle={{ gap: 10 }}
          />
        </Container>
      </Container>
    );
  };
  return (
    <TouchableOpacity
      style={{
        position: "relative",
      }}
      onPress={() => {
        setAnimate(false);
        handleCloseModal(false);
      }}
    >
      <SwipeUpDownModal
        modalVisible={showContent}
        PressToanimate={animate}
        marginTop={20}
        ContentModal={__renderNetworkModal()}
        onClose={() => {
          handleCloseModal(false);
          setAnimate(false);
        }}
      />
    </TouchableOpacity>
  );
};

export default NetworkModal;
