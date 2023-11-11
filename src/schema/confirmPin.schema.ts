import { object, string, ref } from "yup";
export const confirmPinSchema = object({
  pin: string().required(),
  confirmPin: string()
    .required()
    .oneOf([ref("pin")], "Pin must match"),
});
