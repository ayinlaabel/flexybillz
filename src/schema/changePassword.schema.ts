import { object, ref, string } from "yup";

const changePasswordSchema = object({
  newPassword: string().required("New Password is required."),
  confirmNewPassword: string()
    .required()
    .oneOf([ref("newPassword")], "Confirm Password must match New Password."),
  currentPassword: string().required("Current Password is required."),
});

export default changePasswordSchema;
