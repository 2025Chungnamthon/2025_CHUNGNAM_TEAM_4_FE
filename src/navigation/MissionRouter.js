import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const MissionRouter = () => {
  const navigation = useNavigation();

  const [hasDailyMission, setHasDailyMission] = useState(false);
  const [hasWeeklyMission, setHasWeeklyMission] = useState(false);

  // 예: Redux 상태로부터 유저 미션 존재 여부 확인
//   const hasDailyMission = useSelector(state => state.missions.hasDaily);
//   const hasWeeklyMission = useSelector(state => state.missions.hasWeekly);

  useEffect(() => {
    if (!hasWeeklyMission && !hasDailyMission) {
      navigation.replace('WeeklyMissionSelectScreen'); // 1️⃣ 주간도 일일도 없음
    } else if (hasWeeklyMission && !hasDailyMission) {
      navigation.replace('DailyMissionSelectScreen'); // 2️⃣ 주간만 있음
    } else if (hasWeeklyMission && hasDailyMission) {
      navigation.replace('MyMissionListScreen'); // 3️⃣ 둘 다 있음
    }
  }, [hasDailyMission, hasWeeklyMission]);

  return null;
};

export default MissionRouter;