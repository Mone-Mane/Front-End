import axios from "axios";
import onRequest from "../utils/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (userId, userPwd) => {
  try {
    const response = await axios.post(
      `http://172.16.21.86/api/users/login`,
      {
        userId,
        userPwd,
      }
    );
    const { accessToken, refreshToken } = response.data.data;
    await AsyncStorage.setItem("ACCESS_TOKEN", accessToken);
    await AsyncStorage.setItem("REFRESH_TOKEN", refreshToken);

    return response.data;
  } catch (error) {
    throw new Error("로그인에 실패했습니다.");
  }
};
export const postUserToken = async (userToken) =>
  await onRequest({
    method: "POST",
    url: `/users/login/reissue`,
    data: {
      accessToken: userInfo.accessToken,
      refreshToekn: userInfo.refreshToekn,
    },
  });