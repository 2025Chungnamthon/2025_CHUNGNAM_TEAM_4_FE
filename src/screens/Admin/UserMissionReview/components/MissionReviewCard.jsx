import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale } from 'react-native-size-matters';

const statusMap = {
  '요청': '대기',
  '거절': '반려',
  '승인': '승인',
  '진행중': '진행중',
};

const getStatusColor = (status) => {
  switch (status) {
    case '요청': return '#006CFF';
    case '거절': return '#D91616';
    case '승인': return '#189D66';
    // case 'IN_PROGRESS': return '#FF9500';
    default: return '#999';
  }
};

const formatDate = (dateString) => {
  return dateString.substring(0, 10).replace(/-/g, '.');
};

const UserMissionReviewCard = ({ mission,missionInfo, onPress, statusMap }) => {
  const { user_nickname, status, created_at, icon } = mission;
  // const {title, type, category} = missionInfo;

  useEffect(()=>{
    console.log("mission info",mission);
    console.log("card status",status);
  },[])

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.row}>
        <Ionicons name={icon || 'document-text-outline'} size={20} style={styles.icon} />
        <Text style={styles.title}>
          {missionInfo?.type === 'DAILY' ? '(일일)' : '(주간)'} {missionInfo?.title}
        </Text>
      </View>
      <Text style={styles._nickname}>사용자: {user_nickname}</Text>
      <Text style={styles.status}>
        상태: <Text style={{ color: getStatusColor(status) }}>
            {statusMap[status] || '알 수 없음'}
        </Text>
      </Text>
      {/* <Text style={styles.status}>상태: <Text style={{ color: '#189D66' }}>{status}</Text></Text> */}
      <Text style={styles.date}>{formatDate(created_at)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 12,
    elevation: 2,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginRight: 8 },
  title: { fontWeight: 'bold', fontSize: 16 },
  user: { marginTop: 6 },
  _nickname:{
    marginTop:moderateScale(5),
  },
  status: { marginTop: 4 },
  date: { marginTop: 4, textAlign: 'right', color: '#888', fontSize: 12 },
});

export default UserMissionReviewCard;
