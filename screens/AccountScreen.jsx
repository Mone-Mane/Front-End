import React, {useState} from 'react';
import { View, StyleSheet, FlatList, Text,TouchableHighlight, ScrollView} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
// import { Card } from 'react-native-elements';
import AccountHistory from '../components/AccountHistory';
import CustomHeader from "../components/CustomHeader";
import DownIcon from "../assets/icons/down.svg"
import ProgreesBar from "../components/ProgressBar"
import CreditCard from "../components/CreditCard";


state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

const transactions = [
  { id: '1', date: '06.16', name: '비디버거 성수', amount: '-17,400',balance: "143,000" },
  { id: '2', date: '06.16', name: '베트남 쌀국수', amount: '-17,400',balance: "143,000" },
  { id: '3', date: '06.16', name: '임태규', amount: '+50,000',balance: "143,000" },
  { id: '3', date: '06.16', name: '임태규', amount: '+50,000',balance: "143,000" },
  { id: '3', date: '06.16', name: '임태규', amount: '+50,000',balance: "143,000" },
  { id: '3', date: '06.16', name: '임태규', amount: '+50,000',balance: "143,000" },
  { id: '3', date: '06.16', name: '임태규', amount: '+50,000',balance: "143,000" },
  { id: '3', date: '06.16', name: '임태규', amount: '+50,000',balance: "143,000" },
  { id: '3', date: '06.16', name: '임태규', amount: '+50,000',balance: "143,000" },
  { id: '3', date: '06.16', name: '임태규', amount: '+50,000',balance: "143,000" },
  // 추가 거래 내역
];


const AccountScreen = ({navigation}) => {
    const { search } = this.state;
    const [ProgressValue, setProgressValue] = useState(90);
    return (
      <SafeAreaView style={styles.safe}>
      <CustomHeader title="계좌내역조회" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
            <View style={styles.cardBox}>
              <CreditCard></CreditCard>              
            </View>
            <View style={styles.searchMonth}>
                <Text style={styles.textMonth}>1개월</Text>
                <DownIcon width={24} height={24}/>
            </View>
            
            <View style={styles.accounthistorycontainer}>
            {transactions.map((item,index)=>(
              <AccountHistory key={index} transaction={item} />
            ))}
            
            </View>
        </View>
        </ScrollView>
        </SafeAreaView>
      );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9'
  },
  accounthistorycontainer: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff'
  },
  cardBox: {
    fontSize: 18,
    color: '#333',
    alignSelf: 'center',
    marginVertical: 5
  },
  searchMonth: {
    flexDirection:"row",
    padding:20,
    marginRight:2,
    alignSelf:'flex-end',
  },
  textMonth:{
    fontSize:16,
    marginRight:10
  }
});

export default AccountScreen;
