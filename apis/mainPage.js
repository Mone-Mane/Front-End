import axios from "axios";
import onRequest from "../utils/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUsersMyInfo = async () => {
  return await onRequest({
    method: "GET",
    url: `/users/my-info`,
  });
};

export const getUsersStatistics = async () => {
  return await onRequest({
    method: "GET",
    url: `/users/statistics`,
  });
};

export const getUsersAccount = async () => {
  return await onRequest({
    method: "GET",
    url: `/users/accounts`,
  });
};
