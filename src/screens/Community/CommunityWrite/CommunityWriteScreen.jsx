import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Image, Alert, ActivityIndicator, ScrollView, StatusBar,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { postCommunity, resetStatus } from '../../../redux/slices/communitySlice';
import { MaterialIcons } from '@expo/vector-icons';

const CommunityWriteScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.community);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    if (images.length >= 3) {
      Alert.alert('이미지 제한', '이미지는 최대 3장까지 업로드 가능합니다.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      const newImage = result.assets[0];
      
      if (newImage.fileSize && newImage.fileSize > 10 * 1024 * 1024) {
        Alert.alert('파일 크기 제한', '이미지 파일은 10MB 이하여야 합니다.');
        return;
      }

      setImages(prev => [...prev, newImage]);
    }
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    if (!title.trim()) {
      Alert.alert('제목 필수', '제목을 입력해주세요.');
      return false;
    }
    if (title.trim().length > 200) {
      Alert.alert('제목 길이 제한', '제목은 200자 이하여야 합니다.');
      return false;
    }
    if (!content.trim()) {
      Alert.alert('내용 필수', '내용을 입력해주세요.');
      return false;
    }
    if (images.length === 0) {
      Alert.alert('이미지 필수', '이미지는 필수입니다. (1~3장)');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('content', content.trim());
    
    images.forEach((image, index) => {
      formData.append('images', {
        uri: image.uri,
        name: `image_${index}.jpg`,
        type: 'image/jpeg',
      });
    });

    dispatch(postCommunity(formData));
  };

  React.useEffect(() => {
    if (success) {
      Alert.alert('성공', '게시글이 성공적으로 작성되었습니다.');
      dispatch(resetStatus());
      navigation.goBack();
    }
    if (error) {
      Alert.alert('에러 발생', error.message || error.toString());
    }
  }, [success, error]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SKTelecom</Text>
        <Text style={styles.headerStatus}>54%</Text>
      </View>

      <ScrollView style={styles.scrollContent}>
        {/* 제목 */}
        <Text style={styles.screenTitle}>글 작성하기</Text>

        {/* 제목 입력 */}
        <Text style={styles.label}>제목</Text>
        <TextInput
          style={styles.titleInput}
          placeholder="제목을 입력해주세요"
          value={title}
          onChangeText={setTitle}
          maxLength={200}
        />

        {/* 내용 입력 */}
        <Text style={styles.label}>내용</Text>
        <TextInput
          style={styles.contentInput}
          placeholder="내용을 입력해주세요."
          multiline
          numberOfLines={8}
          value={content}
          onChangeText={setContent}
        />

        {/* 이미지 업로드 */}
        <Text style={styles.label}>이미지 ({images.length}/3)</Text>
        <TouchableOpacity 
          style={[styles.imageUploadBox, images.length >= 3 && styles.disabledImageBox]} 
          onPress={pickImage}
          disabled={images.length >= 3}
        >
          <MaterialIcons name="image" size={48} color={images.length >= 3 ? "#ddd" : "#ccc"} />
          <Text style={[styles.imageUploadText, images.length >= 3 && styles.disabledText]}>
            {images.length >= 3 ? '이미지 최대 개수 도달' : '이미지 추가하기'}
          </Text>
        </TouchableOpacity>

        {/* 선택된 이미지들 */}
        {images.length > 0 && (
          <View style={styles.selectedImages}>
            {images.map((image, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image source={{ uri: image.uri }} style={styles.selectedImage} />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeImage(index)}
                >
                  <Text style={styles.removeButtonText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* 제출 버튼 */}
        <TouchableOpacity
          style={[styles.submitButton, (!title.trim() || !content.trim() || images.length === 0) && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={loading || !title.trim() || !content.trim() || images.length === 0}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>글 올리기</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CommunityWriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerStatus: {
    fontSize: 14,
    color: '#666',
  },
  scrollContent: {
    flex: 1,
    padding: 16,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  titleInput: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 24,
  },
  contentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 24,
  },
  imageUploadBox: {
    height: 200,
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    marginBottom: 24,
  },
  imageUploadText: {
    color: '#999',
    fontSize: 16,
    marginTop: 8,
  },
  selectedImages: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  imageWrapper: {
    position: 'relative',
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ff4444',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 32,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  disabledImageBox: {
    opacity: 0.7,
    borderColor: '#ddd',
  },
  disabledText: {
    color: '#ddd',
  },
});
