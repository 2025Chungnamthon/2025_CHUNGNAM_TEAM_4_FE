import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UserMissionReviewCard from './components/MissionReviewCard';
import { Ionicons } from '@expo/vector-icons';
import FilterDropdown from './components/FilterDropdown';

const missions = [
  {
    id: '1',
    title: '텀블러 사용하기',
    type: 'WEEKLY',
    user: '천안요정',
    status: 'PENDING',
    category: '일상 속 습관',
    date: '2025.07.24',
    icon: 'sunny-outline',
  },
  {
    id: '2',
    title: '미션 우이이 인증',
    type: 'WEEKLY',
    user: '천안요정',
    status: 'PENDING',
    category: '일상 속 습관',
    date: '25.07.24',
    icon: 'bag-outline',
  },
  {
    id: '3',
    title: '미션 이이잉 인증',
    type: 'DAILY',
    user: '춘식이얌',
    status: 'PENDING',
    category: '일상 속 습관',
    date: '25.07.24',
    icon: 'repeat-outline',
  },
];

const UserMissionReviewScreen = () => {
  const navigation = useNavigation();
  const [sortedMissions, setSortedMissions] = useState(missions);
  const [statusFilter, setStatusFilter] = useState('PENDING'); // 기본값: 대기 
  
  // ✅ 상태 필터 변경 시 API 호출
  useEffect(() => {
    fetchMissionsByStatus(statusFilter);
  }, [statusFilter]);
  
  // ✅ API 호출 함수
  const fetchMissionsByStatus = async (status) => {
    try {
      // const response = await axios.get(`https://your-api.com/api/missions?status=${status}`);
      // setSortedMissions(response.data); // 서버에서 받은 미션 리스트 저장
    } catch (error) {
      console.error('미션 가져오기 실패:', error);
    }
  };  

  const handleCardPress = (missionId) => {
    navigation.navigate('UserMissionDetailScreen', { missionId });
  };

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>사용자 미션 검토</Text>
      </View>
      <View style={styles.filterRow}>
        <FilterDropdown 
          selectedValue={statusFilter}
          onSelectSort={(status) => setStatusFilter(status)} 
        /> 
      </View>


      {/* 미션 카드 리스트 */}
      <FlatList
        data={sortedMissions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UserMissionReviewCard mission={item} onPress={() => handleCardPress(item.id)} />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 50 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'center',
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  filterRow:{
    flexDirection:"row",
    justifyContent:"flex-end"
  },
  goBackButton:{
    position:"absolute",
    left:0,
  },
});

export default UserMissionReviewScreen;
