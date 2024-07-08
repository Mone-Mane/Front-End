import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SuccessIcon from "../assets/icons/success.svg";
import FailIcon from "../assets/icons/fail.svg";



const ChallengeCard = ({ title, createdDate, challengePeriod, targetAmount, spentAmount, navigation }) => {
  
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

  const success = targetAmount >= spentAmount;
  
  return (
    <View
      style={[styles.card, success ? styles.successCard : styles.failureCard]}
    >
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {title}
        </Text>
        {success ? (
          <SuccessIcon width={36} height={43} style={styles.icon} />
        ) : (
          <FailIcon width={36} height={43} style={styles.icon} />
        )}
      </View>
      <Text style={styles.dateRange}>{formattedDate}</Text>
      <View
        style={[
          styles.status,
          success ? styles.successStatus : styles.failureStatus,
        ]}
      >
        <Text style={styles.text}>{success? "성공":"실패"}</Text>
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
    overflow: 'hidden'
  },
  successCard: {
    backgroundColor: "#ffffff",
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
    marginTop: 20,
    marginRight: 7,
  },
  title: {
    fontSize: 16,
    fontFamily: "Bold",
    paddingLeft: 16,
    maxWidth: 100,
  },
  icon: {
    marginRight: 7,
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "Bold",
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
    borderEndEndRadius: 16,
    borderEndStartRadius: 16,
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

export default ChallengeCard;
