import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
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
import {
  getChallengesOngoing,
  getChallengesHot,
  getChallengesDone,
} from "../../apis/challenge";
import { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { postChallengesOpening } from "../../apis/challenge";



const ChallengeMainPage = ({ navigation }) => {

  const createRoom = useMutation({
    mutationFn: async () => await postChallengesOpening(),
    onError: (error) => {
      console.error("수정 실패:", error);
      alert(`Error updating title: ${error.message}`);
    },
  });

  const [tempRoomId, setTempRoomId] = useState("");

  const onCreateRoom = async () => {
    createRoom.mutate();
  };

  const onInviteRoom = async () => {
    navigation.navigate("ChallengeCreatePage", {
      roomId: tempRoomId,
      master:false
    });
  };

  const handleChangeText = (text) => {
    setTempRoomId(text);
  };

  useEffect(() => {
    if (createRoom.data) {
      console.log("createRoom");
      console.log(createRoom.data);
      navigation.navigate("ChallengeCreatePage", {
        roomId: createRoom.data.data.roomId,
        master:true
      });
    }
  }, [createRoom.data]);




  const { data: challengeOngoing, isLoading: isLoadingOngoing } = useQuery({
    queryKey: ["getChallengesOngoing"],
    queryFn: () => getChallengesOngoing(),
  });

  const { data: challengeHot, isLoading: isLoadingHot } = useQuery({
    queryKey: ["getChallengesHot"],
    queryFn: () => getChallengesHot(),
  });

  const { data: challengeDone, isLoading: isLoadingDone } = useQuery({
    queryKey: ["getChallengesDone"],
    queryFn: () => getChallengesDone(),
  });

  const groupedChallenges = challengeOngoing
    ? challengeOngoing.data.reduce((acc, _, index, array) => {
      if (index % 2 === 0) acc.push(array.slice(index, index + 2));
      return acc;
    }, [])
    : [];

  const twoChallengeDone =
    challengeDone && challengeDone.data.length >= 2
      ? challengeDone.data.slice(0, 2)
      : challengeDone && challengeDone.data;

  const screenWidth = Dimensions.get("window").width;
  const [containerWidth, setContainerWidth] = useState(0);
  const margins = 10 * 2; // Padding on each side
  const numColumns = 2; // Number of columns

  const toDoneChallengeScreen = () => {
    navigation.navigate("DoneChallengeScreen");
  };

  if (isLoadingOngoing || isLoadingHot || isLoadingDone) return <></>;

  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader title={"챌린지"} navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onCreateRoom}>
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
                      <TouchableOpacity
                        key={challenge.challenge.challengeCode}
                        onPress={() =>
                          navigation.navigate("ChallengeDetailPage", {
                            challengeCode: challenge.challenge.challengeCode,
                          })
                        }
                      >
                        <ChallengeCardInProgress
                          key={challenge.challenge.challengeCode}
                          title={challenge.challenge.challengeName}
                          createdDate={challenge.challenge.createdDate}
                          challengePeriod={challenge.challenge.challengePeriod}
                          targetAmount={
                            challenge.challenge.challengeTargetAmount
                          }
                          spentAmount={challenge.me.challengeUserSpentMoney}
                        />
                      </TouchableOpacity>
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
            {twoChallengeDone.map((item) => (
              <TouchableOpacity
                key={item.challenge.challengeCode}
                onPress={() =>
                  navigation.navigate("ChallengeDetailPage", {
                    challengeCode: item.challenge.challengeCode,
                  })
                }
              >
                <View
                  key={item.challenge.challengeCode}
                  style={[
                    styles.gridItem,
                    { width: (containerWidth - margins) / numColumns },
                  ]}
                >
                  <ChallengeCard
                    key={item.challenge.challengeCode}
                    title={item.challenge.challengeName}
                    createdDate={item.challenge.createdDate}
                    challengePeriod={item.challenge.challengePeriod}
                    targetAmount={item.challenge.challengeTargetAmount}
                    spentAmount={item.me.challengeUserSpentMoney}
                  />
                </View>
              </TouchableOpacity>
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
  textInput: {
    height: 40,
    width: 150,
    backgroundColor: "#DFEAFF",
    borderRadius: 8,
    fontSize: 16,
    fontFamily: "Bold",
    justifyContent: "center",
  },
  inputSpot: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
});
