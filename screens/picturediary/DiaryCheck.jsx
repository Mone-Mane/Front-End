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
import React, { useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import color from "../../assets/colors/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../components/CustomHeader";
import { getDiaryList } from "../../apis/diary";
import { useQuery } from "@tanstack/react-query";
import DownloadIcon from "../../assets/icons/download.svg";


const { width } = Dimensions.get("window"); // 화면의 전체 너비를 가져옵니다.

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth()는 0부터 시작하므로 1을 더해줍니다.
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}.${day}`; // '07.04' 형태로 반환
};

const DiaryCheck = ({ navigation }) => {
  [listdiary, setListDiary] = useState([]);

  const {
    data: myDiaryList,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["getDiaryList"],
    queryFn: () => getDiaryList(),
  });

  

  const handleDownload = async (imageUrl) => {
    try {
      // 파일 다운로드 경로 설정
      const fileUri = FileSystem.documentDirectory + 'downloaded_image.jpg';
  
      // 원격 URL에서 파일 다운로드
      const downloadResult = await FileSystem.downloadAsync(imageUrl, fileUri);
  
      // 파일 다운로드를 위한 권한 요청
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("파일 저장 권한이 필요합니다.");
        return;
      }
  
      // 다운로드된 파일을 저장
      const savedAsset = await MediaLibrary.createAssetAsync(downloadResult.uri);
  
      Alert.alert("파일이 다운로드되었습니다.");
    } catch (error) {
      console.error("파일 다운로드 중 오류가 발생했습니다:", error);
      Alert.alert("파일 다운로드 중 오류가 발생했습니다.");
    } 
  };
  

  useEffect(() => {
    if (myDiaryList) setListDiary(myDiaryList.data);
    console.log(myDiaryList?.data);
  }, [myDiaryList]);

  useEffect(() => {
    console.log(">>>>>>" + listdiary);
  }, [listdiary]);

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
  if (!myDiaryList) return <></>;
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
                    <View justifyContent={"center"}>
                    <Text style={styles.dateStyle}>
                      {formatDate(item.diaryCreateDate)}
                    </Text>
                    </View>
                    
                    <TouchableOpacity style={styles.button}
                      onPress={()=>{handleDownload(item.diaryImage)}}>
                      <View>
                        <DownloadIcon width={20} height={20} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity onPress={() => diarydetail(item.diaryCode)}>
                  <Image
                    source={{ uri: item.diaryImage ? item.diaryImage : null }}
                    style={styles.image}
                  />
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
  button: {
    flexDirection: "row",
    backgroundColor: "#5A73F5",
    padding: 4,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
    justifyContent: "center", // 중앙 정렬
    position: "relative", // 아이콘을 절대 위치로 배치하기 위해 사용
  },
});
