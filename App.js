import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Platform, LogBox, Modal, TouchableOpacity } from "react-native";
import { Link, NavigationContainer, useNavigation } from "@react-navigation/native";
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
import WHTest from "./screens/WHTest.jsx";
import * as Font from "expo-font";
import { useEffect, useRef, useState } from "react";
import SelectCategoryScreen from "./screens/picturediary/SelectCategoryScreen.jsx";
import EditKeyword from "./screens/picturediary/EditKeyword.jsx";
import DiaryCompleteScreen from "./screens/picturediary/DiaryCompleteScreen.jsx";
import ChallengeMainPage from "./screens/Challenge/ChallengeMainPage.jsx";
import ChallengeDetailPage from "./screens/Challenge/ChallengeDetailPage.jsx";
import ChallengeCreatePage from "./screens/Challenge/ChallengeCreatePage.jsx";
// import Socket from "./screens/Challenge/Socket.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import ConsumptionSelect from "./screens/picturediary/ConsumptionSelect.jsx";
import DiaryDetail from "./screens/picturediary/DiaryDetail.jsx";
import DiaryCheck from "./screens/picturediary/DiaryCheck.jsx";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import ExpoTokenSetter from "./utils/expoTokenSetter.js";
import * as Linking from 'expo-linking';

const Stack = createNativeStackNavigator();
const prefix = Linking.createURL('/');

Notifications.setNotificationHandler({
  handleNotification: async () => {
    console.log("handleNotification");
    return ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    })
  }
});
LogBox.ignoreLogs(['*']);
export default function App() {
  const queryClient = new QueryClient();
  const [fontLoaded, setFontLoaded] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [channels, setChannels] = useState([]);
  const [notification, setNotification] = useState();
  const notificationListener = useRef();
  const responseListener = useRef();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);


  useEffect(() => {
    if (notification) {
      setIsNotificationOpen(true);
    }
  }, [notification])


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

    registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));
    Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  if (!fontLoaded) return null;
  return (
    // <View>

    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ExpoTokenSetter expoPushToken={expoPushToken} prefix={prefix} />
        <NavigationContainer linking={{
          prefixes: [prefix], config: {
            screens: {
              ChallengeHome: "ChallengeMainPage",
              ChallengeCreatePage: "ChallengeCreatePage/:roomId", // Add this line
            }
          },
          async getInitialURL() {
            const url = await Linking.getInitialURL();
            if (url != null) {
              return url;
            }

            const response = await Notifications.getLastNotificationResponseAsync();
            return response?.notification.request.content.data.url;
          },
          subscribe(listener) {
            const onReceiveURL = ({ url }) => listener(url);

            // Listen to incoming links from deep linking
            Linking.addEventListener('url', onReceiveURL);

            // Listen to expo push notifications
            const subscription = Notifications.addNotificationResponseReceivedListener(response => {
              const url = response.notification.request.content.data.url;
              listener(url); // 원하는 화면으로 이동합니다.
            });

            return () => {
              // Clean up the event listeners
              // Linking.removeEventListener('url', onReceiveURL);

              subscription.remove();
            };
          },
        }}>
          {/* Notification Visualization */}
        <Modal
          animationType="fade"
          visible={isNotificationOpen}
          transparent={true}
        >
          <View style={Platform.OS==="ios"?styles.modalIosContainer: styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>{notification?.request?.content?.title}</Text>
              <View style={styles.buttonArea}>
              <TouchableOpacity onPress={()=>{
                setIsNotificationOpen(false);
                Linking.openURL(notification?.request?.content?.data?.url);
              }}>
                <Text>수락</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{
                setIsNotificationOpen(false);
                }}>
                <Text>닫기</Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Test" component={Test} />
            {/* <Stack.Screen name="ContatctList" component={ContatctList} /> */}
            <Stack.Screen name="DiaryHome" component={DiaryHome} />
            <Stack.Screen name="MyPage" component={MyPage} />
            <Stack.Screen name="IndexPage" component={IndexPage} />
            <Stack.Screen name="MainPage" component={MainPage} />
            <Stack.Screen name="SYTest" component={SYTest} />
            <Stack.Screen name="SYTest2" component={SYTest2} />
            {/* <Stack.Screen name="Socket" component={Socket} /> */}
            <Stack.Screen name="AccountHistory" component={AccountHistory} />
            <Stack.Screen name="DiaryDetail" component={DiaryDetail} />
            <Stack.Screen name="DiaryCheck" component={DiaryCheck} />

            <Stack.Screen
              name="DoneChallengeScreen"
              component={DoneChallengeScreen}
            />
            <Stack.Screen
              name="SelectCategoryScreen"
              component={SelectCategoryScreen}
            />
            <Stack.Screen name="AccountScreen" component={AccountScreen} />
            <Stack.Screen name="WHTest" component={WHTest} />
            <Stack.Screen name="EditKeyword" component={EditKeyword} />
            <Stack.Screen
              name="DiaryCompleteScreen"
              component={DiaryCompleteScreen}
            />
            <Stack.Screen
              name="ChallengeMainPage"
              component={ChallengeMainPage}
            />
            <Stack.Screen
              name="ChallengeDetailPage"
              component={ChallengeDetailPage}
            />
            <Stack.Screen
              name="ChallengeCreatePage"
              component={ChallengeCreatePage}
            />
            <Stack.Screen
              name="ConsumptionSelect"
              component={ConsumptionSelect}
            />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </QueryClientProvider>
    </RecoilRoot>

  );
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    // EAS projectId is used here.
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error('Project ID not found');
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(token);
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }
  console.log("token" + token);

  return token;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'left',
    padding: 13,
    borderRadius: 20,
    marginTop: "10%",
    marginBottom: "180%",
    minHeight:"12%",
    marginHorizontal: "10%",
  },
  modalIosContainer: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'left',
    padding: 13,
    borderRadius: 20,
    marginTop: "15%",
    marginBottom: "180%",
    marginHorizontal: "8%",
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  buttonArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: "20%"
  },
});
