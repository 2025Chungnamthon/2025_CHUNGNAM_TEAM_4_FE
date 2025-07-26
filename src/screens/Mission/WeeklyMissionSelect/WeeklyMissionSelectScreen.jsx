import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale } from 'react-native-size-matters';
import MissionCard from '../components/MissionCard';
import MissionDetailModal from '../components/MissionDetailModal';
import COLORS from '../../../constants/colors';
import { getLargeCategoryIcon } from '../../../utils/categoryIconMapper';
import { useSelector } from 'react-redux';

const {width, height} = Dimensions.get('window');

// const weeklyMissions = [
//   {
//     id: '1',
//     title: '제로웨이스트 매장 방문',
//     rewardPoints: 500,
//     category: "일상 속 습관",    
//     // icon: getLargeCategoryIcon(category),
//     type: 'WEEKLY',
//     description: '제로웨이스트 매장 방문 후 사진 인증하기\n본인을 인증할 수 있는 사진 2장 첨부 필수',
//   },
//   {
//     id: '2',
//     title: '재활용 분리배출하기',
//     rewardPoints: 450,
//     category: "친환경 이동",    
//     // icon: getLargeCategoryIcon(category),
//     type: 'WEEKLY',
//     description: '플라스틱/캔/종이를 분리배출하는 사진 2장 첨부',

//   },
//   {
//     id: '3',
//     title: '재사용 용기 포장하기',
//     rewardPoints: 500,
//     // icon: getLargeCategoryIcon(category),
//     type: 'WEEKLY',
//     description: '용기를 이용한 포장 모습 인증 사진 2장 첨부',
//     category: "친환경 소비",
//   },
// ];
const WeeklyMissionScreen = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null);

  const {weeklyMissions} = useSelector((state)=> state.userMission)

  const handleSelect = (id) => setSelectedId(id);
  
  const handleInfoPress = (mission) => {
    setSelectedMission(mission);
    setModalVisible(true);
  };

  const handleNextButton = () => {
    console.log(selectedId);
    navigation.navigate('DailyMissionSelectScreen', { weeklyMissionId: selectedId });
  }

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <Text style={styles.headerText}>오늘의 미션을 골라보세요.</Text>

      {/* 선택 안내 버튼 */}
      <View style={styles.selectBox}>
        <Text style={styles.selectText}>주간 미션을 1가지 선택해주세요.</Text>
      </View>

      {/* 미션 카드 리스트 */}
      <FlatList
        data={weeklyMissions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MissionCard
            item={item}
            isSelected={item.id === selectedId}
            onSelect={handleSelect}
            onInfoPress={handleInfoPress}
          />
        )}
      />

      {selectedId && (
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={handleNextButton}
        >
          <Text style={styles.nextBtnText}>다음으로 넘어가기</Text>
        </TouchableOpacity>
      )}

      {/* 상세 정보 모달 */}
      {/* <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>미션 정보</Text>

            {selectedMission && (
              <>
                <Ionicons name="document-checkmark-outline" size={40} color="#1A8D57" style={{ marginVertical: 12 }} />
                <Text style={styles.modalTitle}>{selectedMission.title}</Text>
                <View style={styles.modalInfoRow}>
                  <Ionicons name={selectedMission.icon} size={20} color="#333" />
                  <Text style={{ marginLeft: 8 }}>{selectedMission.type}</Text>
                  <Ionicons name="trophy-outline" size={20} color="#333" style={{ marginLeft: 12 }} />
                  <Text style={{ marginLeft: 4 }}>{selectedMission.points}P</Text>
                </View>
                <Text style={styles.modalDescription}>{selectedMission.description}</Text>
              </>
            )}

            <TouchableOpacity style={styles.closeBtn} onPress={closeModal}>
              <Text style={styles.closeBtnText}>돌아가기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}

      <MissionDetailModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        mission={selectedMission}
      />
    </View>
  );
}

export default WeeklyMissionScreen;


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
    backgroundColor: COLORS.green400,
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
  nextBtn: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  nextBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },  
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 12,
//     marginBottom: 14,
//     elevation: 2,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   cardSelected: {
//     backgroundColor: '#1A8D57',
//   },
//   cardContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   icon: {
//     marginRight: 12,
//   },
//   textContainer: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 15,
//     fontWeight: '500',
//     color: '#000',
//   },
//   points: {
//     fontSize: 13,
//     color: '#666',
//   },
//   titleSelected: {
//     color: '#fff',
//   },
//   pointsSelected: {
//     color: '#fff',
//   },

//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0,0,0,0.4)',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     padding: 24,
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     alignItems: 'center',
//   },
//   modalHeader: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#fff',
//     backgroundColor: '#1A8D57',
//     width: '100%',
//     textAlign: 'center',
//     paddingVertical: 12,
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     marginTop: -24,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginVertical: 8,
//   },
//   modalInfoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   modalDescription: {
//     fontSize: 14,
//     color: '#444',
//     textAlign: 'center',
//     marginTop: 12,
//     lineHeight: 20,
//   },
//   closeBtn: {
//     backgroundColor: '#1A8D57',
//     paddingVertical: 12,
//     paddingHorizontal: 40,
//     borderRadius: 8,
//     marginTop: 24,
//   },
//   closeBtnText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },  
});
