import React from "react";
import { TextInput } from "react-native";
import { Container } from "../../utils/shared/styled-components";
import { DefaultTextInput } from "../../utils/shared/styled-components/styles";
import { InputProp } from "./interface";
import { colors } from "../../utils";

const DefaultInput = ({
  width,
  height,
  placeholder,
  onChange,
  px,
  ml,
  mr,
  mt,
  mb,
  fontFamily,
  border,
  borderColor,
  borderRadius,
  rightTopRadius,
  leftTopRadius,
  rightBottomRadius,
  leftBottomRadius,
  background = colors.grayColor,
}: InputProp) => {
  return (
    <Container
      background={background}
      width={width}
      height={height}
      border={border}
      borderColor={borderColor}
      borderRadius={borderRadius}
      rightTopRadius={rightTopRadius}
      leftTopRadius={leftTopRadius}
      rightBottomRadius={rightBottomRadius}
      leftBottomRadius={leftBottomRadius}
      ml={ml}
      mr={mr}
      mt={mt}
      mb={mb}
    >
      <DefaultTextInput
        px={px}
        fontFamily={fontFamily}
        placeholder={placeholder}
        onChange={onChange}
      />
    </Container>
  );
};

export default DefaultInput;
