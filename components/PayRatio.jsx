import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Drink from "../assets/icons/paydrink.svg";
import Bus from "../assets/icons/paybus.svg";
import Coffee from "../assets/icons/paycafe.svg";
import Etc from "../assets/icons/payetc.svg";
import Food from "../assets/icons/payfood.svg";

const PayRatio = ({ name, amount, rate }) => {
  const renderIcon = () => {
    switch (name) {
      case "교통":
        return <Bus width={50} height={50}></Bus>;
      case "카페":
        return <Coffee width={50} height={50}></Coffee>;
      case "식비":
        return <Food width={50} height={50}></Food>;
      case "기타":
        return <Etc width={50} height={50}></Etc>;
      case "유흥":
        return <Drink width={50} height={50}></Drink>;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.imgContainer}>{renderIcon()}</View>
        <View style={styles.txtContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.percentage}>{parseFloat(rate).toFixed(2)}%</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.price}>{parseInt(amount).toLocaleString()}원</Text>
      </View>
    </View>
  );
};

export default PayRatio;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  leftContainer: {
    flexDirection: "row",
  },
  txtContainer: {
    fontSize: 16,
    fontWeight: "900",
    justifyContent: "center",
    paddingLeft: 10,
  },
  rightContainer: {
    justifyContent: "center",
  },
  name: {
    fontFamily: "Bold",
    fontSize: 16,
  },
  percentage: {
    fontSize: 12,
    fontFamily: "Bold",
    color: "gray",
    marginTop: 5,
  },
  price: {
    fontFamily: "Bold",
    fontSize: 16,
  },
});
