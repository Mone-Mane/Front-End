import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AccountHistory from "../components/AccountHistory";
import ProgressBar from "../components/ProgressBar";
import CreditCard from "../components/CreditCard";
import { useState } from 'react';
import DiaryCheck from "./picturediary/DiaryCheck";
import PayRatio from "../components/PayRatio";
import Keyword from "../components/Keyword";

const Test = () => {
  const [progress, setProgress] = useState(70);
  return (
    <View>
      <CreditCard></CreditCard>
      <PayRatio></PayRatio>
      <Keyword></Keyword>
      <DiaryCheck/>
    </View> 
  );
};

export default Test;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
