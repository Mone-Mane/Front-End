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
  postChallengesInvitation,
  getChallengesRecentList,
  findMinimumBalanceUser,
  postChallenges,
} from "../../apis/challenge";
import { useMutation, useQuery } from "@tanstack/react-query";
import ChallengeRequestModal from "../../components/ChallengeRequestModal";
import * as Contacts from "expo-contacts";
import { useRecoilValue } from "recoil";
import { myInfo } from "../../recoil/atoms/user";
import ChallengeAcceptModal from "../../components/ChallengeAcceptModal";
import UserAcceptModal from "../../components/UserAcceptModal";

const ChallengeCreatePage = ({ navigation, route }) => {
  const screenWidth = Dimensions.get("window").width;
  const itemSpacing = screenWidth * 0.02; // 화면 너비의 2%를 간격으로 설정`
  console.log("route.params:", route.params);
  const roomId = route.params?.roomId;
  const master = route.params?.master||false;
  const ws = useRef(null);
  const [users, setUsers] = useState([]);
  const [setted, setSetted] = useState(false);
  const [enteredMessage, setEnteredMessage] = useState(null);
  const [changeMessage, setChangeMessage] = useState(null);
  const [acceptMessage, setAcceptMessage] = useState(null);
  const [rejectMessage, setRejectMessage] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [categoryClickedIndex, setCategoryClickedIndex] = useState(null);
  const [costClickedIndex, setCostClickedIndex] = useState(null);
  const [dateClickedIndex, setDateClickedIndex] = useState(null);
  const [goalAmount, setGoalAmount] = useState("");
  const [goalAmountAgreement, setGoalAmountAgreement] = useState([[], [], []]);
  const [goalClickedIndex, setGoalClickedIndex] = useState(null);
  const [minimumBalanceUser, setMinimumBalanceUser] = useState(0);
  const [challengeStartData, setChallengeStartData] = useState(null);
  const [challengeCreateStatus, setChallengeCreateStatus] = useState(null);
  const [isAccepted,setIsAccepted] = useState(false)
  const [categoryPicks, setCategoryPicks] = useState([
    {
      name: "카페 덜 가기",
      users: [],
      aiPick: true,
    },
    {
      name: "택시 덜 타기",
      users: [],
      aiPick: false,
    },
    {
      name: "오락 줄이기",
      users: [],
      aiPick: false,
    },
    {
      name: "쇼핑 줄이기",
      users: [],
      aiPick: false,
    },
    {
      name: "술 덜 마시기",
      users: [],
      aiPick: false,
    },
    {
      name: "배달 덜 먹기",
      users: [],
      aiPick: false,
    },
    {
      name: "구독 좀 끊기",
      users: [],
      aiPick: false,
    }
  ]);

  const [costPicks, setCostPicks] = useState([
    {
      name: "3,000원",
      users: [],
    },
    {
      name: "5,000원",
      users: [],
    },
    {
      name: "10,000원",
      users: [],
    },
    {
      name: "12,000원",
      users: [],
    },
  ]);

  const [datePicks, setDatePicks] = useState([
    {
      name: "1주",
      users: [],
    },
    {
      name: "2주",
      users: [],
    },
    {
      name: "3주",
      users: [],
    },
    {
      name: "4주",
      users: [],
    },
  ]);

  // 여기서부턴 수락 거절 모달 띄우는 코드에용
  const [isAcceptOpen, setIsAcceptOpen] = useState(false);
  const [isStartOpen, setIsStartOpen] = useState(false);

  useEffect(()=>{
    const newCategoryPicks = [...categoryPicks];
    const aiPickIndex = users.length*users.length*users.length%8;
    newCategoryPicks.forEach((category,index)=>{
      if(index === aiPickIndex){
        category.aiPick = true;
      }
      else{
        category.aiPick = false;
      }
    });
    setCategoryPicks(newCategoryPicks);
  },[users])

  const openStart = () => {
    const masterdata = findMasterSelection();
    if (
      masterdata === null ||
      masterdata?.category === null ||
      masterdata?.cost === null ||
      masterdata?.date === null ||
      masterdata?.goalAmount === null ||
      masterdata?.goalAmount === 0
    ) {
      Alert.alert("챌린지 시작 실패", "모든 항목을 선택해주세요.");
      return;
    }
    ws.current.send(
      JSON.stringify({
        roomId: roomId,
        messageType: "START",
        challengeStartStatus: masterdata,
      })
    );
    ws.current.send(
      JSON.stringify({
        roomId: roomId,
        messageType: "ACCEPT",
        user: myUser,
      })
    );
    setChallengeCreateStatus(masterdata);
    setIsStartOpen(true);
  };
  const closeStart = () => {
    setIsStartOpen(false);
  };

  const openAccept = () => {
    setIsAcceptOpen(true);
  };
  const closeAccept = () => {
    setIsAcceptOpen(false);
  };
  const me = useRecoilValue(myInfo);
  const [myUser, setMyUser] = useState(null);

  useEffect(() => {
    if (me) {
      setMyUser({ ...me, master: master });
    }
  }, [me]);

  useEffect(() => {
    if (myUser) {
      setSetted(true);
      setSelectedUser(myUser);
    }
  }, [myUser]);

  useEffect(() => {
    if (setted) {
      if (master) {
        setUsers([myUser]);
      }
    }
  }, [myUser, setted]);

  useEffect(() => {
    if (myUser) {
      // ws.current = new WebSocket("ws://172.30.1.4/channel");
      ws.current = new WebSocket("ws://172.16.21.86/channel");
      // ws.current = new WebSocket("ws://54.180.140.196:8080/channel");
      ws.current.onopen = () => {
        ws.current.send(
          JSON.stringify({ roomId: roomId, messageType: "ENTER", user: myUser })
        );
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
            setUsers(message.challengeCreateStatus.users);
            setCategoryPicks(message.challengeCreateStatus.categoryPicks);
            setCostPicks(message.challengeCreateStatus.costPicks);
            setDatePicks(message.challengeCreateStatus.datePicks);
            setGoalAmount(message.challengeCreateStatus.goalAmount);
            setGoalAmountAgreement(
              message.challengeCreateStatus.goalAmountAgreement
            );
          } else if (message.messageType === "CHANGE") {
            setChangeMessage(message);
          } else if (message.messageType === "START") {
            setChallengeStartData(message.challengeStartStatus);
            if (!master) openAccept();
          } else if (message.messageType === "ACCEPT") {
            setAcceptMessage(message);
          }else if(message.messageType === "REJECT"){
            setRejectMessage(message);
            if(message.user.userCode !== myUser.userCode){
              setIsAcceptOpen(false);
              setIsStartOpen(false);
              Alert.alert(
                "알림",
                `${message.user.userName} 님이 챌린지 참여를 수락하지 않았어요!😥`
              );
            }
          }else if(message.messageType === "CREATED"){
             setIsAcceptOpen(false);
             setIsStartOpen(false);
              ws.current.close();
              navigation.navigate("ChallengeMainPage",{challengeId:message.message});
          }else if (message.messageType === "NOTICE"){
            Alert.alert("알림", message.message);
            if (message.message === "존재하지 않는 방입니다.") {
              navigation.goBack();
            }
          }
        }
      };
      return () => {
        ws.current.close();
        console.log("WebSocket Closed");
      };
    }
  }, [myUser]);

  useEffect(() => {
    if (enteredMessage && enteredMessage.user.userCode !== myUser.userCode) {
      const newUsers = [...users, enteredMessage.user];
      setUsers(newUsers);
      if (master) {
        ws.current.send(
          JSON.stringify({
            roomId: roomId,
            messageType: "WELCOME",
            to: enteredMessage.sender,
            challengeCreateStatus: {
              users: newUsers,
              categoryPicks: categoryPicks,
              costPicks: costPicks,
              datePicks: datePicks,
              goalAmount: goalAmount,
              goalAmountAgreement: goalAmountAgreement,
            },
          })
        );
      }
    }
  }, [enteredMessage]);

  useEffect(() => {
    if (master && acceptMessage) {
      var newUsers = users.filter(
        (user) => user.userCode !== acceptMessage.user.userCode
      );
      newUsers.push({ ...acceptMessage.user, accepted: true });
      if (newUsers.filter((user) => user.accepted).length === newUsers.length) {
        if (master) {
          var masterdata = findMasterSelection();
          masterdata.users = newUsers;
          postChallenges(masterdata).then((res) => {
            ws.current.send(
              JSON.stringify({
                roomId: roomId,
                messageType: "CREATED",
                message: res.data,
              })
            );
            ws.current.close();
            navigation.navigate("ChallengeMainPage", { challengeId: res.data });
          });
        }
      }
      setUsers(newUsers);
    }
  }, [acceptMessage]);

  useEffect(() => {
    const newUsers = users.map((user)=>{user.accepted = null; return user;});
    setIsAccepted(false);
    setUsers(newUsers);
  }, [rejectMessage]);

  useEffect(() => {
    if(users.length > 0){
      findMinimumBalanceUser(users.map((user) => user.userCode)).then(
        (res) => {
          setMinimumBalanceUser(res.data);
        }
      );
    }
  }, [users]);

  useEffect(() => {
    console.log("changeMessage:", changeMessage);
    if (
      changeMessage !== null &&
      changeMessage.user.userCode !== myUser.userCode
    ) {
      const { statusClass, statusBefore, statusAfter } =
        changeMessage.challengeChangeStatus;

      // Handle category changes
      if (statusClass === "category") {
        const updatedCategories = categoryPicks.map((category) => {
          if (category.name === statusBefore) {
            return {
              ...category,
              users: category.users.filter(
                (user) => user.userName !== changeMessage.user.userName
              ),
            };
          } else if (category.name === statusAfter) {
            return {
              ...category,
              users: [...category.users, changeMessage.user],
            };
          }
          return category;
        });
        setCategoryPicks(updatedCategories);
      }

      // Handle cost changes
      if (statusClass === "cost") {
        const updatedCosts = costPicks.map((cost) => {
          if (cost.name === statusBefore) {
            return {
              ...cost,
              users: cost.users.filter(
                (user) => user.userName !== changeMessage.user.userName
              ),
            };
          } else if (cost.name === statusAfter) {
            return {
              ...cost,
              users: [...cost.users, changeMessage.user],
            };
          }
          return cost;
        });
        setCostPicks(updatedCosts);
      }

      // Handle date changes
      if (statusClass === "date") {
        const updatedDates = datePicks.map((date) => {
          if (date.name === statusBefore) {
            return {
              ...date,
              users: date.users.filter(
                (user) => user.userName !== changeMessage.user.userName
              ),
            };
          } else if (date.name === statusAfter) {
            return {
              ...date,
              users: [...date.users, changeMessage.user],
            };
          }
          return date;
        });
        setDatePicks(updatedDates);
      }

      // Handle goalAmount changes
      if (statusClass === "goalAmount") {
        setGoalAmount(statusAfter);
      }

      // Handle goalAmountAgreement changes
      if (statusClass === "goalAmountAgreement") {
        const updatedGoalAmountAgreement = [...goalAmountAgreement];
        if (statusBefore !== null) {
          updatedGoalAmountAgreement[statusBefore] = updatedGoalAmountAgreement[
            statusBefore
          ].filter((user) => user.userName !== changeMessage.user.userName);
        }
        updatedGoalAmountAgreement[statusAfter].push(changeMessage.user);
        setGoalAmountAgreement(updatedGoalAmountAgreement);
      }
    }
  }, [changeMessage]);

  //goalAmount  변경 시 메시지 전달 단,값이 바뀌고 1초동안 추가 변경이 없을 때 전달
  useEffect(() => {
    setGoalAmountAgreement([[], [], []]);
    let timer = setTimeout(() => {
      if (master && goalAmount !== "" && goalAmount !== null) {
        ws.current.send(
          JSON.stringify({
            roomId: roomId,
            messageType: "CHANGE",
            challengeChangeStatus: {
              statusClass: "goalAmount",
              statusBefore: null,
              statusAfter: goalAmount,
            },
            user: myUser,
          })
        );
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [goalAmount]);

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

  const findMasterSelection = () => {
    let masterData = {
      category: null,
      cost: null,
      date: null,
      goalAmount: null,
    };
    categoryPicks.map((category) => {
      if (category.users.includes(myUser)) {
        masterData.category = category.name;
      }
    });
    costPicks.map((cost) => {
      if (cost.users.includes(myUser)) {
        masterData.cost = cost.name;
      }
    });
    datePicks.map((date) => {
      if (date.users.includes(myUser)) {
        masterData.date = date.name;
      }
    });
    masterData.goalAmount = Number(goalAmount.replace(",", ""));
    return masterData;
  };

  const {
    data: recentPlayers,
    error,
    isLoading: isLoadingRecent,
  } = useQuery({
    queryKey: ["getChallengesRecentList"],
    queryFn: () => getChallengesRecentList(),
  });

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
          users: category.users.filter(
            (user) => user.userCode !== myUser.userCode
          ),
        };
      } else if (i === index) {
        afterCategory = category.name;
        // 새로 클릭된 버튼에 사용자 추가
        return {
          ...category,
          users: [...category.users, myUser],
        };
      }
      return category;
    });
    ws.current.send(
      JSON.stringify({
        roomId: roomId,
        messageType: "CHANGE",
        challengeChangeStatus: {
          statusClass: "category",
          statusBefore: beforeCategory,
          statusAfter: afterCategory,
        },
        user: myUser,
      })
    );
    setCategoryClickedIndex(index);
    setCategoryPicks(updatedCategories);
    // socket.emit("categoryClickedIndex", index);
  };

  // cost updata
  const handleCostClick = (index) => {
    var beforeCost = "";
    var afterCost = "";
    const updatedCost = costPicks.map((cost, i) => {
      if (i === costClickedIndex) {
        // 이전에 클릭된 버튼에서 사용자 제거
        beforeCost = cost.name;
        return {
          ...cost,
          users: cost.users.filter((user) => user.userCode !== myUser.userCode),
        };
      } else if (i === index) {
        afterCost = cost.name;
        // 새로 클릭된 버튼에 사용자 추가
        return {
          ...cost,
          users: [...cost.users, myUser],
        };
      }
      return cost;
    });
    ws.current.send(
      JSON.stringify({
        roomId: roomId,
        messageType: "CHANGE",
        challengeChangeStatus: {
          statusClass: "cost",
          statusBefore: beforeCost,
          statusAfter: afterCost,
        },
        user: myUser,
      })
    );
    setCostClickedIndex(index);
    setCostPicks(updatedCost);
  };

  // 챌린지 기간 수정
  const handleDateClick = (index) => {
    var beforeDate = "";
    var afterDate = "";
    const updatedDate = datePicks.map((date, i) => {
      if (i === dateClickedIndex) {
        // 이전에 클릭된 버튼에서 사용자 제거
        beforeDate = date.name;
        return {
          ...date,
          users: date.users.filter((user) => user.userCode !== myUser.userCode),
        };
      } else if (i === index) {
        afterDate = date.name;
        // 새로 클릭된 버튼에 사용자 추가
        return {
          ...date,
          users: [...date.users, myUser],
        };
      }
      return date;
    });
    ws.current.send(
      JSON.stringify({
        roomId: roomId,
        messageType: "CHANGE",
        challengeChangeStatus: {
          statusClass: "date",
          statusBefore: beforeDate,
          statusAfter: afterDate,
        },
        user: myUser,
      })
    );
    setDateClickedIndex(index);
    setDatePicks(updatedDate);
  };

  const renderUser = ({ item, index }) => <UserComponents props={item} />;
  const renderCategoryItem = ({ item, index }) => {
    return (
      <View
        style={[styles.itemContainer, { marginHorizontal: itemSpacing / 4 }]}
      >
        <ChallengeBtn
          Keyword={item.name}
          users={item.users}
          index={index}
          clickedIndex={categoryClickedIndex}
          setClickedIndex={handleCategoryClick}
          userInfo={selectedUser}
          aiPick={item.aiPick}
        />
      </View>
    );
  };

  const renderCostItem = ({ item, index }) => {
    return (
      <View
        style={[styles.itemContainer, { marginHorizontal: itemSpacing / 4 }]}
      >
        <ChallengeBtn
          Keyword={item.name}
          users={item.users}
          index={index}
          clickedIndex={costClickedIndex}
          setClickedIndex={handleCostClick}
          userInfo={selectedUser}
          minimumBalanceUser={minimumBalanceUser}
        />
      </View>
    );
  };

  const renderDateItem = ({ item, index }) => {
    return (
      <View
        style={[styles.itemContainer, { marginHorizontal: itemSpacing / 4 }]}
      >
        <ChallengeBtn
          Keyword={item.name}
          users={item.users}
          index={index}
          clickedIndex={dateClickedIndex}
          setClickedIndex={handleDateClick}
          userInfo={selectedUser}
        />
      </View>
    );
  };

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
    var maxVal = 10000000;
    if (parseInt(cleanedText, 10) > maxVal) {
      Alert.alert(
        "입력 오류",
        `최대 금액은 ${formatNumber(maxVal.toString())} 원 입니다.`
      );
      return;
    }
    const formattedText = formatNumber(cleanedText);
    setGoalAmount(formattedText);
    setSearchQuery(formattedText);
  };

  const handleGoalClick = (index) => {
    if (!master) {
      var beforeGoal = null;
      var gaa = [...goalAmountAgreement];
      gaa.map((item, i) => {
        if (item.includes(selectedUser)) {
          beforeGoal = i;
          gaa[i] = gaa[i].filter((user) => user !== selectedUser);
        }
      });
      gaa[index].push(selectedUser);
      setGoalClickedIndex(index);
      setGoalAmountAgreement(gaa);
      ws.current.send(
        JSON.stringify({
          roomId: roomId,
          messageType: "CHANGE",
          challengeChangeStatus: {
            statusClass: "goalAmountAgreement",
            statusBefore: beforeGoal,
            statusAfter: index,
          },
          user: myUser,
        })
      );
    }
  };

  const [searchQuery, setSearchQuery] = useState("");

  const acceptChallenge = () => {
    setIsAccepted(true);
    ws.current.send(
      JSON.stringify({
        roomId: roomId,
        messageType: "ACCEPT",
        user: myUser,
      })
    );
  };
  const rejectChallenge = () => {
    ws.current.send(
      JSON.stringify({
        roomId: roomId,
        messageType: "REJECT",
        user: myUser,
      })
    );
  };

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

  if (isLoadingRecent) return <></>;

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
              marginLeft={8}
              contentContainerStyle={styles.flatListContent}
              renderItem={renderUser}
            />
            {master && (
              <TouchableOpacity
                style={styles.inviteBtn}
                onPress={fetchContacts}
              >
                <Text style={styles.inviteText}>+</Text>
              </TouchableOpacity>
            )}
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
                data={costPicks}
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
                data={datePicks}
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
                {master ? (
                  <TextInput
                    style={styles.textInput}
                    value={searchQuery}
                    maxLength={20}
                    onChangeText={handleChangeText}
                    textAlign="center" // 텍스트 가운데 정렬
                    keyboardType="numeric" // 숫자 키보드 사용 (필요에 따라)
                  />
                ) : (
                  <TextInput
                    style={styles.textInput}
                    value={goalAmount}
                    maxLength={20}
                    textAlign="center" // 텍스트 가운데 정렬
                    keyboardType="numeric" // 숫자 키보드 사용 (필요에 따라)
                    editable={false}
                  />
                )}
                <Text style={styles.amountText}>원</Text>
              </View>
              <View style={styles.upAndDown}>
                <ChallengeBtn
                  Keyword={"UP"}
                  index={0}
                  users={goalAmountAgreement[0]}
                  clickedIndex={goalClickedIndex}
                  setClickedIndex={handleGoalClick}
                  userInfo={selectedUser}
                />
                <ChallengeBtn
                  Keyword={"GOOD"}
                  index={1}
                  users={goalAmountAgreement[1]}
                  clickedIndex={goalClickedIndex}
                  setClickedIndex={handleGoalClick}
                  userInfo={selectedUser}
                />
                <ChallengeBtn
                  Keyword={"DOWN"}
                  index={2}
                  users={goalAmountAgreement[2]}
                  clickedIndex={goalClickedIndex}
                  setClickedIndex={handleGoalClick}
                  userInfo={selectedUser}
                />
              </View>
            </View>
          </View>
          {master ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#5A73F5" }]}
                onPress={openStart}
              >
                <Text style={styles.buttonText}>시작하기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "gray" }]}
              >
                <Text style={styles.buttonText}>취소하기</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )}

          <View style={styles.useImage}>
            <Text style={styles.policyTitle}>챌린지 환급 안내</Text>
            <Text style={styles.policyContent}>
              100% 성공 예치금 전액 환급 + 상금
            </Text>
            <Text style={styles.policyContent}>
              85% 이상 성공 예치금 전액 환급
            </Text>
            <Text style={styles.policyContent}>
              85% 미만 성공 예치금 일부 환급(성공률 만큼)
            </Text>
            <Image
              style={styles.graph}
              source={require("../../assets/refundPolicy3.png")}
            ></Image>
          </View>

          {master ? (
            <>
              <ChallengeRequestModal
                isOpen={isModalVisible}
                setIsOpen={setIsModalVisible}
                contacts={challengerList}
                recentUsers={recentPlayers.data}
                roomId={roomId}
              ></ChallengeRequestModal>
              <UserAcceptModal
                isOpen={isStartOpen}
                setIsOpen={closeStart}
                users={users}
              />
            </>
          ) : (
            <ChallengeAcceptModal
              isOpen={isAcceptOpen}
              setIsOpen={closeAccept}
              masterdata={challengeStartData}
              acceptChallenge={acceptChallenge}
              rejectChallenge={rejectChallenge}
              isAccepted={isAccepted}
            />
          )}
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
    marginVertical: 32,
    paddingVertical: 15,
    justifyContent: "center",
  },
  flatListContent: {
    flexDirection: "row",
    // marginBottom: 20,
  },
  itemContainer: {
    marginTop: 5,
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
    backgroundColor: "white",
    paddingVertical: 30,
    paddingHorizontal: 10,
    borderRadius: 10,
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
  upAndDown: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    marginTop: 15
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
  inviteBtn: {
    marginRight: 18,
    borderWidth: 1,
    borderColor: "#C5D9FF",
    borderRadius: 50,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    width: 60,
    height: 60,
  },
  inviteText: {
    fontFamily: "Regular",
    fontSize: 40,
    color: "#7D9BFC",
  },
  policyTitle: {
    fontSize: 18,
    fontFamily: "ExtraBold",
    marginBottom: 20,
  },
  policyContent: {
    fontSize: 16,
    fontFamily: "ExtraBold",
    marginBottom: 10,
    color: "gray",
  },
  graph: {
    marginTop: 10,
  },
});
