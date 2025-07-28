import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
// import MissionCard from './components/MissionCard';
import { moderateScale } from 'react-native-size-matters';
import { Dimensions } from 'react-native';
import COLORS from '../../../constants/colors';
import ExpandableMissionCard from './components/ExpandableMissionCard';
import CertificationModal from './components/CertificationModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserMissions } from '../../../redux/slices/userMissionSlice';
// import { categoryColors } from '../../constants/colors';

const {width, height} = Dimensions.get('window');

const missionData = [
  { 
    id: '1',
    title: '제로웨이스트 매장 방문',
    rewardPoints: 500,
    category: "일상 속 습관",    
    // category: "친환경 이동",
    // category: "친환경 소비",
    // category: "재활용/자원순환",
    // category: "에너지 절약",
    // category: "저탄소 식생활",
    // category: "환경 교육/확산",
    // category: "지역사회/공동체 활동",
    type: 'WEEKLY',
    description: '제로웨이스트 매장 방문 후 사진 인증하기, 본인을 인증할 수 있는 사진 2장 첨부 필수',
  },
  {
    id: '2',
    title: '친환경 캠페인 알리기',
    rewardPoints: 40,
    icon: 'cube-outline',
    type: 'DAILY',
    description: '친환경 캠페인 소식이나 정보를 친구나 주변인에게 공유한 후 알린 내용을 인증할 수 있는 사진 첨부',
    category: "친환경 소비",
  },
  {
    id: '3',
    title: '플로깅 실천하기',
    rewardPoints: 60,
    icon: 'cube-outline',
    type: 'DAILY',
    description: '천안 지역에서 플로깅을 실천 후 인증할 수 있는 사진 2장 첨부하기 (장소 인증 필수)',
    category: "재활용/자원순환",
  },
  {
    id: '4',
    title: '장바구니 지참하기',
    rewardPoints: 30,
    icon: 'cube-outline',
    type: 'DAILY',
    description: '장바구니를 지참하여 마트나 시장에서 장을보고 인증하기 장바구니에 물건이 담겨진 사진 첨부',
    category: "에너지 절약",
  },
];



const MyMissionListScreen = () => {
  const dispatch = useDispatch();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null); // 선택된 미션 정보

  const loading = useSelector((state) => state.userMission.loading.fetchUserMissions);
  const success = useSelector((state) => state.userMission.success.fetchUserMissions);
  const error = useSelector((state) => state.userMission.error.fetchUserMissions);
  const {userDailyMissions, userWeeklyMissions} = useSelector((state)=>state.userMission)

  const allMissions = [
    ...(userWeeklyMissions || []),
    ...(userDailyMissions || []),
  ];

  useEffect(()=>{
    console.log("selected mission",selectedMission)
  },[selectedMission])

  useEffect(()=>{
    console.log("all missions",allMissions)
  },[allMissions])
  // const { loading, success, error, dailyMissionSelected, weeklyMissionSelected } = useSelector(
  //   (state) => ({
  //     loading: state.userMission.loading.fetchUserMissions,
  //     success: state.userMission.success.fetchUserMissions,
  //     error: state.userMission.error.fetchUserMissions,
  //     dailyMissionSelected: state.userMission.dailyMissionSelected,
  //     weeklyMissionSelected: state.userMission.weeklyMissionSelected,
  //   })
  // );
  
  useEffect(()=>{
    dispatch(fetchUserMissions());
  },[])

  const toggleExpand = (index) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };

  const openCertificationModal = (mission) => {
    setSelectedMission(mission);
    setModalVisible(true);
  };

  const closeCertificationModal = () => {
    setModalVisible(false);
  };  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../../../assets/common/logo.png')} 
          style={styles.logo} 
          resizeMode="contain"        
        />
        <Image 
          source={require('../../../assets/Mission/MyMissionList/checkBox.png')}
          resizeMode="contain"         
          style={styles.checkIcon} 
        />
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.username}>천안요정 님의 진행중인 미션</Text>
      </View>

      {loading?
        <View style={styles.spinnerBox}>
          <ActivityIndicator size={80}/>
        </View>
      :
        <View style={styles.cardList}>
          {allMissions?.map((mission, index) => (
            <ExpandableMissionCard
              key={index}
              mission={mission}
              missionStatus={mission.userMissionStatus}
              isExpanded={expandedIndex === index}
              onToggle={() => toggleExpand(index)}
              openCertificationModal={openCertificationModal}
            />
          ))}
        </View>      
      }



      <CertificationModal
        visible={modalVisible}
        mission={selectedMission}
        onClose={closeCertificationModal}
      />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: width*0.06,
    paddingTop: height* 0.04,
    backgroundColor: '#F6F6F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:"center",
  },
  logo: {
    width: moderateScale(60),
    // height: 30,
  },
  checkIcon: {
    width: 24,
    // height: 24,
  },
  userInfo: {
    backgroundColor: COLORS.green400,
    padding: 12,
    borderRadius: 8,
    marginVertical: 16,
  },
  username: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  spinnerBox:{
    height:height*0.8,
    justifyContent:"center",
  },
  cardList: {
    marginTop: 8,
    // marginBottom: 80,
    paddingBottom: height*0.08,
  },
});

export default MyMissionListScreen;
