import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyMissionListScreen from '../screens/Mission/MyMissionList/MyMissionListScreen';
import MissionRouter from './MissionRouter';
import WeeklyMissionSelectScreen from '../screens/Mission/WeeklyMissionSelect/WeeklyMissionSelectScreen';
import DailyMissionSelectScreen from '../screens/Mission/DailyMissionSelect/DailyMissionSelectScreen';

const Stack = createNativeStackNavigator();

const MissionStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="MissionRouter">
        <Stack.Screen name="MissionRouter" component={MissionRouter} />
        <Stack.Screen name="WeeklyMissionSelectScreen" component={WeeklyMissionSelectScreen} />
        <Stack.Screen name="DailyMissionSelectScreen" component={DailyMissionSelectScreen} />
        <Stack.Screen name="MyMissionListScreen" component={MyMissionListScreen} />
    </Stack.Navigator>
  )
}

export default MissionStack

const styles = StyleSheet.create({})