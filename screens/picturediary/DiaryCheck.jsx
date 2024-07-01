import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Pressable,
  Alert,
  TouchableOpacity,
} from "react-native";
import React from "react";
import OilPic from "../../assets/oil_painting.png";
import DetailIcon from "../../assets/icons/detail.svg";
import color from "../../assets/colors/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../components/CustomHeader";


const { width } = Dimensions.get("window"); // 화면의 전체 너비를 가져옵니다.

const DiaryCheck = ({ navigation }) => {
  const images = [
    {
      id: "id",
      uri: require("../../assets/oil_painting.png"),
      tags: ["tag1", "tag2", "tag3"],
      description: "쌀국수 추억",
      date: "06.18",
    },
    {
      id: "id",
      uri: require("../../assets/oil_painting.png"),
      tags: ["tag1", "tag2", "tag3"],
      description: "쌀국수 추억",
      date: "06.18",
    },
    {
      id: "id",
      uri: require("../../assets/oil_painting.png"),
      tags: ["tag1", "tag2", "tag3"],
      description: "쌀국수 추억",
      date: "06.18",
    },
    {
      id: "id",
      uri: require("../../assets/oil_painting.png"),
      tags: ["tag1", "tag2", "tag3"],
      description: "쌀국수 추억",
      date: "06.18",
    },
  ];

  const handleDetailButton = () => {
    Alert.alert("정말로 삭제하시겠습니까?", "", [
      {
        text: "네",
        style: "destructive",
        onPress: () => console.log("Ask me later pressed"),
      },
      {
        text: "취소",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
    ]);
  };

  const diarydetail = (id) => navigation.navigate("DiaryDetail", { id });
  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader title="그림일기" navigation={navigation} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {images.map((item, index) => (
            <View key={index} style={styles.imageContainer}>
              <View style={styles.descriptionHeader}>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.descriptionRigth}>
                  <Text style={styles.dateStyle}>{item.date}</Text>
                  <Pressable onPress={handleDetailButton}>
                    <DetailIcon width={20} height={20} />
                  </Pressable>
                </View>
              </View>
              <TouchableOpacity onPress={() => diarydetail(item.id)}>
                <Image source={OilPic} style={styles.image} />
                <View style={styles.tagContainer}>
                  {item.tags.map((tag, idx) => (
                    <Text key={idx} style={styles.tag}>
                      # {tag}
                    </Text>
                  ))}
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DiaryCheck;
const styles = StyleSheet.create({
  safe: {
    backgroundColor: color.background,
    flex: 1,
  },
  scrollView: {
    backgroundColor: color.background,
  },
  container: {
    width: "100%", // 화면 너비에 맞춤
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20, // 스크롤 뷰 내부의 하단 여백
    marginBottom: 10,
  },
  descriptionHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
    margin: 10,
  },
  imageContainer: {
    backgroundColor: "#ffffff",
    width: "100%", // 이미지 컨테이너 화면 너비에 맞춤
    marginBottom: 20,
  },
  image: {
    width: "100%", // 이미지 화면 너비에 맞춤
    height: 250, // 이미지 높이 설정
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: 15,
    marginBottom: 5,
  },
  dateStyle: {
    fontSize: 13,
    fontWeight: "rigth",
    marginRight: 15,
  },
  descriptionRigth: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginRight: 10,
  },
  tagContainer: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  tag: {
    backgroundColor: "#C5D9FF",
    borderRadius: 60,
    fontSize: 14,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 4,
  },
});
