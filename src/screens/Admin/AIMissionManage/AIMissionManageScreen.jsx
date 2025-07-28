import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import MissionCard from "./components/MissionCard";
import COLORS from "../../../constants/colors";
import { moderateScale } from "react-native-size-matters";
import CreateMissionsModal from "./components/CreateMissionsModal";
import { createMissionList, createMissions, fetchMissions } from "../../../redux/slices/missionSlice";
import { useDispatch, useSelector } from "react-redux";
import EditMissionModal from "./components/EditMissionModal";

const {width,height} = Dimensions.get('window');

const AIMissionManageScreen = () => {
  const dispatch = useDispatch();
  const missionLoading = useSelector((state) => state.mission.loading.fetchMissions);
  const missionError = useSelector((state) => state.mission.error.fetchMissions);

  const [modalVisible, setModalVisible] = useState(false);
  const [missionType, setMissionType] = useState(null);
  const [missionGenre, setMissionGenre] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null);
  const { missionList, error } = useSelector((state) => state.mission);
 
  useEffect(()=>{
      dispatch(fetchMissions({status:'CREATE'})); //CREATE,ACTIVATE,DELETE
  },[])

  // useEffect(()=>{
  //     if(AIMissionList.length!=0){
  //       console.log(AIMissionList);
  //     }
  // },[AIMissionList])

  const handleCreate = async () => {
    if (!missionType || !missionGenre) {
      Alert.alert('필수 입력', '미션 종류와 장르를 선택해주세요');
      return;
    }
    try {
      // const result = await dispatch(createMissionList({ type: missionType, category: missionGenre })).unwrap();
      dispatch(createMissionList({ type: missionType, category: missionGenre }));
      Alert.alert('생성 완료', '미션이 성공적으로 생성되었습니다');
      setModalVisible(false);      


    } catch (err) {
      Alert.alert('에러 발생', err.message || '미션 생성 실패');
    }
  };

  const handleEditClick = (mission) => {
    setSelectedMission(mission);
    setEditModalVisible(true);
  };  

  const handleEditSubmit = (updatedMission) => {
    console.log('수정된 내용:', updatedMission);
    // ✅ dispatch(updateMissionThunk(updatedMission)) 등 API 요청 가능
  };

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={30} style={styles.goBackIcon}/>
        <Text style={styles.headerText}>AI 미션 생성 및 검토</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {/* 버튼 */}
        <View style={styles.buttonColumn}>
            <TouchableOpacity 
                onPress={() => setModalVisible(true)}            
                style={styles.outlineButton}
            >
                <Text style={styles.outlineButtonText}>미션 생성하기</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.filledButton}> */}
            {/* <Text style={styles.filledText}>주간 미션</Text> */}
            {/* </TouchableOpacity> */}
        </View>

        {/* 미션 카드 리스트 */}
        {missionLoading?
            <View style={styles.spinnerBox}>
              <ActivityIndicator size={80} color="gray"/>
            </View>
        :
          missionList?.map((mission) => (
              <MissionCard key={mission.id} mission={mission} handleEditClick={handleEditClick}/>
          ))}      

        {/* {missions.map((mission) => (
            <MissionCard key={mission.id} mission={mission} handleEditClick={handleEditClick} />
        ))} */}
      </ScrollView>

      {/* 하단 버튼 */}
      <View style={styles.bottomButtonRow}>
        <TouchableOpacity style={styles.approveAll}>
          <Text style={styles.approveAllText}>모두 승인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rejectAll}>
          <Text style={styles.rejectAllText}>모두 반려</Text>
        </TouchableOpacity>
      </View>

      <CreateMissionsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleCreate}
        missionType={missionType}
        missionGenre={missionGenre}
        setMissionType={setMissionType}
        setMissionGenre={setMissionGenre}
      />

      <EditMissionModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onSubmit={handleEditSubmit}
        missionData={selectedMission}
      />
    </View>
  );
};

export default AIMissionManageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 16, 
    backgroundColor: "white",
    paddingTop:height *0.08,
  },
  header: {
    flexDirection: "row",
    justifyContent:"center", 
    alignItems: "center", 
    marginBottom: moderateScale(24),
  },
  goBackIcon:{
    position:"absolute",
    left:0,
  },
  headerText: {
    fontSize: 18, 
    fontWeight: "bold", 
    marginLeft: 8
  },
  buttonColumn: {
    flexDirection: "column",
    alignItems:"center",
    // justifyContent: "center",
    marginBottom: 16,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: COLORS.green200,
    borderRadius: 8,
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(15),
    marginBottom: moderateScale(20),
    // width: width*0.4,
  },
  outlineButtonText: {
    color: "#189D66",
    textAlign:"center",
},
  filledText: {
    backgroundColor: "#189D66",
    borderRadius: 8,
    paddingVertical: moderateScale(8),
    // paddingHorizontal: 12,
    width: width*0.7,
    color: "white",
    textAlign:"center",
    fontSize:moderateScale(16),
  },
  scrollContainer: {flex: 1},
  bottomButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    paddingBottom: height *0.05,
  },
  approveAll: {
    flex: 1,
    backgroundColor: COLORS.approve,
    padding: 12,
    borderRadius: 8,
    marginRight: 4,
  },
  rejectAll: {
    flex: 1,
    backgroundColor: COLORS.decline,
    padding: 12,
    borderRadius: 8,
    marginLeft: 4,
  },
  approveAllText: {color: "white", textAlign: "center", fontWeight: "bold"},
  rejectAllText: {color: "white", textAlign: "center", fontWeight: "bold"},
  spinnerBox:{
    height:height*0.55,
    justifyContent:"center",
    // borderWidth:1,
  },
});
