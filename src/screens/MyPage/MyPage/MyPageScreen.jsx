// screens/MyPageScreen.jsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { moderateScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTokens } from '../../../utils/tokenStorage';
import { clearLogoutSuccess, clearUserInfo, logoutUser } from '../../../redux/slices/userSlice';

const {width, height} = Dimensions.get('window');

const MyPageScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {userInfo} = useSelector((state)=>state.user);

  const logoutLoading = useSelector((state) => state.user.loading.logoutUser);
  const logoutSuccess = useSelector((state) => state.user.success.logoutUser);
  const logoutError = useSelector((state) => state.user.error.logoutUser);

  const handleLogout=()=>{
    console.log("start logout")
    dispatch(logoutUser());
  }

  const adminMenuItems = [
    { label: '관리자 화면', func: ()=>navigation.navigate('AdminStack')},    
    { label: '내정보 확인', func: ()=>navigation.navigate('UserInfoScreen')},
    { label: '포인트 사용 내역', func: ()=>navigation.navigate('PointHistoryScreen')},
    { label: '환경설정', func: ()=>navigation.navigate('SettingsScreen')},
    { label: '로그아웃', func: handleLogout},
  ];

  const userMenuItems =[
    { label: '내정보 확인', func: ()=>navigation.navigate('UserInfoScreen')},
    { label: '포인트 사용 내역', func: ()=>navigation.navigate('PointHistoryScreen')},
    { label: '환경설정', func: ()=>navigation.navigate('SettingsScreen')},
    { label: '로그아웃', func: ()=>handleLogout()},    
  ]

  useEffect(()=>{
    console.log("logoutSuccess",logoutSuccess)
    if(logoutSuccess){
      navigation.navigate("Login");
    }
  },[logoutSuccess])

  useEffect(()=>{
    dispatch(clearLogoutSuccess());
  })



  const renderMenuItem = ({ item }) => (
    <TouchableOpacity style={styles.menuItem} onPress={item.func}>
      <Text style={styles.menuText}>{item.label}</Text>
    </TouchableOpacity>
  );

  if(logoutLoading)
    return(
      <View style={styles.spinnerBox}>
        <ActivityIndicator size={80}/>
      </View>
    )

  return (
    <View style={styles.container}>
      {/* 상단 프로필 영역 */}
      <View style={styles.profileContainer}>
        <Image
          source={require('../../../assets/MyPage/profileImage.png')} // 또는 uri: 'http://...'
          style={styles.profileImage}
        />
        <View style={styles.profileTextContainer}>
          <Text style={styles.username}>{userInfo?.nickname}</Text>
          {/* <Text style={styles.bio}>소개글을 작성해주세요.</Text> */}
          <Text style={styles.bio}>
            {userInfo ? (userInfo.role === "ADMIN" ? "관리자" : "사용자") : ""}
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.editProfileText}>프로필수정 &gt;</Text>
        </TouchableOpacity>
      </View>

      {/* 메뉴 리스트 */}
      {userInfo?.role==='ADMIN'?
        <FlatList
          data={adminMenuItems}
          renderItem={renderMenuItem}
          keyExtractor={(item) => item.label}
          contentContainerStyle={styles.menuList}
        />        
      :
        <FlatList
          data={userMenuItems}
          renderItem={renderMenuItem}
          keyExtractor={(item) => item.label}
          contentContainerStyle={styles.menuList}
        />
      }    

    </View>
  );
};

export default MyPageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: height * 0.08,
  },
  profileContainer: {
    backgroundColor: '#17704B',
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ccc',
  },
  profileTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  username: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bio: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  editProfileText: {
    color: '#fff',
    fontSize: 12,
  },
  menuList: {
    paddingTop: 20,
    paddingHorizontal:width*0.07,
  },
  menuItem: {
    paddingVertical: 16,
    paddingHorizontal: moderateScale(4),
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  menuText: {
    fontSize: 16,
  },
  spinnerBox:{
    height:height,
    justifyContent:"center",
  },
});
