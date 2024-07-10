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
import React, { useState, useEffect } from "react";
import CustomHeader from "../../components/CustomHeader";
import AccountHistory from "../../components/AccountHistory";
import color from "../../assets/colors/colors";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUsersAccountsLogsPeriod } from "../../apis/history";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { diaryRequest } from "../../recoil/atoms/diary";

const { width, height } = Dimensions.get("window");

const ConsumptionSelect = ({ navigation }) => {
  

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedItems, setSelectedItmes] = useState([]);

  const { data: myAccountHistory, error,isLoading  } = useQuery({
    queryKey: ["getUsersAccountsLogsPeriod"],
    queryFn: () => getUsersAccountsLogsPeriod(3),
  });
  console.log(selectedItems)

  const[selectRequest, setSelectRequest] = useRecoilState(diaryRequest)

  useEffect(() => {
    if (myAccountHistory) {
      setFilteredData(myAccountHistory.data)
    }
  }, [myAccountHistory]);

  if (!myAccountHistory) return <></>;
  if (isLoading) return <Text>Loading...</Text>;


  const handleSearch = (text) => {
    setSearchQuery(text);
    filterData(text);
  };
  const handleSelectItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItmes(selectedItems.filter((i) => i !== item));
    } else {
      if (selectedItems.length >= 5) {
        Alert.alert("거래내역은 최대 5개까지 선택가능합니다");
        return;
      }
      setSelectedItmes([...selectedItems, item]);
    }
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectItem(item)}>
      <View
        style={[
          styles.accountItem,
          selectedItems.includes(item) ? styles.selectedItem : null,
        ]}
      >
        <AccountHistory transaction={item} />
      </View>
    </TouchableOpacity>
  );


  const filterData = (text) => {
    setSearchQuery(text);
    if (text) {
      const newData = myAccountHistory.data.filter(
        (item) =>
          item.historyOpposit && item.historyOpposit.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(newData);
    } else {
      setFilteredData(myAccountHistory.data);
    }
  };
  const toEditkeyword = () => {
    const copy = {...selectRequest};
    copy.diaryPayments = selectedItems.map((item)=>item.historyCode);
    setSelectRequest(copy)
    navigation.navigate("EditKeyword",{selectedItems: selectedItems});
  }


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
            keyExtractor={(item) => item.historyCode.toString()} // Ensure keyExtractor returns a string
            numColumns={1}
            scrollEnabled={true}
            contentContainerStyle={styles.flatListContent}
          />
        </View>
      </View>
      {selectedItems.length != 0 ? 
      (
        <View style={styles.container2}>
          <TouchableOpacity style={styles.button} onPress={toEditkeyword}>
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
