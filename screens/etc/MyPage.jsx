import React from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../components/CustomHeader";

const MyPage = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader title="마이 페이지" navigation={navigation}/>

      <ScrollView style={styles.container}>
        <View style={styles.profileSection}>
          <Image
            style={styles.profileImage}
            source={require("../../assets/ferren.png")} // 대체 이미지 URL을 사용합니다.
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>페른</Text>
            <Text style={styles.profileDate}>1998 / 08 / 28</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionItem}>나의 챌린지</Text>
          <Text style={styles.sectionArrow}>⟩</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionItem}>나의 그림일기</Text>
          <Text style={styles.sectionArrow}>⟩</Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoHeader}>내 정보</Text>
          <Text style={styles.infoText}>연락처</Text>
          <Text style={styles.infoDetail}>010-2434-6736</Text>
          <Text style={styles.infoText}>주소</Text>
          <Text style={styles.infoDetail}>
            경기도 안양시 만안구 병목안로 103
          </Text>
          <Text style={styles.infoText}>크레딧</Text>
          <Text style={styles.infoDetail}>17등</Text>
          <Text style={styles.infoText}>계좌 번호</Text>
          <Text style={styles.infoDetail}>02-3424-24-12341</Text>
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
  header:{
    backgroundColor: "white"
  },
  safe: {
    backgroundColor: "white",
    flex: 1
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
    fontWeight: "bold",
  },
  profileDate: {
    fontSize: 14,
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
  },
  sectionArrow: {
    fontSize: 16,
  },
  infoSection: {
    marginTop: 20,
  },
  infoHeader: {
    fontSize: 14,
  },
  infoText: {
    fontSize: 16,
    marginTop: 10,
  },
  infoDetail: {
    fontSize: 14,
    color: "gray",
    marginTop: 2,
  },
});
