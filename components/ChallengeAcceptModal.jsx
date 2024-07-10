import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import FireIcon from "../assets/icons/fire.svg";
import BadIcon from "../assets/icons/bad.svg";
import GoodIcon from "../assets/icons/good.svg";
import React, { useState } from "react";

const ChallengeAcceptModal = ({
  isOpen,
  setIsOpen,
  masterdata,
  acceptChallenge,
  rejectChallenge,
}) => {
  const onPressModalClose = () => {
    setIsOpen();
  };
  const [isAccepted, setIsAccepted] = useState(false);
  return (
    <Modal animationType="fade" visible={isOpen} transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <View style={styles.textWrapper}>
              <FireIcon width={23} height={25} style={styles.icon} />
              <Text style={styles.modalTextStyle}>{masterdata?.date}동안</Text>
            </View>
            <View style={styles.textWrapper}>
              <FireIcon width={23} height={25} style={styles.icon} />
              <Text style={styles.modalTextStyle}>
                {masterdata?.goalAmount}원 이하로
              </Text>
            </View>
            <View style={styles.textWrapper}>
              <FireIcon width={23} height={25} style={styles.icon} />
              <Text style={styles.modalTextStyle}>{masterdata?.category}</Text>
            </View>
          </View>
          <View style={styles.buttonWrapper}>
            {isAccepted ? (
              <>
                <Text style={styles.modalTextStyle}>다른 사람들의 수락을 기다리고 있어요!</Text>
              </>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => {
                    acceptChallenge();
                    setIsAccepted(true);
                  }}
                  style={styles.confirmButton}
                >
                  <GoodIcon width={34} height={34} style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>수락</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=>{onPressModalClose(); rejectChallenge();}}
                  style={styles.cancelButton}
                >
                  <BadIcon width={34} height={34} style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>거절</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ChallengeAcceptModal;

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
    height: 35,
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
    textAlign: "center",
    alignSelf: "center",
    fontSize: 16,
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
