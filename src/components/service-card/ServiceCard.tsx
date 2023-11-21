import React from "react";
import { Container, Paragraph } from "../../utils/shared/styled-components";
import { colors, hp, wp } from "../../utils";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamsList } from "../../navigation/app-navigation/appRoutes";

const ServiceCard = ({ item }: any) => {
  const { navigate } = useNavigation<StackNavigationProp<AppStackParamsList>>();
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => navigate(item.path)}>
      <Container items="center" width={80}>
        <Container
          mb="5px"
          items="center"
          width={32}
          height={35}
          rightBottomRadius="100"
          rightTopRadius="100"
          leftBottomRadius="100"
          leftTopRadius="100"
          pt="8px"
          pr="8px"
          pl="8px"
          pb="8px"
          justify="center"
          background={colors.brandColor20}
        >
          {item.icon}
        </Container>
        <Paragraph
          color={colors.brandColor}
          fontFamily="PoppinMedium"
          textAlign="center"
          size="12px"
        >
          {item.name}
        </Paragraph>
      </Container>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadow: {
    height: hp(80),
    width: wp(75),
    backgroundColor: colors.whiteColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    paddingHorizontal: 5,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 7,
  },
});

export default ServiceCard;
