import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Ionicons 라이브러리 임포트
import CustomHeader from "../../components/CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import EX from "../../assets/icons/ex.svg"

const Keyword = ({ keyword, onDelete }) => (
  <View style={styles.keyword}>
    <Text style={styles.keywordText}>{keyword}</Text>
    <TouchableOpacity onPress={() => onDelete(keyword)}>
      <EX marginLeft={5}/>
    </TouchableOpacity>
  </View>
);

const EditKeyword = ({ navigation }) => {
  const [keywords, setKeywords] = useState([
    "삼겹살",
    "이베리코",
    "게임",
    "귀멸의칼날",
  ]);
  const [newKeyword, setNewKeyword] = useState("");

  const selectcategoryscreen = () => navigation.navigate("SelectCategoryScreen");

  const addKeyword = () => {
    if (newKeyword.trim() !== "" && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  const deleteKeyword = (keyword) => {
    setKeywords(keywords.filter((k) => k !== keyword));
  };

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
              <Keyword key={keyword} keyword={keyword} onDelete={deleteKeyword} />
            ))}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="새 키워드 입력"
              value={newKeyword}
              onChangeText={setNewKeyword}
            />
            <TouchableOpacity onPress={addKeyword} style={styles.addButton}>
              <Text style={styles.addButtonText}>추가</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={selectcategoryscreen}>
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
    flex: 1,
  },
  container: {
    padding: 20,
    flex: 1,
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
    flexWrap: "wrap",
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: "#5A73F5",
    padding: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#5A73F5",
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 15,
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 21,
    fontFamily: "Bold",
    letterSpacing: 0.25,
    color: "white",
  },
  keyword: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 20,
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"center"
  },
  keywordText: {
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 10,
    color: "red",
    fontWeight: "bold",
    marginLeft:6,

  },
});
