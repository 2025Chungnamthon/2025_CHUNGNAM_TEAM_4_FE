import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, TextInput, View } from "react-native";


const FloatingLabelInput = ({ value, label, onChangeText ,secureTextEntry = false }) => {
  const [isFocused, setIsFocused] = useState(false);
  // const [value, setValue] = useState('');

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
        onChangeText={onChangeText}
        style={[
          styles.input,
          label==="이메일"?styles.IDInput:styles.passInput,
          (isFocused) && styles.inputFocused,
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default FloatingLabelInput;

const styles = StyleSheet.create({
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
})