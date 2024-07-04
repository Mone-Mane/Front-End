import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safe}>
      <View>
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
        title="Go to 챌린지생성화면"
        onPress={() => navigation.navigate("ChallengeCreatePage")}
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
      <Button
        title="Go to ChallengeMainPage"
        onPress={() => navigation.navigate("ChallengeMainPage")}
      />
      <Button
        title="Go to ChallengeDetailPage"
        onPress={() => navigation.navigate("ChallengeDetailPage")}
      />
    </View>
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
