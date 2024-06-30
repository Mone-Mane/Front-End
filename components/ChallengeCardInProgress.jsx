import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import ProgressBar from "./ProgressBar";
import Drink from "../assets/icons/paydrink.svg";
import Bus from "../assets/icons/paybus.svg";
import Coffee from "../assets/icons/paycafe.svg";
import Food from "../assets/icons/payfood.svg";
const ChallengeCardInProgress = ({ title, dateRange, progress }) => {
  const screenWidth = Dimensions.get("window").width;

  const renderIcon = () => {
    switch (title) {
      case "카페 덜 가기":
        return <Coffee width={50} height={50} />;
      case "유흥 안하기":
        return <Drink width={50} height={50} />;
      case "택시 덜 타기":
        return <Bus width={50} height={50} />;
      case "쇼핑 줄이기":
        return <Food width={50} height={50} />;
      // return <Shopping width={50} height={50} />;
      case "술 덜 마시기":
        return <Drink width={50} height={50} />;
      case "야식 덜 먹기":
        return <Food width={50} height={50} />;
      case "배달 덜 먹기":
        return <Food width={50} height={50} />;
      // return <Delivery width={50} height={50} />;
      case "구독 좀 끊기":
        return <Food width={50} height={50} />;
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
      <Text style={styles.dateRange}>{dateRange}</Text>
      <View
        style={[
          styles.progressBarWrapper,
          { width: (screenWidth - 66) / 2 - 30 },
        ]}
      >
        <ProgressBar progress={90} sizeFont={16} />
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
    fontFamily: "Bold"
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
