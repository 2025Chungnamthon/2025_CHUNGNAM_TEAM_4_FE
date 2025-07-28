import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyMissionListScreen from '../screens/Mission/MyMissionList/MyMissionListScreen';
import MissionRouter from './MissionRouter';
import WeeklyMissionSelectScreen from '../screens/Mission/WeeklyMissionSelect/WeeklyMissionSelectScreen';
import DailyMissionSelectScreen from '../screens/Mission/DailyMissionSelect/DailyMissionSelectScreen';
import CommunityListScreen from '../screens/Community/CommunityList/CommunityListScreen';
import CommunityDetailScreen from '../screens/Community/CommunityDetail/CommunityDetailScreen';
import CommunityWriteScreen from '../screens/Community/CommunityWrite/CommunityWriteScreen';

const Stack = createNativeStackNavigator();

const CommunityStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="CommunityListScreen">
        <Stack.Screen name="CommunityListScreen" component={CommunityListScreen} />
        <Stack.Screen name="CommunityDetailScreen" component={CommunityDetailScreen} />
        <Stack.Screen name="CommunityWriteScreen" component={CommunityWriteScreen} />
    </Stack.Navigator>
  )
}

export default CommunityStack

const styles = StyleSheet.create({})