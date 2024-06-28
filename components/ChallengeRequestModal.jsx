import React, { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FireIcon from "../assets/icons/fire.svg";
import BadIcon from "../assets/icons/bad.svg";
import GoodIcon from "../assets/icons/good.svg";
import CloseIcon from "../assets/icons/close.svg";

const initialPlayerList = [
  {
    image: require("../assets/kawaii.png"),
    name: "아카네",
    phoneNumber: "010-2222-2222",
    userId: 1,
  },
  {
    image: require("../assets/kawaii.png"),
    name: "아카네1",
    phoneNumber: "010-2222-2222",
    userId: 12,
  },
  {
    image: require("../assets/kawaii.png"),
    name: "아카네",
    phoneNumber: "010-2222-2222",
    userId: 13,
  },
];

const ChallengeRequestModal = ({ isOpen, setIsOpen }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [addedPlayerList, setAddedPlayerList] = useState([]);
  const [currentPlayerList] = useState(initialPlayerList);
  const [searchedPlayerList] = useState(initialPlayerList);

  const onPressModalClose = () => {
    setIsOpen(false);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    // 검색 기능 추가 (필요시)
  };

  const addPlayer = (player) => {
    if (!addedPlayerList.some((item) => item.userId === player.userId)) {
      setAddedPlayerList([...addedPlayerList, player]);
    }
  };

  const removePlayer = (playerId) => {
    setAddedPlayerList(
      addedPlayerList.filter((item) => item.userId !== playerId)
    );
  };

  return (
    <Modal animationType="fade" visible={isOpen} transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <View style={styles.searchBar}>
              <TextInput
                style={styles.textInput}
                placeholder="Search here..."
                value={searchQuery}
                onChangeText={handleSearch}
                maxLength={20}
              />
              <TouchableOpacity onPress={() => handleSearch(searchQuery)}>
                <Ionicons
                  name="search"
                  size={20}
                  color="gray"
                  marginRight={6}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.addedUserListWrapper}>
              {addedPlayerList.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.profileWrapper, { position: "relative" }]}
                  onPress={() => removePlayer(item.userId)}
                >
                  <View
                    style={{
                      position: "absolute",
                      right: 0,
                      top: 0,
                      borderRadius: "50%",
                      zIndex: 99,
                      backgroundColor: "white",
                      opacity: 0.9,
                      height: 15,
                      width: 15,
                      alignSelf: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: "#d9d9d9",
                    }}
                  >
                    {/* <Text style={{ color: "white" }}>X</Text> */}
                    <CloseIcon width={15} height={15} />
                  </View>
                  <Image style={styles.profile} source={item.image} />
                  <Text style={{ fontSize: 8, fontFamily: "Regular" }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {searchedPlayerList.length > 0 ? (
              <>
                <Text style={styles.title}>검색된 플레이어</Text>
                {searchedPlayerList.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.playerWrapper}
                    onPress={() => addPlayer(item)}
                  >
                    <Image style={styles.profile} source={item.image} />
                    <View style={styles.playerInfoWrapper}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "Regular",
                          marginBottom: 4,
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text style={{ fontSize: 12, fontFamily: "Regular" }}>
                        {item.phoneNumber}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </>
            ) : (
              <>
                <Text style={styles.title}>최근 플레이어</Text>
                {currentPlayerList.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.playerWrapper}
                    onPress={() => addPlayer(item)}
                  >
                    <View key={index} style={styles.profileWrapper}>
                      <Image style={styles.profile} source={item.image} />
                      <Text style={{ fontSize: 8, fontFamily: "Regular" }}>
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </>
            )}
          </View>
          <View style={styles.buttonWrapper}>
            <Pressable
              disabled={addedPlayerList.length == 0}
              onPress={onPressModalClose}
              style={({ pressed }) => [
                styles.confirmButton,
                addedPlayerList.length == 0 && styles.confirmButtonDisabled,
                pressed && styles.confirmButtonPressed,
              ]}
            >
              <Text style={styles.buttonText}>추가하기</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ChallengeRequestModal;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#17191c",
  },
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
  modalView: {
    margin: 30,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
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
  searchBar: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "gray",
    paddingLeft: 10,
    margin: 5,
    borderRadius: 15,
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    height: 40,
  },
  itemText: {
    padding: 10,
    fontSize: 18,
  },
  addedUserListWrapper: {
    flexDirection: "row",
    // padding: 10,
    height: 80,
  },
  profileWrapper: {
    marginRight: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  profile: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "#D9D9D9",
  },
  playerWrapper: {
    flexDirection: "row",
    width: "100%",
  },
  playerInfoWrapper: {
    justifyContent: "center",
    marginBottom: 10,
    marginLeft: 6,
  },
  title: {
    fontFamily: "Bold",
    fontSize: 16,
    marginBottom: 6,
    marginTop: 6,
  },
  modalTextStyle: {
    color: "#17191c",
    fontWeight: "Bold",
    textAlign: "center",
    alignSelf: "center",
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
  confirmButtonDisabled: {
    backgroundColor: "#d9d9d9",
  },
  cancelButton: {
    flexDirection: "row",
    flex: 1,
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
    fontSize: 16,
    color: "#ffffff",
    fontFamily: "Bold",
  },
});
