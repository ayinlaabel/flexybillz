import { useQuery, useMutation } from "@tanstack/react-query";
import {
  ConfirmEmailOtpProps,
  EmailOtpProps,
  ResponseProps,
  UserProps,
  SetSecurePinProps,
  UserLoginProps,
  UserLoginWithPinProps,
  BuyAirtimeProps,
  BuyDataProps,
  changePasswordProps,
  changeWalletPinProps,
  ISetFingerPrintProps,
  IResetPasswordProps,
} from "./interface";
import axios, { AxiosError } from "axios";
import { BASEURL, BA_USERNAME, BA_PASSWORD } from "@env";
import { Base64 } from "js-base64";
import { Platform } from "react-native";
import { logger } from "@utils/index";

const baseUrl = BASEURL;
const username = BA_USERNAME;
const password = BA_PASSWORD;
const token = `${username}:${password}`;

const encodedToken = Base64.encode(token);

const header = {
  headers: { Authorization: `Basic ${encodedToken}` },
};

export const userRegistration = async (body: UserProps) => {
  const url = `${baseUrl}/user/registeruser`;
  return await axios.post(url, body, header);
};

export const sendOtpEmail = async (body: EmailOtpProps) => {
  const url = `${baseUrl}/user/sendemailotp`;
  return await axios.post(url, body);
};

export const confirmOtpEmail = async (body: ConfirmEmailOtpProps) => {
  const url = `${baseUrl}/user/confirmemail`;
  return await axios.post(url, body);
};

export const setSecurePin = async (body: SetSecurePinProps) => {
  const url = `${baseUrl}/user/setwalletpin`;
  return await axios.post(url, body);
};

export const getUserByUserName = async (body: string, token: string) => {
  const url = `${baseUrl}/user/getuserinfo?username=${body}`;
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios.get(url, header);
};

export const userLogin = async (body: UserLoginProps) => {
  const url = `${baseUrl}/user/login`;
  return await axios.post(url, body, header);
};

export const userLoginWithPin = async (body: UserLoginWithPinProps) => {
  const url = `${baseUrl}/user/loginwithpin`;
  return await axios.post(url, body, header);
};

export const getNetwork = async (token: string) => {
  const url = `${baseUrl}/bills/vtpass-getserviceId`;
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios.get(url, header);
};

export const buyAirtime = async (token: string, body: BuyAirtimeProps) => {
  const url = `${baseUrl}/bills/vtpass-subcription-airtime`;
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios.post(url, body, header);
};

export const buyData = async (token: string, body: BuyDataProps) => {
  const url = `${baseUrl}/bills/vtpass-subcription-data`;
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios.post(url, body, header);
};

export const verifyPin = async (body: UserLoginWithPinProps, token: string) => {
  const url = `${baseUrl}/user/confirmwalletpin`;
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.post(url, body, header);
};

export const getAvailableData = async (body: string, token: string) => {
  const url = `${baseUrl}/bills/vtpass-getvariationcode-data-db?serviceID=${body}`;
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.get(url, header);
};

export const updateUserProfile = async (
  body: any,
  photoFile: any,
  token: string
) => {
  const url = `${baseUrl}/user/update-userinfo`;
  const imageUrl = `${baseUrl}/user/updateprofilephoto`;
  const header = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  if (photoFile === undefined) {
    console.log(url);
    console.log(token);
    return await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  let formData = new FormData();
  let name = photoFile.uri.split("/").pop();
  let photo = {
    uri:
      Platform.OS === "android"
        ? photoFile.uri
        : photoFile.uri.replace("file://", ""),
    name: name,
    type: "image/jpg" || "image/png" || "image/JPG" || "image/PNG",
  };

  formData.append("userName", body.userName);
  formData.append("photoFile", photo);

  console.log(formData);
  const { data: photoData } = await axios.post(imageUrl, formData, header);

  console.log(photoData);
  if (!photoData.success) {
    return { data: photoData };
  } else {
    return axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
};

export const updateUserProfilePhoto = async (
  body: any,
  photoFile: any,
  token: string
) => {
  const url = `${baseUrl}/user/update-userinfo`;
  const imageUrl = `${baseUrl}/user/updateprofilephoto`;
  const header = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  const formData = new FormData();

  formData.append("userName", body.userName);
  formData.append("photoFile", photoFile);

  const { data: photo } = await axios.post(imageUrl, formData, header);

  if (!photo.success) {
    return { data: photo };
  } else {
    return axios.post(url, body, header);
  }
};

export const postChangePassword = async (
  body: changePasswordProps,
  token: string
) => {
  const url = `${baseUrl}/user/changePassword`;
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.post(url, body, header);
};
export const postChangeWalletPin = async (
  body: changeWalletPinProps,
  token: string
) => {
  const url = `${baseUrl}/user/change-walletpin`;
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.post(url, body, header);
};

export const sendTokenEmail = async (body: any) => {
  const url = `${baseUrl}/user/requesttokenresetpassword`;

  return axios.post(url, body);
};

export const postResetPassword = async (body: IResetPasswordProps) => {
  const url = `${baseUrl}/user/resetpassword`;
  return axios.post(url, body);
};

export const postSetFingerPrint = async (body: ISetFingerPrintProps) => {
  const url = `${baseUrl}/user/confirmfingerprint`;
  return axios.post(url, body);
};
