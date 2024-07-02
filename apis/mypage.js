import axios from "axios";
import onRequest from "../utils/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUsersMyPage = async () => {
  return await onRequest({
    method: "GET",
    url: `/users/my-page`,
  });
};