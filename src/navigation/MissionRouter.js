import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { fetchUserMissions } from '../redux/slices/userMissionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, View } from 'react-native';

const MissionRouter = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // const { loading, success, error, dailyMissionSelected, weeklyMissionSelected } = useSelector(
  //   (state) => ({
  //     loading: state.userMission.loading.fetchUserMissions,
  //     success: state.userMission.success.fetchUserMissions,
  //     error: state.userMission.error.fetchUserMissions,
  //     dailyMissionSelected: state.userMission.dailyMissionSelected,
  //     weeklyMissionSelected: state.userMission.weeklyMissionSelected,
  //   })
  // );

  const loading = useSelector((state) => state.userMission.loading.fetchUserMissions);
  const success = useSelector((state) => state.userMission.success.fetchUserMissions);
  const error = useSelector((state) => state.userMission.error.fetchUserMissions);
  const {dailyMissionSelected, weeklyMissionSelected} = useSelector((state)=>state.userMission)
  // const dailyMissionSelected = useSelector((state) => state.userMission.dailyMissionSelected);
  // const weeklyMissionSelected = useSelector((state) => state.userMission.weeklyMissionSelected);  

  // 예: Redux 상태로부터 유저 미션 존재 여부 확인
//   const hasDailyMission = useSelector(state => state.missions.hasDaily);
//   const hasWeeklyMission = useSelector(state => state.missions.hasWeekly);

  useEffect(()=>{
    // console.log("fetch user missions");
    dispatch(fetchUserMissions());
    console.log("after fetchUserMissions()")
  },[])

  // useEffect(()=>{
  //   if(dailyMissionSelected)
  // },[dailyMissionSelected,weeklyMissionSelected])

  useEffect(() => {
    if(weeklyMissionSelected!==null&&dailyMissionSelected!==null){
      console.log("weekly: ",weeklyMissionSelected,"daily: ",dailyMissionSelected);
      if (!weeklyMissionSelected && !dailyMissionSelected) {
        navigation.replace('WeeklyMissionSelectScreen');
      } else if (weeklyMissionSelected && !dailyMissionSelected) {
        navigation.replace('DailyMissionSelectScreen');
      } else {
        navigation.replace('MyMissionListScreen');
      }
    }
  }, [weeklyMissionSelected,dailyMissionSelected]);

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