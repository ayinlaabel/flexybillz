import { object, ref, string } from "yup";

const changeWalletSchema = object({
  newWalletPin: string().required("New Pin is required."),
  confirmNewWalletPin: string()
    .required()
    .oneOf([ref("newWalletPin")], "Confirm New Pin must match New pin."),
  oldWalletPin: string().required("Current Wallet Pin is required."),
});

export default changeWalletSchema;
