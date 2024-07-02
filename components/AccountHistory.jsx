import { StyleSheet, Text, View } from "react-native";
import React from "react";

const AccountHistory = (props) => {
  const { transaction } = props;
  if (!transaction) {
    return (
      <View style={styles.contactItem}>
        <View style={styles.contactHistory}>
          <View>
            <Text style={styles.contactDate}>
              {transaction.historyDate} 사용 내역 없음
            </Text>
          </View>
        </View>
      </View>
    );
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // getMonth() returns 0-11
    const day = date.getDate();
    return `${month}.${day}`;
  };

  const formatAmount = (amount) => {
    if (typeof amount === "number") {
      return amount.toLocaleString("ko-KR");
    } else if (typeof amount === "string") {
      const numberAmount = parseFloat(amount.replace(/[^0-9.-]+/g, ""));
      return numberAmount.toLocaleString("ko-KR");
    } else {
      return amount; // return the original amount if it's not a string or number
    }
  };

  const formatHistoryAmount = (amount) => {
    const numberAmount = Math.abs(parseFloat(amount));
    const formattedAmount = formatAmount(numberAmount);
    if (amount < 0) {
      return formattedAmount; // 음수일 경우 - 제거
    } else {
      return `-${formattedAmount}`; // 양수일 경우 - 추가
    }
  };
  // 금액에 따라 스타일을 동적으로 결정
  const historyAmount = parseFloat(transaction.historyAmount);
  const amountStyle =
    historyAmount < 0 ? styles.positiveAmount : styles.negativeAmount;

  return (
    <View style={styles.contactItem}>
      <View style={styles.contactHistory}>
        <View>
          <Text style={styles.contactDate}>
            {formatDate(transaction.historyDate)}
          </Text>
        </View>
        <View>
          <Text style={styles.contactName}>{transaction.historyOpposit}</Text>
        </View>
      </View>
      <View style={styles.contactAmount}>
        <Text style={amountStyle}>{formatHistoryAmount(historyAmount)}원</Text>
        <Text style={styles.useBalance}>
          {formatAmount(transaction.historyAfterBalance)}원
        </Text>
      </View>
    </View>
  );
};

export default AccountHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  contactItem: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#eee",
    padding: 10,
  },
  contactHistory: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "center",
  },
  contactDate: {
    fontSize: 10,
    fontFamily: "Regular",
    color: "gray",
    marginRight: 10,
  },
  contactName: {
    marginTop: -2,
    fontFamily: "Bold",
    justifyContent: "center",
    alignItems: "flex-start",
    fontSize: 16,
  },
  contactAmount: {
    marginRight: 16,
    alignItems: "flex-end",
  },
  useAmount: {
    fontSize: 16,
    fontFamily: "Bold",
  },
  positiveAmount: {
    fontSize: 14,
    fontFamily: "ExtraBold",
    color: "#5A73F5", // 긍정적인 금액의 색상
    marginBottom: 5,
  },
  negativeAmount: {
    fontSize: 14,
    fontFamily: "ExtraBold",
    marginBottom: 5,
  },
  useBalance: {
    fontSize: 12,
    color: "gray",
  },
});
