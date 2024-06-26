import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AccountHistory = (props) => {
  const { transaction } = props;
  // // 테스트용 데이터
  // const transaction = {
  //   date: "5.16",
  //   name: "베트남 칼국수",
  //   amount: "+17,400원",
  //   balance: "143,000원"
  // };

  // 금액에 따라 스타일을 동적으로 결정
  const amountStyle = transaction.amount.startsWith('+') ? styles.positiveAmount : styles.negativeAmount;

  return (
    <View style={styles.contactItem}>
      <View style={styles.contactHistory}>
        <View>
          <Text style={styles.contactDate}>{transaction.date}</Text>
        </View>
        <View>
          <Text style={styles.contactName}>{transaction.name}</Text>
        </View>
      </View>
      <View style={styles.contactAmount}>
        <Text style={amountStyle}>{transaction.amount}원</Text>
        <Text style={styles.useBalance}>{transaction.balance}원</Text>
      </View>
    </View>
  )
}

export default AccountHistory

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  contactItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor:'#eee', 
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  contactHistory: {
    flexDirection: 'row',
    padding: 10,
  },
  contactDate: {
    fontSize: 14,
    color:'gray',
    marginRight:10
  },
  contactName: {
    marginTop:-2,
    fontSize: 16,
  },
  contactAmount: {
    marginRight:16,
    alignItems:'flex-end',
  },
  useAmount: {
    fontSize: 16,
    fontWeight:'bold'
  },
  positiveAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5A73F5', // 긍정적인 금액의 색상
  },
  negativeAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  useBalance:{
    fontSize:12,
    color:"gray"
  }
})
