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
} from "./interface";
import axios, { AxiosError } from "axios";
import { BASEURL, BA_USERNAME, BA_PASSWORD } from "@env";
import { Base64 } from "js-base64";

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
