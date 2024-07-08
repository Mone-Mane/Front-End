import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";

const UserComponents = ({ props }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {props.accepted && (
          <View style={styles.overlay}>
            <Text style={styles.check}>✓</Text>
          </View>
        )}
        {props.accepted === false && (
          <View style={styles.overlay}>
            <Text style={styles.scissor}>✕</Text>
          </View>
        )}
        <ImageBackground
          source={{ uri: props.userProfile }}
          style={styles.image}
          imageStyle={{ borderRadius: 50 }}
        />
      </View>
      <Text style={styles.text}>{props.userName}</Text>
    </View>
  );
};

export default UserComponents;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  check: {
    fontSize: 26,
    color: "#00FF00",
  },
  scissor: {
    fontSize: 26,
    color: "#FF0000",
  },
  image: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 5,
    fontSize: 14,
    color: "#000",
  },
});
