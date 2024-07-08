import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import CustomHeader from "../../components/CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import UserComponents from "./../../components/UserComponents";
import ChallengeBtn from "../../components/ChallengeBtn"; // Import the updated component
import {
  getMyUser,
  postChallengesInvitation,
  postChallengesOpening,
  getChallengesRecentList
} from "../../apis/challenge";
import { useMutation, useQuery } from "@tanstack/react-query";
import ChallengeRequestModal from "../../components/ChallengeRequestModal";
import * as Contacts from "expo-contacts";

const ChallengeCreatePage = ({ navigation, route }) => {
  const screenWidth = Dimensions.get("window").width;
  const itemSpacing = screenWidth * 0.02; // 화면 너비의 2%를 간격으로 설정
  const roomId = route.params?.roomId;
  const master = route.params?.master;
  const ws = useRef(null);
  const [users, setUsers] = useState([]);
  const [setted, setSetted] = useState(false);
  const [enteredMessage, setEnteredMessage] = useState(null);
  const [changeMessage, setChangeMessage] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);


  const { data: me } = useQuery({
    queryKey: ["getMyUser"],
    queryFn: () => getMyUser(master) || {},
  });

  useEffect(() => {
    if (me) {
      setSetted(true);
      setSelectedUser(me);
    }
  }, [me]);

  useEffect(() => {
    if (setted) {
      if (master) {
        setUsers([me])
      }
    }
  }, [me, setted]);

  useEffect(() => {
    if (me) {
      ws.current = new WebSocket("ws://172.16.21.86/channel");
      ws.current.onopen = () => {
        ws.current.send(JSON.stringify({ roomId: roomId, messageType: "ENTER", user: me }));
      };
      ws.current.onclose = () => {
        console.log("WebSocket Closed");
      };
      ws.current.onerror = (error) => {
        console.log("WebSocket Error:", error);
      };
      ws.current.onmessage = (e) => {
        if (e.data) {
          console.log(e.data);
          const message = JSON.parse(e.data);
          console.log("WebSocket Message:", message);
          if (message.messageType === "ENTER") {
            setEnteredMessage(message);
          } else if (message.messageType === "WELCOME") {
            setUsers(message.challengeCreateStatus.users)
            setCategoryPicks(message.challengeCreateStatus.categoryPicks)
          } else if (message.messageType === "CHANGE") {
            setChangeMessage(message);
          }
        }
      };
      return () => {
        ws.current.close();
        console.log("WebSocket Closed");
      };
    }
  }, [me]);

  useEffect(() => {
    if (enteredMessage && enteredMessage.user.userCode !== me.userCode) {
      const newUsers = [...users, enteredMessage.user]
      setUsers(newUsers);
      if (master) {
        ws.current.send(JSON.stringify({ roomId: roomId, messageType: "WELCOME", to: enteredMessage.sender, challengeCreateStatus: { users: newUsers, categoryPicks: categoryPicks } }))
      }
    }
  }, [enteredMessage]);

  useEffect(()=>{
    console.log("changeMessage:",changeMessage)
    if(changeMessage!==null && changeMessage.user.userCode !== me.userCode){
      if (changeMessage.challengeChangeStatus.statusClass === "category") {
        console.log(categoryPicks);
        const updatedCategories = categoryPicks.map((category, i) => {
          if (category.name === changeMessage.challengeChangeStatus.statusBefore) {
            return {
              ...category,
              users: category.users.filter(user => user.userName !== changeMessage.user.userName),
            };
          } else if (category.name === changeMessage.challengeChangeStatus.statusAfter) {
            return {
              ...category,
              users: [...category.users, changeMessage.user],
            };
          }
          return category;
        });
        setCategoryPicks(updatedCategories);
      }
    }
  },[changeMessage])

  const inviteMutation = useMutation({
    mutationFn: ({ invitationList }) =>
      postChallengesInvitation(invitationList),
    onSuccess: (data) => {
      console.log("연락처!:", recentPlayers.data);
      setChallengerList(data.data);
      setIsModalVisible(true);
    },
    onError: (error) => {
      Alert.alert("초대 실패", "오류가 발생했습니다.");
      console.log(error);
    },
  });

  const { data: recentPlayers, error, isLoading: isLoadingRecent } = useQuery({
    queryKey: ["getChallengesRecentList"],
    queryFn: () => getChallengesRecentList(),
  });
  // const createRoom = useMutation({
  //   mutationFn: () => postChallengesOpening(),
  //   onSuccess: (data) => {
  //     console.log("수정 성공!:", data);
  //   },
  //   onError: (error) => {
  //     console.error("수정 실패:", error);
  //     alert(`Error updating title: ${error.message}`);
  //   },
  // });

  // useEffect(() => {
  //   createRoom.mutate();
  // }, []);

  // useEffect(() => {
  //   if (createRoom.data) {
  //     console.log("생성된 방 데이터:", createRoom);
  //   }
  // }, [createRoom.data]);

  const [categoryClickedIndex, setCategoryClickedIndex] = useState(null);
  const [costClickedIndex, setCostClickedIndex] = useState(null);
  const [dateClickedIndex, setDateClickedIndex] = useState(null);



  const [categoryPicks, setCategoryPicks] = useState([
    {
      name: "커피 줄이기",
      users: [
      ],
    },
    {
      name: "택시 줄이기",
      users: [
      ],
    },
    {
      name: "술 줄이기",
      users: [],
    },
    {
      name: "야식 줄이기",
      users: [
      ],
    },
  ]);

  // socket 관련 코드

  // useEffect(() => {
  //   socket.on("categoryClickedIndex", (index) => {
  //     console.log(index)
  //     setCategoryClickedIndex(index);
  //   });
  //   });

  //   socket.on("costClickedIndex", (index) => {
  //     setCostClickedIndex(index);
  //   });

  //   socket.on("dateClickedIndex", (index) => {
  //     setDateClickedIndex(index);
  //   });

  //   return () => {
  //     socket.off("categoryClickedIndex");
  //     socket.off("costClickedIndex");
  //     socket.off("dateClickedIndex");
  //   };
  // }, []);

  // 카테고리 클릭 함수
  const handleCategoryClick = (index) => {
    console.log("clicked");
    var beforeCategory = "";
    var afterCategory = "";
    const updatedCategories = categoryPicks.map((category, i) => {
      if (i === categoryClickedIndex) {
        // 이전에 클릭된 버튼에서 사용자 제거
        beforeCategory = category.name;
        return {
          ...category,
          users: category.users.filter(user => user.userCode !== me.userCode),
        };
      } else if (i === index) {
        afterCategory = category.name;
        // 새로 클릭된 버튼에 사용자 추가
        return {
          ...category,
          users: [...category.users, me],
        };
      }
      return category;
    });
    ws.current.send(JSON.stringify({ roomId: roomId, messageType: "CHANGE", challengeChangeStatus: { statusClass: "category", statusBefore: beforeCategory, statusAfter: afterCategory }, user: me }))
    setCategoryClickedIndex(index);
    setCategoryPicks(updatedCategories);
    // socket.emit("categoryClickedIndex", index);
  };

  const handleCostClick = (index) => {
    setCostClickedIndex(index);
    // socket.emit("costClickedIndex", index); // WebSocket 이벤트를 나중에 추가할 수 있도록 주석 처리
  };

  const handleDateClick = (index) => {
    setDateClickedIndex(index);
    // socket.emit("dateClickedIndex", index); // WebSocket 이벤트를 나중에 추가할 수 있도록 주석 처리
  };

  const challengecost = ["3,000원", "5,000원", "10,000원", "12,000원"];
  const challengedate = ["1주", "2주", "3주", "4주"];

  const renderUser = ({ item, index }) => <UserComponents props={item} />;
  const renderCategoryItem = ({ item, index }) => {
    return (
      <View style={[styles.itemContainer, { marginHorizontal: itemSpacing / 4 }]}>
        <ChallengeBtn Keyword={item.name} users={item.users} index={index}
          clickedIndex={categoryClickedIndex}
          setClickedIndex={handleCategoryClick}
          userInfo={selectedUser} />
      </View>
    )
  };
  const renderCostItem = ({ item, index }) => (
    <View style={[styles.itemContainer, { marginHorizontal: itemSpacing / 4 }]}>
      <ChallengeBtn Keyword={item}
        users={item.users} index={index}
        clickedIndex={costClickedIndex}
        setClickedIndex={handleCostClick} />
    </View>
  );
  const renderDateItem = ({ item, index }) => (
    <View style={[styles.itemContainer, { marginHorizontal: itemSpacing / 4 }]}>
      <ChallengeBtn
        Keyword={item}
        users={item.users}
        index={index}
        clickedIndex={dateClickedIndex}
        setClickedIndex={handleDateClick}
      />
    </View>
  );

  const formatNumber = (num) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const handleChangeText = (text) => {
    const cleanedText = text.replace(/,/g, ""); // 기존 컴마 제거
    if (cleanedText.length > 1 && cleanedText.startsWith("0")) {
      Alert.alert("입력 오류", "0으로 시작할 수 없습니다.");
      setSearchQuery(""); // 입력된 값 지우기
      return;
    }
    const maxAmount = 1000000;
    if (parseInt(cleanedText, 10) > maxAmount) {
      Alert.alert(
        "입력 오류",
        `최대 금액은 ${formatNumber(maxAmount.toString())} 원 입니다.`
      );
      return;
    }
    const formattedText = formatNumber(cleanedText);
    setSearchQuery(formattedText);
  };

  const [searchQuery, setSearchQuery] = useState("");

  // 여가서부턴 참가자 초대하는 코드 들어가 있어용
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [permission, setPermission] = useState(null);
  const [challengerList, setChallengerList] = useState([]);

  const openModal = () => {
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      setPermission(status === "granted");
    })();
  }, []);

  const fetchContacts = async () => {
    if (permission) {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
      });
      if (data.length > 0) {
        if (Platform.OS === "android") {
          setContacts(data);
          const invitationList = data
            .map((contact) => {
              return {
                name: contact.name,
                phoneNum:
                  contact.phoneNumbers && contact.phoneNumbers.length > 0
                    ? contact.phoneNumbers[0].number
                    : null,
              };
            })
            .filter((contact) => contact.phoneNum);
          inviteMutation.mutate({ invitationList: invitationList });
        }
        if (Platform.OS === "ios") {
          setContacts(data);
          const formattedContacts = data
            .map((contact) => {
              let formattedNumber = null;
              if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
                const originalNumber = contact.phoneNumbers[0].digits;
                formattedNumber = originalNumber
                  .replace(/\D/g, "")
                  .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
              }
              return {
                name: contact.name,
                phoneNum: formattedNumber || originalNumber,
              };
            })
            .filter((contact) => contact.phoneNum);

          inviteMutation.mutate({ invitationList: formattedContacts });
        }
      }
    }
  };

  if (permission === null) {
    return <Text>Requesting permission...</Text>;
  }

  if (permission === false) {
    return <Text>Permission to access contacts was denied.</Text>;
  }

  if(isLoadingRecent) return <></>

  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader title={"챌린지 생성"} navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.container}>
          <View style={styles.userSpot}>
            <FlatList
              data={users}
              horizontal
              keyExtractor={(item, index) => index.toString()}
              marginVertical={-20}
              marginLeft={8}
              contentContainerStyle={styles.flatListContent}
              renderItem={renderUser}
            />
            <Text onPress={fetchContacts}>버튼</Text>
          </View>
          <View style={styles.categorySpot}>
            <View flex={1}>
              <Text style={styles.categortText} marginVertical={10}>
                카테고리
              </Text>
              <FlatList
                data={categoryPicks}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => `category-${index}`}
                renderItem={renderCategoryItem}
              />
            </View>
            <View flex={1}>
              <Text style={styles.categortText} marginVertical={10}>
                참가비
              </Text>
              <FlatList
                data={challengecost}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => `cost-${index}`}
                renderItem={renderCostItem}
              />
            </View>
            <View flex={1}>
              <Text style={styles.categortText} marginVertical={10}>
                챌린지 기간
              </Text>
              <FlatList
                data={challengedate}
                horizontal
                keyExtractor={(item, index) => `date-${index}`}
                renderItem={renderDateItem}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ alignItems: "center" }}
              />
            </View>
            <View flex={1} marginBottom={30}>
              <Text style={styles.categortText} marginVertical={10}>
                목표 금액
              </Text>
              <View style={styles.inputSpot}>
                <TextInput
                  style={styles.textInput}
                  value={searchQuery}
                  maxLength={20}
                  onChangeText={handleChangeText}
                  textAlign="center" // 텍스트 가운데 정렬
                  keyboardType="numeric" // 숫자 키보드 사용 (필요에 따라)
                />
                <Text style={styles.amountText}>원</Text>
              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#5A73F5" }]}
            >
              <Text style={styles.buttonText}>시작하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "gray" }]}
            >
              <Text style={styles.buttonText}>취소하기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.useImage}>
            <Image
              source={require("../../assets/challengeImage_sub.png")}
              width={300}
              height={300}
            />
          </View>
          <ChallengeRequestModal
            isOpen={isModalVisible}
            setIsOpen={setIsModalVisible}
            contacts={challengerList}
            recentUsers={recentPlayers.data}
          ></ChallengeRequestModal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChallengeCreatePage;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  scroll: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  userSpot: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    marginVertical: 16,
    justifyContent: "center",
    height: 200,
  },
  flatListContent: {
    flexDirection: "row",
    marginBottom: 20, // 필요에 따라 상하 패딩 추가
  },
  itemContainer: {
    marginTop: 5
  },
  categorySpot: {
    paddingHorizontal: 10,
    flex: 4,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    padding: 10, // 필요에 따라 조정
  },
  button: {
    flex: 1,
    margin: 5, // 버튼 간의 간격을 위해 사용
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    height: 55,
  },
  buttonText: {
    color: "white",
    fontFamily: "Bold",
    fontSize: 20,
  },
  useImage: {
    flex: 1,
    alignItems: "center",
  },
  categortText: {
    fontSize: 20,
    fontFamily: "Bold",
  },
  inputSpot: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
  textInput: {
    height: 40,
    width: 150,
    backgroundColor: "#DFEAFF",
    borderRadius: 8,
    fontSize: 16,
    fontFamily: "Bold",
    justifyContent: "center",
  },
  amountText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: "Bold",
  },
});
