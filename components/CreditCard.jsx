import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import MasterCard from "../assets/icons/mastercard.svg";
import CardChip from "../assets/icons/cardchip.svg";
import Nfc from "../assets/icons/nfc.svg";

const CreditCard = () => {
  const [flipped, setFlipped] = useState(false);
  const flipAnim = useState(new Animated.Value(0))[0];

  const flipCard = () => {
    if (flipped) {
      Animated.spring(flipAnim, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(flipAnim, {
        toValue: 1,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
    setFlipped(!flipped);
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "360deg"],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  return (
    <TouchableWithoutFeedback onPress={flipCard}>
      <View style={styles.container}>
        <Animated.View
          style={[styles.flipCard, styles.flipCardFront, frontAnimatedStyle]}
        >
          <ImageBackground
            source={require("../assets/cardframe4.png")}
            style={styles.image}
          >
            <Text style={styles.heading}>Sync Credit</Text>
            <MasterCard width={60} height={60} style={styles.logo} />
            <CardChip width={40} height={40} style={styles.chip} />
            <Text style={styles.name}>NAM WOOHYEON</Text>
          </ImageBackground>
        </Animated.View>
        <Animated.View
          style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}
        >
          <ImageBackground
            source={require("../assets/cardframe4.png")}
            style={styles.image}
          >
            <View style={styles.strip}></View>
            <Nfc width={20} height={20} style={styles.contactless} />
            <Text style={styles.number}>9759 2484 5269 6576</Text>
            <Text style={styles.date}>12/24</Text>
            <Text style={styles.exp}>EXP</Text>
            <Text style={styles.cvc_number}>123</Text>
            <Text style={styles.cvc}>CVC</Text>
          </ImageBackground>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 190,
    perspective: 1000,
  },
  image: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    borderRadius: 16,
    overflow: "hidden",
  },
  flipCard: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backfaceVisibility: "hidden",
    borderRadius: 16,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  flipCardFront: {
    backgroundColor: "#A2BFFF",
    borderWidth: 1,
    borderColor: "#F9F9F9",
    justifyContent: "center",
  },
  flipCardBack: {
    backgroundColor: "#5A73F5",
    transform: [{ rotateY: "180deg" }],
    justifyContent: "center",
  },
  heading: {
    position: "absolute",
    fontSize: 20,
    top: 20,
    left: 24,
    fontFamily:"ExtraBold",
    textShadowColor: "#fff",
    textShadowOffset: { width: -0.2, height: -0.2 },
    textShadowRadius: 0.2,
    color: "white",
  },
  logo: {
    position: "absolute",
    top: 120,
    left: 210,
  },
  chip: {
    position: "absolute",
    top: 70,
    left: 24,
  },
  contactless: {
    position: "absolute",
    top: 88,
    left: 220,
  },
  name: {
    position: "absolute",
    fontFamily: "Heavy",
    fontSize: 14,
    top: 150,
    left: 24,
    color: "#ffffff",
  },
  strip: {
    position: "absolute",
    backgroundColor: "#ffffff",
    width: 300,
    height: 36,
    top: 30,
  },
  number: {
    position: "absolute",
    fontFamily:"Heavy",
    letterSpacing: 1,
    fontSize: 16,
    top: 91,
    left: 24,
    color: "white",
  },
  date: {
    position: "absolute",
    fontFamily: "Heavy",
    fontSize: 12,
    top: 140,
    left: 24,
    letterSpacing: 2,
    color: "white",
  },
  cvc_number: {
    position: "absolute",
    fontFamily: "Heavy",
    fontSize: 12,
    top: 140,
    left: 106,
    letterSpacing: 2,
    color: "white",
  },
  cvc: {
    position: "absolute",
    fontFamily: "Heavy",
    fontSize: 8,
    top: 140,
    left: 135,
    color: "white",
  },
  exp: {
    position: "absolute",
    fontFamily: "Heavy",
    fontSize: 8,
    top: 140,
    left: 70,
    color: "white",
  },
});

export default CreditCard;
