import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyMissionListScreen from '../screens/Mission/MyMissionList/MyMissionListScreen';
import MissionRouter from './MissionRouter';
import WeeklyMissionSelectScreen from '../screens/Mission/WeeklyMissionSelect/WeeklyMissionSelectScreen';
import DailyMissionSelectScreen from '../screens/Mission/DailyMissionSelect/DailyMissionSelectScreen';
import CommunityListScreen from '../screens/Community/CommunityList/CommunityListScreen';
import CommunityDetailScreen from '../screens/Community/CommunityDetail/CommunityDetailScreen';

const Stack = createNativeStackNavigator();

const CommunityStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="CommunityList">
        <Stack.Screen name="CommunityList" component={CommunityListScreen} />
        <Stack.Screen name="CommunityDetail" component={CommunityDetailScreen} />
    </Stack.Navigator>
  )
}

export default CommunityStack

const styles = StyleSheet.create({})