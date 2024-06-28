import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import Flame from "../../assets/icons/flame.svg";
import Palette from "../../assets/icons/palette.svg";
import CreditCard from "../../components/CreditCard";
import PayRatio from "../../components/PayRatio";
import { ScrollView } from "react-native";

const MainPage = () => {
  const datas = [
    {
      name: "식비",
      amount: 446000,
      rate: 15,
    },
    {
      name: "교통",
      amount: 446000,
      rate: 15,
    },
    {
      name: "유흥",
      amount: 446000,
      rate: 20,
    },
    {
      name: "카페",
      amount: 132000,
      rate: 20,
    },
    {
      name: "기타",
      amount: 112300,
      rate: 30,
    },
  ];

  const colors = ["#ef476f", "#ffd166", "#06d6a0", "#118ab2", "#073b4c"];

  let paySum = 0;

  datas.forEach((item) => {
    paySum += item.amount;
  });

  const thisMonth = new Date().getMonth() + 1;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require("../../assets/mainLogo.png")} // 대체 이미지 URL을 사용합니다.
          />
          <View style={styles.profileContainer}>
            <View style={styles.profilePersonContainer}>
              <Image
                style={styles.profileImage}
                source={require("../../assets/ferren.png")} // 대체 이미지 URL을 사용합니다.
              />
              <Text style={styles.profileName}>임태규님</Text>
            </View>
            <View style={styles.profileInfoContainer}>
              <Text style={styles.profileStatus}>진행중인 챌린지: 3개</Text>
              <Text style={styles.profileStatus}>물감: 30통</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <View style={styles.buttonTxtContainer}>
                <Flame></Flame>
                <Text style={styles.buttonText}>챌린지</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <View style={styles.buttonTxtContainer}>
                <Palette></Palette>
                <Text style={styles.buttonText}>그림일기</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.cardContainer}>
            <CreditCard></CreditCard>
          </View>
          <View style={styles.expenseContainer}>
            <Text style={styles.expenseTitle}>{thisMonth}월</Text>
            <Text style={styles.expenseAmount}>
              {paySum.toLocaleString()}원
            </Text>
            <View style={styles.expenseBarContainer}>
              {datas.map((data, index) => (
                <View
                  key={data.name}
                  style={[
                    styles.expenseBar,
                    {
                      backgroundColor: colors[index % colors.length],
                      width: `${data.rate}%`,
                    },
                  ]}
                />
              ))}
            </View>
            {datas.map((item) => (
              <PayRatio
                key={item.name}
                name={item.name}
                amount={item.amount}
                rate={item.rate}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    backgroundColor: "white",
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 75,
    resizeMode: "contain",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "100%",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 5,
  },
  profilePersonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileInfoContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  profileName: {
    fontSize: 18,
    fontFamily: "ExtraBold"
  },
  profileStatus: {
    fontFamily:"Regular",
    fontSize: 12,
    color: "#777",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  buttonTxtContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#5A73F5",
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "ExtraBold",
    paddingLeft: 10,
  },
  cardContainer: {
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  expenseContainer: {
    width: "100%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    marginBottom: 30,
  },
  expenseTitle: {
    fontSize: 24,
    fontFamily: "ExtraBold",
    marginBottom: 10,
  },
  expenseAmount: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: "ExtraBold"
  },
  expenseBarContainer: {
    flexDirection: "row",
    height: 10,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#b2bec3",
    borderRadius: 5,
  },
  expenseBar: {
    height: "100%",
  },
  expenseDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  expenseDetail: {
    alignItems: "center",
  },
});

export default MainPage;
