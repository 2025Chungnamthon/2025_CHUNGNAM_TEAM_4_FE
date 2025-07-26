// components/modal/CreateMissionModal.jsx
import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import COLORS from '../../../../constants/colors';
import { moderateScale } from 'react-native-size-matters';

const {width, height} = Dimensions.get('window');

const CreateMissionsModal = ({
  visible,
  onClose,
  onSubmit,
  missionType,
  missionGenre,
  setMissionType,
  setMissionGenre,
}) => {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>미션 생성 정보</Text>
          <View style={styles.body}>
            <Text style={styles.label}>미션 종류 선택하기</Text>
            <RNPickerSelect
                onValueChange={(value) => setMissionType(value)}
                items={[
                { label: '주간', value: 'WEEKLY' },
                { label: '일일', value: 'DAILY' },
                ]}
                style={pickerSelectStyles}
                value={missionType}
                placeholder={{ label: '선택해주세요', value: null }}
                useNativeAndroidPickerStyle={false}
            />

            <Text style={styles.label}>장르 선택하기</Text>
            <RNPickerSelect
                onValueChange={(value) => setMissionGenre(value)}
                items={[
                { label: '일상 속 습관', value: 'DAILY_HABIT' },
                { label: '친환경 이동', value: 'ECO_TRANSPORTATION' },
                { label: '친환경 소비', value: 'ECO_CONSUMPTION' },
                { label: '재활용/자원순환', value: 'RECYCLING' },
                { label: '에너지 절약', value: 'ENERGY_SAVING' },
                { label: '저탄소 식생활', value: 'LOW_CARBON_DIET' },
                { label: '환경 교육/확산', value: 'ENVIRONMENTAL_EDUCATION' },
                { label: '지역사회/공동체 활동', value: 'COMMUNITY_ACTIVITY' },
                ]}
                style={pickerSelectStyles}
                value={missionGenre}
                placeholder={{ label: '선택해주세요', value: null }}
                useNativeAndroidPickerStyle={false}          
            />

            <Text style={styles.infoText}>종류/장르 기반으로 새로운 미션 10개가 생성돼요!</Text>


          </View>

        <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
            <Text style={styles.submitButtonText}>미션 생성하기</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>닫기</Text>
        </TouchableOpacity>          


        </View>
      </View>
    </Modal>
  );
};

export default CreateMissionsModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  modalContent: {
    // width: '85%',
    height: height *0.75,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'stretch',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: COLORS.green400,
    textAlign: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingVertical: moderateScale(16),
    marginTop: -20,
    marginHorizontal: -20,
  },
  body:{
    paddingHorizontal: width*0.07,
    paddingTop: height *0.05,
  },
  label: {
    marginBottom: moderateScale(13),
    fontWeight: 'bold',
    fontSize: moderateScale(16),
  },
  infoText: {
    fontSize: moderateScale(13),
    color: '#777',
    marginVertical: 10,
    textAlign: 'center',
    paddingBottom:moderateScale(20),
    marginBottom: moderateScale(30),
    borderBottomWidth:0.5,
    borderColor:"#A7A7A7",
  },
  submitButton: {
    backgroundColor: '#189D66',
    paddingVertical:moderateScale(12),
    borderRadius: 8,
    marginBottom: moderateScale(4),
  },
  submitButtonText: { 
    color: 'white', 
    textAlign: 'center', 
    fontWeight: 'bold', 
    fontSize:moderateScale(16) 
  },
  cancelButton: {
    borderColor: '#189D66',
    borderWidth: 1,
    paddingVertical:moderateScale(12),
    borderRadius: 8,
    marginTop: 8,
  },
  cancelButtonText: { 
    textAlign: 'center', 
    color: '#189D66', 
    fontWeight: 'bold', 
    fontSize:moderateScale(16) 
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#189D66',
    borderRadius: 8,
    color: '#000',
    marginBottom: 8,
  },
  inputAndroid: {
    // backgroundColor:"black",
    fontSize: moderateScale(16),
    // fontWeight:500,
    paddingHorizontal: 12,
    paddingVertical: moderateScale(12),
    borderWidth: 1,
    borderColor: COLORS.green200,
    borderRadius: 8,
    color: COLORS.green200,
    marginBottom: moderateScale(20),
  },
};
