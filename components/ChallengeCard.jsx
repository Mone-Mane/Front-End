import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import SuccessIcon from "../assets/icons/success.svg";
import FailIcon from "../assets/icons/fail.svg";

const ChallengeCard = ({ title, dateRange, status, success }) => {
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
      <Text style={styles.dateRange}>{dateRange}</Text>
      <View
        style={[
          styles.status,
          success ? styles.successStatus : styles.failureStatus,
        ]}
      >
        <Text style={styles.text}>{status}</Text>
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
    marginTop: 28,
    marginRight: 7,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 16,
    maxWidth: 100,
  },
  icon: {
    marginRight: 7,
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
    fontSize: 16,
    fontWeight: "bold",
  },
  medal: {
    width: 20,
    height: 20,
  },
  dateRange: {
    fontSize: 12,
    color: "#888",
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
    fontWeight: "bold",
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
