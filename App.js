import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Test from "./screens/Test";
import MyPage from "./screens/etc/MyPage.jsx"
import IndexPage from "./screens/etc/IndexPage";
import MainPage from "./screens/etc/MainPage";
import PhoneBook from "./screens/PhoneBook.jsx";
import DiaryHome from "./screens/picturediary/DiaryHome.jsx";
import AccountHistory from "./components/AccountHistory.jsx";
import SYTest from "./screens/SYTest.jsx";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <View>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen name="PhoneBook" component={PhoneBook} />
        <Stack.Screen name="그림일기" component={DiaryHome} />
        <Stack.Screen name="MyPage" component={MyPage} />
        <Stack.Screen name="IndexPage" component={IndexPage} />
        <Stack.Screen name="MainPage" component={MainPage} />

        <Stack.Screen name="계좌내역" component={AccountHistory} />
        <Stack.Screen name="SYTest" component={SYTest} />
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
    paddingTop: 100
  },
});
