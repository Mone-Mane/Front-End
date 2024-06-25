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
      <Button title="Go to AccountHistory" onPress={() => navigation.navigate("거래내역조회")} />
      <Button
        title="Go to phonebook"
        onPress={() => navigation.navigate("PhoneBook")}
      />
      <Button
        title="Go to My Page"
        onPress={() => navigation.navigate("MyPage")}
      />
      <Button
        title="Go to Index Page"
        onPress={() => navigation.navigate("IndexPage")}
      />
      <Button
        title="Go to Main Page"
        onPress={() => navigation.navigate("MainPage")}
        />
        <Button
        title="Go to SYTest"
        onPress={() => navigation.navigate("SYTest")}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
