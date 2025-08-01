import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/Home/HomeScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import TabNavigator from './TabNavigator';
import SignupScreen from '../screens/Signup/SignupScreen';
import AdminStack from './AdminStack';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    // <Stack.Navigator initialRouteName="Home">
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="Signup" component={SignupScreen}/> 
      <Stack.Screen name="AdminStack" component={AdminStack} />
      <Stack.Screen name="Main" component={TabNavigator}/>
    </Stack.Navigator>
  )
}

export default StackNavigator;

const styles = StyleSheet.create({})