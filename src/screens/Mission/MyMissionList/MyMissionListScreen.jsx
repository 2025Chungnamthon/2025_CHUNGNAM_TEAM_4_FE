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
