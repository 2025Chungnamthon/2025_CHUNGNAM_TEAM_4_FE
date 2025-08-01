import { ActivityIndicator, Button, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserMainInfo, setUser } from '../../redux/slices/userSlice';
import { moderateScale } from 'react-native-size-matters';
import MissionCard from './components/MissionCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import showToast from '../../components/ToastMessage';

const {width, height} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.user.loading.fetchUserMainInfo);
  // const success = useSelector((state) => state.user.success.fetchUserMainInfo);
  const error = useSelector((state) => state.user.error.fetchUserMainInfo);
  const {userInfo, userDailyMissions, userWeeklyMissions} = useSelector((state)=>state.user)

  const [selectedTab, setSelectedTab] = useState('weekly'); // 'weekly' or 'daily'

  useEffect(()=>{
    dispatch(fetchUserMainInfo());
  },[])

  // useEffect(()=>{
  //   console.log("daily",userDailyMissions,"weekly",userWeeklyMissions)
  // },[userDailyMissions,userWeeklyMissions])

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/common/logo.png")}
        style={{
          width: moderateScale(60),
        }}
        resizeMode="contain"
      />
      {loading?
        <><ActivityIndicator size="large" color="gray"/></>
        // <><LoadingSpinner/></>
        :
        <Text style={styles.welcome}>{userInfo?.nickname}님, 환영합니다.</Text>
      }
      

      <View style={styles.banner}>
        <Image
          source={require("../../assets/Home/images/Speaker.png")}
          style={{
            width: 16,
            marginRight: 8,
          }}
          resizeMode="contain"
        />
        <Text style={styles.bannerText}>천안 두정동 플로깅 마라톤 실시 (2025.08.13)</Text>
      </View>

      <View style={styles.pointBox}>
        <View style={styles.pointLabel}>
          <Text style={styles.pointLabelText}>보유중인 아나 포인트</Text>
          <Image
            source={require("../../assets/common/details.png")}
            style={{
              width: 16,
              height:16,
              marginLeft:moderateScale(6),
            }}
            resizeMode="contain"
          />
        </View>

        {loading?
          <><ActivityIndicator size="large" color="gray"/></>
          // <><LoadingSpinner/></>
          :
          <Text style={styles.pointValue}>{userInfo?.point} P</Text>
        }



        <View style={styles.pointButtons}>
          <TouchableOpacity style={[styles.pointBtn,styles.pointBtnFirst]}><Text style={styles.pointBtnText}>포인트 사용하기</Text></TouchableOpacity>
          <TouchableOpacity style={styles.pointBtn}><Text style={styles.pointBtnText}>사용처 확인하기</Text></TouchableOpacity>
        </View>
      </View>

      <View style={styles.missionBox}>

        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tab,styles.tabFirst, selectedTab === 'weekly' && styles.activeTab]}
            onPress={() => setSelectedTab('weekly')}
          >
            <Text style={selectedTab === 'weekly' ? styles.activeTabText : styles.tabText}>주간 미션</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab,styles.tabSecond, selectedTab === 'daily' && styles.activeTab]}
            onPress={() => setSelectedTab('daily')}
          >
            <Text style={selectedTab === 'daily' ? styles.activeTabText : styles.tabText}>일일 미션</Text>
          </TouchableOpacity>
        </View>

        {/* {allMissions?.map((mission, index) => (
          <ExpandableMissionCard
            key={index}
            mission={mission.mission}
            missionStatus={mission.userMissionStatus}
            isExpanded={expandedIndex === index}
            onToggle={() => toggleExpand(index)}
            openCertificationModal={openCertificationModal}
          />
        ))} */}
        
        
        {loading?
          <><ActivityIndicator size="large" color="gray"/></>
        :
          selectedTab === 'weekly' ? 
            userWeeklyMissions.length===0?
              <MissionCard/>            
            :
              userWeeklyMissions?.map((mission, index) => (
                <MissionCard
                  key={index}
                  mission={mission.mission}
                  missionStatus={mission.userMissionStatus}
                />
              ))
          : 
            userWeeklyMissions.length===0?
              <>
                <MissionCard/>  
                <MissionCard/>
                <MissionCard/>    
              </>      
            :
              userDailyMissions?.map((mission, index) => (
                <MissionCard
                  key={index}
                  mission={mission.mission}
                  missionStatus={mission.userMissionStatus}
                />
              ))
        }     

        {/* {selectedTab === 'weekly' ? (
          <MissionCard/>
        ) : (
          <>
            <MissionCard/>
            <MissionCard/>
            <MissionCard/>          
          </>
        )} */}
        
      </View>

    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingHorizontal: width*0.06, 
    paddingTop: height * 0.05,
  },
  welcome: { fontSize: 20, fontWeight: '600', marginBottom: 16 },
  banner: {
    backgroundColor: '#17704B',
    padding: 10,
    borderRadius: 8,
    marginBottom: height *0.04,
    flexDirection:"row",
    justifyContent: "flex-start",
    alignItems:"center",
    paddingLeft: moderateScale(15),
  },
  bannerText: { color: 'white', textAlign: 'center' },
  pointBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    // padding: 16,
    marginBottom: height *0.04,
    alignItems: 'center',
  },
  pointLabel: { 
    backgroundColor:"#17704B", 
    width:"100%",
    borderTopLeftRadius:12,
    borderTopRightRadius: 12,
    paddingVertical: moderateScale(8),
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
  },
  pointLabelText:{
    fontSize: 14, 
    fontWeight: "600",
    color: 'white',
    textAlign:"center",
  },
  pointValue: { fontSize: moderateScale(24), fontWeight: 'bold', marginVertical: moderateScale(15) },
  pointButtons: { 
    flexDirection: 'row', 
    width: "100%",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopWidth: 1,
    borderColor:"#A5BCAA",
  },
  pointBtn: {
    width: "50%",
    paddingVertical: moderateScale(10),
  },
  pointBtnFirst:{
    borderRightWidth:1,
    borderColor:"#A5BCAA"
  },
  pointBtnText: {
    textAlign:"center",
    fontWeight:"500",
  },

  missionBox: {
    backgroundColor: '#fff',
    borderRadius:8,
  },
  tabRow: { flexDirection: 'row'},
  tab: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#C3C3C3',
    alignItems: 'center',
    // borderTopLeftRadius: 8,
    // borderTopRightRadius: 8,
  },
  tabFirst:{
    borderTopLeftRadius: 8,
  },
  tabSecond:{
    borderTopRightRadius: 8,
  },
  activeTab: {
    backgroundColor: '#17704B',
    borderBottomColor: '#ffffff',
  },
  tabText: {
    color: 'white',
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
    fontWeight: '700',
  },


})