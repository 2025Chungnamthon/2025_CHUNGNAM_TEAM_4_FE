import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/Home/HomeScreen';
import CommunityScreen from '../screens/Community/CommunityScreen';
import MissionStack from './MissionStack';
import MyPageStack from './MyPageStack';

const Tab = createBottomTabNavigator();

const icons = {
//   Home: require('../assets/BottomTab/HomeFocused.png'),
//   Mission: require('../assets/BottomTab/Mission.png'),
//   Community: require('../assets/BottomTab/Community.png'),
//   MyPage: require('../assets/BottomTab/MyPage.png'),
  Home: require('../assets/BottomTab/Home.png'),
  Mission: require('../assets/BottomTab/Mission.png'),
  Community: require('../assets/BottomTab/Community.png'),
  MyPage: require('../assets/BottomTab/MyPage.png'),
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='MyPage'    
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false, // 기본 라벨 제거 (우리가 직접 구현)
        tabBarStyle: {
          height: 100,
          paddingTop: 10,
        //   borderColor: "black",
        //   borderWidth: 3,
        //   paddingTop: 20
        },
        tabBarIcon: ({ focused }) => {
          const icon = icons[route.name];
          const label = {
            Home: '홈',
            Mission: '미션',
            Community: '커뮤니티',
            MyPage: '내 정보',
          }[route.name];

          return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={icon}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? '#134E3A' : '#94A3B8', // 진한초록/회색
                  marginBottom: 4,
                }}
                resizeMode="contain"
              />
              <Text style={{ width:"60",textAlign:"center",fontSize: 12,fontWeight:600, color: focused ? '#134E3A' : '#94A3B8' }}>
                {label}
              </Text>
            </View>
          );
        },
      })}
    >

        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Mission" component={MissionStack}/>
        <Tab.Screen name="Community" component={CommunityScreen}/>
        <Tab.Screen name="MyPage" component={MyPageStack}/>
    </Tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({})