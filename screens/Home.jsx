import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

const Home = ({ navigation }) => {
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("Profile")}
      />
      <Button title="Go to test" onPress={() => navigation.navigate("Test")} />
      <Button
        title="Go to Diary"
        onPress={() => navigation.navigate("그림일기")}
      />
      <Button title="Go to test" onPress={() => navigation.navigate("Testr")} />
      <Button
        title="Go to phonebook"
        onPress={() => navigation.navigate("phonebook")}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
