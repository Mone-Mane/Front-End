import React, { useState ,useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { useQuery, useMutation } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../components/CustomHeader";
import { getDiaryInfo, putDiaryTitle } from "../../apis/diary";


const DiaryDetail = ({ navigation, route }) => {
  const { id } = route.params;
  const [detail, setDetail] = useState({
    diaryTags: { tags: [] },
    diaryTitle: "",
    isEditing: false,
  });

  const { data: myDiaryInfo, error, isLoading } = useQuery({
    queryKey: ["getDiaryInfo", id],
    queryFn: () => getDiaryInfo(id),
  });

  useEffect(() => {
    if (myDiaryInfo) {
      setDetail((prevDetails) => ({
        ...prevDetails,
        ...myDiaryInfo.data,
        isEditing: false, // 초기 로드 시 편집 상태 비활성화
      }));
    }
  }, [myDiaryInfo]);

  const editTitle = useMutation({
    mutationFn: putDiaryTitle,
    onSuccess: () => {
      alert("Diary title updated successfully!");
      setDetail((prevDetails) => ({ ...prevDetails, isEditing: false }));
    },
    onError: (error) => {
      alert(`Error updating title: ${error.message}`);
    },
  });

  const toggleEdit = () => {
    setDetail((prevDetails) => ({ ...prevDetails, isEditing: !prevDetails.isEditing }));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader title="Sync가 그려준 일기" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.descriptionHeader}>
            <TouchableOpacity style={styles.inputContainer} onPress={toggleEdit}>
              <TextInput
                value={detail.diaryTitle}
                onChangeText={(text) => setDetail({ ...detail, diaryTitle: text })}
                editable={detail.isEditing}
                style={styles.description}
              />
              {!detail.isEditing && (
                <Pencil style={styles.pencil}/>
              )}
            </TouchableOpacity>
            {detail.isEditing && (
              <Button
                title="저장"
                onPress={() => editTitle.mutate({ id: id, title: detail.diaryTitle })}
              />
            )}
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
            {detail.payment?.map((item) => (
                <View key={item.history_code} style={styles.itemContainer}>
                  <AccountHistory transaction={item} />
                </View>
            ))}
          </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    backgroundColor: "#fff",
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
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  iconStyle: {
    padding: 10,
  },
  image: {
    width: '100%',
    height: 250,
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
    marginTop: 18,
    marginBottom: 18,
    flexDirection: "row",
    alignSelf: "flex-start",
    paddingLeft: 10,
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

export default DiaryDetail;
