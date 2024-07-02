import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DiaryDetail from './picturediary/DiaryDetail'
import UserComponents from '../components/UserComponents'
import UserComponents_small from '../components/UserComponents_small'
import ChallengeCreatePage from './Challenge/ChallengeCreatePage'

const WHTest = ({navigation}) => {
  const props = {id:1, name: "자카르트"}
  return (
    <ChallengeCreatePage navigation={navigation}/>
  )
}

export default WHTest

const styles = StyleSheet.create({})