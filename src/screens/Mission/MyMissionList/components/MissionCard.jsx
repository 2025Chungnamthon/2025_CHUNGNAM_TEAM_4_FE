import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const MissionCard = ({ type, icon, title, point, onPress }) => {
  const isWeekly = type === 'weekly';

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={[styles.category, { color: isWeekly ? '#0DA666' : '#17704B' }]}>
          {isWeekly ? '주간 미션' : '일일 미션'}
        </Text>
        <Text style={styles.point}>지급 포인트: {point}P</Text>
      </View>

      <View style={styles.body}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>확인하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  category: {
    fontWeight: 'bold',
  },
  point: {
    color: '#555',
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  title: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    borderWidth: 1,
    borderColor: '#189D66',
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: '#189D66',
    fontWeight: 'bold',
  },
});

export default MissionCard;
