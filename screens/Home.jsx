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
        onPress={() => navigation.navigate("DiaryHome")}
      />
      <Button
        title="Go to AccountHistory"
        onPress={() => navigation.navigate("거래내역조회")}
      />
      <Button
        title="Go to ContatctList"
        onPress={() => navigation.navigate("ContatctList")}
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
      <Button
        title="Go to SYTest2"
        onPress={() => navigation.navigate("SYTest2")}
      />
      <Button
        title="원희테스트입니다. 함부로 보면혼나요"
        onPress={() => navigation.navigate("WHTest")}
      />
      <Button
        title="완료된 챌린지 페이지"
        onPress={() => navigation.navigate("DoneChallengeScreen")}
      />
      <Button
        title="그림 카테고리 선택"
        onPress={() => navigation.navigate("SelectCategoryScreen")}
      />
      <Button
        title="Go to EditKeyword"
        onPress={() => navigation.navigate("EditKeyword")}
      />
      <Button
        title="Go to DiaryCompleteScreen"
        onPress={() => navigation.navigate("DiaryCompleteScreen")}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
