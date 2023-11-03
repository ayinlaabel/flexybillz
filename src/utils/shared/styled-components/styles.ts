import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import { hp, wp } from "../responsive-dimension";
import React from "react";
import {
  ContainerProps,
  ImageContainerProps,
  InputContainerProps,
  TextProps,
} from "./interface";
import colors from "../Colors";
import { InputProp } from "../../../components/input/interface";

export const Container: React.FC<ContainerProps> = styled.View`
  ${({ position }: any) => (position ? `position: ${position}` : null)};
  ${({ top }: any) => (top ? `top: ${top}` : null)};
  ${({ bottom }: any) => (bottom ? `bottom: ${bottom}` : null)};
  ${({ right }: any) => (right ? `right: ${right}` : null)};
  ${({ left }: any) => (left ? `left: ${left}` : null)};
  height: ${({ height }: any) =>
    height ? (typeof height === typeof 0 ? hp(height) : height) : "auto"};
  width: ${({ width }: any) =>
    width ? (typeof width === typeof 0 ? wp(width) : width) : "auto"};
  background: ${({ background }: any) =>
    background ? background : "transparent"};
  ${({ border }: any) => (border ? `border-width: ${border};` : null)};
  ${({ borderRight }: any) =>
    borderRight ? `border-right-width: ${borderRight};` : null};
  ${({ borderLeft }: any) =>
    borderLeft ? `border-left-width:${borderLeft};` : null};
  border-color: ${({ borderColor }: any) =>
    borderColor ? borderColor : "transparent"};
  ${({ borderRadius }: any) =>
    borderRadius ? `border-radius: ${borderRadius}` : null};
  margin-top: ${({ mt }: any) => (mt ? mt : "0px")};
  margin-bottom: ${({ mb }: any) => (mb ? mb : "0px")};
  margin-right: ${({ mr }: any) => (mr ? mr : "0px")};
  margin-left: ${({ ml }: any) => (ml ? ml : "0px")};
  ${({ mx }: any) => (mx ? `margin: 0px ${mx}` : null)};
  ${({ my }: any) => (my ? `margin: ${my} 0px` : null)};
  padding-top: ${({ pt }: any) => (pt ? pt : "0px")};
  padding-bottom: ${({ pb }: any) => (pb ? pb : "0px")};
  padding-right: ${({ pr }: any) => (pr ? pr : "0px")};
  padding-left: ${({ pl }: any) => (pl ? pl : "0px")};
  ${({ px }: any) => (px ? `padding: 0px ${px}` : null)};
  ${({ py }: any) => (py ? `padding: ${py} 0px` : null)};
  ${({ flexDirection }: any) =>
    flexDirection ? `flex-direction: ${flexDirection}` : null};
  ${({ items }: any) => (items ? `align-items: ${items}` : null)};
  ${({ justify }: any) => (justify ? `justify-content: ${justify}` : null)};
  ${({ rightTopRadius }: any) =>
    rightTopRadius ? `border-top-right-radius: ${rightTopRadius}` : null};
  ${({ leftTopRadius }: any) =>
    leftTopRadius ? `border-top-left-radius: ${leftTopRadius}` : null};
  ${({ rightBottomRadius }: any) =>
    rightBottomRadius
      ? `border-bottom-right-radius: ${rightBottomRadius}`
      : null};
  ${({ leftBottomRadius }: any) =>
    leftBottomRadius ? `border-bottom-left-radius: ${leftBottomRadius}` : null};

  overflow: hidden;
  ${({ gap }: any) => (gap ? `gap: ${gap};` : null)}
  ${({ wrap }: any) => (wrap ? `flex-wrap: ${wrap};` : null)}
`;

export const Paragraph: React.FC<TextProps> = styled.Text`
  font-size: ${({ size }: any) => (size ? size : "14px")};
  text-align: ${(props: any) => (props.textAlign ? props.textAlign : "auto")};
  font-weight: ${({ textWeight }: any) => (textWeight ? textWeight : "300")};
  color: ${({ color }: any) => (color ? color : colors.blackColor)};
  margin-top: ${({ mt }) => (mt ? mt : "0px")};
  margin-bottom: ${({ mb }) => (mb ? mb : "0px")};
  margin-right: ${({ mr }) => (mr ? mr : "0px")};
  margin-left: ${({ ml }) => (ml ? ml : "0px")};
  font-family: ${({ fontFamily }) =>
    fontFamily ? fontFamily : "PoppinRegular"};
`;

export const InputContainer: React.FC<InputContainerProps> = styled.View`
  height: 50px;
  width: ${(props: any) => (props.width ? props.width : "100%")};
  background: ${(props: any) =>
    props.background ? props.background : "transparent"};
  border-radius: ${(props: any) =>
    props.borderRadius ? props.borderRadius : "0px"};
  border-width: ${(props: any) => (props.border ? props.border : "0px")};
  border-color: ${(props: any) =>
    props.borderColor ? props.borderColor : colors.blackColor};
  margin-top: ${(props: any) => (props.mt ? props.mt : "0px")};
  margin-bottom: ${({ mb }: any) => (mb ? mb : "0px")};
  margin-right: ${({ mr }: any) => (mr ? mr : "0px")};
  margin-left: ${({ ml }: any) => (ml ? ml : "0px")};
  shadow-color: rgba(25, 50, 47, 0.08);
  shadow-offset: {
    width: 0px;
    height: 6px;
  }
  shadow-opacity: 1;
  shadow-radius: 8px;
  elevation: 5; /* Android */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const DefaultTextInput: React.FC<InputProp> = styled.TextInput`
  height: ${({ height }: any) =>
    height ? (typeof height === typeof 0 ? hp(height) : height) : "100%"};
  width: ${({ width }: any) =>
    width ? (typeof width === typeof 0 ? wp(width) : width) : "100%"};
  ${({ px }: any) => (px ? `padding-right: ${px}; padding-left:${px};` : null)};
  ${({ textAlign }: any) => (textAlign ? `text-align: ${textAlign}` : null)};
`;
export const ImageContainer: React.FC<ImageContainerProps> = styled.View`
  height: ${({ height }: any) => (height ? hp(height) : "100%")};
  width: ${({ width }: any) =>
    width ? (typeof width === typeof 0 ? wp(width) : width) : "100%"};
  ${({ borderRadius }: any) =>
    borderRadius ? `border-radius: ${borderRadius}` : null};
  ${({ rightTopRadius }: any) =>
    rightTopRadius ? `border-top-right-radius: ${rightTopRadius}` : null};
  ${({ leftTopRadius }: any) =>
    leftTopRadius ? `border-top-left-radius: ${leftTopRadius}` : null};
  ${({ rightBottomRadius }: any) =>
    rightBottomRadius
      ? `border-bottom-right-radius: ${rightBottomRadius}`
      : null};
  ${({ leftBottomRadius }: any) =>
    leftBottomRadius ? `border-bottom-left-radius: ${leftBottomRadius}` : null};
  overflow: hidden;
`;

export const ImageTag = styled.Image`
  width: 100%;
  height: 100%;
`;

export const styles = StyleSheet.create({
  dropDownContainer: {
    height: hp(50),
    backgroundColor: colors.grayColor,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  placeholder: {
    color: colors.lightGrayColor,
  },
});
