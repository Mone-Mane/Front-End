import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Arrow from "../assets/icons/downarrow.svg";
import cavePainting from "../assets/cave_painting.png"; // Make sure the path is correct

const ProgressBar = ({ progress, sizeFont }) => {
  const displayProgress = Math.min(progress, 100); // 진행률은 최대 100으로 제한
  const barColor = progress > 85 ? "#FF4935" : "#5A73F5"; // 85% 초과 시 빨간색
  const iconPosition = Math.max(displayProgress - 100, 0); // 아이콘 위치 조정

  return (
    <View style={styles.progressBar}>
      <View style={styles.container}>
        {/* 진행 막대 */}
        <View
          style={[
            styles.bar,
            { width: `${displayProgress}%`, backgroundColor: barColor },
          ]}
        >
          {/* 아이콘 */}
          <Text style={[styles.icon, { right: `${iconPosition}%` }]}><Arrow width={20} height={20}/></Text>
        </View>
        {/* 진행률 표시 */}
      </View>
      <Text style={[styles.percentageText, { fontSize: `${sizeFont}` }]}>{`${progress}%`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%", // 컨테이너의 너비를 부모의 전체 너비로 설정
    height: 10, // 막대의 높이 + 여유 공간
    borderRadius: 5,
    backgroundColor: "#e8e8e8",
    position: "absolute",
  },
  bar: {
    height: "100%", // 막대의 높이를 컨테이너와 동일하게 설정
    position: "absolute",
    borderRadius: 5,
  },
  icon: {
    position: "absolute",
    fontSize: 16,
    top: "50%", // 아이콘을 막대 중앙에 위치시킴
    transform: [{ translateY: -21 }, {translateX: 7}],
  },
  percentageText: {
    marginTop:20,
    top: 5, // 막대 바 밑으로 텍스트를 이동
    // transform: [{ translateX: -50 }], /// 텍스트가 정중앙에 오도록 조정
    color: "black",
    fontFamily: "Bold",
    alignSelf:"flex-end",
  },
});

export default ProgressBar;
