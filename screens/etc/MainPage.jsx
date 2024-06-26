import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Flame from "../../assets/icons/flame.svg";
import Palette from "../../assets/icons/palette.svg";
import CreditCard from "../../components/CreditCard";

const MainPage = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../assets/mainLogo.png")} // 대체 이미지 URL을 사용합니다.
        />
        <View style={styles.profileContainer}>
          <View style={styles.profilePersonContainer}>
            <Image
              style={styles.profileImage}
              source={require("../../assets/ferren.png")} // 대체 이미지 URL을 사용합니다.
            />
            <Text style={styles.profileName}>임태규님</Text>
          </View>
          <View style={styles.profileInfoContainer}>
            <Text style={styles.profileStatus}>진행중인 챌린지: 3개</Text>
            <Text style={styles.profileStatus}>물감: 30통</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <View style={styles.buttonTxtContainer}>
              <Flame></Flame>
              <Text style={styles.buttonText}>챌린지</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <View style={styles.buttonTxtContainer}>
              <Palette></Palette>
              <Text style={styles.buttonText}>그림일기</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainer}>
          <CreditCard></CreditCard>
        </View>
        <View style={styles.expenseContainer}>
          <Text style={styles.expenseTitle}>7월</Text>
          <Text style={styles.expenseAmount}>1,000,557원</Text>
          <View style={styles.expenseBarContainer}>
            <View
              style={[
                styles.expenseBar,
                { backgroundColor: "#1DB9C3", width: "37.2%" },
              ]}
            />
            <View
              style={[
                styles.expenseBar,
                { backgroundColor: "#6C5CE7", width: "31.3%" },
              ]}
            />
            <View
              style={[
                styles.expenseBar,
                { backgroundColor: "#FDCB6E", width: "4.2%" },
              ]}
            />
          </View>
          <View style={styles.expenseDetails}>
            <View style={styles.expenseDetail}>
              <Text>이체</Text>
              <Text>447,300원</Text>
            </View>
            <View style={styles.expenseDetail}>
              <Text>식비</Text>
              <Text>313,090원</Text>
            </View>
            <View style={styles.expenseDetail}>
              <Text>쇼핑</Text>
              <Text>42,500원</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 75,
    resizeMode: "contain",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "100%",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 5,
  },
  profilePersonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileInfoContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileStatus: {
    fontSize: 14,
    color: "#777",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  buttonTxtContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  button: {
    backgroundColor: "#5A73F5",
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 30,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 20,
  },
  cardContainer: {
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  expenseContainer: {
    width: "100%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  expenseTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  expenseAmount: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  expenseBarContainer: {
    flexDirection: "row",
    height: 10,
    marginBottom: 20,
    backgroundColor: "#b2bec3",
    borderRadius: 5,
  },
  expenseBar: {
    height: "100%",
  },
  expenseDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  expenseDetail: {
    alignItems: "center",
  },
});

export default MainPage;
