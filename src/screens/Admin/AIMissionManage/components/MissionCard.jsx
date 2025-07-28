import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { getSmallCategoryIcon } from '../../../../utils/categoryIconMapper';
import { moderateScale } from 'react-native-size-matters';
import COLORS from '../../../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { activateMission, deleteMission } from '../../../../redux/slices/missionSlice';

const MissionCard = ({ mission, handleEditClick }) => {
  const dispatch = useDispatch();

  const approveLoading = useSelector((state) => state.mission.loading.activateMission);
  const approveError = useSelector((state) => state.mission.error.activateMission);  
  const rejectLoading = useSelector((state) => state.mission.loading.deleteMission);
  const rejectError = useSelector((state) => state.mission.error.deleteMission);    

  const handleApprove = () => {
    Alert.alert(
      '미션 승인',
      '정말 이 미션을 승인하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '승인',
          onPress: () => {
            console.log("missionId",mission.id)
            dispatch(activateMission({mission_list:[mission.id]}));
          },
        },
      ]
    );
  };

  const handleReject = () => {
    Alert.alert(
      '미션 반려',
      '정말 이 미션을 반려하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '반려',
          onPress: () => {
            console.log("hi")
            dispatch(deleteMission({mission_list:[mission.id]}));
          },
        },
      ]
    );
  };  


  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <Image
            source={getSmallCategoryIcon(mission.category)}
            style={{
                height:moderateScale(18),
                width:moderateScale(18),
                tintColor:'#333',
                marginRight: moderateScale(7),
                // borderWidth:1,
            }}
            resizeMode="contain"    
        />        
      <Text style={styles.title}>{mission.title}</Text>
      </View>

      <Text style={styles.description}>미션 설명: {mission.description}</Text>
      <Text style={styles.meta}>장르: {mission.type==="DAILY"?"일일":"주간"} / {mission.category}</Text>
      <Text style={styles.meta}>지급 포인트: {mission.rewardPoints}P</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.editButton} onPress={()=>handleEditClick(mission)}><Text>수정하기</Text></TouchableOpacity>
        <TouchableOpacity style={styles.approveButton} onPress={handleApprove}>
          {approveLoading?
            <ActivityIndicator size={15} color="white"/>
          :
            <Text style={{ color: COLORS.approve }}>승인하기</Text>
          }
          
        </TouchableOpacity>
        <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
          <Text style={{ color: COLORS.decline }}>반려하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MissionCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  titleRow:{
    flexDirection:"row",
    alignItems:"center",
    marginBottom: moderateScale(8),    
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: '#333',

  },
  description: {
    fontSize: moderateScale(13),
    color: '#555',
    marginBottom: 8,
    lineHeight: 20,
  },
  meta: {
    fontSize: moderateScale(12),
    color: '#888',
    marginBottom: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    flexWrap: 'wrap',
    gap: 8,
  },
  editButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 6,
  },
  approveButton: {
    borderWidth:1,
    borderColor: COLORS.approve,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 6,
  },
  rejectButton: {
    borderWidth:1,
    borderColor: COLORS.decline,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
});