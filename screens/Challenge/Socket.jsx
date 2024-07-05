import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { getUsersMyPage } from "../../apis/mypage";

const Socket = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);
  const [users, setUsers] = useState([]);
  const [username, setUserName] = useState("");

  const { data: myData } = useQuery({
    queryKey: ["getUsersMyPage"],
    queryFn: getUsersMyPage,
  });

  useEffect(() => {
    if (myData) {
        console.log("사용자 " + myData.data.userName);
        setUserName(myData.data.userName);
        setUsers(prevUsers => [...prevUsers, myData.data.userName]);
    }
  }, [myData]);

  useEffect(() => {
    ws.current = new WebSocket("ws://172.16.21.86/channel");

    ws.current.onopen = () => {
      console.log("Connected to the websocket server");
      ws.current.send(JSON.stringify({ type: 'userConnected', username }));
    };

    ws.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'message') {
            setMessages((prevMessages) => [...prevMessages, data]);
          } else if (data.type === 'userConnected') {
            setUsers((prevUsers) => [...prevUsers, data.username]);
          } else if (data.type === 'userDisconnected') {
            setUsers((prevUsers) => prevUsers.filter((user) => user !== data.username));
          }
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };

    // ws.current.onclose = () => {
    //   console.log("Disconnected from the websocket server");
    // };

    return () => {
      //ws.current?.close();
    };
  }, [username]);

  const sendMessage = () => {
    if (ws.current && message.trim()) {
      const msg = { messageType: 'ENTER', roomId:"f02dfb71-6b4f-4623-87fa-936fb09a0cf9", message: message, sender: "hikiman" };
      ws.current.send(JSON.stringify(msg));
      setMessages((prevMessages) => [...prevMessages, msg]);
      setMessage('');
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.messageContainer, item.sender === "hikiman" ? styles.myMessage : styles.theirMessage]}>
      <Text style={styles.message}>{item.message}</Text>
    </View>
  );

  const renderUser = ({ item }) => (
    <View style={styles.userContainer}>
      <Text style={styles.username}>{item}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.sender}-${index}`}
          style={styles.messagesList}
        />
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </SafeAreaView>
  );
};


export default Socket;
const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  usersList: {
    flex: 1,
    flexDirection:"row",
    marginBottom: 20,
  },
  messagesList: {
    flex: 1,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#dcf8c6",
  },
  theirMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  message: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
    textAlign: "right",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});
