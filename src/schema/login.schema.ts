import { object, string } from "yup";

export const userLoginSchema = object({
  username: string().required("Username is required."),
  password: string().required("Password is required."),
});
