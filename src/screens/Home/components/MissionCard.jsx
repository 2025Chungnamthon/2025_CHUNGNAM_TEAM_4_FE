import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { moderateScale } from 'react-native-size-matters'
import { getKoreanStatus } from '../../../utils/statusMapper'
import { getKoreanMissionStatus } from '../../../utils/missionStatusMapper'

const MissionCard = ({mission,missionStatus}) => {
  const truncateText = (text, maxLength = 15) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };


  if(!mission){
    return (
      <View style={styles.missionContent}>
          <View>
              <Text style={styles.missionTitle}>진행중인 미션 없음</Text>
              <Text style={styles.missionPoints}>지급 포인트: -</Text>
          </View>
          <TouchableOpacity style={styles.btnSmall}><Text style={styles.btnText}>대기중</Text></TouchableOpacity>
      </View>
    )
  } else if(mission){
    return(
      <View style={styles.missionContent}>
          <View>
              <Text style={styles.missionTitle}>{truncateText(mission.title)}</Text>
              <Text style={styles.missionPoints}>지급 포인트: {mission.rewardPoints}P</Text>
          </View>
          
          <TouchableOpacity style={missionStatus==="IN_PROGRESS"?styles.btnSmall:styles.btnInProgress}><Text style={missionStatus==="IN_PROGRESS"?styles.btnText:styles.textInProgress}>{getKoreanMissionStatus(missionStatus)}</Text></TouchableOpacity>
      </View>      
    )
  }

}

export default MissionCard

const styles = StyleSheet.create({
  missionContent: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingVertical: moderateScale(16),
    paddingHorizontal: moderateScale(25),
  },
  missionTitle:{
    fontSize:moderateScale(15),
    fontWeight: "600",
    marginBottom: moderateScale(8),
  },
  missionPoints:{
    opacity:0.5,
  },
  btnSmall: {
    borderWidth: 1,
    borderColor: '#17704B',
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 8,
  },
  btnText:{
    color:"#17704B",
    // fontSize:moderateScale(14),
  },
  btnInProgress:{
    backgroundColor:'#17704B',
    borderWidth: 1,
    borderColor: '#17704B',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 8,    
  },
  textInProgress:{
    color:"white",
    // fontSize:moderateScale(13),
    fontWeight:600,
  },
})