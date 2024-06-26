import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Flame from "../../assets/icons/flame.svg";
import Palette from "../../assets/icons/palette.svg";
import Prev from "../../assets/icons/prev.svg";
import Next from "../../assets/icons/next.svg";
import CreditCard from "../../components/CreditCard";
import PayRatio from "../../components/PayRatio";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsersStatistics } from "../../apis/mainPage";
import { getUsersMyPage } from "../../apis/mypage";

const MainPage = ({ navigation }) => {

  const { data: myData, error } = useQuery({
    queryKey: ["getUsersMyPage"],
    queryFn: () => getUsersMyPage(),
  });

  // const { data: myStatistics, error2 } = useQuery({
  //   queryKey: ["getUsersStatistics"],
  //   queryFn: () => getUsersStatistics(),
  // })

  useEffect(() => {
    if(myData){
      console.log(myData.data.account.card)
    }
  },[myData])

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

  const currentMonth = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const goToPrevMonth = () => {
    if (selectedMonth > 1) {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (selectedMonth < 12) {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const challengehome = () => navigation.navigate("ChallengeMainPage");
  const picturehome = () => navigation.navigate("DiaryHome");
  const accountscreen = () => navigation.navigate("AccountScreen");

  if(!myData) return <></>
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require("../../assets/mainLogo.png")}
          />
          <View style={styles.profileContainer}>
            <View style={styles.profilePersonContainer}>
              <Image
                style={styles.profileImage}
                source={require("../../assets/ferren.png")}
              />
              <Text style={styles.profileName}>임태규님</Text>
            </View>
            <View style={styles.profileInfoContainer}>
              <Text style={styles.profileStatus}>진행중인 챌린지: 3개</Text>
              <Text style={styles.profileStatus}>물감: {myData.data.userCredit}통</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={challengehome}>
              <View style={styles.buttonTxtContainer}>
                <Flame></Flame>
                <Text style={styles.buttonText}>챌린지</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={picturehome}>
              <View style={styles.buttonTxtContainer}>
                <Palette></Palette>
                <Text style={styles.buttonText}>그림일기</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.cardContainer} onPress={accountscreen}>
            <CreditCard cardInfo={myData.data.account.card} engName={myData.data.userName}></CreditCard>
          </TouchableOpacity>
          <View style={styles.expenseContainer}>
            <View style={styles.monthContainer}>
              <TouchableOpacity onPress={goToPrevMonth}>
                {selectedMonth > currentMonth - 6 ? <Prev></Prev> : null}
              </TouchableOpacity>
              <Text style={styles.expenseTitle}>{selectedMonth}월</Text>
              <TouchableOpacity onPress={goToNextMonth}>
                {selectedMonth < currentMonth ? <Next></Next> : null}
              </TouchableOpacity>
            </View>
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
    backgroundColor: "#f9f9f9",
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
    fontSize: 16,
    fontFamily: "Bold",
  },
  profileStatus: {
    fontFamily: "Regular",
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
    fontSize: 16,
    fontFamily: "Heavy",
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
    fontSize: 16,
    fontFamily: "ExtraBold",
    marginBottom: 10,
    marginHorizontal: 10,
  },
  expenseAmount: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "ExtraBold",
  },
  expenseBarContainer: {
    flexDirection: "row",
    height: 10,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#b2bec3",
    borderRadius: 5,
    overflow: "hidden",
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
  monthContainer: {
    flexDirection: "row",
    justifyContent: "flex-start", // 가로 방향으로 가운데 정렬합니다.
    marginBottom: 10,
  },
});

export default MainPage;
