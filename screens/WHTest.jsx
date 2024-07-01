import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DiaryDetail from './picturediary/DiaryDetail'
import UserComponents from '../components/UserComponents'
import UserComponents_small from '../components/UserComponents_small'

const WHTest = ({navigation}) => {
  const props = {id:1, name: "자카르트"}
  return (
    <View>
       <View>
        <UserComponents props={props}/>
     </View>
       <View>
        <UserComponents_small props={props}/>
     </View>
    </View>
        
  )
}

export default WHTest

const styles = StyleSheet.create({})