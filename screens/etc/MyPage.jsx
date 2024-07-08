import React, { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../components/CustomHeader";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsersMyPage } from "../../apis/mypage";
import Pencil from "../../assets/icons/pencil.svg";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";

const MyPage = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const queryClient = useQueryClient();
  const toDiaryCheck = () => navigation.navigate("DiaryCheck");
  const toMyChallenge = () => navigation.navigate("DoneChallengeScreen");
  const toMyDiary = () => navigation.navigate("DiaryCheck");

  const { data: myPageData, error } = useQuery({
    queryKey: ["getUsersMyPage"],
    queryFn: () => getUsersMyPage(),
  });

  if (!myPageData) return <></>;

  // const queryClient = useQueryClient();
  // const test = () => {
  //   queryClient.invalidateQueries({ queryKey: ["getUsersMyPage"] });
  // };

  // 위 주석은 지우지 말 것,,,!

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("사진 라이브러리에 접근 권한이 필요합니다.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
      uploadImage(result.assets[0]);
    }
  };

  // 이미지 업로드 함수
  const uploadImage = async (image) => {
    let formData = new FormData();
    let file = {
      uri: image.uri,
      type: "image/png",
      name: image.fileName.split(".")[0],
    };
    formData.append("image", file);

    try {
      const token = await AsyncStorage.getItem("ACCESS_TOKEN");
      const response = await axios.put(
        "http://54.180.140.196:8080/api/users/my-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        Alert.alert("프로필 이미지가 성공적으로 업로드되었습니다.");
        queryClient.invalidateQueries(["getUsersMyPage"]);
      } else {
        Alert.alert("이미지 업로드에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      Alert.alert("이미지 업로드 중 오류가 발생했습니다.");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader
        title="마이 페이지"
        navigation={navigation}
        bgColor={"white"}
      />

      <ScrollView style={styles.container}>
        <View style={styles.profileSection}>
          <Image
            style={styles.profileImage}
            source={{ uri: myPageData.data.userProfileUrl }}
          />
          <Pencil style={styles.pencil} onPress={pickImage}></Pencil>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{myPageData.data.userName}</Text>
            <Text style={styles.profileDate}>{myPageData.data.userBirth}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={toMyChallenge}>
          <View style={styles.section}>
            <Text style={styles.sectionItem}>나의 챌린지</Text>
            <Text style={styles.sectionArrow}>⟩</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={toDiaryCheck}>
          <View style={styles.section}>
            <Text style={styles.sectionItem}>나의 그림일기</Text>
            <Text style={styles.sectionArrow}>⟩</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.infoSection}>
          <Text style={styles.infoHeader}>내 정보</Text>
          <Text style={styles.infoText}>연락처</Text>
          <Text style={styles.infoDetail}>{myPageData.data.userPhone}</Text>
          <Text style={styles.infoText}>주소</Text>
          <Text style={styles.infoDetail}>{myPageData.data.userAddress}</Text>
          <Text style={styles.infoText}>크레딧</Text>
          <Text style={styles.infoDetail}>{myPageData.data.userCredit}통</Text>
          <Text style={styles.infoText}>계좌 번호</Text>
          <Text style={styles.infoDetail}>
            {myPageData.data.account.accountNum}
          </Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoHeader}>이용안내</Text>
          <View style={styles.section}>
            <Text style={styles.infoText}>앱 버전</Text>
            <Text style={styles.infoDetail}>1.0.0</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionItem}>서비스 이용약관</Text>
            <Text style={styles.sectionArrow}>⟩</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionItem}>탈퇴하기</Text>
            <Text style={styles.sectionArrow}>⟩</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionItem}>로그아웃</Text>
            <Text style={styles.sectionArrow}>⟩</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyPage;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
  },
  safe: {
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  pencil: {
    position: "absolute",
    left: 40,
    top: 45,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flexDirection: "column",
  },
  profileName: {
    fontSize: 20,
    fontFamily: "ExtraBold",
  },
  profileDate: {
    fontSize: 14,
    fontFamily: "Bold",
    color: "gray",
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  sectionItem: {
    fontSize: 16,
    fontFamily: "Bold",
  },
  sectionArrow: {
    fontSize: 16,
    fontFamily: "ExtraBold",
  },
  infoSection: {
    marginVertical: 20,
  },
  infoHeader: {
    fontSize: 14,
    fontFamily: "Regular",
    marginBottom: 10,
    color: "gray",
  },
  infoText: {
    fontSize: 14,
    fontFamily: "Regular",
    marginVertical: 10,
    color: "gray",
  },
  infoDetail: {
    fontFamily: "Bold",
    fontSize: 16,
    color: "black",
    marginTop: 2,
  },
});
