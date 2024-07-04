import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import React from "react";
import CustomHeader from "../../components/CustomHeader";
import Flame from "../../assets/icons/flame.svg";
import HotRankingCard from "../../components/HotRankingCard";
import ChallengeCard from "../../components/ChallengeCard";
import { SafeAreaView } from "react-native-safe-area-context";
import ChallengeCardInProgress from "../../components/ChallengeCardInProgress";
import { useState } from "react";
import { getChallengesOngoing, getChallengesHot } from "../../apis/challenge";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

const ChallengeMainPage = ({ navigation }) => {
  const { data: challengeOngoing, isLoading } = useQuery({
    queryKey: ["getChallengesOngoing"],
    queryFn: () => getChallengesOngoing(),
  });

  const { data: challengeHot, isLoading2 } = useQuery({
    queryKey: ["getChallengesHot"],
    queryFn: () => getChallengesHot(),
  });

  useEffect(() => {
    if (challengeHot) {
      console.log(challengeHot.data);
    }
  }, [challengeOngoing]);

  const DATA = [
    {
      id: "1",
      title: "커피 줄이기",
      dateRange: "06.07 - 06.13",
      status: "성공",
      success: true,
    },
    {
      id: "2",
      title: "택시 줄이기",
      dateRange: "06.07 - 06.13",
      status: "실패",
      success: false,
    },
  ];

  const DATA1 = [
    { id: "1", medal: "🥇", title: "커피 줄이기", participants: "2,337명" },
    {
      id: "2",
      medal: "🥈",
      title: "택시 줄이기",
      participants: "2,337명",
    },
    {
      id: "3",
      medal: "🥉",
      title: "PC방 줄이기",
      participants: "2,337명",
    },
  ];

  const CHALLENGE_INPROGRESS = [
    {
      id: "1",
      title: "카페 덜 가기",
      dateRange: "06.07 - 06.13",
      progress: "80",
    },
    {
      id: "2",
      title: "유흥 안하기",
      dateRange: "06.07 - 06.13",
      progress: "80",
    },
    {
      id: "3",
      title: "택시 덜 타기",
      dateRange: "06.07 - 06.13",
      progress: "80",
    },
    {
      id: "4",
      title: "쇼핑 줄이기",
      dateRange: "06.07 - 06.13",
      progress: "80",
    },
    {
      id: "5",
      title: "술 덜 마시기",
      dateRange: "06.07 - 06.13",
      progress: "80",
    },
    {
      id: "6",
      title: "야식 덜 먹기",
      dateRange: "06.07 - 06.13",
      progress: "80",
    },
    {
      id: "7",
      title: "배달 덜 먹기",
      dateRange: "06.07 - 06.13",
      progress: "80",
    },
    {
      id: "8",
      title: "구독 좀 끊기",
      dateRange: "06.07 - 06.13",
      progress: "80",
    },
  ];

  const screenWidth = Dimensions.get("window").width;

  const groupedChallenges = challengeOngoing
    ? challengeOngoing.data.reduce((acc, _, index, array) => {
        if (index % 2 === 0) acc.push(array.slice(index, index + 2));
        return acc;
      }, [])
    : [];

  const [containerWidth, setContainerWidth] = useState(0);
  const margins = 10 * 2; // Padding on each side
  const numColumns = 2; // Number of columns

  const toDoneChallengeScreen = () => {navigation.navigate("DoneChallengeScreen")};

  if (isLoading) return <></>;

  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader title={"챌린지"} navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity>
              <View style={styles.button}>
                <Flame style={styles.buttonLogo}></Flame>
                <Text style={styles.buttonText}>챌린지 생성하기</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.inProgressContainer}>
            <View>
              <Text style={styles.inProgressText}>진행중인 챌린지</Text>
              <FlatList
                data={groupedChallenges}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.pagerView}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View
                    style={[styles.page, { width: screenWidth - 40 }]} // Subtracting padding
                  >
                    {item.map((challenge) => (
                      <ChallengeCardInProgress
                        key={challenge.challenge.challengeCode}
                        title={challenge.challenge.challengeName}
                        createdDate={challenge.challenge.createdDate}
                        challengePeriod={challenge.challenge.challengePeriod}
                        targetAmount={challenge.challenge.challengeTargetAmount}
                        spentAmount={challenge.me.challengeUserSpentMoney}
                      />
                    ))}
                  </View>
                )}
              />
            </View>
            <View></View>
          </View>
          <View style={styles.hotContainer}>
            <Text style={styles.hotText}>주간 HOT! 챌린지</Text>
            <View style={styles.hotList}>
              {challengeHot.data.map((DATA, i) => (
                <HotRankingCard
                  key={i}
                  medal={i}
                  title={DATA.challengeCategory}
                  participants={DATA.challengeCount}
                />
              ))}
            </View>
          </View>
          <View style={styles.doneChallengeText}>
            <Text style={styles.hotText}>완료된 챌린지</Text>
            <TouchableOpacity onPress={toDoneChallengeScreen}>
              <Text>더보기</Text>
            </TouchableOpacity>
          </View>
          <View
            style={styles.doneContainer}
            onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
          >
            {DATA.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.gridItem,
                  { width: (containerWidth - margins) / numColumns },
                ]}
              >
                <ChallengeCard
                  key={item.id}
                  title={item.title}
                  dateRange={item.dateRange}
                  status={item.status}
                  success={item.success}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChallengeMainPage;

const styles = StyleSheet.create({
  safe: {
    backgroundColor: "#f9f9f9",
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
  gridItem: {
    marginBottom: 10,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    paddingVertical: 20,
  },
  button: {
    backgroundColor: "#5A73F5",
    padding: 20,
    alignItems: "center",
    borderRadius: 16,
    justifyContent: "center",
    position: "relative",
  },
  buttonLogo: {
    position: "absolute",
    left: 40,
  },
  buttonText: {
    fontFamily: "Bold",
    fontSize: 20,
    color: "white",
  },
  inProgressContainer: {
    paddingVertical: 20,
  },
  inProgressText: {
    fontFamily: "ExtraBold",
    fontSize: 20,
    marginBottom: 20,
  },
  hotContainer: {
    marginBottom: 20,
  },
  hotText: {
    fontFamily: "ExtraBold",
    fontSize: 20,
    marginBottom: 20,
  },
  hotList: {
    backgroundColor: "white",
    borderRadius: 16,
    paddingVertical: 10,
    marginBottom: 30,
  },
  doneContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  pagerView: {
    marginBottom: 20,
    justifyContent: "space-between",
  },
  page: {
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingHorizontal: 10,
  },
  doneChallengeText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
});
