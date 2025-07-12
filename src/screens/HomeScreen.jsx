import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/slices/userSlice';

const HomeScreen = ({navigation}) => {
    // const dispatch = useDispatch();
    // const {user} = useSelector((state)=>state.user)
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        title="미션 화면"
        onPress={() => navigation.navigate('Mission')}
      />
      {/* <Text>{user?user:"none"}</Text> */}
      {/* <Button title="create user" onPress={()=> dispatch(setUser("hi im a user,probs"))}/> */}
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})