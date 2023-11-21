import React from "react";
import { TouchableOpacity } from "react-native";
import { Container, Paragraph } from "../../utils/shared/styled-components";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants";
import { colors } from "../../utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import { allServices } from "../../constants/data/services";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamsList } from "../../navigation/app-navigation/appRoutes";

const Services = () => {
  const { navigate } = useNavigation<StackNavigationProp<AppStackParamsList>>();
  return (
    <Container height={SCREEN_HEIGHT} width={SCREEN_WIDTH}>
      <SafeAreaView />
      <Container px="15px" mt="10px">
        <Container>
          <Paragraph
            color={colors.brandColor}
            size="20px"
            fontFamily="PoppinSemiBold"
          >
            My Service
          </Paragraph>
          <Paragraph color={colors.blackColor50} size="13.5px">
            With our top-notch services, we aim to create a seamless and
            remarkable experience for every customer.
          </Paragraph>
        </Container>
        <Container items="center" mt="20px">
          <FlatList
            data={allServices}
            renderItem={({ item }: any) => (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigate(item.path)}
              >
                <Container
                  width={117}
                  height={125}
                  background={colors.whiteColor}
                  items="center"
                  justify="space-evenly"
                  py="10px"
                  rightBottomRadius="10px"
                  rightTopRadius="10px"
                  leftBottomRadius="10px"
                  leftTopRadius="10px"
                >
                  <Container width={40} height={45} items="center">
                    {item.icon}
                  </Container>
                  <Paragraph
                    fontFamily="PoppinRegular"
                    size="14px"
                    color={colors.brandColor}
                  >
                    {item.name}
                  </Paragraph>
                </Container>
              </TouchableOpacity>
            )}
            numColumns={3}
            contentContainerStyle={{ gap: 20 }}
            columnWrapperStyle={{ gap: 10 }}
          />
        </Container>
      </Container>
    </Container>
  );
};

export default Services;
