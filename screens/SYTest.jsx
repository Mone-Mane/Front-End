import {
  StyleSheet,
  Text,
  View,
  FlatList,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../components/CustomHeader";
import ChallengeCard from "../components/ChallengeCard";
import color from "../assets/colors/colors";

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
    id: "4",
    title: "커피 줄이기냠냠냠냠",
    dateRange: "06.07 - 06.13",
    status: "성공",
    success: true,
  },
];

const SYTest = ({ navigation }) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const margins = 33 * 2; // Padding on each side
  const numColumns = 2; // Number of columns

  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader title="SYTest" navigation={navigation} />
      <View
        style={styles.full}
        onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
      >
        <Text>Test</Text>
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
    </SafeAreaView>
  );
};

export default SYTest;

const styles = StyleSheet.create({
  safe: {
    backgroundColor: color.background,
    flex: 1,
  },
  full: {
    padding: 20,
    flex: 1,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 10,
  },
  gridItem: {
    marginBottom: 10,
  },
});
