import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import COLORS from '../../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale } from 'react-native-size-matters';

const UserMissionDetailScreen = ({ route, navigation }) => {
//   const { missionId } = route.params;

    const mission = {
        id: '1',
        title: '텀블러 사용하기',
        type: 'WEEKLY',
        userNickname: '천안요정',
        status: 'PENDING',
        category: '일상 속 습관',
        description: "텀블러를 사용하고 인증사질 1장 올리기기기기기기기.",
        date: '2025.07.24',
        photos:[],
    }

  // 예시 데이터
//   const {
//     title,
//     date = '2025.07.24',
//     type,
//     category,
//     userNickname,
//     description,
//     userText,
//     photos, // 배열: ['url1', 'url2', ...]
//   } = mission;

  return (
    <View style={styles.container}>
      {/* 상단 타이틀 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>{mission?.title}</Text>
      </View>

        <View style={styles.subHeaderRow}>
            <Text style={styles.date}>{mission?.date}</Text>
            <Text style={styles.subInfo}>{mission?.type === 'DAILY' ? '일일미션' : '주간미션'} / {mission?.category}</Text>
        </View>


        <View style={styles.body}>
            {/* 사용자 정보 */}
            <Text style={styles.label}>사용자: <Text style={styles.highlight}>{mission?.userNickname}</Text></Text>

            {/* 미션 설명 */}
            <Text style={styles.descLabel}>설명: <Text style={styles.description}>{mission?.description}</Text></Text>
            

            {/* 사진 영역 */}
            <View style={styles.imageRow}>
                {mission?.photos && mission?.photos.length > 0
                ? mission?.photos.map((uri, idx) => (
                    <Image key={idx} source={{ uri }} style={styles.image} resizeMode="cover" />
                    ))
                : [0, 1, 2].map((i) => (
                    <View key={i} style={styles.imagePlaceholder} />
                    ))}
            </View>

            {/* 사용자 작성 텍스트 */}
            <Text style={styles.userText}>{mission?.userText}</Text>

            {/* 승인 / 반려 버튼 */}
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.approveButton}>
                <Text style={styles.buttonText}>승인</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rejectButton}>
                <Text style={styles.buttonText}>반려</Text>
                </TouchableOpacity>
            </View>
        </View>


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
});
