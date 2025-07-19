import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react'
import CustomCheckbox from './components/CustomCheckBox';
import InputWithIcon from './components/InputWithIcon';
import { moderateScale } from 'react-native-size-matters';
import EmailInputWithCheckButton from './components/EmailInputWithCheckButton';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const isFormValid =
    password !== '' &&
    passwordConfirm !== '' &&
    nickname !== '' &&
    isEmailChecked &&
    agreeTerms &&
    agreePrivacy;

  const checkEmailDuplicate = () => {
    console.log(email);
    try {
        // 예시 API 요청 (axios 또는 fetch 사용 가능)
        // const response = await axios.get(`https://your-api.com/api/check-email?email=${email}`);
        if (1) {
            Alert.alert("중복 확인",'중복 확인 성공');
            setIsEmailChecked(true);        
        } else {
            Alert.alert("중복 확인",'이미 존재하는 계정이 있습니다');
        }
    } catch (error) {
        console.error(error);
        Alert.alert('API 오류');
    }
  }

  const handleSignUp = () => {
    if (!agreeTerms || !agreePrivacy) {
      alert('필수 약관에 모두 동의해야 합니다.');
      return;
    }
    // 여기에 회원가입 API 로직 추가
    console.log('회원가입 요청:', { email, password, nickname });
  };

  return (
    <View style={styles.container}>
        <View style={styles.scrollViewContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Image source={require('../../assets/common/logo.png')} style={styles.logo} />
                <Text style={styles.title}>회원가입</Text>

                <View style={styles.largeInputContainer}>
                    <EmailInputWithCheckButton
                        iconSource={require('../../assets/Signup/email.png')}
                        value={email}
                        onChangeText={setEmail}
                        checkEmailDuplicate={checkEmailDuplicate}
                        isEmailChecked={isEmailChecked}
                    />
                    <InputWithIcon
                        iconSource={require('../../assets/Signup/pass.png')}
                        placeholder="비밀번호"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <InputWithIcon
                        iconSource={require('../../assets/Signup/passCheck.png')}
                        placeholder="비밀번호 확인"
                        value={passwordConfirm}
                        onChangeText={setPasswordConfirm}
                        secureTextEntry
                    />
                    <InputWithIcon
                        iconSource={require('../../assets/Signup/nickname.png')}
                        placeholder="닉네임"
                        value={nickname}
                        onChangeText={setNickname}
                    />
                    
                </View>


                <View style={styles.checkboxContainer}>
                    <CustomCheckbox checked={agreeTerms} onToggle={() => setAgreeTerms(!agreeTerms)} />
                    <Text style={styles.greenText}>
                        (필수) 
                    </Text>        
                    <Text style={styles.checkboxLabel}>
                    이용약관에 동의합니다. <Text style={styles.detailText}>자세히 보기</Text>
                    </Text>
                </View>

                <View style={styles.checkboxContainer}>
                    <CustomCheckbox checked={agreePrivacy} onToggle={() => setAgreePrivacy(!agreePrivacy)} />
                    <Text style={styles.greenText}>
                        (필수) 
                    </Text>
                    <Text style={styles.checkboxLabel}>
                    개인정보 수집 및 활용에 동의합니다. <Text style={styles.detailText}>자세히 보기</Text>
                    </Text>
                </View>
            </ScrollView>
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity 
                onPress={handleSignUp}
                disabled={!isFormValid}            
                style={[styles.button, {backgroundColor: isFormValid? '#189D66' : '#9E9E9E'}]} 

            >
                <Text style={styles.buttonText}>가입하기</Text>
            </TouchableOpacity>    
        </View>
    
    </View>    
  );
}

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    flexGrow: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
  },
  scrollViewContainer:{
    height: "87%"
  },
  scrollContainer: {
    // padding: 20,
    // paddingTop: 60,
    // flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',    
    paddingBottom: moderateScale(40),
  },  
  logo: {
    width: 60,
    // height: 40,
    resizeMode: 'contain',
    // marginBottom: 20,
    alignSelf:"flex-start"
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 60,
  },
  largeInputContainer:{
    width: "100%",
    marginBottom: moderateScale(20),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    width: '100%',
  },
  greenText:{
    color: "#189D66",
    fontWeight: 500,
    marginLeft: 8,
    marginRight: 3,
  },
  checkboxLabel: {
    // marginLeft: 8,
    // flexShrink: 1,
  },
  detailText: {
    color: '#888',
    fontSize: 12,
  },
  buttonContainer:{
    marginBottom: moderateScale(25),
    // paddingVertical: moderateScale(20),
    // borderWidth:1,
    // justifyContent:"center",
    // alignItems:"center",
  },
  button: {
    width: '100%',
    backgroundColor: '#9E9E9E',
    paddingVertical: 14,
    borderRadius: 8,
    // marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },  
})