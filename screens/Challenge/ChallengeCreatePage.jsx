import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import CustomHeader from "../../components/CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import UserComponents from "./../../components/UserComponents";
import ChallengeBtn from "../../components/ChallengeBtn"; // Import the updated component
import { postChallengesOpening } from "../../apis/challenge";
import { useMutation } from "@tanstack/react-query";

const ChallengeCreatePage = ({ navigation }) => {
  const screenWidth = Dimensions.get("window").width;
  const itemSpacing = screenWidth * 0.02; // 화면 너비의 2%를 간격으로 설정

  // const createRoom = useMutation({
  //   mutationFn: () => postChallengesOpening(),
  //   onSuccess: (data) => {
  //     console.log("수정 성공!:", data);
  //   },
  //   onError: (error) => {
  //     console.error("수정 실패:", error);
  //     alert(`Error updating title: ${error.message}`);
  //   },
  // });

  // useEffect(() => {
  //   createRoom.mutate();
  // }, []);

  // useEffect(() => {
  //   if (createRoom.data) {
  //     console.log("생성된 방 데이터:", createRoom);
  //   }
  // }, [createRoom.data]);

  const [categoryClickedIndex, setCategoryClickedIndex] = useState(null);
  const [costClickedIndex, setCostClickedIndex] = useState(null);
  const [dateClickedIndex, setDateClickedIndex] = useState(null);

  const images = [
    { img: require("../../assets/cave_painting.png"), name: "슈타르크" },
    { img: require("../../assets/pixel_art.png"), name: "페른" },
    { img: require("../../assets/East_Asian_painting.png"), name: "아키네" },
    { img: require("../../assets/Japanese_anime.png"), name: "힘멜" },
  ];

  const challengecategorys = [
    {
      name: "커피 줄이기",
      users: [
        { usercode: "", img: require("../../assets/cave_painting.png") },
        { usercode: "", img: require("../../assets/pixel_art.png") },
      ],
    },
    {
      name: "택시 줄이기",
      users: [
        { usercode: "", img: require("../../assets/East_Asian_painting.png") },
        { usercode: "", img: require("../../assets/Japanese_anime.png") },
      ],
    },
    {
      name: "술 줄이기",
      users: [],
    },
    {
      name: "야식 줄이기",
      users: [
        { usercode: "", img: require("../../assets/cave_painting.png") },
      ],
    },
  ];

  const handleCategoryClick = (index) => {
    setCategoryClickedIndex(index);
    // socket.emit("categoryClickedIndex", index); // WebSocket 이벤트를 나중에 추가할 수 있도록 주석 처리
  };

  const handleCostClick = (index) => {
    setCostClickedIndex(index);
    // socket.emit("costClickedIndex", index); // WebSocket 이벤트를 나중에 추가할 수 있도록 주석 처리
  };

  const handleDateClick = (index) => {
    setDateClickedIndex(index);
    // socket.emit("dateClickedIndex", index); // WebSocket 이벤트를 나중에 추가할 수 있도록 주석 처리
  };

  const challengecost = ["3,000원", "5,000원", "10,000원", "12,000원"];
  const challengedate = ["1주", "2주", "3주", "4주"];

  const renderImageItem = ({ item, index }) => <UserComponents props={item} />;
  const renderCategoryItem = ({ item, index }) => (
    <View style={[styles.itemContainer, { marginHorizontal: itemSpacing / 4 }]}>
      <ChallengeBtn Keyword={item.name} users={item.users} index={index}
      clickedIndex={categoryClickedIndex}
      setClickedIndex={setCategoryClickedIndex} />
    </View>
  );
  const renderCostItem = ({ item, index }) => (
    <View style={[styles.itemContainer, { marginHorizontal: itemSpacing / 4 }]}>
      <ChallengeBtn Keyword={item} 
      users={item.users} index={index}
      clickedIndex={costClickedIndex}
        setClickedIndex={setCostClickedIndex}/>
    </View>
  );
  const renderDateItem = ({ item, index }) => (
    <View style={[styles.itemContainer, { marginHorizontal: itemSpacing / 4 }]}>
      <ChallengeBtn Keyword={item} 
      users={item.users} index={index}
      clickedIndex={dateClickedIndex}
      setClickedIndex={setDateClickedIndex}/>
    </View>
  );

  const formatNumber = (num) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const handleChangeText = (text) => {
    const cleanedText = text.replace(/,/g, ""); // 기존 컴마 제거
    if (cleanedText.length > 1 && cleanedText.startsWith("0")) {
      Alert.alert("입력 오류", "0으로 시작할 수 없습니다.");
      setSearchQuery(""); // 입력된 값 지우기
      return;
    }
    const maxAmount = 1000000;
    if (parseInt(cleanedText, 10) > maxAmount) {
      Alert.alert("입력 오류", `최대 금액은 ${formatNumber(maxAmount.toString())} 원 입니다.`);
      return;
    }
    const formattedText = formatNumber(cleanedText);
    setSearchQuery(formattedText);
  };

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader title={"챌린지 생성"} navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.container}>
          <View style={styles.userSpot}>
            <FlatList
              data={images}
              horizontal
              keyExtractor={(item, index) => index.toString()}
              marginVertical={-20}
              marginLeft={8}
              contentContainerStyle={styles.flatListContent}
              renderItem={renderImageItem}
            />
          </View>
          <View style={styles.categorySpot}>
            <View flex={1}>
              <Text style={styles.categortText} marginVertical={10}>
                카테고리
              </Text>
              <FlatList
                data={challengecategorys}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderCategoryItem}
              />
            </View>
            <View flex={1}>
              <Text style={styles.categortText} marginVertical={10}>
                참가비
              </Text>
              <FlatList
                data={challengecost}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderCostItem}
              />
            </View>
            <View flex={1}>
              <Text style={styles.categortText} marginVertical={10}>
                챌린지 기간
              </Text>
              <FlatList
                data={challengedate}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderDateItem}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ alignItems: "center" }}
              />
            </View>
            <View flex={1} marginBottom={30}>
              <Text style={styles.categortText} marginVertical={10}>
                목표 금액
              </Text>
              <View style={styles.inputSpot}>
                <TextInput
                  style={styles.textInput}
                  value={searchQuery}
                  maxLength={20}
                  onChangeText={handleChangeText}
                  textAlign="center" // 텍스트 가운데 정렬
                  keyboardType="numeric" // 숫자 키보드 사용 (필요에 따라)
                />
                <Text style={styles.amountText}>원</Text>
              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#5A73F5" }]}
            >
              <Text style={styles.buttonText}>시작하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "gray" }]}
            >
              <Text style={styles.buttonText}>취소하기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.useImage}>
            <Image
              source={require("../../assets/challengeImage_sub.png")}
              width={300}
              height={300}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChallengeCreatePage;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  scroll: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  userSpot: {
    flex: 0.2,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    marginVertical: 16,
    justifyContent: "center",
  },
  flatListContent: {
    flexDirection: "row",
    marginBottom: 20, // 필요에 따라 상하 패딩 추가
  },
  itemContainer:{
    marginTop:5
  },
  categorySpot: {
    paddingHorizontal: 10,
    flex: 4,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    padding: 10, // 필요에 따라 조정
  },
  button: {
    flex: 1,
    margin: 5, // 버튼 간의 간격을 위해 사용
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    height: 55,
  },
  buttonText: {
    color: "white",
    fontFamily: "Bold",
    fontSize: 20,
  },
  useImage: {
    flex: 1,
    alignItems: "center",
  },
  categortText: {
    fontSize: 20,
    fontFamily: "Bold",
  },
  inputSpot: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
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
  amountText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: "Bold",
  },
});
