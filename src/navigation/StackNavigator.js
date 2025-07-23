import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/Home/HomeScreen';
import CommunityScreen from '../screens/Community/CommunityScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import TabNavigator from './TabNavigator';
import MyPageScreen from '../screens/MyPage/MyPageScreen';
import SignupScreen from '../screens/Signup/SignupScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    // <Stack.Navigator initialRouteName="Home">
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="Signup" component={SignupScreen}/>      
      <Stack.Screen name="Main" component={TabNavigator}/>
      {/* <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="Mission" component={MissionScreen}/>
      <Stack.Screen name="Community" component={CommunityScreen}/>
      <Stack.Screen name="MyPage" component={MyPageScreen}/> */}
    </Stack.Navigator>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})