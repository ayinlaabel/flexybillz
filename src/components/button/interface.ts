import {
  ContainerProps,
  TextProps,
} from "../../utils/shared/styled-components/interface";

export interface ButtonProps extends ContainerProps, TextProps {
  disabled?: boolean;
  isLoading?: boolean;
  onPress: (props: any) => any;
}
