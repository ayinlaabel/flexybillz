import { object, ref, string } from "yup";

const resetPasswordSchema = object({
  newPassword: string().required("New Password is required."),
  confirmPassword: string()
    .required()
    .oneOf([ref("newPassword")], "Confirm Password must match New Password."),
});

export default resetPasswordSchema;
