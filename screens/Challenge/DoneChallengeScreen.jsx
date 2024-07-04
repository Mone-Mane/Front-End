import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../components/CustomHeader";
import ChallengeCard from "../../components/ChallengeCard";
import color from "../../assets/colors/colors";
import { useQuery } from "@tanstack/react-query";
import { getChallengesDone } from "../../apis/challenge";

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
  {
    id: "6",
    title: "커피 줄이기냠냠냠냠",
    dateRange: "06.07 - 06.13",
    status: "성공",
    success: true,
  },
  {
    id: "7",
    title: "커피 줄이기냠냠냠냠",
    dateRange: "06.07 - 06.13",
    status: "성공",
    success: true,
  },
  {
    id: "8",
    title: "커피 줄이기냠냠냠냠",
    dateRange: "06.07 - 06.13",
    status: "성공",
    success: true,
  },
];

const DoneChallengeScreen = ({ navigation }) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const margins = 33 * 2; // Padding on each side
  const numColumns = 2; // Number of columns

  const { data: doneChallengeList, error } = useQuery({
    queryKey: ["getChallengesDone"],
    queryFn: () => getChallengesDone(),
  });

  useEffect(() => {
    if (doneChallengeList) {
      console.log(doneChallengeList);
    }
  }, []);

  if(!doneChallengeList) return <></>

  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader title="완료된 챌린지" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View
          style={styles.full}
          onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
        >
          <View style={styles.gridContainer}>
            {doneChallengeList.data.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.gridItem,
                  { width: (containerWidth - margins) / numColumns },
                ]}
              >
                <ChallengeCard
                  title={item.challengeName}
                  dateRange={"1413424234"}
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

export default DoneChallengeScreen;

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
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    marginBottom: 10,
  },
});
