import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MissionScreen = ({navigation}) => {
  return (
    <View>
      <Text>MissionScreen</Text>
      <Button
        title="홈 가기"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  )
}

export default MissionScreen

const styles = StyleSheet.create({})