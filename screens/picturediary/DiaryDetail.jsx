import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import DetailIcon from "../../assets/icons/detail.svg";
import color from "../../assets/colors/colors";
import AccountHistory from "../../components/AccountHistory";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../components/CustomHeader";
import { getDiaryInfo, putDiaryTitle } from "../../apis/diary";
import Pencil from "../../assets/icons/pencil.svg";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}.${day}`;
};

const DiaryDetail = ({ navigation, route }) => {
  const { id } = route.params;
  const [detail, setDetail] = useState({
    diaryTags: { tags: [] },
    diaryTitle: "",
    isEditing: false,
  });

  const {
    data: myDiaryInfo,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["getDiaryInfo", id],
    queryFn: () => getDiaryInfo(id),
  });

  useEffect(() => {
    if (myDiaryInfo) {
      console.log(myDiaryInfo.data);
      setDetail(myDiaryInfo.data);
    }
  }, [myDiaryInfo]);

  const handleTitleChange = (text) => {
    setDetail((prevDetails) => ({
      ...prevDetails,
      diaryTitle: text,
    }));
  };

  const editTitle = useMutation({
    mutationFn: ({ id, title }) => putDiaryTitle(id, title),
    onSuccess: (data) => {
      console.log("수정 성공!:", data);
      alert("제목이 수정되었습니다!");
    },
    onError: (error) => {
      console.error("수정 실패:", error);
      alert(`Error updating title: ${error.message}`);
    },
  });

  const toggleEdit = () => {
    setDetail((prevDetails) => ({
      ...prevDetails,
      isEditing: !prevDetails.isEditing,
    }));
  };

  const saveUpdatedTitle = ({ id, title }) => {
    editTitle.mutate({ id, title });
    setDetail((prevDetails) => ({
      ...prevDetails,
      isEditing: false,
    }));
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!myDiaryInfo) {
    return <Text>No data available</Text>;
  }

  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader title="Sync가 그려준 일기" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <View style={styles.descriptionHeader}>
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={toggleEdit}
              >
                <TextInput
                  value={detail.diaryTitle}
                  onChangeText={handleTitleChange}
                  style={styles.description}
                  editable={detail.isEditing}
                />
                {!detail.isEditing && <Pencil width={30} height={30} />}
              </TouchableOpacity>
              {detail.isEditing && (
                <Pressable
                  onPress={() =>
                    saveUpdatedTitle({ id: id, title: detail.diaryTitle })
                  }
                  style={styles.confirmButton}
                >
                  <Text style={styles.buttonText}>저장</Text>
                </Pressable>
              )}
              <View style={styles.descriptionRigth}>
                <Text style={styles.dateStyle}>
                  {formatDate(detail.createdDate)}
                </Text>
                <DetailIcon width={20} height={20}/>
              </View>
            </View>
            <Image source={{ uri: detail.diaryImage }} style={styles.image} />
            <View style={styles.tagContainer}>
              {detail.diaryTags.tags.map((tag, idx) => (
                <Text key={idx} style={styles.tagstyle}>
                  # {tag}
                </Text>
              ))}
            </View>
          </View>
          <View style={styles.accounthistorycontainer}>
            <Text style={styles.accounthistorytext}>소비내역</Text>
            {detail.diaryPayments?.map((item, index) => (
              <View key={index} style={styles.itemContainer}>
                <AccountHistory transaction={item} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DiaryDetail;

const styles = StyleSheet.create({
  safe: {
    backgroundColor: color.background,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    width: "100%", // 화면 너비에 맞춤
    height: "100%",
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
    alignItems: "center", // 중앙 정렬
    marginBottom: 5,
  },
  image: {
    width: "100%", // 이미지 화면 너비에 맞춤
    height: 350, // 이미지 높이 설정
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  description: {
    fontSize: 16,
    fontFamily: "Bold",
    alignSelf: "center",
    marginLeft: 15,
  },
  confirmButton: {
    flexDirection: "row",
    height: 30,
    width:48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5A73F5",
    borderRadius: 8,
    marginRight:40
  },
  buttonText: {
    alignSelf: "center",
    fontSize: 12,
    color: "#ffffff",
    fontFamily: "Bold",
  },
  dateStyle: {
    fontSize: 14,
    fontFamily: "Light",
    marginRight: 15,
  },
  descriptionRigth: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    marginRight: 10,
    marginBottom: -6,
  },
  tagContainer: {
    marginTop: 18,
    marginBottom: 18,
    height:30,
    flexDirection: "row",
    alignSelf: "flex-start",
    paddingLeft: 10,
    justifyContent:"center"
  },
  tagstyle: {
    backgroundColor: "#C5D9FF",
    borderRadius: 60,
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  accounthistorytext: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  accounthistorycontainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ffffff",
  },
});
