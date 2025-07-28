import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminMainScreen from '../screens/Admin/AdminMain/AdminMainScreen';
import AIMissionManageScreen from '../screens/Admin/AIMissionManage/AIMissionManageScreen';
import UserMissionReviewScreen from '../screens/Admin/UserMissionReview/UserMissionReviewScreen';
import UserMissionDetailScreen from '../screens/Admin/UserMissionDetail/UserMissionDetailScreen';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const AdminStack = () => {
  // const {userInfo} = useSelector((state)=>state.user)
  const { userInfo } = useSelector((state) => state.user);
  const navigation = useNavigation();
  const [authorized, setAuthorized] = useState(null); // null: 로딩중, false: 접근불가, true: 접근가능

  useEffect(() => {
    if (!userInfo || userInfo.role !== 'ADMIN') {
      Alert.alert('접근 권한이 없습니다.');
      navigation.replace('Main'); // or 'Login'
      setAuthorized(false);
    } else {
      setAuthorized(true);
    }
  }, [userInfo]);

  if (authorized === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#17704B" />
      </View>
    );
  }

  if (authorized === false) {
    return null;
  }  

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' }}} initialRouteName="AdminMainScreen">
      <Stack.Screen name="AdminMainScreen" component={AdminMainScreen} />        
      <Stack.Screen name="AIMissionManageScreen" component={AIMissionManageScreen} />
      <Stack.Screen name="UserMissionReviewScreen" component={UserMissionReviewScreen} />
      <Stack.Screen name="UserMissionDetailScreen" component={UserMissionDetailScreen} />        
    </Stack.Navigator>
  )
}

export default AdminStack

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});