import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Text,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import React from "react";
import OilPic from "../../assets/oil_painting.png";
import DetailIcon from "../../assets/icons/detail.svg";
import color from "../../assets/colors/colors";
import AccountHistory from "../../components/AccountHistory";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../components/CustomHeader";
import { keys } from "@babel/runtime/regenerator";
const DiaryDetail = ({ navigation, id }) => {
  const data = {
    id: "id",
    uri: require("../../assets/oil_painting.png"),
    tags: ["우가우가", "치킨먹기", "tag3"],
    description: "쌀국수 추억",
    date: "06.18",
  };
  const transactions = [
    {
      id: "1",
      date: "06.16",
      name: "비디버거 성수",
      amount: "-17,400",
      balance: "143,000",
    },
    {
      id: "2",
      date: "06.16",
      name: "베트남 쌀국수",
      amount: "-17,400",
      balance: "143,000",
    },
    {
      id: "3",
      date: "06.16",
      name: "임태규",
      amount: "+50,000",
      balance: "143,000",
    },
  ];
  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader title="Sync가 그려준 일기" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <View style={styles.descriptionHeader}>
              <Text style={styles.description}>{data.description}</Text>
              <View style={styles.descriptionRigth}>
                <Text style={styles.dateStyle}>{data.date}</Text>
                <DetailIcon width={20} height={20} />
              </View>
            </View>
            <Image source={OilPic} style={styles.image} />
            <View style={styles.tagContainer}>
              {data.tags.map((tag, idx) => (
                <Text key={idx} style={styles.tag}>
                  # {tag}
                </Text>
              ))}
            </View>
          </View>
          <View style={styles.accounthistorycontainer}>
            <Text style={styles.accounthistorytext}>소비내역</Text>
            {transactions.map((item) => (
                <View key={item.id} style={styles.itemContainer}>
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
    marginTop: 18,
    marginBottom: 18,
    flexDirection: "row",
    alignSelf: "flex-start",
    paddingLeft: 10,
  },
  tag: {
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
