import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DiaryDetail from './picturediary/DiaryDetail'
import ConsumptionSelect from './ConsumptionSelect'

const WHTest = ({navigation}) => {
  return (
    <View>
      <ConsumptionSelect navigation={navigation}/>
      {/* <DiaryDetail navigation={navigation}/> */}
    </View>
  )
}

export default WHTest

const styles = StyleSheet.create({})