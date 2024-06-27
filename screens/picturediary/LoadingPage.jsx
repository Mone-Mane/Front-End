import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const LoadingPage = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
            <Text style={styles.text}>그림일기를 그리고 있어요!</Text>
            <Text style={styles.text}>조금만 기다려주세요...</Text>
        </View>
        <View style={styles.gifContainer}>
          <Image
            source={require("../../assets/giftest2.gif")}
            style={styles.gif}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoadingPage;

const styles = StyleSheet.create({
  safe: {
    backgroundColor: "#f9f9f9",
    flex: 1,
  },
  container:{
    padding: 30
  },
  text:{
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10
  },
  gifContainer:{
    alignItems: "center",
    paddingTop: 50
  },
  gif: {
    width:200,
    height: 200,
  }
});
