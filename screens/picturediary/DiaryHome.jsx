import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../components/CustomHeader";
import color from "../../assets/colors/colors";
import HotRankingCard from "../../components/HotRankingCard";
import DrawIcon from "../../assets/icons/draw.svg";
import PrecautionsIcon from "../../assets/icons/diary-precautions"
import { useQuery } from "@tanstack/react-query";
import { getDiaryHot } from "../../apis/diary";

const images = [
  require("../../assets/cave_painting.png"),
  require("../../assets/pixel_art.png"),
  require("../../assets/East_Asian_painting.png"),
  require("../../assets/Japanese_anime.png"),
  require("../../assets/kawaii.png"),
  require("../../assets/oil_painting.png"),
  require("../../assets/pastel.png"),
  require("../../assets/caricature.png"),
];

const getPairedImages = (images) => {
  const pairedImages = [];
  for (let i = 0; i < images.length; i += 2) {
    pairedImages.push(images.slice(i, i + 2));
  }
  return pairedImages;
};

const DiaryHome = ({ navigation }) => {
  const picturecreate = () => navigation.navigate("ConsumptionSelect");
  
  const { data: diaryHotList, error } = useQuery({
    queryKey: ["getDiaryHot"],
    queryFn: () => getDiaryHot(),
  });

  useEffect(() => {
    if(diaryHotList){
      console.log(diaryHotList.data)
    }
  }, [diaryHotList])

  const windowWidth = Dimensions.get("window").width;

  const renderImageItem = ({ item, index }) => (
    <Image
      source={item}
      style={[
        styles.image,
        { width: (windowWidth - 90) / 2 },
        index % 2 === 0 ? { marginRight: 4 } : { marginLeft: 5 },
      ]}
    />
  );

  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader title="그림일기" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.createButton} onPress={picturecreate}>
          <DrawIcon marginleft={-50} />
          <Text style={styles.createButtonText}>그림일기 생성하기</Text>
        </TouchableOpacity>
        <Text style={styles.subHeader}>Sync가 그려준 일기</Text>
        <View style={styles.container}>
          <FlatList
            data={images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.pagerView}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderImageItem}
          />
        </View>
        <View>
          <Text style={styles.hotText}>주간 HOT! 그림체</Text>
          <View style={styles.hotList}>
            {diaryHotList.data.map((item, index) => (
              <HotRankingCard
                key={index}
                medal={index}
                title={item.diaryConcept}
                participants={item.diaryConceptCount}
              />
            ))}
          </View>
        </View>
        <View style={styles.chart}>
          <PrecautionsIcon/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    backgroundColor: color.background,
    flex: 1,
  },
  scrollContainer: {
    backgroundColor: color.background,
    flexGrow: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  container: {
    flex: 1,
    padding: 16,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Bold",
  },
  createButton: {
    flexDirection: "row",
    height: 60,
    backgroundColor: color.primary,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
  },
  createButtonText: {
    fontFamily: "Bold",
    color: "#fff",
    fontSize: 20,
    marginLeft: 10,
  },
  subHeader: {
    fontSize: 18,
    fontFamily: "ExtraBold",
    marginBottom: 10,
  },
  hotText: {
    fontSize: 18,
    fontFamily: "ExtraBold",
    marginTop: 30,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  subText: {
    fontSize: 32,
    fontFamily: "Bold",
    marginLeft: 20,
    marginTop: 15,
    alignSelf: "flex-start",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  hotList: {
    borderRadius: 5,
    marginBottom: 20,
  },
  hotItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  chart: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    marginTop:30
  },
  chartImage: {
    borderRadius: 10,
    width: 200,
    height: 200,
    margin: 10,
    marginBottom: 50,
  },
  pagerView: {
    height: 150,
  },
  page: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default DiaryHome;
