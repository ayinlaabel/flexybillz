import { TextInput, TextInputProps } from "react-native";
import { InputContainerProps } from "../../utils/shared/styled-components/interface";

export enum InputType {
  PASSWORD = "password",
  TEXT = "text",
  EMAIL = "email",
  PHONE = "phone",
}
export interface InputProp extends InputContainerProps, TextInputProps {
  size?: string;
  fontFamily?: string;
  px?: string;
  placeholder?: string;
  rightTopRadius?: string;
  leftTopRadius?: string;
  rightBottomRadius?: string;
  leftBottomRadius?: string;
  inputType?: string;
  secureTextEntry?: boolean;
  countryCode?: string;
  onChange?: (props: any) => any;
  onChangeText?: (props: any) => any;
  maxLength?: number;
  ref?: (props: any) => any;
}

export interface OtpProp {
  length: number;
  onChange: (props: any) => any;
}
