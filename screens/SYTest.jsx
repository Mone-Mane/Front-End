import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../components/CustomHeader";
import ChallengeCard from "../components/ChallengeCard";
import color from "../assets/colors/colors";
import HotRankingCard from "../components/HotRankingCard";
import ChallengeAcceptModal from "../components/ChallengeAcceptModal";
import ChallengeCardInProgress from "../components/ChallengeCardInProgress";
import ChallengeRequestModal from "../components/ChallengeRequestModal";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { login } from "../apis/login";
import { myPageInfoAtom } from "../recoil/atoms/challenge";
import { useRecoilState } from "recoil";
import getUsersMyPage from "../apis/mypage"

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
  {
    id: "3",
    title: "택시 줄이기",
    dateRange: "06.07 - 06.13",
    status: "실패",
    success: false,
  },
  {
    id: "4",
    title: "커피 줄이기",
    dateRange: "06.07 - 06.13",
    status: "성공",
    success: true,
  },
  {
    id: "5",
    title: "커피 줄이기냠냠냠냠",
    dateRange: "06.07 - 06.13",
    status: "성공",
    success: true,
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

const SYTest = ({ navigation }) => {
  const queryClient = new QueryClient();
  const screenWidth = Dimensions.get("window").width;
  const [fetchChallenge, setFetchChallenge] = useState(false);
  const [myPageInfo, setMyPageInfo] = useRecoilState(myPageInfoAtom);

  //GET요청 시
  const { data: myPageData, error } = useQuery({
    queryKey: ["getUserMyPage"],
    queryFn: () => getUsersMyPage(),
    enabled: fetchChallenge,
  });

  //POST 요청 시
  const loginMutation = useMutation({
    mutationFn: ({ userId, userPwd }) => login(userId, userPwd),
    onSuccess: (data) => {
      console.log("로그인 성공!:", data);
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
    },
  });

  const handleLogin = async ({ userId, userPwd }) => {
    loginMutation.mutate({ userId, userPwd });
  };

  // 모달
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRequestModalVisible, setIsRequestModalVisible] = useState(false);

  // 챌린지 카드 데이터 쌍으로 그룹화
  const groupedChallenges = [];
  for (let i = 0; i < CHALLENGE_INPROGRESS.length; i += 2) {
    groupedChallenges.push(CHALLENGE_INPROGRESS.slice(i, i + 2));
  }

  useEffect(() => {
    console.log("myPageData", myPageData);
    if (myPageData) {
      setMyPageInfo(myPageData);
    }
  }, [myPageData]);

  //recoil atom 저장
  useEffect(() => {
    console.log("recoil state🥰", myPageData);
  }, [myPageData]);

  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader title="SYTest" navigation={navigation} />
      <Pressable style={{ height: 90 }} onPress={() => setIsModalVisible(true)}>
        <Text style={styles.textStyle}>Modal Open!</Text>
      </Pressable>
      <Pressable
        style={{ height: 90 }}
        onPress={() => handleLogin({ userId: "test", userPwd: "1234" })}
      >
        <Text>로그인 테스트</Text>
      </Pressable>
      <Pressable style={{ height: 90 }} onPress={() => setFetchChallenge(true)}>
        <Text>fetch</Text>
      </Pressable>
      <Pressable onPress={() => setIsRequestModalVisible(true)}>
        <Text style={styles.textStyle}>RequestModal Open!</Text>
      </Pressable>
      <ChallengeAcceptModal
        isOpen={isModalVisible}
        setIsOpen={setIsModalVisible}
      />
      <ChallengeRequestModal
        isOpen={isRequestModalVisible}
        setIsOpen={setIsRequestModalVisible}
      />
      <View style={styles.full}>
        <Text>진행중인 챌린지</Text>
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
        <View style={styles.hotList}>
          <FlatList
            data={DATA1}
            renderItem={({ item }) => (
              <HotRankingCard
                medal={item.medal}
                title={item.title}
                participants={item.participants}
              />
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (
              <View style={{ height: 10 }} /> // Add spacing between items
            )}
          />
        </View>
        <FlatList
          data={DATA}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => (
            <View
              style={[
                styles.gridItem,
                { width: (screenWidth - 66) / 2 }, // Subtracting total padding
              ]}
            >
              <ChallengeCard
                title={item.title}
                dateRange={item.dateRange}
                status={item.status}
                success={item.success}
              />
            </View>
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          ItemSeparatorComponent={() => (
            <View style={{ height: 10 }} /> // Add spacing between rows
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default SYTest;

const styles = StyleSheet.create({
  safe: {
    backgroundColor: color.background,
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  full: {
    padding: 20,
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
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 10,
  },
  gridItem: {
    marginBottom: 10,
  },
  hotList: {
    borderRadius: 16,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#ffffff",
    marginBottom: 20,
  },
  textStyle: {
    color: "blue",
    textAlign: "center",
    marginVertical: 10,
  },
});
