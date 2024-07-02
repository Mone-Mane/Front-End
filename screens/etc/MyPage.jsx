import React, { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../components/CustomHeader";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsersMyPage } from "../../apis/mypage";
import Pencil from "../../assets/icons/pencil.svg"

const MyPage = ({ navigation }) => {
  const diarycheck = () => navigation.navigate("DiaryCheck");
  
  
  const { data: myPageData, error } = useQuery({
    queryKey: ["getUsersMyPage"],
    queryFn: () => getUsersMyPage(),
  });

  if(!myPageData) return <></>


  // const queryClient = useQueryClient();
  // const test = () => {
  //   queryClient.invalidateQueries({ queryKey: ["getUsersMyPage"] });
  // };

  // 위 주석은 지우지 말 것,,,!

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
            source={{uri:myPageData.data.userProfileUrl}}
          />
          <Pencil style={styles.pencil} onPress={() => {console.log("efwf")}}></Pencil>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{myPageData.data.userName}</Text>
            <Text style={styles.profileDate}>{myPageData.data.userBirth}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionItem}>나의 챌린지</Text>
          <Text style={styles.sectionArrow}>⟩</Text>
        </View>
        <TouchableOpacity onPress={diarycheck}>
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
          <Text style={styles.infoDetail}>
          {myPageData.data.userAddress}
          </Text>
          <Text style={styles.infoText}>크레딧</Text>
          <Text style={styles.infoDetail}>{myPageData.data.userCredit}통</Text>
          <Text style={styles.infoText}>계좌 번호</Text>
          <Text style={styles.infoDetail}>{myPageData.data.account.accountNum}</Text>
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
    position:"relative"
  },
  pencil:{
    position: "absolute",
    left : 40,
    top: 45
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
