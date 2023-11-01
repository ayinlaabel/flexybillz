import React, { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { Container } from "../../utils/shared/styled-components";
import {
  DefaultTextInput,
  Paragraph,
} from "../../utils/shared/styled-components/styles";
import { InputProp, InputType } from "./interface";
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
  keyboardType,
  inputType,
}: InputProp) => {
  const [text, setText] = useState("Show");
  const [secure, setSecure] = useState<boolean>(
    inputType === InputType.PASSWORD
  );
  const handleSecureTextEntry = () => {
    switch (inputType) {
      case InputType.PASSWORD:
        setText("Show");
        setSecure(true);
        inputType = InputType.TEXT;
        console.log(secure);
        break;
      case InputType.TEXT:
        setText("Hide");
        setSecure(false);
        inputType = InputType.PASSWORD;
        console.log(secure);
        break;
      default:
        setSecure(false);
        break;
    }
  };
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
      flexDirection={inputType === InputType.PASSWORD ? "row" : "column"}
    >
      <DefaultTextInput
        width={inputType === InputType.PASSWORD ? "85%" : "100%"}
        secureTextEntry={secure}
        keyboardType={keyboardType}
        px={px}
        fontFamily={fontFamily}
        placeholder={placeholder}
        onChange={onChange}
      />
      {inputType === InputType.PASSWORD && (
        <Container height="100%" width={"15%"}>
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={0.9}
            onPress={handleSecureTextEntry}
          >
            <Container
              height={"100%"}
              width={"100%"}
              items="center"
              justify="center"
            >
              <Paragraph>{text}</Paragraph>
            </Container>
          </TouchableOpacity>
        </Container>
      )}
    </Container>
  );
};

export default DefaultInput;
