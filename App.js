import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import * as IntentLauncher from "expo-intent-launcher";
import * as Sharing from "expo-sharing";

const InstagramShare = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    quality: 1,
  });
  console.log(result);

  if (!result.cancelled) {
    const imageUri = await FileSystem.getContentUriAsync(result.assets[0].uri);
    console.log(imageUri);
    IntentLauncher.startActivityAsync("com.instagram.share.ADD_TO_STORY", {
      data: imageUri,
      flags: 1, // FLAG_GRANT_READ_URI_PERMISSION
      type: "image/jpeg", // or other based on your file type
    }).catch(console.warn);
  }
};

export default function App() {
  return (
    <View className="flex-1 bg-green-500 flex items-center justify-center">
      <Text>123124</Text>
      <Button title="test" onPress={InstagramShare} />
      <StatusBar style="auto" />
      <View>
        <Text className="text-3xl">
          Open up App.js to start working on your app!
        </Text>
      </View>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
