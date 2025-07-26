import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { fetchUserMissions } from '../redux/slices/userMissionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, View } from 'react-native';

const MissionRouter = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // const [hasDailyMission, setHasDailyMission] = useState(false);
  // const [hasWeeklyMission, setHasWeeklyMission] = useState(false);

  const { loading, success, error, dailyMissionSelected, weeklyMissionSelected } = useSelector(
    (state) => ({
      loading: state.userMission.loading.fetchUserMissions,
      success: state.userMission.success.fetchUserMissions,
      error: state.userMission.error.fetchUserMissions,
      dailyMissionSelected: state.userMission.dailyMissionSelected,
      weeklyMissionSelected: state.userMission.weeklyMissionSelected,
    })
  );

  // 예: Redux 상태로부터 유저 미션 존재 여부 확인
//   const hasDailyMission = useSelector(state => state.missions.hasDaily);
//   const hasWeeklyMission = useSelector(state => state.missions.hasWeekly);

  useEffect(()=>{
    // console.log("fetch user missions");
    dispatch(fetchUserMissions());
  },[])

  // useEffect(()=>{
  //   if(dailyMissionSelected)
  // },[dailyMissionSelected,weeklyMissionSelected])

  useEffect(() => {
    if(success){
      console.log("weekly: ",weeklyMissionSelected,"daily: ",dailyMissionSelected);
      if (!weeklyMissionSelected && !dailyMissionSelected) {
        navigation.replace('WeeklyMissionSelectScreen');
      } else if (weeklyMissionSelected && !dailyMissionSelected) {
        navigation.replace('DailyMissionSelectScreen');
      } else {
        navigation.replace('MyMissionListScreen');
      }
    }
  }, [success]);

  // 로딩 처리
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#189D66" />
      </View>
    );
  }

  return null;
};

export default MissionRouter;