import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList
} from "react-native";
import React from "react";
import CustomHeader from "../../components/CustomHeader";
import Flame from "../../assets/icons/flame.svg";
import HotRankingCard from "../../components/HotRankingCard";
import ChallengeCard from "../../components/ChallengeCard";
import ChallengeCardInProgress from "../../components/ChallengeCardInProgress";
import { useState } from "react";

const ChallengeMainPage = () => {
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
      title: "카페 줄이기",
      dateRange: "06.07 - 06.13",
      progress: "80",
    },
    {
      id: "2",
      title: "유흥 줄이기",
      dateRange: "06.07 - 06.13",
      progress: "80",
    },
    {
      id: "3",
      title: "택시 이용 줄이기",
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
      title: "술 줄이기",
      dateRange: "06.07 - 06.13",
      progress: "80",
    },
    {
      id: "6",
      title: "야식 줄이기",
      dateRange: "06.07 - 06.13",
      progress: "80",
    },
    {
      id: "7",
      title: "배달 음식 줄이기",
      dateRange: "06.07 - 06.13",
      progress: "80",
    },
    {
      id: "8",
      title: "구독 서비스 줄이기",
      dateRange: "06.07 - 06.13",
      progress: "80",
    },
  ];

  const screenWidth = Dimensions.get("window").width;

  const groupedChallenges = [];

  for (let i = 0; i < CHALLENGE_INPROGRESS.length; i += 2) {
    groupedChallenges.push(CHALLENGE_INPROGRESS.slice(i, i + 2));
  }

  const [containerWidth, setContainerWidth] = useState(0);
  const margins = 10 * 2; // Padding on each side
  const numColumns = 2; // Number of columns

  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader title={"챌린지"}></CustomHeader>
      <ScrollView>
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
                        key={challenge.id}
                        title={challenge.title}
                        dateRange={challenge.dateRange}
                        progress={challenge.progress}
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
              {DATA1.map((DATA) => (
                <HotRankingCard
                  medal={DATA.medal}
                  title={DATA.title}
                  participants={DATA.participants}
                />
              ))}
            </View>
          </View>
          <Text style={styles.hotText}>완료된 챌린지</Text>
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
    fontFamily: "Heavy",
    fontSize: 20,
  },
  hotContainer: {
    marginBottom:20
  },
  hotText: {
    fontFamily: "Heavy",
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
  inProgressText:{
    fontFamily: "Heavy",
    fontSize: 20,
    marginBottom: 20,
  }
});
