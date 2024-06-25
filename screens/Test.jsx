import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AccountHistory from "../components/AccountHistory";
import ProgressBar from "../components/ProgressBar";
import { useState } from 'react';


const Test = () => {
  const [progress, setProgress] = useState(70);
  return (
    <View>
      <AccountHistory/>
      <View style={styles.appContainer}>
        <ProgressBar progress={progress} />
      </View>
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
