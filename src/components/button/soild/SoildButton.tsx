import React from "react";
import { TouchableOpacity } from "react-native";
import { Container, Paragraph } from "../../../utils/shared/styled-components";
import { ButtonProps } from "../interface";
const SoildButton = ({
  children,
  mt,
  mr,
  ml,
  mb,
  my,
  mx,
  px,
  py,
  pr,
  pl,
  pb,
  pt,
  background,
  color,
  width,
  height,
  disabled,
  textAlign,
  items,
  justify,
  border,
  borderColor,
  right,
  top,
  rightBottomRadius,
  rightTopRadius,
  left,
  leftBottomRadius,
  leftTopRadius,
  position,
  fontFamily,
  onPress,
  size,
  borderRadius,
}: ButtonProps) => {
  return (
    <TouchableOpacity activeOpacity={0.9} disabled={disabled} onPress={onPress}>
      <Container
        width={width}
        height={height}
        border={border}
        borderColor={borderColor}
        position={position}
        items={items}
        justify={justify}
        mt={mt}
        mx={mx}
        my={my}
        mb={mb}
        mr={mr}
        ml={ml}
        px={px}
        py={py}
        pr={pr}
        pl={pl}
        pt={pt}
        pb={pb}
        background={background}
        top={top}
        left={left}
        right={right}
        rightBottomRadius={rightBottomRadius}
        rightTopRadius={rightTopRadius}
        leftBottomRadius={leftBottomRadius}
        leftTopRadius={leftTopRadius}
        borderRadius={borderRadius}
      >
        <Paragraph
          size={size}
          fontFamily={fontFamily}
          color={color}
          textAlign={textAlign}
        >
          {children}
        </Paragraph>
      </Container>
    </TouchableOpacity>
  );
};

export default SoildButton;
