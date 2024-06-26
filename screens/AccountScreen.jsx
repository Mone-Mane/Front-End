import React from 'react';
import { View, StyleSheet, FlatList, Text,TouchableHighlight} from 'react-native';
// import { Card } from 'react-native-elements';
import AccountHistory from '../components/AccountHistory';
import { SearchBar } from 'react-native-elements';
import cavePainting from '../assets/cave_painting.png'; // Make sure the path is correct


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
  // 추가 거래 내역
];

const AccountScreen = () => {
    const { search } = this.state;
    return (
        <View style={styles.container}>
            <View style={styles.cardBox}>              
            </View>
            <View style={styles.searchMonth}>
                <Text style={styles.textMonth}>1개월</Text>
            </View>
            <View style={styles.accounthistorycontainer}>
            <FlatList
            data={transactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item ,separators}) => (
                <TouchableHighlight
                    key={item.key}
                    // OnPress 에 상세보기 하는 거넣으면 좋을듯..
                    onPress={() => this._onPress(item)}
                    onShowUnderlay={separators.highlight}
                    onHideUnderlay={separators.unhighlight}>
                    <AccountHistory transaction={item} />
                </TouchableHighlight>
            )}
          />
            </View>
        </View>
      );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8'
  },
  accounthistorycontainer: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff'
  },
  cardBox: {
    width:150,
    height:150,
    fontSize: 18,
    color: '#333',
    alignSelf: 'center',
    marginVertical: 5
  },
  searchMonth: {
    padding:20,
    marginRight:16,
    alignItems:'flex-end',
  },
  textMonth:{
    fontSize:16
  }
});

export default AccountScreen;
