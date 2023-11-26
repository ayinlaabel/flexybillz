import { ViewStyle } from "react-native";

export interface ContainerProps {
  height?: number | string;
  width?: number | string;
  background?: string;
  rightTopRadius?: string;
  leftTopRadius?: string;
  rightBottomRadius?: string;
  leftBottomRadius?: string;
  flexDirection?: string;
  items?: string;
  justify?: string;
  flex?: number;
  mx?: string;
  my?: string;
  mt?: string;
  mb?: string;
  mr?: string;
  ml?: string;
  px?: string;
  py?: string;
  pt?: string;
  pb?: string;
  pr?: string;
  pl?: string;
  border?: string;
  borderRight?: string;
  borderLeft?: string;
  borderTop?: string;
  borderBottom?: string;
  borderColor?: string;
  position?: string;
  borderRadius?: string;
  top?: string;
  bottom?: string;
  right?: string;
  left?: string;
  gap?: string;
  wrap?: string;
  shadow?: boolean;
  children?: any;
  overflow?: "visible" | "hidden" | undefined;
  zIndex?: number;
  style?: ViewStyle;
}

export interface TextProps {
  children?: any;
  size?: string;
  color?: String;
  textAlign?: string;
  textWeight?: string;
  mt?: string;
  mb?: string;
  ml?: string;
  mr?: string;
  fontFamily?: string;
  lineHeight?: string;
  textTransform?: "capitalize" | "uppercase" | "lowercase" | "none" | undefined;
}

export interface InputContainerProps extends AddChildren {
  height?: number | string;
  width?: string | number;
  mt?: string;
  mb?: string;
  ml?: string;
  mr?: string;
  background?: string;
  border?: string;
  borderColor?: string;
  borderRadius?: string;
  shadow?: Boolean;
}

interface AddChildren {
  children?: React.ReactNode | undefined;
}

export interface ImageContainerProps {
  children: any;
  height?: number;
  width?: number | string;
  borderRadius?: string;
  rightTopRadius?: string;
  leftTopRadius?: string;
  rightBottomRadius?: string;
  leftBottomRadius?: string;
}
