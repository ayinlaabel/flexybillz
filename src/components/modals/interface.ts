import { ImageSourcePropType } from "react-native";
import { BuyDataProps } from "../../screens/services/buy-data/interface";

export interface ModalProps {
  showContent: boolean;
  handleCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
  data?: (props: AirtimeProps) => any;
  incoming?: any;
  handleNextModal?: React.Dispatch<React.SetStateAction<boolean>>;
  handleResetForm?: () => any;
  selectedNetwork?: AirtimeProps;
}

export interface AirtimeProps {
  data_keys: string;
  airtime_keys: string;
  data_name: string;
  data_url: ImageSourcePropType;
  data_values: string;
}

export interface DataProps {
  fixedPrice: string;
  name: string;
  variation_amount: string;
  variation_code: string;
}

export interface renderDataItem {
  item: BuyDataProps;
  index?: number;
}
export interface renderAirtimeItem {
  item: AirtimeProps;
  index?: number;
}
