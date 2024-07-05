import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CustomHeader from "../../components/CustomHeader";
import ProgressBar from "../../components/ProgressBar.jsx";
import Participant from "../../components/Participant.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { getChallengesDetail } from "../../apis/challenge.js";
import { useQuery } from "@tanstack/react-query";

const ChallengeDetailPage = () => {
  const route = useRoute();
  const { challengeCode } = route.params;

  const {
    data: challengeInfo,
    error,
    isLoading: isLoading,
  } = useQuery({
    queryKey: ["getChallengesDetail"],
    queryFn: () => getChallengesDetail(challengeCode),
  });

  const [formattedDate, setFormattedDate] = useState("");
  const [participants, setParticipants] = useState([]);
  const [status, setStatus] = useState();

  useEffect(() => {
    if (challengeInfo) {
      const { challenge, me } = challengeInfo.data;

      // Calculate the challenge period
      const startDate = challenge.createdDate;
      const dateRange = challenge.challengePeriod;
      const formattedDate = (() => {
        let startDateObj = new Date(startDate);

        let startMonth = String(startDateObj.getMonth() + 1).padStart(2, "0");
        let startDay = String(startDateObj.getDate()).padStart(2, "0");
        let formattedStartDate = `${startMonth}.${startDay}`;

        let endDateObj = new Date(startDateObj);
        endDateObj.setDate(endDateObj.getDate() + dateRange - 1);

        let endMonth = String(endDateObj.getMonth() + 1).padStart(2, "0");
        let endDay = String(endDateObj.getDate()).padStart(2, "0");
        let formattedEndDate = `${endMonth}.${endDay}`;

        return `${formattedStartDate} - ${formattedEndDate}`;
      })();

      setFormattedDate(formattedDate);

      // Extract user information
      const participants = challenge.challengeUsers.map((user) => ({
        imageUrl: user.user.userProfile,
        name: user.user.userName,
        spentMoney: user.challengeUserSpentMoney,
      }));

      setParticipants(participants);

      if (challenge.challengeTargetAmount < me.challengeUserSpentMoney) {
        setStatus("fail");
      } else if (challenge.state === "Active") {
        setStatus("ing");
      } else {
        setStatus("success");
      }
    }
  }, [challengeInfo]);

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

  if (isLoading) {
    return <></>;
  }

  console.log(formattedDate);
  console.log(participants);

  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader title={"챌린지 상세보기"}></CustomHeader>
      <View style={styles.container}>
        <View style={styles.detailContainer}>
          <View style={styles.nameContainer}>
            <View style={styles.nameTxtContainer}>
              <Text style={styles.topFont}>
                {challengeInfo.data.challenge.challengeCategory}
              </Text>
            </View>
            <View
              style={[styles.nameBtnContainer, { backgroundColor: btnColor() }]}
            >
              <Text style={styles.whiteFont}>{btnText()}</Text>
            </View>
          </View>
          <View style={styles.priceContainer}>
            <View style={styles.leftContainer}>
              <Text style={[styles.titleFont, styles.marginSmall]}>
                사용 금액
              </Text>
              <Text style={styles.contentFont}>
                {challengeInfo.data.me.challengeUserSpentMoney.toLocaleString()}
              </Text>
            </View>
            <View style={styles.rightContainer}>
              <Text style={[styles.titleFont, styles.marginSmall]}>
                목표 금액
              </Text>
              <Text style={styles.contentFont}>
                {challengeInfo.data.challenge.challengeTargetAmount.toLocaleString()}
              </Text>
            </View>
          </View>
          <View style={styles.barContainer}>
            <ProgressBar
              progress={parseInt(
                (challengeInfo.data.me.challengeUserSpentMoney /
                  challengeInfo.data.challenge.challengeTargetAmount) *
                  100
              )}
              sizeFont={20}
            ></ProgressBar>
          </View>
          <View style={styles.normContainer}>
            <Text style={[styles.titleFont, styles.marginSmall]}>기간</Text>
            <Text style={styles.contentFont}>{formattedDate}</Text>
          </View>
          <View style={styles.normContainer}>
            <Text style={[styles.titleFont, styles.marginSmall]}>참가비</Text>
            <Text style={styles.contentFont}>
              {challengeInfo.data.challenge.challengeCost.toLocaleString()}원
            </Text>
          </View>
          <View style={styles.friendContainer}>
            <Text style={[styles.titleFont, styles.marginSmall]}>
              참여 인원 수: {participants.length}
            </Text>
            {participants.map((participant, i) => (
              <Participant
                key={i}
                name={participant.name}
                percentage={parseInt(
                  (participant.spentMoney /
                    challengeInfo.data.challenge.challengeTargetAmount) *
                    100
                )}
                imageSource={participant.imageUrl}
              />
            ))}
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
