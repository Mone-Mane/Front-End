import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import color from "../assets/colors/colors";

const CustomHeader = ({ title, leftIcon = true, onLeftPress, navigation }) => {
  const handlePress = () => {
    if (!onLeftPress) {
      navigation.goBack();
    } else {
      onLeftPress();
    }
  };

  return (
    <View style={styles.header}>
      {leftIcon && (
        <TouchableOpacity onPress={handlePress} style={styles.icon}>
          <Text>{"⟨"}</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  header: {
    height: 40,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 12,
    backgroundColor: color.background,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  icon: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomHeader;
