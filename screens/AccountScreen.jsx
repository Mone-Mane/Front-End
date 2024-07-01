import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AccountHistory from "../components/AccountHistory";
import CustomHeader from "../components/CustomHeader";
import DownIcon from "../assets/icons/down.svg";
import CreditCard from "../components/CreditCard";


state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({ search });
  };


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

const AccountScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader title="계좌내역조회" navigation={navigation} />
      <View style={styles.cardBox}>
              <CreditCard />
            </View>
            <View style={styles.searchMonth}>
              <Text style={styles.textMonth}>1개월</Text>
              <DownIcon width={24} height={24} />
            </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()} // keyExtractor가 문자열을 반환하도록 설정
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => (
          <View style={styles.accounthistorycontainer}>
            <AccountHistory key={item.id} transaction={item} />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  accounthistorycontainer: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  cardBox: {
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
  flatListContent: {
    paddingBottom: 20,
  },
});

export default AccountScreen;
