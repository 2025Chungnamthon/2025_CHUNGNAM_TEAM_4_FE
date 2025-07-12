import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen';
import MissionScreen from '../screens/MissionScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="Mission" component={MissionScreen}/>
    </Stack.Navigator>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})