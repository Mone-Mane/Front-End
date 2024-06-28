import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Participant = ({ name, percentage, imageSource }) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={imageSource} style={styles.image} />
        <Text style={styles.name}>{name}</Text>
      </View>
      <Text style={styles.percentage}>{percentage}%</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    fontFamily: "Heavy",
    marginLeft: 10,
    flex: 1,
  },
  percentage: {
    fontSize: 12,
    color: "gray",
    fontFamily: "Bold"
  },
});

export default Participant;
