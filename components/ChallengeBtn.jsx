import { StyleSheet, Text, TouchableOpacity, View, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";

const ChallengeBtn = ({ Keyword, users, index, clickedIndex, setClickedIndex,userInfo,minimumBalanceUser }) => {
  // const [clicked, setClicked] = useState(false);
  const [isMasterin,setIsMasterIn] = useState(null);
  const [isDisabled,setIsDisabled] = useState(false);
  const clicked =  clickedIndex === index;
  
  useEffect(()=>{
    if(minimumBalanceUser && Keyword.includes("원")){
      setIsDisabled(minimumBalanceUser.accountBalance<Number(Keyword.replace("원","").replace(",","")))
    }
  },[minimumBalanceUser])


  useEffect(()=>{
    if(users.length>0){
      setIsMasterIn( users.filter(user => user.master).length!==0)
    }else{
      setIsMasterIn(false)
    }
  },[users])

  


  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={[
          styles.button,
          isMasterin ? styles.clickedBtn : styles.notClickedBtn,
          !userInfo.master &&clicked ? styles.mySelect : null,
        ]}
        onPress={() => {
          if(isDisabled){
            Alert.alert(`${minimumBalanceUser.userName}님의 잔액이 부족합니다`)
          }else{
            setClickedIndex(clicked ? null : index)
          }
        }}
      >
        <Text
          style={[
            styles.textInput,
            isMasterin ? styles.clickedText : styles.notClickedText,
          ]}
        >
          {Keyword}
        </Text>
      </TouchableOpacity>
      <View style={styles.usersContainer}>
        {users && users.map((user, index) => (
          <Image
            key={index}
            source={{uri: user.userProfile}}
            style={[styles.userImage, { left: index * 12 }]}
          />
        ))}
      </View>
    </View>
  );
};

export default ChallengeBtn;

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    margin: 4,
    minWidth: 50, // 최소 너비 설정
  },
  textInput: {
    fontFamily: "Regular",
    fontSize: 12,
    alignItems: "center",
    justifyContent:"center"
  },
  notClickedBtn: {
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: "gray",
  },
  notClickedText: {
    color: "black",
  },
  clickedBtn: {
    backgroundColor: "#5A73F5",
    borderWidth: 0.5,
    borderColor: "gray",
  },
  clickedText: {
    color: "white",
  },
  usersContainer: {
    position: "absolute",
    top: -4,
    flexDirection: "row",
  },
  userImage: {
    width: 18,
    height: 18,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "white",
    position: "absolute",
  },
  mySelect: {
    borderColor: "#5A73F5",
    borderWidth: 2,
  },
});
