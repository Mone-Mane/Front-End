import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AccountHistory from "../components/AccountHistory";
import CustomHeader from "../components/CustomHeader";
import DownIcon from "../assets/icons/down.svg";
import CreditCard from "../components/CreditCard";
import { getUsersAccountsLogsPeriod } from "../apis/history";
import { useQuery } from "@tanstack/react-query";
import DropDownPicker from "react-native-dropdown-picker";
import { getUsersMyPage } from "../apis/mypage";


const AccountScreen = ({ navigation }) => {
  const { data: myData, error1 } = useQuery({
    queryKey: ["getUsersMyPage"],
    queryFn: () => getUsersMyPage(),
  });
  
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState(1); // 초기값을 적절히 설정하세요
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "1개월", value: 1 },
    { label: "3개월", value: 3 },
    { label: "6개월", value: 6 },
  ]);

  const handlePeriodChange = (value) => {
    setPeriod(value); // period 값을 업데이트
  };

  const { data: myAccountHistory, error } = useQuery({
    queryKey: ["getUsersAccountsLogsPeriod", period],
    queryFn: () => getUsersAccountsLogsPeriod(period),
  });

  useEffect(() => {
    if (myAccountHistory) {
      console.log(myAccountHistory.data);
    }
  }, [myAccountHistory]);

  if (!myAccountHistory) return <></>;

  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader title="계좌내역조회" navigation={navigation} />
      <View style={styles.cardBox}>
        <CreditCard cardInfo={myData.data.account.card} engName={myData.data.userName}></CreditCard>
      </View>
      <View style={styles.searchMonth}>
        <DropDownPicker
          open={open}
          value={period}
          items={items}
          setOpen={setOpen}
          setValue={setPeriod}
          setItems={setItems}
          onChangeValue={handlePeriodChange}
          containerStyle={styles.pickerContainer}
          style={styles.picker}
          dropDownContainerStyle={styles.dropDown}
          textStyle={styles.text} // 폰트 스타일을 지정
        />
      </View>
      <FlatList
        data={myAccountHistory.data}
        keyExtractor={(item) => item.historyCode} // keyExtractor가 문자열을 반환하도록 설정
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item,index}) => (
          <View style={styles.accounthistorycontainer}>
            <AccountHistory keys={item.historyCode} transaction={item} />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f9f9f9",
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
    padding: 20,
    alignSelf: "flex-end",
    zIndex: 1000, // DropDownPicker가 다른 뷰보다 위에 있도록 설정
  },
  textMonth: {
    fontSize: 12,
    marginRight: 10,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  pickerContainer: {
    height: 40,
    width: 90,
  },
  picker: {
    backgroundColor: '#fafafa',
    borderWidth: 0, // 테두리 제거
    elevation: 0, // 그림자 제거 (안드로이드)
  
  },
  dropDown: {
    backgroundColor: '#ffffff',
    borderWidth: 0, // 드롭다운 리스트의 테두리 제거
    elevation: 0, // 그림자 제거 (안드로이드)
  },
  text:{
    fontSize:16
  }
});

export default AccountScreen;
