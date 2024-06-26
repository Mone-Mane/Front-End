import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions,FlatList  } from 'react-native';
import React from 'react';
import PagerView from 'react-native-pager-view';
import { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../components/CustomHeader";
import color from '../../assets/colors/colors'
import HotRankingCard from '../../components/HotRankingCard'
import OilPic from "../../assets/oil_painting.png"



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

  const DATA1 = [
    { id: "1", medal: "🥇", title: "픽셀아트", participants: "2,337명" },
    {
      id: "2",
      medal: "🥈",
      title: "동굴벽화",
      participants: "2,337명",
    },
    {
      id: "3",
      medal: "🥉",
      title: "일본 애니메이션",
      participants: "2,337명",
    },
  ];
  
const DiaryHome = ({navigation}) => {
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
    <SafeAreaView style={styles.safe}>
    <CustomHeader title="SYTest" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>그림일기 생성하기</Text>
        </TouchableOpacity>
        <View style={styles.container}>
        <Text style={styles.subHeader}>Sync가 그려준 일기</Text>
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
          <View style={styles.hotList}>
            {DATA1.map((item,index)=>(
              <HotRankingCard
              key={index}
              medal={item.medal}
              title={item.title}
              participants={item.participants}
            />
            ))}
            </View>
        <View style={styles.chart}>
          <View style={styles.subText}>
            <Text style={styles.subHeader}>그림일기 이용 약관</Text>
          </View>
          <Image source={OilPic} style={styles.chartImage} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    backgroundColor: color.background,
      },
      scrollContainer: {
        backgroundColor:color.background,
        flexGrow: 1,
      },
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
    height:60,
    backgroundColor: color.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent:'center',
    margin:30
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText:{
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft:20,
    marginTop:15,
    alignSelf: 'flex-start',
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
    backgroundColor:"#FFFFFF",
    borderRadius:10,
    alignItems: 'center',
    marginBottom:20
  },
  chartImage: {
    borderRadius:10,
    width: 200,
    height: 200,
    margin:10,
    marginBottom:50
  },
  pagerView: {
    height: 150,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DiaryHome;
