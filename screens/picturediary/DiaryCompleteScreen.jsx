import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Alert,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import CheckIcon from "../../assets/icons/check.svg";
import RestartIcon from "../../assets/icons/restart.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { diaryRequest } from "../../recoil/atoms/diary";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postDiary, putDiaryRetry } from "../../apis/diary";
import HomeIcon from "../../assets/icons/home.svg";
import DownloadIcon from "../../assets/icons/download.svg";
import SharingIcon from "../../assets/icons/sharing.svg";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Asset } from "expo-asset";
import * as IntentLauncher from "expo-intent-launcher";
import * as Sharing from 'expo-sharing';
 


const DiaryCompleteScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const requestData = useRecoilValue(diaryRequest);
  const [confirm, setConfirm] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const [imageUrl, setImageUrl] = useState("");
  const [imageCode, setImageCode] = useState("");
  const [error, setError] = useState("");
  const resetDiaryRequest = useResetRecoilState(diaryRequest);

  const queryClient = useQueryClient();
  // 이미지 인스타 공유
  const InstagramShare = async () => {
    try {
      // 로컬 이미지 파일 경로
      const asset = Asset.fromModule(imageUrl);
      await asset.downloadAsync();
      const uri = asset.localUri || asset.uri;

      if (Platform.OS === "android") {
        
        // 파일의 콘텐츠 URI 가져오기
        const imageUri = await FileSystem.getContentUriAsync(uri);
        // console.log(imageUri);

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
      } else {
        // 인스타그램 스토리로 공유
        await Sharing.shareAsync(uri, {
          dialogTitle: "Share to Instagram Story",
          mimeType: "image/jpeg",
          UTI: "public.jpeg",
        });
      }
    } catch (error) {
      console.error("이미지 공유 중 오류가 발생했습니다:", error);
      Alert.alert("이미지 공유 중 오류가 발생했습니다.");
    }
  };

  // 이미지 저장
  const handleDownload = async () => {
    try {

      // 파일 다운로드 경로 설정
      const fileUri = FileSystem.documentDirectory + 'downloaded_image.jpg';

      // 원격 URL에서 파일 다운로드
      const downloadResult = await FileSystem.downloadAsync(imageUrl, fileUri);

      // 파일 다운로드를 위한 권한 요청
      const { status } = await MediaLibrary.requestPermissionsAsync();
      const savedAsset = await MediaLibrary.createAssetAsync(downloadResult.uri);


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
    queryClient.invalidateQueries({ queryKey: ['getDiaryHomeList'] });
    navigation.navigate("DiaryHome");
  };

  const diaryMutation = useMutation({
    mutationFn: async(diaryinfo) => await postDiary(diaryinfo),
    onSuccess: (response) => {
      console.log("이미지 생성!:", response.data);
      setImageUrl(response.data.diaryImage);
      setImageCode(response.data.diaryCode)
    },
    onError: () => {
      setIsLoading(true);
    },
  });


  const retryDiary = useMutation({
    mutationFn: ({imageCode}) => putDiaryRetry(imageCode),
    onSuccess: (response) => {
      setImageUrl(response.data.diaryImage);
      setImageCode(response.data.diaryCode)
    },
    onError: (error) => {
      console.error("다시그리기 실패:", error);
      alert(`Error updating title: ${error.message}`);
    },
  });

  useEffect(()=>{
    if(imageUrl)
    {
      setIsLoading(false)
    }
  },[imageUrl])

  const retryPictureDiary = (imageCode) => {
    setIsLoading(true);
    setImageUrl(null)
    retryDiary.mutate(imageCode);
  };

  useEffect(() => {
    diaryMutation.mutate(requestData);
  }, [requestData]);

  useEffect(()=>{
    if(imageCode)
      setIsLoading(false)
  },[imageCode])

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
                <TouchableOpacity style={styles.button} onPress={()=>{
                  setImageUrl(null);
                  retryPictureDiary({imageCode:imageCode})}}>
                  <View style={styles.iconContainer}>
                    <RestartIcon width={15} height={18} style={styles.icon} />
                  </View>
                  <Text style={styles.buttonText}>다시 그리기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={changeAction}>
                  <View style={styles.iconContainer}>
                    <CheckIcon width={16} height={12} style={styles.icon} />
                  </View>
                  <Text style={styles.buttonText}>확정하기</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={[styles.button, styles.subButton]}
                  onPress={resetAtom}
                >
                  <View style={styles.iconContainer}>
                    <HomeIcon width={20} height={20} style={styles.icon} />
                  </View>
                  <Text style={styles.buttonText}>홈으로</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.smallButton, styles.redbtn]}
                  onPress={handleDownload}
                >
                  <View>
                    <DownloadIcon width={20} height={20} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.smallButton, styles.yellowbtn]}
                  onPress={InstagramShare}
                >
                  <View>
                    <SharingIcon width={20} height={20} />
                  </View>
                </TouchableOpacity>
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
