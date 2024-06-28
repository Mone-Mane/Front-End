import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomHeader from "../../components/CustomHeader";
import ProgressBar from "../../components/ProgressBar.jsx";
import Participant from "../../components/Participant.jsx";

const ChallengeDetailPage = () => {

  const status = "success";

  const btnColor = () => {
    switch (status) {
      case "ing":
        return "#A2BFFF";
      case "success":
        return "#5A73F5";
      case "fail":
        return "#FF4935";
      default:
        return null;
    }
  };

  const btnText = () => {
    switch (status) {
      case "ing":
        return "진행중";
      case "success":
        return "성공";
      case "fail":
        return "실패";
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader title={"챌린지 상세보기"}></CustomHeader>
      <View style={styles.container}>
        <View style={styles.detailContainer}>
          <View style={styles.nameContainer}>
            <View style={styles.nameTxtContainer}>
              <Text style={styles.topFont}>커피줄이기</Text>
            </View>
            <View style={[styles.nameBtnContainer, { backgroundColor: btnColor() }]}>
              <Text style={styles.whiteFont}>{btnText()}</Text>
            </View>
          </View>
          <View style={styles.priceContainer}>
            <View style={styles.leftContainer}>
              <Text style={[styles.titleFont, styles.marginSmall]}>
                사용 금액
              </Text>
              <Text style={styles.contentFont}>10,000</Text>
            </View>
            <View style={styles.rightContainer}>
              <Text style={[styles.titleFont, styles.marginSmall]}>
                목표 금액
              </Text>
              <Text style={styles.contentFont}>50,000</Text>
            </View>
          </View>
          <View style={styles.barContainer}>
            <ProgressBar progress={30} sizeFont={20}></ProgressBar>
          </View>
          <View style={styles.normContainer}>
            <Text style={[styles.titleFont, styles.marginSmall]}>기간</Text>
            <Text style={styles.contentFont}>06.12 - 06.18</Text>
          </View>
          <View style={styles.normContainer}>
            <Text style={[styles.titleFont, styles.marginSmall]}>참가비</Text>
            <Text style={styles.contentFont}>10,000</Text>
          </View>
          <View style={styles.friendContainer}>
            <Text style={[styles.titleFont, styles.marginSmall]}>
              참여 인원 수: 4
            </Text>
            <Participant
              name="Robert Fox"
              percentage={20}
              imageSource={require('../../assets/ferren.png')}
            />
            <Participant
              name="Robert Fox"
              percentage={20}
              imageSource={require('../../assets/kawaii.png')}
            />
            <Participant
              name="Robert Fox"
              percentage={20}
              imageSource={require('../../assets/pastel.png')}
            />
            <Participant
              name="Robert Fox"
              percentage={20}
              imageSource={require('../../assets/caricature.png')}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChallengeDetailPage;

const styles = StyleSheet.create({
  topFont: {
    fontFamily: "Bold",
    fontSize: 20,
  },
  titleFont: {
    fontSize: 14,
    fontFamily: "Regular",
    color: "#656565",
  },
  whiteFont: {
    fontSize: 16,
    fontFamily: "Bold",
    color: "#ffffff",
  },
  contentFont: {
    fontSize: 16,
    fontFamily: "Bold",
    color: "00000",
  },
  safe: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  detailContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 60,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameBtnContainer: {
    borderRadius: 12,
    justifyContent: "center",
    padding: 10,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  barContainer: {
    marginTop: 30,
  },
  normContainer: {
    marginTop: 20,
  },
  marginSmall: {
    marginBottom: 10,
  },
  friendContainer: {
    marginTop: 20,
  },
});
