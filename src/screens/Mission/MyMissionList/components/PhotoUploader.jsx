import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import FullImageModal from './FullImageModal';

const PhotoUploader = ({ images, setImages, maxCount = 3 }) => {
  const [viewerVisible, setViewerVisible] = useState(false); // 🟢
  const [currentIndex, setCurrentIndex]   = useState(0);     // 🟢

  const addImage = (uri) => {
    if (images.length < maxCount) {
      setImages([...images, uri]);
    }
  };

  const handleAddImage = () => {
    if (images.length >= maxCount) return;

    Alert.alert('이미지 선택', '사진을 어떻게 업로드할까요?', [
      { text: '사진 찍기', onPress: openCamera },
      { text: '갤러리에서 선택', onPress: openGallery },
      { text: '취소', style: 'cancel' },
    ]);
  };

  const openCamera = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      Alert.alert('카메라 권한이 필요합니다.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.7,
    });

    if (!result.canceled) {
      addImage(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert('갤러리 권한이 필요합니다.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      addImage(result.assets[0].uri);
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={true}
      contentContainerStyle={styles.scrollContent}
    >
        {images.map((uri, index) => (
            <View key={index} style={styles.imageWrapper}>
            <TouchableOpacity onPress={() => { setCurrentIndex(index); setViewerVisible(true); }}>   
                <Image 
                    source={{ uri }} 
                    style={styles.image}
                    onPress={() => {
                        setCurrentIndex(index);    // 현재 클릭한 이미지 순번
                        setViewerVisible(true);    // 모달 열기
                    }} 
                />
            </TouchableOpacity>     
            <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => removeImage(index)}
            >
                <Text style={styles.deleteText}>✕</Text>
            </TouchableOpacity>
            </View>
        ))}

        {images.length < maxCount && (
            <TouchableOpacity style={styles.addBox} onPress={handleAddImage}>
                <Image source={require('../../../../assets/Mission/MyMissionList/upload.png')} style={styles.icon} />
                <Text style={styles.text}>파일 첨부하기</Text>
            </TouchableOpacity>
        )}

        <FullImageModal
            visible={viewerVisible}          // 🟢
            onClose={() => setViewerVisible(false)}
            images={images}
            index={currentIndex}
        />
    </ScrollView>
  );
};

export default PhotoUploader;

const styles = StyleSheet.create({
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  deleteBtn: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#333',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addBox: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#0DA666',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 26,
    height: 26,
    tintColor: '#0DA666',
  },
  text: {
    marginTop: 6,
    color: '#666',
    fontSize: 12,
  },
});
