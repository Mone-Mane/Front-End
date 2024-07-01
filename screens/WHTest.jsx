import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DiaryDetail from './picturediary/DiaryDetail'
import ConsumptionSelect from './picturediary/ConsumptionSelect'

const WHTest = ({navigation}) => {
  return (
    <ConsumptionSelect navigation={navigation}/>
  )
}

export default WHTest

const styles = StyleSheet.create({})