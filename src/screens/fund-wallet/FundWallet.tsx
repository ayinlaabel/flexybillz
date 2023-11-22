import React, { useState, useEffect } from "react";
import { TouchableOpacity, FlatList } from "react-native";
import {
  Container,
  ImageTag,
  Paragraph,
} from "@utils/shared/styled-components";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamsList } from "@navigation/app-navigation/appRoutes";
import { useNavigation } from "@react-navigation/core";
import { backIcon, countryIcon } from "@assets/icons";
import { colors } from "@utils/index";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { selectUser } from "@redux/index";
import { renderBankAccountProps } from "./interface";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { SCREEN_HEIGHT } from "@constants/index";
import * as Clipboard from "expo-clipboard";

const FundWallet = () => {
  const user = useSelector(selectUser);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [copied, setCopied] = useState<string>();
  const { goBack } = useNavigation<StackNavigationProp<AppStackParamsList>>();
  const handleGoBack = () => {
    goBack();
  };

  const __renderBankAccounts = ({ item }: renderBankAccountProps) => {
    const handleCopyAccountNumber = async () => {
      setIsCopied(true);
      await Clipboard.setStringAsync(item.accountNumber);
      setCopied(await Clipboard.getStringAsync());
      setInterval(handleIsCopied, 10000);
    };

    const handleIsCopied = () => {
      setIsCopied(false);
      setCopied("");
    };

    return (
      <Container
        background={colors.whiteColor}
        width="100%"
        pt="15px"
        pb="15px"
        pr="25px"
        pl="25px"
        rightBottomRadius="10px"
        rightTopRadius="10px"
        leftBottomRadius="10px"
        leftTopRadius="10px"
        gap="15"
        items="center"
      >
        <Container
          width="100%"
          flexDirection="row"
          items="center"
          justify="space-between"
        >
          <Paragraph size="16px" color={colors.brandColor}>
            Virtual Account
          </Paragraph>
          <Paragraph
            size="16px"
            fontFamily="PoppinMedium"
            color={colors.brandColor}
          >
            {item.bankName}
          </Paragraph>
        </Container>
        <Container
          items="center"
          justify="center"
          height={55}
          background={colors.brandColor}
          width={250}
          flexDirection="row"
          rightBottomRadius="20px"
          rightTopRadius="20px"
          leftBottomRadius="20px"
          leftTopRadius="20px"
        >
          <Paragraph
            size="24px"
            mr="10px"
            fontFamily="PoppinSemiBold"
            color={colors.whiteColor}
          >
            {item.accountNumber}
          </Paragraph>
          {isCopied && copied === item.accountNumber ? (
            <AntDesign
              name="checkcircle"
              size={18}
              color={colors.successColor}
            />
          ) : (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handleCopyAccountNumber}
            >
              <Ionicons name="copy" size={18} color={colors.whiteColor} />
            </TouchableOpacity>
          )}
        </Container>
        <Container>
          <Paragraph
            size="16px"
            color={colors.brandColor}
            fontFamily="PoppinMedium"
          >
            {item.accountName}
          </Paragraph>
        </Container>
      </Container>
    );
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
          Fund Wallet
        </Paragraph>
        <Container width={40} height={20}>
          <ImageTag source={countryIcon} resizeMode="contain" />
        </Container>
      </Container>
      <Container items="center" width="100%" px="20px" mt="20px">
        <Container
          background={colors.brandColor}
          pt="15px"
          pb="15px"
          pr="20px"
          pl="20px"
          rightBottomRadius="10px"
          rightTopRadius="10px"
          leftBottomRadius="10px"
          leftTopRadius="10px"
        >
          <Paragraph
            size="20px"
            fontFamily="PoppinSemiBold"
            textAlign="center"
            color={colors.whiteColor}
          >
            FUND WALLET TIPS
          </Paragraph>
          <Paragraph textAlign="center" color={colors.whiteColor}>
            Transfer to any of the account number listed below to automatically
            fund your wallet.
          </Paragraph>
        </Container>
        <Container width="100%" mt="20px">
          <FlatList
            data={user.usersAccountsNumbers}
            renderItem={__renderBankAccounts}
            contentContainerStyle={{ gap: 20 }}
          />
        </Container>
      </Container>
      <Container
        pt="20px"
        pb="20px"
        position="absolute"
        bottom="0"
        items="center"
        justify="center"
        width="100%"
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Ionicons name="headset" color={colors.brandColor} />
          <Paragraph ml="3px" color={colors.brandColor}>
            Customer Support
          </Paragraph>
        </TouchableOpacity>
      </Container>
    </Container>
  );
};

export default FundWallet;
