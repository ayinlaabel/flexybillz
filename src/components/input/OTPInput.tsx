import React, { useRef, useEffect, useState } from "react";
import { Container } from "../../utils/shared/styled-components";
import DefaultInput from "./DefaultInput";
import { OtpProp } from "./interface";

const OtpInput = ({ length, onChange }: OtpProp) => {
  const [pin, setPin] = useState<string>("");
  const [inputLength, setInputLength] = useState<any[]>([]);

  const inputRefs = useRef<any[]>([]);

  const handleChange = (text: string, index: any) => {
    const newInputList = [...inputLength];
    newInputList[index] = text;
    setInputLength(newInputList);
    console.log(inputRefs.current.length);
    if (text.length === 1 && index < inputRefs.current.length - 1) {
      console.log("Index", index);
      inputRefs.current[index + 1]?.focus();
    }

    if (text.length === 1 && index === inputRefs.current.length - 1) {
      const newInputList = [...inputLength];
      newInputList[index] = text;
      onChange(newInputList);
      // console.log(text);
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
        <DefaultInput
          width={"13%"}
          textAlign="center"
          height={60}
          rightBottomRadius="10px"
          rightTopRadius="10px"
          leftBottomRadius="10px"
          leftTopRadius="10px"
          keyboardType="numeric"
          maxLength={1}
          ref={(ref) => {
            console.log(ref);
            inputRefs.current[i] = ref;
          }}
          onChangeText={(text) => handleChange(text, i)}
        />
      ))}
    </Container>
  );
};

export default OtpInput;
