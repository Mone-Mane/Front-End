import { StyleSheet, Text, View, Image, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import CheckIcon from "../../assets/icons/check.svg";
import RestartIcon from "../../assets/icons/restart.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { diaryRequest } from "../../recoil/atoms/diary";
import { useMutation } from "@tanstack/react-query";
import { postDiary } from "../../apis/diary";
import HomeIcon from "../../assets/icons/home.svg";
import DownloadIcon from "../../assets/icons/download.svg";
import SharingIcon from "../../assets/icons/sharing.svg";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Asset } from "expo-asset";
import * as IntentLauncher from "expo-intent-launcher";

const DiaryCompleteScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const requestData = useRecoilValue(diaryRequest);
  const [confirm, setConfirm] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const resetDiaryRequest = useResetRecoilState(diaryRequest);

  // 이미지
  const handleGenerateImage = () => {
    fetch("http://172.16.21.53:5000/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setImageUrl(data.image_url);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Failed to fetch image.");
      });
  };

  // 이미지 인스타 공유
  const InstagramShare = async () => {
    try {
      // 로컬 이미지 파일 경로
      const asset = Asset.fromModule(imageUrl);
      await asset.downloadAsync();
      const uri = asset.localUri || asset.uri;

      // 파일의 콘텐츠 URI 가져오기
      const imageUri = await FileSystem.getContentUriAsync(uri);
      console.log(imageUri);

      // 인스타그램 스토리에 이미지 공유
      await IntentLauncher.startActivityAsync(
        "com.instagram.share.ADD_TO_STORY",
        {
          data: imageUri,
          flags: 1, // FLAG_GRANT_READ_URI_PERMISSION
          type: "image/png", // or other based on your file type
        }
      );

      Alert.alert("이미지가 인스타그램 스토리에 공유되었습니다.");
    } catch (error) {
      console.error("이미지 공유 중 오류가 발생했습니다:", error);
      Alert.alert("이미지 공유 중 오류가 발생했습니다.");
    }
  };

  // 이미지 저장
  const handleDownload = async () => {
    try {
      // 로컬 이미지 파일 경로
      const asset = Asset.fromModule(imageUrl);
      await asset.downloadAsync();
      const uri = asset.localUri || asset.uri;

      // 파일 다운로드를 위한 권한 요청
      const { status } = await MediaLibrary.requestPermissionsAsync();
      const savedAsset = await MediaLibrary.createAssetAsync(uri);

      Alert.alert("파일이 다운로드되었습니다.");

      // setIsDownloading(false);
    } catch (error) {
      console.error("파일 다운로드 중 오류가 발생했습니다:", error);
      Alert.alert("파일 다운로드 중 오류가 발생했습니다.");
      setIsDownloading(false);
    }
  };

  const changeAction = () => {
    setConfirm(true);
  };
  const resetAtom = () => {
    resetDiaryRequest;
    navigation.navigate("DiaryHome");
  };

  const diaryMutation = useMutation({
    mutationFn: ({ requestData }) => postDiary(requestData),
    onError: () => {
      setIsLoading(false);
    },
  });

  useEffect(() => {
    console.log(requestData);
    // diaryMutation.mutate({ requestData: requestData });
  }, []);

  useEffect(() => {
    // requestData에서 diaryConcept와 diaryTags를 추출하여 prompt 상태에 설정
    const { diaryConcept, diaryTags } = requestData;
    const promptString = `${diaryConcept}  ${diaryTags.join(", ")}`;
    setPrompt(promptString);
  }, [requestData]);

  useEffect(() => {
    if (prompt) {
      handleGenerateImage();
    }
  }, [prompt]);

  console.log(prompt);
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          {isLoading ? (
            <>
              <Text style={styles.text}>그림일기를 그리고 있어요!</Text>
              <Text style={styles.text}>조금만 기다려주세요...</Text>
            </>
          ) : (
            <>
              <Text style={styles.text}>선택한 소비 내역으로 </Text>
              <Text style={styles.text}>그림일기를 그렸어요</Text>
            </>
          )}
        </View>
        <View style={styles.contentContainer}>
          {isLoading ? (
            <Image
              source={require("../../assets/giftest2.gif")}
              style={styles.gif}
            />
          ) : (
            <Image source={{ uri: imageUrl }} style={styles.complete} />
          )}
        </View>
        {!isLoading && (
          <View style={styles.buttonWrapper}>
            {!confirm ? (
              <>
                <Pressable style={styles.button}>
                  <View style={styles.iconContainer}>
                    <RestartIcon width={15} height={18} style={styles.icon} />
                  </View>
                  <Text style={styles.buttonText}>다시 그리기</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={changeAction}>
                  <View style={styles.iconContainer}>
                    <CheckIcon width={16} height={12} style={styles.icon} />
                  </View>
                  <Text style={styles.buttonText}>확정하기</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Pressable
                  style={[styles.button, styles.subButton]}
                  onPress={resetAtom}
                >
                  <View style={styles.iconContainer}>
                    <HomeIcon width={20} height={20} style={styles.icon} />
                  </View>
                  <Text style={styles.buttonText}>홈으로</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.smallButton, styles.redbtn]}
                  onPress={handleDownload}
                >
                  <View>
                    <DownloadIcon width={20} height={20} />
                  </View>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.smallButton, styles.yellowbtn]}
                  onPress={InstagramShare}
                >
                  <View>
                    <SharingIcon width={20} height={20} />
                  </View>
                </Pressable>
              </>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DiaryCompleteScreen;

const styles = StyleSheet.create({
  safe: {
    backgroundColor: "#f9f9f9",
    flex: 1,
  },
  container: {
    padding: 30,
    flex: 1,
    // justifyContent: "center",
    marginTop: 30,
  },
  textContainer: {
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontFamily: "Bold",
    marginBottom: 10,
    textAlign: "center",
  },
  contentContainer: {
    alignItems: "center",
    paddingTop: 30,
  },
  gif: {
    width: 200,
    height: 200,
  },
  complete: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 16,
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#5A73F5",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
    justifyContent: "center", // 중앙 정렬
    position: "relative", // 아이콘을 절대 위치로 배치하기 위해 사용
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 21,
    fontFamily: "Bold",
    letterSpacing: 0.25,
    color: "white",
  },
  iconContainer: {
    position: "absolute",
    right: 7,
    bottom: 13,
  },
  icon: {
    marginRight: 5, // 아이콘과 텍스트 사이의 간격 조정
  },
  subButton: {
    flex: 3,
    flexDirection: "row",
    marginHorizontal: 5,
  },
  smallButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  redbtn: {
    backgroundColor: "#FF4935",
  },
  yellowbtn: {
    backgroundColor: "#FFCF73",
  },
});
