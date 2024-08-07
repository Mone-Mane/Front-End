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
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../components/CustomHeader";
import color from "../../assets/colors/colors";
import HotRankingCard from "../../components/HotRankingCard";
import DrawIcon from "../../assets/icons/draw.svg";
import PrecautionsIcon from "../../assets/icons/diary-precautions";
import { useQuery } from "@tanstack/react-query";
import { getDiaryHot, getDiaryHomeList } from "../../apis/diary";



const DiaryHome = ({ navigation }) => {
  const picturecreate = () => navigation.navigate("ConsumptionSelect");
  const diarycheck = () => navigation.navigate("DiaryCheck");

  [diarylist, setDiaryList] = useState([]);


  const { data: diaryHotList, error } = useQuery({
    queryKey: ["getDiaryHot"],
    queryFn: () => getDiaryHot(),
  });

  // 홈에서 내가 만든 일기보기 6개
  const { data: diaryHomeList } = useQuery({
    queryKey: ["getDiaryHomeList"],
    queryFn: () => getDiaryHomeList(),
  });

  useEffect(() => {
    if (diaryHotList) {
      console.log(diaryHotList.data);
    }
  }, [diaryHotList]);

  useEffect(() => {
    if (diaryHomeList) {
      console.log(diaryHomeList.data);
      setDiaryList(diaryHomeList.data)
    }
  }, [diaryHomeList]);

  const windowWidth = Dimensions.get("window").width;

  const renderImageItem = ({ item, index }) => (
    <Image
      source={{uri:item}}
      style={[
        styles.image,
        { width: (windowWidth - 90) / 2 },
        index % 2 === 0 ? { marginRight: 4 } : { marginLeft: 5 },
      ]}
    />
  );



  if (!diaryHotList && !diaryHomeList) return <></>;

  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader title="그림일기" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.createButton} onPress={picturecreate}>
          <DrawIcon marginleft={-50} />
          <Text style={styles.createButtonText}>그림일기 생성하기</Text>
        </TouchableOpacity>
        <View style={styles.diaryMore}>
          <Text style={styles.subHeader}>Sync가 그려준 일기</Text>
          <TouchableOpacity onPress={diarycheck}>
            <Text style={styles.subHeaderight}>더보기</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <FlatList
            data={diarylist}
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
          <Text style={styles.policyTitle}>그림일기 유의사항 안내</Text>
          <Text style={styles.policySubTitle}>Hana x Sync 통장 필수</Text>
          <Text style={styles.policyContent}>그림일기 서비스는 Hana x Sync 통장에 가입한 경우에만</Text>
          <Text style={styles.policyContent}>이용이 가능합니다. 상품 가입 여부를 확인해주세요.</Text>
          <Text style={styles.policySubTitle}>페인트 통 필요</Text>
          <Text style={styles.policyContent}>그림일기 생성에는 1개의 물감이 필요합니다.</Text>
          <Text style={styles.policyContent}>물감이 충분히 있는 지 확인해주세요.</Text>
          <Text style={styles.policySubTitle}>데이터 보관 기관</Text>
          <Text style={styles.policyContent}>사진과 계좌 내역에 관련된 정보는 그림일기 생성일로부터</Text>
          <Text style={styles.policyContent}>3개월 후 자동으로 삭제됩니다.</Text>
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
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden"
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
  diaryMore:{
    flexDirection:"row",
    justifyContent:"space-between"
  },
  subHeader: {
    fontSize: 20,
    fontFamily: "ExtraBold",
    marginBottom: 10,
  },
  subHeaderight: {
    fontSize: 14,
    fontFamily: "Bold",
    marginBottom: 10,
    marginRight:4
  },
  hotText: {
    fontSize: 20,
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
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden"
  },
  hotItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  chart: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 20,
    paddingVertical: 15,
    paddingHorizontal: 20
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
  policyTitle: {
    fontFamily: "Bold",
    fontSize: 16,
    marginBottom: 10
  },
  policySubTitle: {
    fontFamily: "Bold",
    fontSize: 14,
    marginVertical: 5
  },
  policyContent:{
    fontFamily: "Regular",
    fontSize: 12
  }
});

export default DiaryHome;
