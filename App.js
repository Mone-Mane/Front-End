import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Test from "./screens/Test";
import PhoneBook from "./screens/PhoneBook";
import DiaryHome from "./screens/picturediary/DiaryHome.jsx";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <View>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen name="PhoneBook" component={PhoneBook} />
        <Stack.Screen name="그림일기" component={DiaryHome} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
    // <View className="flex-1 items-center justify-center bg-green-500">
    //   <Text>Open up App.js to start working on your app!</Text>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
