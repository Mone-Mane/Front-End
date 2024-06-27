import {
  StyleSheet,
  View,
  FlatList,
  Pressable,
  Image,
  Text,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../components/CustomHeader";
import color from "../../assets/colors/colors";

const images = [
  { source: require("../../assets/cave_painting.png"), label: "#동굴 벽화" },
  { source: require("../../assets/pixel_art.png"), label: "#픽셀아트" },
  { source: require("../../assets/East_Asian_painting.png"), label: "#동양화" },
  {
    source: require("../../assets/Japanese_anime.png"),
    label: "#일본 애니메이션",
  },
  { source: require("../../assets/kawaii.png"), label: "#귀여움" },
  { source: require("../../assets/oil_painting.png"), label: "#유화" },
  { source: require("../../assets/pastel.png"), label: "#파스텔" },
  { source: require("../../assets/caricature.png"), label: "#캐리커쳐" },
];

const tags = [
  "유화",
  "동양화",
  "일본 애니메이션",
  "귀여움",
  "캐리커쳐",
  "동굴 벽화",
  "파스텔",
  "픽셀아트",
];

const SelectCategoryScreen = ({ navigation }) => {
  const [selectedTag, setSelectedTag] = useState(null);

  const handleTagPress = (tag) => {
    setSelectedTag(tag);
  };

  const renderTagItem = ({ item }) => (
    <Pressable
      onPress={() => handleTagPress(item)}
      style={[styles.tag, selectedTag === item && styles.selectedTag]}
    >
      <Text
        style={[styles.tagText, selectedTag === item && styles.selectedTagText]}
      >
        {item}
      </Text>
    </Pressable>
  );

  const renderItem = ({ item, index }) => (
    <View style={[styles.gridItem, index % 2 === 0 && { marginRight: 10 }]}>
      <Image source={item.source} style={styles.image} />
      <Text style={styles.label}>{item.label}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader title="그림체 선택" navigation={navigation} />
      <View style={styles.contentWrapper}>
        <Text style={styles.contentTitle}>그림체 선택하기</Text>
        <View style={styles.tagContainer}>
          <FlatList
            data={tags}
            renderItem={renderTagItem}
            keyExtractor={(item) => item}
            numColumns={3}
            scrollEnabled={false}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.tagScrollContainer}
          />
        </View>
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.scrollContainer}
        />
        <View style={styles.confirmButtonContainer}>
          <Pressable style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>그림일기 생성하기</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SelectCategoryScreen;

const styles = StyleSheet.create({
  safe: {
    backgroundColor: color.background,
    flex: 1,
  },
  contentWrapper: {
    backgroundColor: "#ffffff",
    margin: 20,
    borderRadius: 16,
    flex: 1,
  },
  contentTitle: {
    fontSize: 20,
    fontFamily: "Bold",
    marginTop: 16,
    marginLeft: 24,
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignSelf: "center",
  },
  tagScrollContainer: {
    flexGrow: 0,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  columnWrapper: {
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  gridItem: {
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    marginTop: 10,
    textAlign: "center",
    fontFamily: "Bold",
    fontSize: 10,
  },
  tagContainer: {
    marginBottom: 20,
  },
  tag: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#DFEAFF",
    marginRight: 10,
    marginBottom: 10,
  },
  selectedTag: {
    backgroundColor: "#5A73F5",
  },
  tagText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "Regular",
  },
  selectedTagText: {
    color: "#FFF",
  },
  confirmButtonContainer: {
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 16,
  },
  confirmButton: {
    backgroundColor: color.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Heavy",
  },
});
