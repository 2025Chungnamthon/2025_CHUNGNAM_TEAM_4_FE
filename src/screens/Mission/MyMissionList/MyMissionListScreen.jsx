import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import MissionCard from './components/MissionCard';
// import MissionCard from '../../components/MissionCard';
// import { categoryColors } from '../../constants/colors';

const MyMissionListScreen = () => {
  const missionData = [
    { type: 'weekly', title: '제로웨이스트 매장 방문', point: 500},
    { type: 'daily', title: '장바구니 지참하기', point: 30},
    { type: 'daily', title: '플로깅 실천하기', point: 60},
    { type: 'daily', title: '친환경 캠페인 알리기', point: 40},
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {/* <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Image source={require('../../assets/check.png')} style={styles.checkIcon} /> */}
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.username}>천안요정 님의 진행중인 미션</Text>
      </View>

      <View style={styles.cardList}>
        {missionData.map((mission, index) => (
          <MissionCard
            key={index}
            type={mission.type}
            icon={mission.icon}
            title={mission.title}
            point={mission.point}
            onPress={() => console.log('확인하기 눌림')}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F6F6F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: 60,
    height: 30,
  },
  checkIcon: {
    width: 24,
    height: 24,
  },
  userInfo: {
    backgroundColor: '#0DA666',
    padding: 12,
    borderRadius: 8,
    marginVertical: 16,
  },
  username: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardList: {
    marginTop: 8,
  },
});

export default MyMissionListScreen;
