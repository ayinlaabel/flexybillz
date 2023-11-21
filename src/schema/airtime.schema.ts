import { number, object, string } from "yup";

export const aritimeSchema = object({
  amount: string().required(),
  serviceID: string().required("Choose the provider"),
  phone: string().required("Phone number is required"),
});
