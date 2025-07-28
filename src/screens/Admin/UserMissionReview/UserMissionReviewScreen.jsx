import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UserMissionReviewCard from './components/MissionReviewCard';
import { Ionicons } from '@expo/vector-icons';
import FilterDropdown from './components/FilterDropdown';
import { fetchChallenges } from '../../../redux/slices/challengeSlice';
import { useDispatch, useSelector } from 'react-redux';

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

const {width,height} = Dimensions.get('window');

const statusMap = {
  '요청': '대기',
  '거절': '반려',
  '승인': '승인',
  '진행중': '진행중',
};

const reverseStatusMap = {
  '대기': 'PENDING',
  '반려': 'REJECTED',
  '승인': 'COMPLETED',
  '진행중': 'IN_PROGRESS',
};

const UserMissionReviewScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.challenge.loading.fetchChallenges);
  const success = useSelector((state) => state.challenge.success.fetchChallenges);
  const error = useSelector((state) => state.challenge.error.fetchChallenges);
  const {challengeList} = useSelector((state)=>state.challenge)

  const [sortedMissions, setSortedMissions] = useState(missions);
  const [statusFilter, setStatusFilter] = useState('PENDING'); // 기본값: 대기 
  

  // useEffect(()=>{
  //   dispatch(fetchChallenges('PENDING'));
  // },[])

  // ✅ 상태 필터 변경 시 API 호출
  useEffect(() => {
    console.log("mapped status filter",statusFilter)
    dispatch(fetchChallenges(statusFilter));
  }, [statusFilter]);

  useEffect(()=>{
    console.log("challenge list",challengeList);
  },[challengeList])
  
  // ✅ API 호출 함수
  // const fetchMissionsByStatus = async (status) => {
  //   try {
  //     // const response = await axios.get(`https://your-api.com/api/missions?status=${status}`);
  //     // setSortedMissions(response.data); // 서버에서 받은 미션 리스트 저장
  //   } catch (error) {
  //     console.error('미션 가져오기 실패:', error);
  //   }
  // };  

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
      {loading?
        <View style={styles.spinnerBox}>
          <ActivityIndicator size={80} color="gray"/>
        </View>
      :
        challengeList.length===0?
        <View style={styles.spinnerBox}>
          <Text style={styles.missionText}>미션 목록 없음. 다른 항목으로 시도해주세요</Text>
        </View>
        :
        <FlatList
          data={challengeList}
          keyExtractor={(item) => item.challenge_id}
          renderItem={({ item }) => {
            return(
            <UserMissionReviewCard mission={item} missionInfo={item.mission_info} statusMap={statusMap} onPress={() => handleCardPress(item.challenge_id)} />
          )}}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      }
      
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
  spinnerBox:{
    height:height*0.7,
    justifyContent:"center",
    // borderWidth:1,
  },
  missionText:{
    textAlign:"center",
  }
});

export default UserMissionReviewScreen;
