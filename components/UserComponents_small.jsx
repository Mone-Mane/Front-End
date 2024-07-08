import { StyleSheet, Text, View,ImageBackground } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "../assets/kawaii.png"

const UserComponents_small = ({props}) => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground 
          source={Icon}// 이곳에 이미지를 제공하는 URL을 넣으세요.
          style={styles.image}
          imageStyle={{ borderRadius: 50 }}
        />
      </View>
    </View>
    </SafeAreaView>
  );
};

export default UserComponents_small;

const styles = StyleSheet.create({
    safe:{
        flex:1
    },
    container: {
        alignItems: 'center',
        margin: 10,
      },
      imageContainer: {
        width: 20,  // 이미지의 크기
        height: 20, // 이미지의 크기
        borderRadius: 10, // 이미지를 둥글게 만들기 위해 반으로 나눔
        overflow: 'hidden',
        backgroundColor: '#fff',
      },
      image: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
});
