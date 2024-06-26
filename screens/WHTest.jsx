import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DiaryDetail from './picturediary/DiaryDetail'

const WHTest = ({navigation}) => {
  return (
    <View>
      <DiaryDetail navigation={navigation}/>
    </View>
  )
}

export default WHTest

const styles = StyleSheet.create({})