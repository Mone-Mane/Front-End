import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

const ChallengeBtn = ({ Keyword }) => {
  const [clicked, setClicked] = useState(false);

  const handleClicked = () => {
    setClicked(!clicked);
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        clicked ? styles.clickedBtn : styles.notClickedBtn,
      ]}
      onPress={handleClicked}
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
  );
};

export default ChallengeBtn;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: 16,
    margin: 4,
  },
  textInput: {
    fontFamily: "Regular",
    marginRight: 8,
    fontSize: 14,
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
});
