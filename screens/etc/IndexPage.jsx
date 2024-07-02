import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";
import React, { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../apis/login";

const IndexPage = ({ navigation }) => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const userIdRef = useRef("");
  const userPwdRef = useRef("");

  const loginMutation = useMutation({
    mutationFn: ({ userId, userPwd }) => login(userId, userPwd),
    onSuccess: (data) => {
      console.log("로그인 성공!:", data);
      navigation.navigate("MainPage");
    },
    onError: (error) => {
      Alert.alert("로그인 실패", "비밀번호가 틀렸습니다.")
    },
  });

  const handleLogin = () => {
    const userId = userIdRef.current;
    const userPwd = userPwdRef.current;
    loginMutation.mutate({ userId, userPwd });
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/mainLogo.png")} // 대체 이미지 URL을 사용합니다.
          />
          <View>
            <Text style={styles.inputLabel}>ID</Text>
            <TextInput
              style={styles.inputBox}
              onChangeText={(text) => (userIdRef.current = text)}
            />
            <Text style={styles.inputLabel}>PWD</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.inputBox}
              onChangeText={(text) => (userPwdRef.current = text)}
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default IndexPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  logoContainer: {
    marginBottom: 100,
  },
  logo: {
    width: 200,
    height: 150,
  },
  inputLabel: {
    fontSize: 16,
    color: "#A2BFFF",
    fontFamily: "Bold",
  },
  inputBox: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#A2BFFF",
    color: "#5A73F5",
    marginBottom: 20,
    paddingBottom: 3,
    paddingLeft: 1,
  },
  loginButton: {
    backgroundColor: "#5A73F5",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  loginButtonText: {
    fontSize: 18,
    lineHeight: 21,
    fontFamily: "Bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
