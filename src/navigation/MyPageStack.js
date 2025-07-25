import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyPageScreen from '../screens/MyPage/MyPage/MyPageScreen';
import PointHistoryScreen from '../screens/MyPage/PointHistory/PointHistoryScreen';
import SettingsScreen from '../screens/MyPage/Settings/SettingsScreen';
import UserInfoScreen from '../screens/MyPage/UserInfo/UserInfoScreen';
import AdminStack from './AdminStack';


const Stack = createNativeStackNavigator();

const MyPageStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="MyPageScreen">
        <Stack.Screen name="Admin" component={AdminStack} />        
        <Stack.Screen name="MyPageScreen" component={MyPageScreen} />
        <Stack.Screen name="UserInfoScreen" component={UserInfoScreen} />
        <Stack.Screen name="PointHistoryScreen" component={PointHistoryScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    </Stack.Navigator>
  )
}

export default MyPageStack

const styles = StyleSheet.create({})