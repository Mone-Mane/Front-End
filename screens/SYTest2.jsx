import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ChallengeBtn from "../components/ChallengeBtn";

const SYTest2 = () => {
  return (
      <SafeAreaView style={styles.safe}>
        <ChallengeBtn Keyword={"커피 줄이기"}></ChallengeBtn>
      </SafeAreaView>
  );
};

export default SYTest2;

const styles = StyleSheet.create({
  safe: {
    backgroundColor: "#f9f9f9",
    flex: 1
  }
});
