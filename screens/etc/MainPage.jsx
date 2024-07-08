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
import { getUsersStatistics, getMyUser } from "../../apis/mainPage";
import { getUsersMyPage } from "../../apis/mypage";
import { myInfo } from "../../recoil/atoms/user";
import { useRecoilState } from "recoil";

const MainPage = ({ navigation }) => {
  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const [me, setMe] = useRecoilState(myInfo);
  const { data: user } = useQuery({
    queryKey: ["getMyUser"],
    queryFn: () => getMyUser() || {},
    enabled: !me, // Only enable the query if 'me' is not set
  });
  
  useEffect(() => {
    if (!me || me.userCode !== user.userCode) {
      setMe(user);
    }
    if(me){
      console.log("me change",me);
    }
  }, [me, setMe, user]);


  const[transformedData,setTransformedData] = useState({
    analysis_cafe: 0,
    analysis_food: 0,
    analysis_total: 0,
    analysis_etc: 0,
    analysis_pleasure: 0,
    analysis_transportation: 0
  })
  
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [date, setDate] = useState(firstDayOfMonth);

  const { data: myData, error } = useQuery({
    queryKey: ["getUsersMyPage"],
    queryFn: () => getUsersMyPage(),
  });

  useEffect(() => {
    if (myData) {
      console.log(myData);
    }
  }, [myData]);
  
  const { data: statistics, error2 } = useQuery({
    queryKey: ["getUsersStatistics", formatDate(date)],
    queryFn: () => getUsersStatistics( formatDate(date)),
  });

  // 다음달 소비 
  const handlePreviousMonth = () => {
    const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    setDate(prevMonth);
  };
  // 이전달 소비 
  const handleNextMonth = () => {
    const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    setDate(nextMonth);
  };
  
  
  

  useEffect(() => {
    if (statistics && statistics.data) {
      setTransformedData({
        analysis_cafe: statistics.data.analysisCafe || 0,
        analysis_food: statistics.data.analysisFood || 0,
        analysis_total: statistics.data.analysisTotal || 0,
        analysis_etc: statistics.data.etc || 0,
        analysis_pleasure: statistics.data.pleasure || 0,
        analysis_transportation: statistics.data.transportation || 0
      });
    }
  }, [statistics]);

  const categories = [
    { name: "카페", key: "analysis_cafe" },
    { name: "식비", key: "analysis_food" },
    { name: "기타", key: "analysis_etc" },
    { name: "유흥", key: "analysis_pleasure" },
    { name: "교통", key: "analysis_transportation" },
  ];

  const total = transformedData.analysis_total;

  const getCategoryPercentage = (amount) => amount!=0?(amount / total) * 100:0;
  categories.sort((a, b) => transformedData[b.key] - transformedData[a.key]);

  const colors = ["#ef476f", "#ffd166", "#06d6a0", "#118ab2", "#073b4c"];

  let paySum = transformedData.analysis_total;

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
  const toMyPage = () => navigation.navigate("MyPage");

  if (!myData) return <></>;
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require("../../assets/mainLogo4.png")}
          />
          <TouchableOpacity onPress={toMyPage}>
            <View style={styles.profileContainer}>
              <View style={styles.profilePersonContainer}>
                <Image
                  style={styles.profileImage}
                  source={{ uri: myData.data.userProfileUrl }}
                />
                <Text style={styles.profileName}>{myData.data.userName}님</Text>
              </View>
              <View style={styles.profileInfoContainer}>
                <Text style={styles.profileStatus}>
                  진행중인 챌린지: {myData.data.challengeCount}개
                </Text>
                <Text style={styles.profileStatus}>
                  물감: {myData.data.userCredit}통
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button1} onPress={challengehome}>
              <View style={styles.buttonTxtContainer}>
                <Flame></Flame>
                <Text style={styles.buttonTextChallenge}>챌린지</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={picturehome}>
              <View style={styles.buttonTxtContainer}>
                <Palette></Palette>
                <Text style={styles.buttonTextDiary}>그림일기</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={accountscreen}
          >
            <CreditCard
              cardInfo={myData.data.account.card}
              engName={myData.data.userEngName}
            ></CreditCard>
          </TouchableOpacity>
          <View style={styles.expenseContainer}>
            <View style={styles.monthContainer}>
              <TouchableOpacity onPress={handlePreviousMonth}>
                {selectedMonth > currentMonth - 6 ? <Prev></Prev> : null}
              </TouchableOpacity>
              <Text style={styles.expenseTitle}>{selectedMonth}월</Text>
              <TouchableOpacity onPress={handleNextMonth}>
                {selectedMonth < currentMonth ? <Next></Next> : null}
              </TouchableOpacity>
            </View>
            <Text style={styles.expenseAmount}>
              {paySum.toLocaleString()}원
            </Text>
            <View style={styles.expenseBarContainer}>
              {categories.map((category, index) => (
                amount = transformedData[category.key],
                rate = getCategoryPercentage(amount),
                <View
                  key={category.key}
                  style={[
                    styles.expenseBar,
                    {
                      backgroundColor: colors[index % colors.length],
                      width: `${rate}%`,
                    },
                  ]}
                />
              ))}
            </View>
            {categories.map((category) => {
              const amount = transformedData[category.key];
              const rate = getCategoryPercentage(amount);
              return (
                <PayRatio
                  key={category.name}
                  name={category.name}
                  amount={amount}
                  rate={rate}
                />
              );
            })}
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
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 75,
    resizeMode: "contain",
    alignSelf: "center"
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
    justifyContent: "space-between",
    marginHorizontal: 5
  },
  buttonTxtContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button1: {
    backgroundColor: "#5A73F5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginRight: 10
  },
  button2: {
    backgroundColor: "#5A73F5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1
  },
  buttonTextChallenge: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Heavy",
    paddingLeft: 10,
  },
  buttonTextDiary: {
    color: "#fff",
    fontSize: 20,
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
