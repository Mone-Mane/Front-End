import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../components/CustomHeader";
import ChallengeCard from "../components/ChallengeCard";
import color from "../assets/colors/colors";
import HotRankingCard from "../components/HotRankingCard";
import ChallengeAcceptModal from "../components/ChallengeAcceptModal";

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

const SYTest = ({ navigation }) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const margins = 33 * 2; // Padding on each side
  const numColumns = 2; // Number of columns

  //모달
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader title="SYTest" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Pressable onPress={() => setIsModalVisible(true)}>
          <Text style={styles.textStyle}>Modal Open!</Text>
        </Pressable>
        <ChallengeAcceptModal
          isOpen={isModalVisible}
          setIsOpen={setIsModalVisible}
        />
        <View
          style={styles.full}
          onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
        >
          <Text>Test</Text>
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
            />
          </View>
          <FlatList
            data={DATA}
            columnWrapperStyle={styles.columnWrapper}
            renderItem={({ item }) => (
              <View
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
            )}
            keyExtractor={(item) => item.id}
            numColumns={numColumns}
          />
        </View>
      </ScrollView>
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
  },
});
