import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react'
import MissionDetailModal from '../components/MissionDetailModal';
import MissionCard from '../components/MissionCard';
import { moderateScale } from 'react-native-size-matters';
import COLORS from '../../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { selectMissions } from '../../../redux/slices/userMissionSlice';

const {width, height} = Dimensions.get('window');

// const dailyMissions = [
//   {
//     id: '1',
//     title: '텀블러 사용하기',
//     rewardPoints: 30,
//     icon: 'storefront-outline',
//     type: '일일 미션',
//     description: '제로웨이스트 매장 방문 후 사진 인증하기\n본인을 인증할 수 있는 사진 2장 첨부 필수',
//     category: "일상 속 습관",
//   },
//   {
//     id: '2',
//     title: '꽃과 나무에 물 주기',
//     rewardPoints: 30,
//     icon: 'trash-outline',
//     type: '일일 미션',
//     description: '플라스틱/캔/종이를 분리배출하는 사진 2장 첨부',
//     category: "친환경 이동",
//   },
//   {
//     id: '3',
//     title: '친환경 캠페인 알리기',
//     rewardPoints: 40,
//     icon: 'cube-outline',
//     type: '일일 미션',
//     description: '용기를 이용한 포장 모습 인증 사진 2장 첨부',
//     category: "친환경 소비",
//   },
//     {
//     id: '4',
//     title: '플로깅 실천하기',
//     rewardPoints: 60,
//     icon: 'cube-outline',
//     type: '일일 미션',
//     description: '용기를 이용한 포장 모습 인증 사진 2장 첨부',
//     category: "재활용/자원순환",
//   },
//     {
//     id: '5',
//     title: '장바구니 지참하기',
//     rewardPoints: 30,
//     icon: 'cube-outline',
//     type: '일일 미션',
//     description: '용기를 이용한 포장 모습 인증 사진 2장 첨부',
//     category: "에너지 절약",
//   },
// ];

const DailyMissionSelectScreen = ({navigation,route}) => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.userMission.loading.selectMissions);
  const success = useSelector((state) => state.userMission.success.selectMissions);
  const error = useSelector((state) => state.userMission.error.selectMissions);

  const [selectedId, setSelectedId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const { weeklyMissionId } = route.params;

  const {dailyMissions} = useSelector((state)=> state.userMission)
  
  useEffect(()=>{
    console.log(weeklyMissionId);
  },[weeklyMissionId])

  useEffect(()=>{
    console.log("dailyMissions IDS",selectedIds)
  },[selectedIds])

  useEffect(()=>{
    console.log("daily missions",dailyMissions)
  },[dailyMissions])

  const handleInfoPress = (mission) => {
    setSelectedMission(mission);
    setModalVisible(true);
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => {
        if (prev.includes(id)) {
            // 선택 해제
            return prev.filter(selectedId => selectedId !== id);
        } else if (prev.length < 3) {
            // 최대 3개까지만 선택
            return [...prev, id];
        }
            return prev; // 3개 초과 시 무시
    });
  }

  const handleSubmitButton = () => {
    // dispatch(weeklyMissionId,dailyMissionIdList:selectedIds)
    dispatch(selectMissions({dailyMissionIds:selectedIds,weeklyMissionIds:[weeklyMissionId]}))
  }

  useEffect(() => {
    if (success) {
      navigation.replace("MyMissionListScreen");
    }
  }, [success, navigation]);

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <Text style={styles.headerText}>오늘의 미션을 골라보세요.</Text>

      {/* 선택 안내 버튼 */}
      <View style={styles.selectBox}>
        <Text style={styles.selectText}>일일 미션을 1가지 선택해주세요.</Text>
      </View>

      {/* 미션 카드 리스트 */}
      {/* <FlatList
        data={DailyMissions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MissionCard
            item={item}
            isSelected={selectedIds.includes(item.id)}
            onSelect={handleSelect}
            onInfoPress={handleInfoPress}
          />
        )}
      /> */}
      <FlatList
        data={dailyMissions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MissionCard
            item={item}
            isSelected={selectedIds.includes(item.id)}
            onSelect={toggleSelect}
            onInfoPress={handleInfoPress}
          />
        )}
      />    

      {/* 상세 정보 모달 */}
      <MissionDetailModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        mission={selectedMission}
      />

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.green300} />
      ) : (
        selectedIds.length === 3 && (
          <TouchableOpacity
            style={styles.submitBtn}
            disabled={selectedIds.length !== 3}
            onPress={handleSubmitButton}
          >
            <Text style={styles.submitText}>제출하기</Text>
          </TouchableOpacity>
        )
      )}

    </View>
  )
}

export default DailyMissionSelectScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: moderateScale(50),
    paddingHorizontal: width *0.06,
    backgroundColor: '#F2F2F2',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: moderateScale(30),
    marginVertical: 10,
    textAlign:"center"
  },
  selectBox: {
    backgroundColor: COLORS.green300,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 25,
  },
  selectText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
  },
submitBtn: {
  paddingVertical: 14,
  borderRadius: 8,
//   marginTop: 20,
  alignItems: 'center',
  backgroundColor: "#0e4c32ff",
},
submitDisabled: {
  backgroundColor: '#9E9E9E',
},
submitText: {
  color: '#fff',
  fontWeight: '600',
  fontSize: 16,
},
})