import { images } from "../../assets/images";
import { ImageSourcePropType } from "react-native";
import { AirtimeProps } from "../../components/modals/interface";

export interface NetworkProps {
  name: string;
  icon: ImageSourcePropType;
  serviceId: string;
}
export const MockServiceAmount = [
  { name: "100", value: 100 },
  { name: "200", value: 200 },
  { name: "500", value: 500 },
  { name: "1000", value: 1000 },
  { name: "2000", value: 2000 },
  { name: "5000", value: 5000 },
];

// export const MockNetwork: AirtimeProps[] = [
//   {
//     data_values: "9Mobile",
//     data_url: images.etisalat,
//     data_keys: "etisalat",
//     data_name: "etisalat",
//   },
//   {
//     data_values: "NTN-NG",
//     data_url: images.mtn,
//     data_keys: "mtn",
//     data_name: "mtn",
//   },
//   {
//     data_values: "Glo",
//     data_url: images.glo,
//     data_keys: "glo",
//     data_name: "glo",
//   },
//   {
//     data_values: "Airtel",
//     data_url: images.airtel,
//     data_keys: "airtel",
//     data_name: "airtel",
//   },
// ];

export const MockNetworkData: AirtimeProps[] = [
  {
    data_values: "9Mobile",
    data_url: images.etisalat,
    data_keys: "etisalat-data",
    airtime_keys: "etisalat",
    data_name: "9MOBILE",
  },
  {
    data_values: "NTN-NG",
    data_url: images.mtn,
    data_keys: "mtn-data",
    airtime_keys: "mtn",
    data_name: "mtn",
  },
  {
    data_values: "Glo",
    data_url: images.glo,
    data_keys: "glo-data",
    airtime_keys: "glo",
    data_name: "glo",
  },
  {
    data_values: "Airtel",
    data_url: images.airtel,
    data_keys: "airtel-data",
    airtime_keys: "airtel",
    data_name: "airtel",
  },
];
