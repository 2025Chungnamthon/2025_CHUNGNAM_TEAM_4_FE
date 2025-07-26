import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Dimensions, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { moderateScale } from 'react-native-size-matters';
import COLORS from '../../../../constants/colors';
import { useDispatch } from 'react-redux';
import { updateMission } from '../../../../redux/slices/missionSlice';
import { getEnglishLevel } from '../../../../utils/levelMapper';
import { getEnglishCategory } from '../../../../utils/categoryMapper';

const {width, height} = Dimensions.get('window');

const EditMissionModal = ({
  visible,
  onClose,
  onSubmit,
  missionData, // ← 기존 카드 정보
}) => {
    const dispatch = useDispatch();
  const [type, setType] = useState('');
  const [genre, setGenre] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [point, setPoint] = useState('');

  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isDescFocused, setIsDescFocused] = useState(false);
  const [isPointFocused, setIsPointFocused] = useState(false);

  // 기존 정보를 불러올 때만 초기값 설정
  useEffect(() => {
    if (missionData) {
      setType(missionData.type);
      setGenre(missionData.category);
      setTitle(missionData.title);
      setDescription(missionData.description);
      setPoint(missionData.rewardPoints.toString());
    }
  }, [missionData]);

  const handleSubmit = () => {
    dispatch(updateMission({
        missionId:missionData.id,
        updatedData:{title,description,type,level:getEnglishLevel(missionData.level),category:getEnglishCategory(genre),rewardPoints: parseInt(point),}
    }))
    // onSubmit({id: missionData.id,type,category:genre,title,description,rewardPoints: parseInt(point),
    // });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.header}>미션 수정하기</Text>
            <ScrollView style={styles.bodyContainer}>
                {/* 미션 종류 / 장르 */}
                <View style={styles.row}>
                    <View style={styles.selectBox}>
                    <Text style={styles.label}>미션 종류</Text>
                    <RNPickerSelect
                        onValueChange={(v) => setType(v)}
                        items={[{ label: '주간', value: 'WEEKLY' }, { label: '일일', value: 'DAILY' }]}
                        value={type}
                        useNativeAndroidPickerStyle={false}
                        style={pickerStyles}
                        placeholder={{ label: '선택해주세요', value: null }}
                    />
                    </View>
                    <View style={styles.selectBox}>
                    <Text style={styles.label}>장르</Text>
                    <RNPickerSelect
                        onValueChange={(v) => setGenre(v)}
                        items={[
                        { label: '일상 속 습관', value: '일상 속 습관' },
                        { label: '친환경 소비', value: '친환경 소비' },
                        { label: '재활용/자원순환', value: '재활용/자원순환' },
                        ]}
                        value={genre}
                        useNativeAndroidPickerStyle={false}
                        style={pickerStyles}
                        placeholder={{ label: '선택해주세요', value: null }}
                    />
                    </View>
                </View>

                {/* 제목 */}
                <Text style={styles.label}>미션 제목</Text>
                <TextInput
                    style={[
                        styles.input,
                        isTitleFocused && { borderColor: '#0DA666' },
                    ]}
                    placeholder="미션 제목"
                    value={title}
                    onChangeText={setTitle}
                    onFocus={() => setIsTitleFocused(true)}
                    onBlur={() => setIsTitleFocused(false)}
                />

                {/* 설명 */}
                <Text style={styles.label}>미션 설명</Text>
                <TextInput
                    style={[
                        styles.input, 
                        { height: height*0.13 },
                        isDescFocused && { borderColor: '#0DA666' },
                    ]}
                    placeholder="미션 정보"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    onFocus={() => setIsDescFocused(true)}
                    onBlur={() => setIsDescFocused(false)}            
                />

                {/* 포인트 */}
                <Text style={styles.label}>지급 포인트</Text>
                <TextInput
                    style={[
                        styles.input,
                        isPointFocused && { borderColor: '#0DA666' },
                    ]}
                    placeholder="지급 포인트"
                    value={point}
                    onChangeText={setPoint}
                    keyboardType="numeric"
                    onFocus={() => setIsPointFocused(true)}
                    onBlur={() => setIsPointFocused(false)}            
                />

                {/* 버튼 */}
                <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                    <Text style={styles.submitText}>수정하기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                    <Text style={styles.cancelText}>닫기</Text>
                </TouchableOpacity>
            </ScrollView>

        </View>
      </View>
    </Modal>
  );
};

export default EditMissionModal;

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-end', alignItems: 'center' },
  modal: { width: '100%', backgroundColor: 'white', borderRadius: 12, padding: moderateScale(20)},
  header: { fontSize: moderateScale(18), fontWeight: 'bold', color: 'white', backgroundColor: COLORS.green400, textAlign: 'center', borderTopLeftRadius: 12, borderTopRightRadius: 12, marginTop: -20, marginHorizontal: -20, paddingVertical: moderateScale(16) },
//   bodyContainer:{paddingVertical:moderateScale(50)},
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 8, paddingTop:moderateScale(20), },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: moderateScale(10),
    color: '#333',
  },
  selectBox: { flex: 1 },
  input: { borderWidth: 1, borderColor: '#A8A8A8', borderRadius: 8, paddingHorizontal: 12, paddingVertical: moderateScale(12), marginBottom: moderateScale(16), textAlignVertical:"top" },
  submitBtn: { backgroundColor: '#189D66', padding: 12, borderRadius: 8, marginTop: 20 },
  submitText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
  cancelBtn: { borderColor: '#189D66', borderWidth: 1, borderRadius: 8, padding: 10, marginTop: 8 },
  cancelText: { textAlign: 'center', color: '#189D66', fontWeight: 'bold' },
});


const pickerStyles = {
  inputIOS: {
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#189D66',
    borderRadius: 8,
    color: '#000',
    marginBottom: moderateScale(12),
  },
  inputAndroid: {
    fontSize: 14,
    paddingVertical: moderateScale(12),
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#A8A8A8',
    borderRadius: 8,
    color: '#000',
    marginBottom: moderateScale(12),
  },
};
