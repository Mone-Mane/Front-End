import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import IndexPage from './etc/IndexPage';

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safe}>
        <IndexPage navigation={navigation}/>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safe: {
    backgroundColor: "white",
    flex: 1
  },
});
