import { View, TextInput, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react'

const EmailInputWithCheckButton = ({iconSource, value, onChangeText, checkEmailDuplicate, isEmailChecked}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;    

  return (
    <View style={[styles.inputContainer, { borderColor: isFocused ? '#0DA566' : '#ccc' }]}>
      <Image
        source={iconSource}
        style={[
          styles.icon,
          { tintColor: isActive ? '#0DA566' : '#A8A8A8' },
        ]}
      />
      <TextInput
        placeholder="이메일"
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        keyboardType="email-address"
        placeholderTextColor=   "#aaa"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
        {isEmailChecked ? (
        <TouchableOpacity
            style={styles.emailCheckButton}
            disabled={true}
        >
            <Text style={styles.emailCheckButtonText}>확인완료</Text>
        </TouchableOpacity>
        ) : (
        <TouchableOpacity
            style={styles.emailCheckButtonDisabled}
            // style={styles.emailCheckButton}
            onPress={checkEmailDuplicate}
        >
            <Text style={styles.emailCheckButtonDisabledText}>중복확인</Text>
        </TouchableOpacity>
        )}      
    </View>
  )
}

export default EmailInputWithCheckButton

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    height: 48,
    backgroundColor: '#fff',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    marginRight: 8,
  },
  emailCheckButton: {
  backgroundColor: '#0DA566',
  paddingVertical: 6,
  paddingHorizontal: 10,
  borderRadius: 6,
},
emailCheckButtonDisabled: {
    backgroundColor: 'white', 
    borderColor:'#189D66', 
    borderWidth:1,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
},
emailCheckButtonText: {
  color: '#fff',
  fontSize: 12,
},
emailCheckButtonDisabledText:{
    color:'#189D66',
    fontSize:12,
},
//   button: {
//     backgroundColor: '#0DA566',
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 6,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 12,
//   },    
})