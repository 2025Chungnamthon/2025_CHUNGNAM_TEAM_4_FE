// screens/Admin/AdminMainScreen.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import COLORS from '../../../constants/colors';

const {width,height} = Dimensions.get('window');

const AdminMainScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>관리자 페이지</Text>
      </View>

      {/* 버튼 영역 */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AIMissionManageScreen')}
      >
        <FontAwesome5 name="tasks" size={20} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>AI 미션 생성 및 검토</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('UserMissionReviewScreen')}
      >
        <Ionicons name="person-circle-outline" size={28} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>사용자 미션 검토</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"center",
    marginBottom: height *0.06,
    paddingTop: height *0.05,
  },
  goBackButton:{
    position:'absolute',
    top: height *0.05,
    left:0,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    justifyContent:"center",
    alignItems: 'center',
    backgroundColor: COLORS.green200,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginBottom: 16,
  },
  icon: {
    position:"absolute",
    left:width*0.05,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

