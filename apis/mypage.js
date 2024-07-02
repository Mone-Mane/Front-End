import axios from "axios";
import onRequest from "../utils/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUsersMyPage = async () => {
  return await onRequest({
    method: "GET",
    url: `/users/my-page`,
  });
};

export const uploadUserProfileImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('userProfile', imageFile);

  return await axios({
    method: 'PUT',
    url: '/users/my-profile',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};