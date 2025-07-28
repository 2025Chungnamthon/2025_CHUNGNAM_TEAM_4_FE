import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Image, Alert, ActivityIndicator
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { postCommunity, resetStatus } from '../../../redux/slices/communitySlice';

const CommunityWriteScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.community);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleSubmit = () => {
    if (!title || !content) {
      Alert.alert('제목과 내용을 입력해주세요');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', {
        uri: image.uri,
        name: 'upload.jpg',
        type: 'image/jpeg',
      });
    }

    dispatch(postCommunity(formData));
  };

  React.useEffect(() => {
    if (success) {
      Alert.alert('글이 등록되었습니다.');
      dispatch(resetStatus());
      navigation.goBack();
    }
    if (error) {
      Alert.alert('에러 발생', error.toString());
    }
  }, [success, error]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>제목</Text>
      <TextInput
        style={styles.input}
        placeholder="제목을 입력해주세요."
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.textarea}
        placeholder="내용을 입력해주세요."
        multiline
        numberOfLines={5}
        value={content}
        onChangeText={setContent}
      />
      <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image.uri }} style={styles.image} />
        ) : (
          <Text style={styles.imageText}>이미지 추가하기</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitText}>글 올리기</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default CommunityWriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    marginBottom: 20,
  },
  textarea: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#fff',
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  imageBox: {
    height: 120,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  imageText: {
    color: '#999',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: '#00A86B',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
