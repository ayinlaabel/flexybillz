import React from "react";
import {
  Container,
  ImageTag,
  Paragraph,
} from "../../utils/shared/styled-components";
import { Dimensions, TouchableOpacity } from "react-native";
import { colors } from "../../utils";
import { backIcon, fingerPrintIcon } from "../../assets/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { SoildButton } from "../../components/button";

const FingerPrintSetup = () => {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");

  const handleGoBack = () => {};
  const handleSubmit = () => {};
  return (
    <Container
      height={JSON.stringify(SCREEN_HEIGHT)}
      background={colors.whiteColor}
    >
      <SafeAreaView />
      <Container height={"97%"} items="center" justify="space-between">
        <Container width={"100%"} items="center">
          <Container
            height={50}
            width={"100%"}
            items="flex-start"
            justify="center"
            px="15px"
            background={colors.whiteColor}
          >
            <TouchableOpacity onPress={handleGoBack}>
              <Container width={40} height={20}>
                <ImageTag source={backIcon} resizeMode="contain" />
              </Container>
            </TouchableOpacity>
          </Container>
          <Container mt="30px" width={"80%"}>
            <Paragraph
              textAlign="center"
              size="20px"
              fontFamily="PoppinBold"
              color={colors.brandColor}
            >
              Setup Fingerprint
            </Paragraph>
            <Paragraph textAlign="center">
              Login and carryout transactions quickly and securely with the
              fingerprint stored on this device.
            </Paragraph>
          </Container>
        </Container>
        <Container width={"100%"} items="center">
          <Container
            height={90}
            width={80}
            rightBottomRadius="100px"
            rightTopRadius="100px"
            leftBottomRadius="100px"
            leftTopRadius="100px"
            border="1px"
            borderColor={colors.brandColor}
            background={colors.whiteColor}
            items="center"
            justify="center"
            my="20px"
          >
            <TouchableOpacity>
              <Container
                height={70}
                width={60}
                rightBottomRadius="100px"
                rightTopRadius="100px"
                leftBottomRadius="100px"
                leftTopRadius="100px"
                background={colors.brandColor}
                pr="10px"
                pl="10px"
                pt="10px"
                pb="10px"
              >
                <ImageTag source={fingerPrintIcon} resizeMode="contain" />
              </Container>
            </TouchableOpacity>
          </Container>
          <Container width={"100%"} px="20px">
            <SoildButton
              height={55}
              rightBottomRadius="15px"
              rightTopRadius="15px"
              leftBottomRadius="15px"
              leftTopRadius="15px"
              onPress={handleSubmit}
              items="center"
              justify="center"
              size="17px"
              color={colors.whiteColor}
              background={colors.brandColor}
              fontFamily="PoppinSemiBold"
            >
              Continue
            </SoildButton>
          </Container>
          <Container py="10px" items="center">
            <TouchableOpacity>
              <Paragraph color={colors.brandColor}>Skip for now</Paragraph>
            </TouchableOpacity>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default FingerPrintSetup;
