import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import Ex from '../assets/icons/ex.svg'

const Keyword = ({Keyword}) => {

  return (
    <View style={styles.button}>
        <Text># </Text>
        <TextInput style={styles.textInput} value={Keyword}/>
        <View style={styles.logo}>
            <Ex></Ex>
        </View>
    </View>
  );
};

export default Keyword;

const styles = StyleSheet.create({
    button:{
        flexDirection: "row",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-start",
        backgroundColor: "#DFEAFF",
        borderRadius: 16,
        margin: 4
    },
    textInput: {
        fontFamily: "Regular",
        marginRight:8,
        fontSize:14
    }

});
