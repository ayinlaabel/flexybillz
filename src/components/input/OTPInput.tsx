import React, { useRef, useEffect, useState } from "react";
import { Container } from "../../utils/shared/styled-components";
import DefaultInput from "./DefaultInput";
import { OtpProp } from "./interface";
import { TextInput } from "react-native";
import { DefaultTextInput } from "../../utils/shared/styled-components/styles";
import { colors } from "../../utils";

const OtpInput = ({
  length,
  onChange,
  px,
  ml,
  mr,
  mt,
  mb,
  textAlign,
  fontFamily,
  border,
  borderColor,
  borderRadius,
  rightTopRadius,
  leftTopRadius,
  rightBottomRadius,
  leftBottomRadius,
  background = colors.grayColor,
  maxLength,
}: OtpProp) => {
  const [pin, setPin] = useState<string>("");
  const [inputLength, setInputLength] = useState<any[]>([]);

  const inputRefs = useRef<any[]>([]);

  const handleChange = (text: string, index: any) => {
    const newInputList = [...inputLength];
    newInputList[index] = text;
    setInputLength(newInputList);
    if (text.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (text.length === 1 && index === inputRefs.current.length - 1) {
      const newInputList = [...inputLength];
      newInputList[index] = text;
      onChange(newInputList.join(""));
    }

    if (text.length < 1 && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (length > 0) {
      const initialInputList = Array(length).fill("");
      setInputLength(initialInputList);
    }
  }, []);

  return (
    <Container mt="60px" flexDirection="row" gap="10">
      {inputLength.map((input, i) => (
        <Container
          background={background}
          width={"13%"}
          height={60}
          border={border}
          borderColor={borderColor}
          borderRadius={borderRadius}
          rightTopRadius={"10px"}
          leftTopRadius={"10px"}
          rightBottomRadius={"10px"}
          leftBottomRadius={"10px"}
          ml={ml}
          mr={mr}
          mt={mt}
          mb={mb}
        >
          <DefaultTextInput
            textAlign="center"
            rightBottomRadius="10px"
            rightTopRadius="10px"
            leftBottomRadius="10px"
            leftTopRadius="10px"
            background="red"
            keyboardType="numeric"
            maxLength={1}
            ref={(ref) => {
              inputRefs.current[i] = ref;
            }}
            onChangeText={(text) => handleChange(text, i)}
          />
        </Container>
      ))}
    </Container>
  );
};

export default OtpInput;
