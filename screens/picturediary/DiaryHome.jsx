import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions  } from 'react-native';
import React from 'react';
import PagerView from 'react-native-pager-view';
import { useState, useEffect, useRef } from 'react';

const images = [
    require('../../assets/cave_painting.png'),
    require('../../assets/pixel_art.png'),
    require('../../assets/East_Asian_painting.png'),
    require('../../assets/Japanese_anime.png'),
    require('../../assets/kawaii.png'),
    require('../../assets/oil_painting.png'),
    require('../../assets/pastel.png'),
    require('../../assets/caricature.png'),
  ];

  const getPairedImages = (images) => {
    const pairedImages = [];
    for (let i = 0; i < images.length; i += 2) {
      pairedImages.push(images.slice(i, i + 2));
    }
    return pairedImages;
  };
  
const DiaryHome = () => {
    const pairedImages = getPairedImages(images);
  const pagerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageSelected = (e) => {
    const position = e.nativeEvent.position;
    setCurrentPage(position);
    if (position === pairedImages.length) {
      pagerRef.current.setPageWithoutAnimation(0);
    }
  };
    
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.createButton}>
        <Text style={styles.createButtonText}>그림일기 생성하기</Text>
      </TouchableOpacity>
      <Text style={styles.subHeader}>Sync가 그려준 일기</Text>
      <View style={styles.container}>
        <PagerView
            ref={pagerRef}
            style={styles.pagerView}
            initialPage={0}
            onPageSelected={handlePageSelected}
        >
            {pairedImages.map((pair, index) => (
                <View style={styles.imageContainer} key={index.toString()}>
                    {pair.map((image, idx) => (
                    <Image key={idx.toString()} source={image} style={styles.image} />
                    ))}
                </View>
            ))}
        </PagerView>
        </View>
      <Text style={styles.subHeader}>주간 HOT! 그림체</Text>
      <View style={styles.hotList}>
        <Text style={styles.hotItem}>🥇 픽셀아트 - 주간 사용자: 4,337명</Text>
        <Text style={styles.hotItem}>🥈 둥글 벽화 - 주간 사용자: 3,287명</Text>
        <Text style={styles.hotItem}>🥉 일본 애니메이션 - 주간 사용자: 2,937명</Text>
      </View>
      <Text style={styles.subHeader}>그림일기 이용 약관</Text>
      <View style={styles.chart}>
        <Image source={{ uri: 'https://your-chart-url.com/chart.jpg' }} style={styles.chartImage} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  createButton: {
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  hotList: {
    marginBottom: 20,
  },
  hotItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  chart: {
    alignItems: 'center',
  },
  chartImage: {
    width: 300,
    height: 200,
  },
  pagerView: {
    height: 250,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DiaryHome;
