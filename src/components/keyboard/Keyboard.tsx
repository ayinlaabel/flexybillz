import React, { useState } from "react";
import { Container, Paragraph } from "../../utils/shared/styled-components";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface StaticKeyboardProp {
  sendValues: (props: any) => any;
  handleDelete: () => any;
}

const StaticKeyboard = ({ sendValues, handleDelete }: StaticKeyboardProp) => {
  const [values, setValues] = useState<string[]>([]);
  const handlePress = (text: string) => {
    if (values.length < 4) {
      values.push(text);
      sendValues(values);
    }
  };

  return (
    <Container width={"70%"} mt="30px" items="center" justify="center">
      <Container flexDirection="row" wrap="wrap" gap="35" justify="center">
        <TouchableOpacity onPress={() => sendValues("1")}>
          <Container width={70} height={80} items="center" justify="center">
            <Paragraph fontFamily="PoppinSemiBold" size="20px">
              1
            </Paragraph>
          </Container>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sendValues("2")}>
          <Container width={70} height={80} items="center" justify="center">
            <Paragraph fontFamily="PoppinSemiBold" size="20px">
              2
            </Paragraph>
          </Container>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sendValues("3")}>
          <Container width={70} height={80} items="center" justify="center">
            <Paragraph fontFamily="PoppinSemiBold" size="20px">
              3
            </Paragraph>
          </Container>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sendValues("4")}>
          <Container width={70} height={80} items="center" justify="center">
            <Paragraph fontFamily="PoppinSemiBold" size="20px">
              4
            </Paragraph>
          </Container>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sendValues("5")}>
          <Container width={70} height={80} items="center" justify="center">
            <Paragraph fontFamily="PoppinSemiBold" size="20px">
              5
            </Paragraph>
          </Container>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sendValues("6")}>
          <Container width={70} height={80} items="center" justify="center">
            <Paragraph fontFamily="PoppinSemiBold" size="20px">
              6
            </Paragraph>
          </Container>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sendValues("7")}>
          <Container width={70} height={80} items="center" justify="center">
            <Paragraph fontFamily="PoppinSemiBold" size="20px">
              7
            </Paragraph>
          </Container>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sendValues("8")}>
          <Container width={70} height={80} items="center" justify="center">
            <Paragraph fontFamily="PoppinSemiBold" size="20px">
              8
            </Paragraph>
          </Container>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sendValues("9")}>
          <Container width={70} height={80} items="center" justify="center">
            <Paragraph fontFamily="PoppinSemiBold" size="20px">
              9
            </Paragraph>
          </Container>
        </TouchableOpacity>
        <Container width={70} height={80} items="center" justify="center" />
        <TouchableOpacity onPress={() => sendValues("0")}>
          <Container width={70} height={80} items="center" justify="center">
            <Paragraph fontFamily="PoppinSemiBold" size="20px">
              0
            </Paragraph>
          </Container>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete()}>
          <Container width={70} height={80} items="center" justify="center">
            <Icon name="backspace-outline" size={30} />
          </Container>
        </TouchableOpacity>
      </Container>
    </Container>
  );
};

export default StaticKeyboard;
