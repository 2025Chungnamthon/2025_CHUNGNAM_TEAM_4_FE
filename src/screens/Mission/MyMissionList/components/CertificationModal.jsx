// components/CertificationModal.jsx
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  TextInput,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import COLORS from '../../../../constants/colors';
import { getSmallCategoryIcon } from '../../../../utils/categoryIconMapper';
// import ImagePickerBox from './ImagePickerBox';
// import * as ImagePicker from 'expo-image-picker';
// import ImagePickerBoxMultiple from './ImagePickerBoxMultiple';
import PhotoUploader from './PhotoUploader';
import { submitMission } from '../../../../redux/slices/userMissionSlice';
import * as mime from 'react-native-mime-types';
import { useDispatch } from 'react-redux';

const {width, height} = Dimensions.get('window');

const CertificationModal = ({ visible, mission, onClose }) => {
  const dispatch = useDispatch();
    const [selectedImages, setSelectedImages] = useState([]); // 배열로 변경
    const [certText, setCertText] = useState('');

    // const handleSubmit = () => {
    //     dispatch(submitMission({userMissionId,selectedImages,certText}));
    // }

    const handleSubmit = () => {
      if (!certText.trim()) {
        Alert.alert('인증 설명을 입력해주세요.');
        return;
      }

      if (selectedImages.length === 0) {
        Alert.alert('최소 한 장 이상의 사진을 첨부해주세요.');
        return;
      }

      const imageFiles = selectedImages.map((uri, index) => {
        const filename = uri.split('/').pop();
        const ext = filename?.split('.').pop()?.toLowerCase();
        const mimeType = mime.lookup(ext) || 'image/jpeg';

        return {
          uri,
          name: filename || `image${index}.jpg`,
          type: mimeType,
        };
      });

      console.log("images files before api", imageFiles)

      dispatch(
        submitMission({
          userMissionId: mission?.userMissionId || mission?.id, // 상황에 따라 id 확인
          description: certText,
          images: imageFiles,
        })
      );
    };

    console.log("selected images",selectedImages)

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          {/* 헤더 */}
          <View style={styles.header}>
            <Text style={styles.title}>미션 인증하기</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.body}>
            {/* 미션 정보 */}
            <View style={styles.firstRow}>
                <Text style={styles.category}>
                    {mission?.type === 'weekly' ? '주간 미션' : '일일 미션'}
                </Text>
                <Text style={styles.point}>지급 포인트: {mission?.rewardPoints}P</Text>
            </View>

            <View style={styles.titleRow}>
                <Image
                    source={getSmallCategoryIcon(mission?.category)}
                    style={{
                        height:moderateScale(18),
                        width:moderateScale(18),
                        tintColor:'#333',
                        // borderWidth:1,
                    }}
                    resizeMode="contain"    
                />
                <Text style={styles.missionTitle}>{mission?.title}</Text>
            </View>
          
            <Text style={styles.description}>미션 설명: {mission?.description}</Text>
            {/* <Text style={styles.description}>인증 방법: {mission?.method}</Text> */}

            {/* 파일 첨부 */}
            {/* <TouchableOpacity style={styles.uploadBox}>
                <Image source={require('../../../../assets/Mission/MyMissionList/upload.png')} style={styles.uploadIcon} resizeMode='contain'/>
                <Text style={styles.uploadText}>파일 첨부하기</Text>
            </TouchableOpacity> */}

            {/* <ImagePickerBox onImageSelected={(uri) => {
                console.log('선택된 이미지 URI:', uri);
                // 이 uri를 서버 전송용 상태에 저장하거나 제출 버튼 활성화할 수 있어요
            }} /> */}
            {/* <TouchableOpacity style={styles.uploadBox} onPress={handlePickImage}>
                {selectedImage ? (
                    <Image source={{ uri: selectedImage }} style={styles.previewImage} />
                ) : (
                    <>
                    <Image source={require('../../../../assets/Mission/MyMissionList/upload.png')} style={styles.uploadIcon} />
                    <Text style={styles.uploadText}>파일 첨부하기</Text>
                    </>
                )}
            </TouchableOpacity> */}

            <PhotoUploader images={selectedImages} setImages={setSelectedImages} />
            <Text style={styles.textLabel}>인증 설명</Text>

            <TextInput
                style={styles.input}
                placeholder="사진 관련 설명을 입력해주세요"
                value={certText}
                onChangeText={setCertText}
                multiline
                numberOfLines={4}
            />


            {/* <Text style={styles.or}>or</Text> */}

            <TouchableOpacity onPress={handleSubmit} style={styles.cameraBtn}>
                <Text style={styles.cameraText}>제출하기</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.textBtn}>
                <Text style={styles.textBtnText}>설명 글쓰기</Text>
            </TouchableOpacity> */}
          </View>


        </View>
      </View>
    </Modal>
  );
};

export default CertificationModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: '#fff',
    // padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: height *0.85,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,    
    marginBottom: 12,
    backgroundColor: COLORS.green400,
  },
  title: {
    fontSize: moderateScale(18),
    color:"#FFFFFF",
    fontWeight: '600',
    paddingVertical: moderateScale(16),
  },
  closeButton:{
    position:"absolute",
    right: moderateScale(20),
    // left:moderateScale(80),
    top: moderateScale(11),
  },
  closeIcon: {
    fontSize: moderateScale(24),
    color: '#FFFFFF',
  },

  body:{
    paddingHorizontal: width *0.08,
    paddingTop: moderateScale(20),
  },
  firstRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(16),
    alignItems:"center",
  },
  category: {
    color: COLORS.green400,
    fontSize:moderateScale(17),
    fontWeight: 'bold',
    // marginBottom: 4,
  },
  point:{
    fontSize:moderateScale(11),
    alignSelf:"flex-start",
  },
  titleRow:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    // borderWidth:1,
    marginBottom:moderateScale(12),
  },
  missionTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    // marginBottom: 6,
  },
  description: {
    color: '#6f6f6fff',
    lineHeight:moderateScale(21),
    // marginVertical: moderateScale(6),
    marginBottom:moderateScale(10),
  },
//   uploadBox: {
//     borderWidth: 1,
//     borderColor: '#888888ff',
//     borderRadius: 8,
//     paddingVertical:height*0.04,
//     // padding: 24,
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   previewImage: {
//     width: 100,
//     height: 100,
//     resizeMode: 'cover',
//     borderRadius: 8,
//   },
//   uploadIcon:{
//     width:moderateScale(50),
//     height:moderateScale(50),
//   },
//   uploadText: {
//     marginTop: 8,
//     color: '#666',
//   },

textLabel: {
    marginTop: 16,
    marginBottom: 6,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
},
input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    minHeight: 100,
    textAlignVertical: 'top', // ✅ Android에서 위쪽 정렬
    backgroundColor: '#fff',
    marginBottom:moderateScale(30),
},

  cameraBtn: {
    backgroundColor: COLORS.green400,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  cameraText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  textBtn: {
    borderWidth: 1,
    borderColor: '#0DA666',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textBtnText: {
    color: '#0DA666',
    fontWeight: 'bold',
  },
});
