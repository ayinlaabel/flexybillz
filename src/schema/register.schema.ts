import { object, string, ref } from "yup";

export const registrationSchema = object({
  firstName: string().required("Firstname is required"),
  lastName: string().required("Lastname is required"),
  phoneNumber: string().required("Phone number is required"),
  email: string().email().required("Email is required"),
  country: string().required("Country is required"),
  gender: string().required("Gender is required"),
  userName: string().required("Username is required"),
  password: string().required("Password is required"),
  confirmPassword: string().oneOf([ref("password")], "Passwords must match"),
});
