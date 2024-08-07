import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PersonIcon from "../assets/icons/person.svg";
const HotRankingCard = ({ medal, title, participants }) => {
  let medalEmoji;
  switch (medal) {
    case 0:
      medalEmoji = "🥇";
      break;
    case 1:
      medalEmoji = "🥈";
      break;
    case 2:
      medalEmoji = "🥉";
      break;
    default:
      medalEmoji = ""; // 예외 처리
      break;
  }

  return (
    <View style={styles.container}>
      <View style={styles.medalContainer}>
        <Text style={styles.medal}>{medalEmoji}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.participantsContainer}>
        <Text style={styles.participants}>누적 참가자</Text>
        <View style={styles.participantNumWrapper}>
          <PersonIcon width={8} height={8} style={styles.personIcon} />
          <Text style={styles.participantNum}>{participants}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
    // padding: 10,
    height: 70,
    backgroundColor: "white",
    padding: 20,
  },
  medalContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  medal: {
    fontSize: 36,
    lineHeight: 36,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: "Bold",
  },
  participantsContainer: {
    alignItems: "flex-end",
  },
  participants: {
    color: "#aaaaaa",
    fontSize: 10,
    paddingBottom: 8,
    fontFamily: "Regular",
  },
  participantNumWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  participantNum: {
    color: "#aaaaaa",
    fontSize: 10,
    fontFamily: "Regular",
  },
  personIcon: {
    alignSelf: "center",
    marginRight: 3,
  },
});

export default HotRankingCard;
