import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import CustomHeader from "../../components/CustomHeader";
import Flame from "../../assets/icons/flame.svg";

const ChallengeMainPage = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader title={"챌린지"}></CustomHeader>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity>
              <View style={styles.button}>
                <Flame style={styles.buttonLogo}></Flame>
                <Text style={styles.buttonText}>챌린지 생성하기</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.inProgressContainer}>
            <View>
              <Text style={styles.inProgressText}>진행중인 챌린지</Text>
            </View>
            <View>
            </View>
          </View>
          <View style={styles.hotContainer}></View>
          <View style={styles.doneContainer}></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChallengeMainPage;

const styles = StyleSheet.create({
  safe: {
    backgroundColor: "#f9f9f9",
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    paddingVertical: 20,
  },
  button: {
    backgroundColor: "#5A73F5",
    padding: 20,
    alignItems: "center",
    borderRadius: 16,
    justifyContent: "center",
    position: "relative",
  },
  buttonLogo: {
    position: "absolute",
    left: 40,
  },
  buttonText: {
    fontFamily: "Bold",
    fontSize: 20,
    color: "white",
  },
  inProgressContainer: {
    paddingVertical: 20,
  },
  inProgressText:{
    fontFamily: "Heavy",
    fontSize: 20
  }
});
