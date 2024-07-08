import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../components/CustomHeader";
import ChallengeCard from "../../components/ChallengeCard";
import color from "../../assets/colors/colors";
import { useQuery } from "@tanstack/react-query";
import { getChallengesDone } from "../../apis/challenge";

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

  if (!doneChallengeList) return <></>;

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
                    navigation={navigation}
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
