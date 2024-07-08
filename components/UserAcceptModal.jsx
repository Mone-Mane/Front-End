import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FireIcon from "../assets/icons/fire.svg";
import BadIcon from "../assets/icons/bad.svg";
import GoodIcon from "../assets/icons/good.svg";
import React, { useEffect } from "react";
import UserComponents from "./UserComponents";

const UserAcceptModal = ({ isOpen, setIsOpen, users }) => {
  const onPressModalClose = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    const exceptMaster = users.filter((user) => user.master === false);
    if(exceptMaster.length === 0 || exceptMaster.every((user) => user.accepted)){
      setIsOpen(false)
    }
  }, [users]);
  const renderUser = ({ item, index }) =>{ return <UserComponents props={item}/>};
  return (
    <Modal animationType="fade" visible={isOpen} transparent={true} >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalContent}>
                <View style={styles.textWrapper}>
                  <Text style={styles.modalTextStyle}>
                    챌린지 참여자들의 수락을 기다리고 있어요!
                  </Text>
                </View>
              </View>
              <View style={styles.buttonWrapper}>
                <FlatList style={styles.usersWrapper} data={users.filter((user) => user.master === false)} renderItem={renderUser} keyExtractor={(item) => item.userName} />
              </View>
            </View>
          </View>
      </Modal>
  );
};

export default UserAcceptModal;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#17191c",
  },

  /**
   * 일반 화면 영역
   */
  textStyle: {
    color: "white",
    fontWeight: "Bold",
    textAlign: "center",
    marginBottom: 50,
  },
  viewContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 400,
  },
  textWrapper: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "flex-start",
    height: 70,
  },
  usersWrapper:{
    flexDirection: "row",
    alignContent: "center",
  },
  /**
   * 모달 화면 영역
   */
  modalView: {
    // marginTop: "auto",
    margin: 30,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContent: {
    alignItems: "flex-start",
  },
  icon: { alignSelf: "center" },

  modalTextStyle: {
    color: "#17191c",
    fontFamily: "Bold",
    textAlign: "left",
    fontSize: 14,
  },

  centeredView: {
    flex: 1,
    alignContent: "center",
    textAlignVertical: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },

  buttonWrapper: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "gray",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    marginTop: 20,
  },
  confirmButton: {
    flexDirection: "row",
    flex: 1,
    height: 57,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#5A73F5",
    borderRadius: 16,
  },
  cancelButton: {
    flexDirection: "row",
    flex: 1,
    // marginLeft: "10%",
    marginLeft: 10,
    height: 57,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#FFCF73",
    borderRadius: 16,
  },
  buttonIcon: {
    alignSelf: "center",
    marginRight: 5,
  },
  buttonText: {
    alignSelf: "center",
    fontSize: 24,
    color: "#ffffff",
    fontFamily: "Bold",
  },
});
