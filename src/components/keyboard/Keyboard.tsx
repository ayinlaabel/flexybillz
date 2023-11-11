import React, { useState } from "react";
import {
  Container,
  ImageTag,
  Paragraph,
} from "../../utils/shared/styled-components";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../../utils";
import { fingerPrintIcon } from "../../assets/icons";

interface StaticKeyboardProp {
  sendValues: (props: any) => any;
  handleDelete: () => any;
  isSignOut?: boolean;
  isFingerPrint?: boolean;
  mt?: string;
  handleFingerPrint?: () => any;
}

const StaticKeyboard = ({
  sendValues,
  handleDelete,
  isSignOut,
  isFingerPrint,
  mt,
  handleFingerPrint,
}: StaticKeyboardProp) => {
  const [values, setValues] = useState<string[]>([]);
  const handlePress = (text: string) => {
    if (values.length < 4) {
      values.push(text);
      sendValues(values);
    }
  };

  return (
    <Container width={"70%"} mt={mt} items="center" justify="center">
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
        {isSignOut ? (
          <TouchableOpacity onPress={() => sendValues("0")}>
            <Container width={70} height={80} items="center" justify="center">
              <Paragraph
                fontFamily="PoppinSemiBold"
                size="16px"
                color={colors.brandColor}
              >
                Sign Out
              </Paragraph>
            </Container>
          </TouchableOpacity>
        ) : (
          <Container width={70} height={80} items="center" justify="center" />
        )}
        <TouchableOpacity onPress={() => sendValues("0")}>
          <Container width={70} height={80} items="center" justify="center">
            <Paragraph fontFamily="PoppinSemiBold" size="20px">
              0
            </Paragraph>
          </Container>
        </TouchableOpacity>
        {isFingerPrint ? (
          <Container width={70} height={80} items="center" justify="center">
            <Container
              width={65}
              height={70}
              items="center"
              justify="center"
              rightBottomRadius="100"
              rightTopRadius="100"
              leftBottomRadius="100"
              leftTopRadius="100"
              border="1px"
              borderColor={colors.brandColor}
              pt="10px"
              pb="10px"
              pr="10px"
              pl="10px"
            >
              <TouchableOpacity onPress={handleFingerPrint}>
                <Container
                  width={45}
                  height={50}
                  items="center"
                  justify="center"
                  rightBottomRadius="100"
                  rightTopRadius="100"
                  leftBottomRadius="100"
                  leftTopRadius="100"
                  border="1px"
                  background={colors.brandColor}
                  pt="8px"
                  pb="8px"
                  pr="8px"
                  pl="8px"
                >
                  <ImageTag source={fingerPrintIcon} />
                </Container>
              </TouchableOpacity>
            </Container>
          </Container>
        ) : (
          <TouchableOpacity onPress={() => handleDelete()}>
            <Container width={70} height={80} items="center" justify="center">
              <Icon name="backspace-outline" size={30} />
            </Container>
          </TouchableOpacity>
        )}
      </Container>
    </Container>
  );
};

export default StaticKeyboard;
