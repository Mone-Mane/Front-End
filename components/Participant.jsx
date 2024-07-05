import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Participant = ({ name, percentage, imageSource }) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: imageSource }} style={styles.image} />
        <Text style={styles.name}>{name}</Text>
      </View>
      <View>
        <Text style={styles.percentage}>{percentage}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontFamily: "Bold",
    marginLeft: 10,
  },
  percentage: {
    fontSize: 14,
    color: "gray",
    fontFamily: "Regular",
  },
});

export default Participant;
