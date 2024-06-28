import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import CustomHeader from "../../components/CustomHeader";
import Keyword from "../../components/Keyword";

const EditKeyword = ({ navigation }) => {
  const keywords = ["삼겹살", "이베리코", "게임", "귀멸의칼날"];


  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader title="키워드 편집" navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.keywordContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>그림일기를 생성할 키워드를</Text>
            <Text style={styles.text}>수정하거나 추가해주세요!</Text>
          </View>
          <View style={styles.stickerContainer}>
            {keywords.map((keyword) => (
              <Keyword key={keyword} Keyword={keyword} />
            ))}
          </View>
        </View>
        <TouchableOpacity>
          <View style={styles.button}>
            <Text style={styles.buttonText}>그림체 선택하기</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditKeyword;

const styles = StyleSheet.create({
  safe: {
    backgroundColor: "#f9f9f9",
    flex: 1, // SafeAreaView가 화면 전체를 차지하도록 설정
  },
  container: {
    padding: 20,
    flex: 1, // 컨테이너가 화면 전체를 차지하도록 설정
  },
  keywordContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  textContainer: {
    marginBottom: 16,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  stickerContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // 키워드들을 줄바꿈하여 표시
  },
  button: {
    backgroundColor: "#5A73F5",
    padding: 20,
    alignItems: "center",
    borderRadius: 16,
    marginTop: 15
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  gif: {
    width: 200,
    height: 200,
  },
});
