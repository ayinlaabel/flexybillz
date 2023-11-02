import { InputContainerProps } from "../../utils/shared/styled-components/interface";

export enum InputType {
  PASSWORD = "password",
  TEXT = "text",
  EMAIL = "email",
  PHONE = "phone",
}
export interface InputProp extends InputContainerProps {
  size?: string;
  fontFamily?: string;
  px?: string;
  placeholder?: string;
  rightTopRadius?: string;
  leftTopRadius?: string;
  rightBottomRadius?: string;
  leftBottomRadius?: string;
  keyboardType?: string;
  inputType?: string;
  secureTextEntry?: boolean;
  countryCode?: string;
  onChange: (props: any) => any;
}
