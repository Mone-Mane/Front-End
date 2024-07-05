import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useState } from "react";

const ChallengeBtn = ({ Keyword, users, index, clickedIndex, setClickedIndex}) => {
  // const [clicked, setClicked] = useState(false);
  const clicked = clickedIndex === index;

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={[
          styles.button,
          clicked ? styles.clickedBtn : styles.notClickedBtn,
        ]}
        onPress={() => setClickedIndex(clicked ? null : index)}
      >
        <Text
          style={[
            styles.textInput,
            clicked ? styles.clickedText : styles.notClickedText,
          ]}
        >
          {Keyword}
        </Text>
      </TouchableOpacity>
      <View style={styles.usersContainer}>
        {users && users.map((user, index) => (
          <Image
            key={index}
            source={user.img}
            style={[styles.userImage, { left: index * 12 }]}
          />
        ))}
      </View>
    </View>
  );
};

export default ChallengeBtn;

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    margin: 4,
    minWidth: 70, // 최소 너비 설정
  },
  textInput: {
    fontFamily: "Regular",
    fontSize: 12,
    alignItems: "center",
    justifyContent:"center"
  },
  notClickedBtn: {
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: "gray",
  },
  notClickedText: {
    color: "black",
  },
  clickedBtn: {
    backgroundColor: "#5A73F5",
    borderWidth: 0.5,
    borderColor: "gray",
  },
  clickedText: {
    color: "white",
  },
  usersContainer: {
    position: "absolute",
    top: -4,
    flexDirection: "row",
  },
  userImage: {
    width: 18,
    height: 18,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "white",
    position: "absolute",
  },
});
