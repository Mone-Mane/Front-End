import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import MasterCard from "../assets/icons/mastercard4.svg";
import CardChip from "../assets/icons/cardchip6.svg";

const CreditCard = ({ cardInfo, engName }) => {
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

  const formattedDate = ((inputDate) => {
    const dateObj = new Date(inputDate);
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = String(dateObj.getFullYear()).slice(-2);
    return `${month}/${year}`;
  })(cardInfo.cardExpiredDate);

  return (
    <TouchableWithoutFeedback onPress={flipCard}>
      <View style={styles.container}>
        <Animated.View
          style={[styles.flipCard, styles.flipCardFront, frontAnimatedStyle]}
        >
          <ImageBackground
            source={require("../assets/cardframea.png")}
            style={styles.image}
          >
            <Text style={styles.heading}>Hana X Sync</Text>
            <CardChip width={40} height={40} style={styles.chip} />
          </ImageBackground>
        </Animated.View>
        <Animated.View
          style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}
        >
          <ImageBackground
            source={require("../assets/cardframea.png")}
            style={styles.image}
          >
            <Text style={styles.number}>{cardInfo.cardNum}</Text>
            <Text style={styles.date}>{formattedDate}</Text>
            <Text style={styles.exp}>EXP</Text>
            <Text style={styles.name}>{engName}</Text>
            <MasterCard width={60} height={60} style={styles.logo} />
            <Text style={styles.cvc_number}>{cardInfo.cardCvc}</Text>
            <Text style={styles.cvc}>CVC</Text>
          </ImageBackground>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 310,
    height: 195,
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
    top: 100,
    left: 220,
    fontFamily: "ExtraBold",
    textShadowColor: "#fff",
    textShadowOffset: { width: -0.1, height: -0.1 },
    textShadowRadius: 0.2,
    color: "#DFEAFF",
    transform: [{rotate: "270deg"}]
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
    top: 155,
    left: 24,
    color: "#DFEAFF",
  },
  number: {
    position: "absolute",
    fontFamily: "Heavy",
    letterSpacing: 1,
    fontSize: 16,
    top: 41,
    left: 24,
    color: "#DFEAFF",
  },
  date: {
    position: "absolute",
    fontFamily: "Heavy",
    fontSize: 12,
    top: 130,
    left: 24,
    letterSpacing: 2,
    color: "#DFEAFF",
  },
  cvc_number: {
    position: "absolute",
    fontFamily: "Heavy",
    fontSize: 12,
    top: 130,
    left: 106,
    letterSpacing: 2,
    color: "#DFEAFF",
  },
  cvc: {
    position: "absolute",
    fontFamily: "Heavy",
    fontSize: 8,
    top: 130,
    left: 135,
    color: "#DFEAFF",
  },
  exp: {
    position: "absolute",
    fontFamily: "Heavy",
    fontSize: 8,
    top: 130,
    left: 70,
    color: "#DFEAFF",
  },
});

export default CreditCard;
