import React from "react";
import { Container, Paragraph } from "../../utils/shared/styled-components";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants";
import { colors } from "../../utils";

const Profile = () => {
  return (
    <Container
      height={SCREEN_HEIGHT}
      width={SCREEN_WIDTH}
      items="center"
      justify="center"
    >
      <Container items="center">
        <Paragraph
          textAlign="center"
          fontFamily="PoppinMedium"
          size="32px"
          color={colors.blackColor20}
        >
          Profile
        </Paragraph>
        <Paragraph
          textAlign="center"
          fontFamily="PoppinMedium"
          size="32px"
          color={colors.blackColor20}
        >
          Coming Soon!
        </Paragraph>
      </Container>
    </Container>
  );
};

export default Profile;
