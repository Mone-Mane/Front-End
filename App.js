import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Test from "./screens/Test";
import MyPage from "./screens/etc/MyPage.jsx";
import IndexPage from "./screens/etc/IndexPage";
import MainPage from "./screens/etc/MainPage";
import DiaryHome from "./screens/picturediary/DiaryHome.jsx";
import AccountHistory from "./components/AccountHistory.jsx";
import SYTest2 from "./screens/SYTest2.jsx";
import AccountScreen from "./screens/AccountScreen.jsx";
import SYTest from "./screens/SYTest.jsx";
import DoneChallengeScreen from "./screens/Challenge/DoneChallengeScreen.jsx";
import ContatctList from "./screens/ContatctList.jsx";
import WHTest from "./screens/WHTest.jsx";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import SelectCategoryScreen from "./screens/picturediary/SelectCategoryScreen.jsx";
import EditKeyword from "./screens/picturediary/EditKeyword.jsx";
import DiaryCompleteScreen from "./screens/picturediary/DiaryCompleteScreen.jsx";

const Stack = createNativeStackNavigator();
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Light: require("./assets/font/NanumSquareNeo-aLt.ttf"),
        Regular: require("./assets/font/NanumSquareNeo-bRg.ttf"),
        Heavy: require("./assets/font/NanumSquareNeo-eHv.ttf"),
        Bold: require("./assets/font/NanumSquareNeo-cBd.ttf"),
        ExtraBold: require("./assets/font/NanumSquareNeo-dEb.ttf"),
      });
      setFontLoaded(true);
    };
    loadFonts();
  }, []);

  if (!fontLoaded) return null;
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
        <Stack.Screen name="ContatctList" component={ContatctList} />
        <Stack.Screen name="DiaryHome" component={DiaryHome} />
        <Stack.Screen name="MyPage" component={MyPage} />
        <Stack.Screen name="IndexPage" component={IndexPage} />
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="SYTest" component={SYTest} />
        <Stack.Screen name="SYTest2" component={SYTest2} />
        <Stack.Screen name="계좌내역" component={AccountHistory} />
        <Stack.Screen
          name="DoneChallengeScreen"
          component={DoneChallengeScreen}
        />
        <Stack.Screen
          name="SelectCategoryScreen"
          component={SelectCategoryScreen}
        />
        <Stack.Screen name="거래내역조회" component={AccountScreen} />
        <Stack.Screen name="WHTest" component={WHTest} />
        <Stack.Screen name="EditKeyword" component={EditKeyword} />
        <Stack.Screen
          name="DiaryCompleteScreen"
          component={DiaryCompleteScreen}
        />
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
    paddingTop: 100,
  },
});
