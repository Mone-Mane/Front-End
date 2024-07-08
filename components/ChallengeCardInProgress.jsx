import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import ProgressBar from "./ProgressBar";
import Drink from "../assets/icons/paydrink.svg";
import Taxi from "../assets/icons/taxi.svg";
import Coffee from "../assets/icons/cafe.svg";
import Subscribe from "../assets/icons/sub.svg"
import Game from "../assets/icons/game.svg"
import MidnightFood from "../assets/icons/midnightfood.svg"
import Delivery from "../assets/icons/delivery.svg"
import Shopping from "../assets/icons/payshopping.svg"




const ChallengeCardInProgress = ({
  title,
  createdDate,
  challengePeriod,
  targetAmount,
  spentAmount,
  navigation
}) => {
  const screenWidth = Dimensions.get("window").width;

  const startDate = createdDate;
  const dateRange = challengePeriod;
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

    return `${formattedStartDate} ~ ${formattedEndDate}`;
  })();


  const renderIcon = () => {
    switch (title) {
      case "카페 덜 가기":
        return <Coffee width={50} height={50} />;
      case "유흥 안하기":
        return <Game width={50} height={50} />;
      case "택시 덜 타기":
        return <Taxi width={50} height={50} />;
      case "쇼핑 줄이기":
        return <Shopping width={50} height={50} />;
      // return <Shopping width={50} height={50} />;
      case "술 덜 마시기":
        return <Drink width={50} height={50} />;
      case "야식 덜 먹기":
        return <MidnightFood width={50} height={50} />;
      case "배달 덜 먹기":
        return <Delivery width={50} height={50} />;
      // return <Delivery width={50} height={50} />;
      case "구독 좀 끊기":
        return <Subscribe width={50} height={50} />;
      // return <Subscription width={50} height={50} />;
      default:
        return null;
    }
  };


  return (
    <View style={[styles.card, { width: (screenWidth - 66) / 2 }]}>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {title}
        </Text>
        {renderIcon()}
        {/* <FailIcon width={36} height={43} style={styles.icon} /> */}
      </View>
      <Text style={styles.dateRange}>{formattedDate}</Text>
      <View
        style={[
          styles.progressBarWrapper,
          { width: (screenWidth - 66) / 2 - 30 },
        ]}
      >
        <ProgressBar progress={parseInt(spentAmount / targetAmount * 100)} sizeFont={16} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    // padding: 15,
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#ffffff",
  },
  successCard: {
    backgroundColor: "#ffffff",
  },
  progressBarWrapper: {
    paddingBottom: 10,
  },
  failureCard: {
    backgroundColor: "#ffffff",
  },
  content: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 28,
    marginRight: 7,
  },
  title: {
    fontSize: 16,
    paddingLeft: 16,
    maxWidth: 100,
    fontFamily: "Bold",
  },
  icon: {
    marginRight: 7,
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "Bold",
  },
  medal: {
    width: 20,
    height: 20,
  },
  dateRange: {
    fontSize: 10,
    color: "#888",
    fontFamily: "Regular",
    marginBottom: 12,
    alignSelf: "flex-start",
    paddingLeft: 16,
  },
  status: {
    height: 49,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
    fontWeight: "Bold",
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: "100%",
    borderEndEndRadius: 16,
    borderEndStartRadius: 16,
  },
  successStatus: {
    backgroundColor: "#7D9BFC",
    color: "white",
  },
  failureStatus: {
    backgroundColor: "#FFCF73",
    color: "white",
  },
});

export default ChallengeCardInProgress;
