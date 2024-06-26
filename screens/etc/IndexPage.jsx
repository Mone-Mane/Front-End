import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import React from "react";

const IndexPage = () => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
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
            <TextInput style={styles.inputBox}></TextInput>
            <Text style={styles.inputLabel}>PWD</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.inputBox}
            ></TextInput>
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Login</Text>
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
    marginBottom: 200,
  },
  logo: {
    width: 200,
    height: 150,
  },
  inputLabel: {
    fontSize: 16,
    color: "#A2BFFF",
  },
  inputBox: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#A2BFFF",
    color: "#5A73F5",
    marginBottom: 20,
    paddingBottom: 3,
    paddingLeft: 1
  },
  loginButton: {
    backgroundColor: "#5A73F5",
    padding: 10,
    borderRadius: 16,
  },
  loginButtonText: {
    color: "white",
    textAlign: "center",
  },
});
