import React from "react";
import GetStartedCarousel from "../../components/carousel/get-started-carousel/GetStartedCarousel";
import { Container } from "../../utils/shared/styled-components";

const GetStarted = () => {
  return (
    <Container>
      <Container>
        <GetStartedCarousel />
      </Container>
    </Container>
  );
};

export default GetStarted;
