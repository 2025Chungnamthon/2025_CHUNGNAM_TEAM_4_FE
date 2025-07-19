import { View, TextInput, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react'

const InputWithIcon = ({ iconSource, placeholder, value, onChangeText, secureTextEntry, keyboardType }) => {
  const [isFocused, setIsFocused] = useState(false);

  const isActive = isFocused || value.length > 0;

  return (
    <View style={[styles.inputContainer, { borderColor: isFocused ? '#0DA566' : '#ccc' }]}>
      <Image
        source={iconSource}
        style={[
          styles.icon,
          { tintColor: isActive ? '#0DA566' : '#A8A8A8' }
        ]}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholderTextColor="#aaa"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
}

export default InputWithIcon

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
  },
})