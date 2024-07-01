import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import CustomHeader from "../../components/CustomHeader";
import AccountHistory from "../../components/AccountHistory";
import color from "../../assets/colors/colors";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");
const data = [
  {
    id: "1",
    date: "06.16",
    name: "비디버거 성수",
    amount: "-17,400",
    balance: "143,000",
  },
  {
    id: "2",
    date: "06.16",
    name: "베트남 쌀국수",
    amount: "-17,400",
    balance: "143,000",
  },
  {
    id: "3",
    date: "06.16",
    name: "임태규",
    amount: "+50,000",
    balance: "143,000",
  },
  {
    id: "4",
    date: "06.15",
    name: "롯데리아",
    amount: "-50,000",
    balance: "143,000",
  },
  {
    id: "5",
    date: "06.15",
    name: "투썸플레이스",
    amount: "+50,000",
    balance: "143,000",
  },
  {
    id: "6",
    date: "06.14",
    name: "나이스두잉",
    amount: "+50,000",
    balance: "143,000",
  },
  {
    id: "7",
    date: "06.12",
    name: "임태규",
    amount: "+20,000",
    balance: "143,000",
  },
  {
    id: "8",
    date: "06.12",
    name: "스타벅스 한남",
    amount: "-5,500",
    balance: "137,500",
  },
  {
    id: "9",
    date: "06.11",
    name: "GS25",
    amount: "-3,200",
    balance: "134,300",
  },
  {
    id: "10",
    date: "06.10",
    name: "Subway",
    amount: "-8,900",
    balance: "125,400",
  },
  {
    id: "11",
    date: "06.09",
    name: "KFC",
    amount: "-13,500",
    balance: "111,900",
  },
  {
    id: "12",
    date: "06.08",
    name: "할리스 커피",
    amount: "-4,500",
    balance: "107,400",
  },
  {
    id: "13",
    date: "06.07",
    name: "홈플러스",
    amount: "-77,000",
    balance: "30,400",
  },
  {
    id: "14",
    date: "06.06",
    name: "CU 편의점",
    amount: "-2,800",
    balance: "27,600",
  },
  {
    id: "15",
    date: "06.05",
    name: "Netflix",
    amount: "-9,900",
    balance: "17,700",
  },
];

const ConsumptionSelect = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [selectedIds, setSelectedIds] = useState([]);


  const handleSearch = (text) => {
    setSearchQuery(text);
    filterData(text);
  };
  const handleSelectItem = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      if (selectedIds.length >= 5) {
        Alert.alert("거래내역은 최대 5개까지 선택가능합니다");
        return;
      }
      setSelectedIds([...selectedIds, id]);
    }
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectItem(item.id)}>
      <View
        style={[
          styles.accountItem,
          selectedIds.includes(item.id) ? styles.selectedItem : null,
        ]}
      >
        <AccountHistory transaction={item} />
      </View>
    </TouchableOpacity>
  );

  const filterData = (text) => {
    setSearchQuery(text);
    if (text) {
      const newData = data.filter(
        (item) =>
          item.name && item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  };
  const editkeyword = () => navigation.navigate("EditKeyword");


  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader title="소비 내역 선택" navigation={navigation} />
      <View style={styles.containerSearch}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.textInput}
            placeholder="Search here..."
            value={searchQuery}
            onChangeText={handleSearch}
            maxLength={20} // 최대 글자 수 제한 설정
          />
          <TouchableOpacity onPress={() => filterData(searchQuery)}>
            <Ionicons name="search" size={20} color="gray" marginRight={6} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container1}>
        <View style={{ flex: 1 }}>
          <FlatList
            nestedScrollEnabled
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()} // Ensure keyExtractor returns a string
            numColumns={1}
            scrollEnabled={true}
            contentContainerStyle={styles.flatListContent}
          />
        </View>
      </View>
      {selectedIds.length != 0 ? 
      (
        <View style={styles.container2}>
          <TouchableOpacity style={styles.button} onPress={editkeyword}>
            <Text style={styles.text}>소비 내역 추출하기</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default ConsumptionSelect;

const styles = StyleSheet.create({
  safe: {
    flex: 1, // SafeAreaView가 전체 화면을 차지하도록 설정
    backgroundColor: color.background,
  },
  flatListContent: {
    flexGrow: 1,
    overflow: "visible",
    minHeight: height - (height / 11 + height / 10 + 20),
  },
  containerSearch: {
    height: height / 11,
    marginTop: 10,
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  container1: {
    flexGrow: 1,
    height: height / 1.6,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  container2: {
    flexGrow: 1,
    height: height / 10,
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  accounthistorycontainer: {
    // flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  cardBox: {
    width: 150,
    height: 150,
    fontSize: 18,
    color: "#333",
    alignSelf: "center",
    marginVertical: 5,
  },
  searchMonth: {
    flexDirection: "row",
    padding: 20,
    marginRight: 2,
    alignSelf: "flex-end",
  },
  textMonth: {
    fontSize: 16,
    marginRight: 10,
  },
  searchBar: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "gray",
    paddingLeft: 10,
    margin: 5,
    borderRadius: 15,
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    height: 40,
  },
  itemText: {
    padding: 10,
    fontSize: 18,
  },
  selectedItem: {
    borderRadius: 20,
    backgroundColor: "rgba(90,115,245,0.3)", // 선택된 항목의 색상 변경
  },
  buttonDiv: {
    // flex:1
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: color.primary,
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontFamily: "Bold",
    letterSpacing: 0.25,
    color: "white",
  },
  listContainer: {
    paddingBottom: 20, // 리스트의 끝에 여백을 추가합니다.
  },
});
