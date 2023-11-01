import React from "react";
import { StatusBar } from "react-native";
import GetStartedCarousel from "../../components/carousel/get-started-carousel/GetStartedCarousel";
import { Container } from "../../utils/shared/styled-components";
import { colors } from "../../utils";

const GetStarted = () => {
  return (
    <Container background={colors.whiteColor}>
      <StatusBar barStyle="dark-content" translucent={true} />
      <Container>
        <GetStartedCarousel />
      </Container>
    </Container>
  );
};

export default GetStarted;
