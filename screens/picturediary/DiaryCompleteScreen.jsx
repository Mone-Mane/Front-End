import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import CheckIcon from "../../assets/icons/check.svg";
import RestartIcon from "../../assets/icons/restart.svg";
import { SafeAreaView } from "react-native-safe-area-context";

const DiaryCompleteScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          {isLoading ? (
            <>
              <Text style={styles.text}>그림일기를 그리고 있어요!</Text>
              <Text style={styles.text}>조금만 기다려주세요...</Text>
            </>
          ) : (
            <>
              <Text style={styles.text}>선택한 소비 내역으로 </Text>
              <Text style={styles.text}>그림일기를 그렸어요</Text>
            </>
          )}
        </View>
        <View style={styles.contentContainer}>
          {isLoading ? (
            <Image
              source={require("../../assets/giftest2.gif")}
              style={styles.gif}
            />
          ) : (
            <Image
              source={require("../../assets/oil_painting.png")}
              style={styles.complete}
            />
          )}
        </View>
        {!isLoading && (
          <View style={styles.buttonWrapper}>
            <Pressable style={styles.button}>
              <View style={styles.iconContainer}>
                <RestartIcon width={15} height={18} style={styles.icon} />
              </View>
              <Text style={styles.buttonText}>다시 그리기</Text>
            </Pressable>
            <Pressable style={styles.button}>
              <View style={styles.iconContainer}>
                <CheckIcon width={16} height={12} style={styles.icon} />
              </View>
              <Text style={styles.buttonText}>확정하기</Text>
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DiaryCompleteScreen;

const styles = StyleSheet.create({
  safe: {
    backgroundColor: "#f9f9f9",
    flex: 1,
  },
  container: {
    padding: 30,
    flex: 1,
    // justifyContent: "center",
    marginTop: 30,
  },
  textContainer: {
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontFamily: "Bold",
    marginBottom: 10,
    textAlign: "center",
  },
  contentContainer: {
    alignItems: "center",
    paddingTop: 30,
  },
  gif: {
    width: 200,
    height: 200,
  },
  complete: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 16,
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#5A73F5",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
    justifyContent: "center", // 중앙 정렬
    position: "relative", // 아이콘을 절대 위치로 배치하기 위해 사용
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 21,
    fontFamily: "Bold", 
    letterSpacing: 0.25,
    color: "white",
  },
  iconContainer: {
    position: "absolute",
    right: 7,
    bottom: 13
  },
  icon: {
    marginRight: 5, // 아이콘과 텍스트 사이의 간격 조정
  },
});
