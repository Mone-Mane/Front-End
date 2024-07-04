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
import React, { useState, useEffect }  from "react";
import OilPic from "../../assets/oil_painting.png";
import DetailIcon from "../../assets/icons/detail.svg";
import color from "../../assets/colors/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../components/CustomHeader";
import { getDiaryList }  from "../../apis/diary"
import { useQuery } from "@tanstack/react-query";



const { width } = Dimensions.get("window"); // 화면의 전체 너비를 가져옵니다.

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth()는 0부터 시작하므로 1을 더해줍니다.
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}.${day}`; // '07.04' 형태로 반환
};


const DiaryCheck = ({ navigation }) => {

  [listdiary, setListDiary] = useState([]);

  const { data: myDiaryList, error, isLoading  } = useQuery({
    queryKey: ["getDiaryList"],
    queryFn: () => getDiaryList(),
  });


  useEffect(()=>{
    if(myDiaryList)
    setListDiary(myDiaryList.data)
    console.log(myDiaryList?.data)
  },[myDiaryList])

  useEffect(()=>{
    console.log(">>>>>>"+listdiary)
  },[listdiary])

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
  if(!myDiaryList) return <></>
  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader title="그림일기" navigation={navigation} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
        {listdiary.length > 0 ? (
            listdiary.map((item, index) => (
              <View key={index} style={styles.imageContainer}>
                <View style={styles.descriptionHeader}>
                  <Text style={styles.description}>{item.diaryTitle}</Text>
                  <View style={styles.descriptionRigth}>
                    <Text style={styles.dateStyle}>{formatDate(item.diaryCreateDate)}</Text>
                    <Pressable onPress={handleDetailButton}>
                      <DetailIcon width={20} height={20} />
                    </Pressable>
                  </View>
                </View>
                <TouchableOpacity onPress={() => diarydetail(item.diaryCode)}>
                  <Image source={{ uri: item.diaryImage }} style={styles.image} />
                  <View style={styles.tagContainer}>
                    {item.diaryTags.tags.map((tag, idx) => (
                      <Text key={idx} style={styles.tag}>
                        # {tag}
                      </Text>
                    ))}
                  </View>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>일기가 없습니다.</Text>
          )}
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
