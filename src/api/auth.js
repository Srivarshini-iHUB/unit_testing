import axiosInstance from "./axiosInstance";
import { URL_CONSTANTS } from "./urls";

export const login = async (payload) => {
  const response = await axiosInstance.post(URL_CONSTANTS.login, payload);
  return response.data;
};

export const devLogin = async (payload) => {
  const response = await axiosInstance.post(URL_CONSTANTS.devLogin, payload);
  return response.data;
};

export const resetPassword = async (payload) => {
  const response = await axiosInstance.post(URL_CONSTANTS.resetPassword, payload);
  return response.data;
};

export const forgotPassword = async (payload) => {
  const response = await axiosInstance.post(URL_CONSTANTS.forgotPassword, payload);
  return response.data;
};


export const bulkUserUpload=async(payload)=>{
  const response=await axiosInstance.post(URL_CONSTANTS.bulkUserUpload,payload)
   return response.data;
}

export const setNewPassword = async ({ token,  ...payload }) => {
  const response = await axiosInstance.post(`${URL_CONSTANTS.setNewPassword}/${token}`, payload);
  return response.data;
}