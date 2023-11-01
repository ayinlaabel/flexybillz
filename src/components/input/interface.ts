import { InputContainerProps } from "../../utils/shared/styled-components/interface";

export interface InputProp extends InputContainerProps {
  size?: string;
  fontFamily?: string;
  px?: string;
  placeholder?: string;
  rightTopRadius?: string;
  leftTopRadius?: string;
  rightBottomRadius?: string;
  leftBottomRadius?: string;
  onChange: (props: any) => any;
}
