import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const statusMap = {
  PENDING: '대기',
  REJECTED: '반려',
  COMPLETED: '승인',
  IN_PROGRESS: '진행중',
};

const getStatusColor = (status) => {
  switch (status) {
    case 'PENDING': return '#006CFF';
    case 'REJECTED': return '#D91616';
    case 'COMPLETED': return '#189D66';
    // case 'IN_PROGRESS': return '#FF9500';
    default: return '#999';
  }
};


const UserMissionReviewCard = ({ mission, onPress }) => {
  const { title, user, status, date, type, icon } = mission;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.row}>
        <Ionicons name={icon || 'document-text-outline'} size={20} style={styles.icon} />
        <Text style={styles.title}>
          {type === 'DAILY' ? '(일일)' : '(주간)'} {title}
        </Text>
      </View>
      <Text style={styles.user}>사용자: {user}</Text>
      <Text style={styles.status}>
        상태: <Text style={{ color: getStatusColor(mission.status) }}>
            {statusMap[mission.status] || '알 수 없음'}
        </Text>
      </Text>
      {/* <Text style={styles.status}>상태: <Text style={{ color: '#189D66' }}>{status}</Text></Text> */}
      <Text style={styles.date}>{date}</Text>
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
  status: { marginTop: 4 },
  date: { marginTop: 4, textAlign: 'right', color: '#888', fontSize: 12 },
});

export default UserMissionReviewCard;
