// components/CustomCheckbox.js
import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // expo 사용하는 경우

const CustomCheckbox=({ checked, onToggle })=>{
  return (
    <TouchableOpacity onPress={onToggle}>
      <View style={[styles.checkbox, checked && styles.checked]}>
        {/* {checked && <Ionicons name="checkmark" size={16} color="white" />}r */}
        <Ionicons name="checkmark" size={16} color={checked?"white":"gray"}/>
      </View>
    </TouchableOpacity>
  );
}

export default CustomCheckbox;

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 4,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#189D66',
    borderColor: '#189D66',
  },
});
