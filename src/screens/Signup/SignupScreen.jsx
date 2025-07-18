import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import React, { useState } from 'react'
import CustomCheckbox from './components/CustomCheckBox';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const handleSignUp = () => {
    if (!agreeTerms || !agreePrivacy) {
      alert('필수 약관에 모두 동의해야 합니다.');
      return;
    }
    // 여기에 회원가입 API 로직 추가
    console.log('회원가입 요청:', { email, password, nickname });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../../assets/common/logo.png')} style={styles.logo} />
      <Text style={styles.title}>회원가입</Text>

      <TextInput
        placeholder="이메일"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="비밀번호"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        placeholder="비밀번호 확인"
        style={styles.input}
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        secureTextEntry
      />
      <TextInput
        placeholder="닉네임"
        style={styles.input}
        value={nickname}
        onChangeText={setNickname}
      />

      <View style={styles.checkboxContainer}>
        <CustomCheckbox checked={agreeTerms} onToggle={() => setAgreeTerms(!agreeTerms)} />
        <Text style={styles.checkboxLabel}>
          (필수) 이용약관에 동의합니다. <Text style={styles.detailText}>자세히 보기</Text>
        </Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CustomCheckbox checked={agreePrivacy} onToggle={() => setAgreePrivacy(!agreePrivacy)} />
        <Text style={styles.checkboxLabel}>
          (필수) 개인정보 수집 및 활용에 동의합니다. <Text style={styles.detailText}>자세히 보기</Text>
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>가입하기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    width: '100%',
  },
  checkboxLabel: {
    marginLeft: 8,
    flexShrink: 1,
  },
  detailText: {
    color: '#888',
    fontSize: 12,
  },
  button: {
    width: '100%',
    backgroundColor: '#aaa',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },  
})