import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import cavePainting from '../assets/cave_painting.png'; // Make sure the path is correct


const ProgressBar = ({ progress }) => {
  const displayProgress = Math.min(progress, 100); // 진행률은 최대 100으로 제한
  const barColor = progress > 100 ? 'red' : '#5A73F5'; // 100% 초과 시 빨간색
  const iconPosition = Math.max(displayProgress-100, 0); // 아이콘 위치 조정

  return (
    <View style={styles.container}>
      {/* 진행 막대 */}
      <View style={[styles.bar, { width: `${displayProgress}%`, backgroundColor: barColor }]}>
        {/* 아이콘 */}
        <Text style={[styles.icon, { right: `${iconPosition}%` }]}>🔥</Text>
        {/* <Image
          source={cavePainting} // 실제 아이콘 URL로 교체 필요
          
          resizeMode="contain"
        /> */}
      </View>
      {/* 진행률 표시 */}
      <Text style={styles.percentageText}>{`${displayProgress}%`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%', // 컨테이너의 너비를 부모의 전체 너비로 설정
    height: 10, // 막대의 높이 + 여유 공간
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    position: 'relative',
    overflow: 'hidden', // 내부 요소가 컨테이너를 벗어나지 않도록 설정
    marginBottom: 20, // 텍스트와의 여유 공간을 위해 하단에 마진 추가
  },
  bar: {
    height: '100%', // 막대의 높이를 컨테이너와 동일하게 설정
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 5,
  },
  icon: {
    position: 'absolute',
    width: 10, // 아이콘의 크기 설정
    height: 14, // 아이콘의 높이 설정
    top: '50%', // 아이콘을 막대 중앙에 위치시킴
    transform: [{ translateY: -10 }], // 아이콘을 수직으로 중앙에 맞추도록 조정
  },
  percentageText: {
    position: 'absolute',
    top: 35, // 막대 바 밑으로 텍스트를 이동
    left: '50%', // 가운데 정렬
    transform: [{ translateX: -50 }], // 텍스트가 정중앙에 오도록 조정
    color: 'black',
    fontWeight: 'bold'
  }
});

export default ProgressBar;
