import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Linking, Dimensions, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react'
import { moderateScale } from 'react-native-size-matters';

const {width, height} = Dimensions.get('window');

const FloatingLabelInput = ({ label, secureTextEntry = false }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');
  const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: 'absolute',
    left: 8,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 2],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 9],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa', '#aaa'],
    }),
    backgroundColor: '#fff',
    paddingHorizontal: 4,
  };

  return (
    <View>
      <Animated.Text style={labelStyle}>
        {label}
      </Animated.Text>
      <TextInput
        value={value}
        onChangeText={setValue}
        style={[
          styles.input,
          label==="이메일"?styles.IDInput:styles.passInput,
          (isFocused || value) && styles.inputFocused,
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};



const LoginScreen = ({navigation}) => {
  const [isIdFocused, setIsIdFocused] = useState(false);
  const [isPwFocused, setIsPwFocused] = useState(false);

  const handleLogin = () => {
    navigation.replace('Main');
  }

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
          <FloatingLabelInput label="이메일" />
          <FloatingLabelInput label="비밀번호" secureTextEntry />
        </View>

        {/* 버튼 */}
        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignupButton} style={styles.signupButton}>
          <Text style={styles.signupButtonText}>회원가입</Text>
        </TouchableOpacity>
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
  IDInput:{
    borderWidth: 1,
    borderColor: '#ccc',
    height: 48,
    paddingHorizontal: 12,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    // borderRadius: 6,
    // marginBottom: 10,    
  },
  passInput:{
    borderWidth: 1,
    // borderTopWidth: 0,
    borderColor: '#ccc',
    height: 48,
    paddingHorizontal: 12,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,    
    // borderRadius: 6,
    marginBottom: 10,
  },
  inputFocused: {
    borderColor: '#0DA666',
    borderWidth:1.5,
  },
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