import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminMainScreen from '../screens/Admin/AdminMain/AdminMainScreen';
import AIMissionManageScreen from '../screens/Admin/AIMissionManage/AIMissionManageScreen';
import UserMissionReviewScreen from '../screens/Admin/UserMissionReview/UserMissionReviewScreen';



const Stack = createNativeStackNavigator();

const AdminStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' }}} initialRouteName="AdminMainScreen">
        <Stack.Screen name="AdminMainScreen" component={AdminMainScreen} />        
        <Stack.Screen name="AIMissionManageScreen" component={AIMissionManageScreen} />
        <Stack.Screen name="UserMissionReviewScreen" component={UserMissionReviewScreen} />
    </Stack.Navigator>
  )
}

export default AdminStack

const styles = StyleSheet.create({})