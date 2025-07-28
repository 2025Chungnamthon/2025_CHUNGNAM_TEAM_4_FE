import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, Pressable, ActivityIndicator, Dimensions } from 'react-native';
import COLORS from '../../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale } from 'react-native-size-matters';
import { approveChallenge, clearSelectedChallenge, fetchChallengeDetail, rejectChallenge } from '../../../redux/slices/challengeSlice';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../../../components/LoadingSpinner';

const formatDate = (dateString) => {
  if (!dateString) return '-'; // 또는 null, 혹은 빈 문자열 ''  
  return dateString?.substring(0, 10).replace(/-/g, '.');
};

const {width,height} = Dimensions.get('window');

const UserMissionDetailScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { missionId } = route.params;
  
  const challengeLoading = useSelector((state) => state.challenge.loading.fetchChallengeDetail);
  const challengeError = useSelector((state) => state.challenge.error.fetchChallengeDetail);
  // const success = useSelector((state) => state.challenge.success.fetchChallengeDetail);
  const approveLoading = useSelector((state) => state.challenge.loading.approveChallenge);
  const approveError = useSelector((state) => state.challenge.error.approveChallenge);
  const rejectLoading = useSelector((state) => state.challenge.loading.rejectChallenge);
  const rejectError = useSelector((state) => state.challenge.error.rejectChallenge);
  const {selectedChallenge} = useSelector((state)=>state.challenge)

  const [selectedImage, setSelectedImage] = useState(null); // 눌린 이미지 URI
  const [modalVisible, setModalVisible] = useState(false);  // 모달 on/off  

  useEffect(()=>{
    if(missionId){
      console.log("missionId",missionId);
      dispatch(fetchChallengeDetail(missionId));
    }

    return () => {
      dispatch(clearSelectedChallenge());
    };    
  },[missionId])

  const handleApprove = (missionId) => {
    console.log("missionId",missionId);
    dispatch(approveChallenge(missionId));
  }

  const handleReject = (missionId) => {
    console.log("missionId",missionId);
    dispatch(rejectChallenge({challengeId:missionId,reject_reason:"성의가 없음"}));
  }

  if(challengeLoading){
    return(
      <View style={styles.spinnerBox}>
        <ActivityIndicator size={80} color="gray"/>
      </View>      
    )
  }

  return (
    <View style={styles.container}>
      {/* 상단 타이틀 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>{selectedChallenge?.mission_info.title}</Text>
      </View>

        <View style={styles.subHeaderRow}>
            <Text style={styles.date}>{formatDate(selectedChallenge?.created_at)}</Text>
            <Text style={styles.subInfo}>{selectedChallenge?.mission_info.type === 'DAILY' ? '일일미션' : '주간미션'} / {selectedChallenge?.mission_info.category}</Text>
        </View>


        <View style={styles.body}>
            {/* 사용자 정보 */}
            <Text style={styles.label}>사용자: <Text style={styles.highlight}>{selectedChallenge?.user_nickname}</Text></Text>

            {/* 미션 설명 */}
            <Text style={styles.descLabel}>설명: <Text style={styles.description}>{selectedChallenge?.mission_info.description}</Text></Text>
            

            {/* 사진 영역 */}
            <View style={styles.imageRow}>
                {selectedChallenge?.image_url && selectedChallenge?.image_url.length > 0
                ? selectedChallenge?.image_url.map((uri, idx) => (
                    <TouchableOpacity
                      key={idx}
                      onPress={() => {
                        setSelectedImage(uri);
                        setModalVisible(true);
                      }}
                    >                    
                      <Image key={idx} source={{ uri }} style={styles.image} resizeMode="cover" />
                    </TouchableOpacity>                    
                  ))
                : [0, 1, 2].map((i) => (
                    <View key={i} style={styles.imagePlaceholder} />
                    ))}
            </View>

            {/* 사용자 작성 텍스트 */}
            <Text style={styles.userText}>{selectedChallenge?.submissionText}</Text>

            {/* 승인 / 반려 버튼 */}
            <View style={styles.buttonRow}>
                <TouchableOpacity onPress={()=>handleApprove(missionId)} style={styles.approveButton}>
                  {approveLoading?
                    <ActivityIndicator size={20} color="white"/>
                  :
                    <Text style={styles.buttonText}>승인</Text>
                  }
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>handleReject(missionId)} style={styles.rejectButton}>
                  {rejectLoading?
                    <ActivityIndicator size={20} color="white"/>
                  :
                    <Text style={styles.buttonText}>반려</Text>
                  }                  
                </TouchableOpacity>
            </View>
        </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <Image source={{ uri: selectedImage }} style={styles.fullImage} resizeMode="contain" />
        </Pressable>
      </Modal>

    </View>
  );
};

export default UserMissionDetailScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16, 
    paddingTop: 50,
    backgroundColor: '#fff',
    flex:1,
  },


  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(8),
    justifyContent: 'center',
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  goBackButton:{
    position:"absolute",
    left:0,
  },
  subHeaderRow:{
    alignItems:"center",
    paddingHorizontal:moderateScale(20),
    // borderWidth:1,
  },  

  date: {
    fontSize: moderateScale(14),
    color: '#4c4c4cff',
    marginBottom: moderateScale(8),
  },
  subInfo: {
    width:"100%",
    textAlign:"center",
    fontSize: moderateScale(14),
    color: '#4c4c4cff',
    paddingBottom: moderateScale(20),
    marginBottom: moderateScale(30),
    borderBottomWidth:1,
    borderColor:"#ddd"
    // borderWidth:1,
  },
  body:{
    paddingHorizontal:moderateScale(12),
  },
  label: {
    fontSize: 15,
    marginBottom: moderateScale(8),
  },
  highlight: {
    color: COLORS.green200,
    fontWeight: '600',
  },
  descLabel:{
    fontSize: 15,
    marginBottom: moderateScale(40),
  },
  description: {
    marginBottom: moderateScale(20),
    color: '#333',
  },
  imageRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: moderateScale(20),
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  imagePlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 8,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userText: {
    minHeight: moderateScale(160),
    borderColor: COLORS.green200,
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: moderateScale(40),
    color: '#222',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  approveButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#1EAD5D',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  rejectButton: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: '#E53935',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.9)',
  justifyContent: 'center',
  alignItems: 'center',
},
fullImage: {
  width: '90%',
  height: '90%',
  borderRadius: 8,
},
  spinnerBox:{
    height:height,
    justifyContent:"center",
    // borderWidth:1,
  },

});
