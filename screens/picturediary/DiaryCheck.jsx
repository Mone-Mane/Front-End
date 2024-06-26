import { View, Image, Text, StyleSheet, ScrollView,Dimensions  } from 'react-native'
import React from 'react'
import OilPic from "../../assets/oil_painting.png"
import DetailIcon from "../../assets/icons/detail.svg"

const { width } = Dimensions.get('window'); // 화면의 전체 너비를 가져옵니다.


const DiaryCheck = () => {
    const images = [
        {
            uri:require('../../assets/oil_painting.png'),
            tags: ['tag1', 'tag2', 'tag3'],
            description: '쌀국수 추억',
            date : '06.18'
        },
        {
          uri:require('../../assets/oil_painting.png'),
          tags: ['tag1', 'tag2', 'tag3'],
          description: '쌀국수 추억',
          date : '06.18'
        },
        {
          uri:require('../../assets/oil_painting.png'),
          tags: ['tag1', 'tag2', 'tag3'],
          description: '쌀국수 추억',
          date : '06.18'
        },
        {
          uri:require('../../assets/oil_painting.png'),
          tags: ['tag1', 'tag2', 'tag3'],
          description: '쌀국수 추억',
          date : '06.18'
        },
    ]

  return (
    <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
        {images.map((item, index) => (
          <View key={index} style={styles.imageContainer}>
            <View style={styles.descriptionHeader}>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.descriptionRigth}>
                    <Text style={styles.dateStyle}>{item.date}</Text>
                    <DetailIcon width={20} height={20}/>
                </View>
            </View>
            <Image source={OilPic} style={styles.image} />
            <View style={styles.tagContainer}>
              {item.tags.map((tag, idx) => (
                <Text key={idx} style={styles.tag}># {tag}</Text>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default DiaryCheck
const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: '#F9F9F9'
    },
    container: {
      width: '100%', // 화면 너비에 맞춤
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 20, // 스크롤 뷰 내부의 하단 여백
      marginBottom:10
    },
    descriptionHeader: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf:'center',
      justifyContent: 'space-between',
      margin:10
    },
    imageContainer: {
      backgroundColor: '#ffffff',
      width: '100%', // 이미지 컨테이너 화면 너비에 맞춤
      alignItems: 'center', // 중앙 정렬
      marginBottom: 20,
    },
    image: {
      width: '100%', // 이미지 화면 너비에 맞춤
      height: 250, // 이미지 높이 설정
    },
    description: {
      fontSize: 16,
      fontWeight: 'bold',
      alignSelf:'flex-start',
      marginLeft:15,
      marginBottom:5,
    },
    dateStyle: {
      fontSize: 13,
      fontWeight: 'rigth',
      marginRight:15,
    },
    descriptionRigth: {
      flexDirection:"row",
      alignSelf:"flex-end",
      marginRight:10,
    },
    tagContainer: {
      marginTop:20,
      marginBottom:20,
      flexDirection: 'row',
      alignSelf:'flex-start',
      paddingLeft:10,
    },
    tag: {
      backgroundColor: '#C5D9FF',
      borderRadius: 60,
      fontSize: 14,
      paddingHorizontal: 8,
      paddingVertical: 4,
      marginHorizontal: 4,
    },
  });