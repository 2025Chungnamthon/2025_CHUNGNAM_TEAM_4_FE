import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Linking, Dimensions, Animated, ActivityIndicator } from 'react-native';
import React, { useEffect, useRef, useState } from 'react'
import { moderateScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/userSlice';
import { getAccessToken, getRefreshToken } from '../../utils/tokenStorage';
import LoadingSpinner from '../../components/LoadingSpinner';
import FloatingLabelInput from './components/FloatingLabelInput';

const {width, height} = Dimensions.get('window');

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch()    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
  const [isIdFocused, setIsIdFocused] = useState(false);
  const [isPwFocused, setIsPwFocused] = useState(false);
  const loginLoading = useSelector((state)=>state.user.loading.loginUser)

  const handleLogin = async() => {
    try {
      const res = await dispatch(loginUser({ email, password })).unwrap();
      console.log("로그인 성공", res);
      navigation.replace("Main");
    } catch (err) {
      Alert.alert("로그인 실패", err);
    }
  }

  // const handleLogin = async() => {
  //   try {
  //     const res = await dispatch(loginUser({ email:"admin@admin.com", password:"admin123@" })).unwrap();
  //     console.log("로그인 성공", res);
  //     navigation.replace("Main");
  //   } catch (err) {
  //     Alert.alert("로그인 실패", err);
  //   }    
  // }

  // const handleLogin = async() => {
  //   try {
  //     const res = await dispatch(loginUser({ email:"user15@gmail.com", password:"user123@" })).unwrap();
  //     console.log("로그인 성공", res);
  //     navigation.replace("Main");
  //   } catch (err) {
  //     Alert.alert("로그인 실패", err);
  //   }    
  // }  

  const handleSignupButton = () => {
    navigation.navigate('Signup');
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          source={require('../../assets/common/logo.png')} // 로고 이미지를 assets 폴더에 넣어주세요.
          style={styles.logo}
          resizeMode="contain"
        />

        {/* 입력 필드 */}
        <View style={styles.inputContainer}>
          <FloatingLabelInput value={email} label="이메일" onChangeText={setEmail} />
          <FloatingLabelInput value={password} label="비밀번호" onChangeText={setPassword} secureTextEntry />
        </View>

        {/* 버튼 */}
        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          {loginLoading?<ActivityIndicator size="small" color="white"/>:<Text style={styles.loginButtonText}>로그인</Text>}
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignupButton} style={styles.signupButton}>
          <Text style={styles.signupButtonText}>회원가입</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={async()=>{console.log(await getAccessToken())}} style={styles.signupButton}>
          <Text style={styles.signupButtonText}>getAccessToken</Text>
        </TouchableOpacity>
        

        <TouchableOpacity onPress={async()=>{console.log(await getRefreshToken())}} style={styles.signupButton}>
          <Text style={styles.signupButtonText}>getRefreshToken</Text>
        </TouchableOpacity>         */}
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.footer}>
          <Text style={styles.footerLink} onPress={() => Linking.openURL('#')}>계정관리</Text>
          <Text style={styles.footerDivider}>|</Text>
          <Text style={styles.footerLink} onPress={() => Linking.openURL('#')}>고객센터</Text>
        </View>

        {/* 하단 로고 (회색) */}
        <Image
          source={require('../../assets/common/logo.png')} // 회색 로고 이미지도 준비해주세요
          style={styles.footerLogo}
          resizeMode="contain"
        />        
      </View>
      
    </View>
  );
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: "space-between",
    paddingTop: height *0.16,
    paddingBottom: height *0.12,
    paddingHorizontal: 24,
  },
  topContainer:{
    // flex:1,
    width: "100%",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth:1,
  },
  bottomContainer:{
    width: "100%",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth:1,
  },
  logo: {
    width: 100,
    // height: 80,
    marginBottom: moderateScale(30),
  },
  inputContainer: {
    width: '100%',
    marginBottom: moderateScale(16),
  },
  input: {
    // borderWidth: 1,
    // borderColor: '#ccc',
    // height: 48,
    // paddingHorizontal: 12,
    // borderRadius: 6,
    // marginBottom: 10,
    paddingTop: 15,
    paddingBottom:10,
  },
  // IDInput:{
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  //   height: 48,
  //   paddingHorizontal: 12,
  //   borderTopLeftRadius: 6,
  //   borderTopRightRadius: 6,
  //   // borderRadius: 6,
  //   // marginBottom: 10,    
  // },
  // passInput:{
  //   borderWidth: 1,
  //   // borderTopWidth: 0,
  //   borderColor: '#ccc',
  //   height: 48,
  //   paddingHorizontal: 12,
  //   borderBottomLeftRadius: 6,
  //   borderBottomRightRadius: 6,    
  //   // borderRadius: 6,
  //   marginBottom: 10,
  // },
  // inputFocused: {
  //   borderColor: '#0DA666',
  //   borderWidth:1.5,
  // },
  loginButton: {
    backgroundColor: '#22A75D',
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginBottom: 12,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signupButton: {
    borderWidth: 1,
    borderColor: '#22A75D',
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginBottom: 40,
  },
  signupButtonText: {
    color: '#22A75D',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  footerLink: {
    color: '#666',
    fontSize: 13,
  },
  footerDivider: {
    marginHorizontal: 8,
    color: '#aaa',
  },
  footerLogo: {
    width: 50,
    // height: 40,
    tintColor: '#ccc',
  },
});