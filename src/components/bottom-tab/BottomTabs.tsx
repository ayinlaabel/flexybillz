import React from "react";
import { Container, Paragraph } from "../../utils/shared/styled-components";
import { colors } from "../../utils";
export interface BottomTabsProps {
  focused: any;
  name: string;
  Icon: (props: any) => any;
}
const BottomTabs = ({ focused, Icon, name }: BottomTabsProps) => {
  return (
    <Container height="70%" items="center" justify="space-between">
      <Icon focused={focused} />
      <Paragraph
        fontFamily="PoppinMedium"
        color={focused ? colors.brandColor : colors.blackColor50}
      >
        {name}
      </Paragraph>
    </Container>
  );
};

export default BottomTabs;
