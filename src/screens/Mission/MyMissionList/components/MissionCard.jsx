import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const MissionCard = ({ mission, isExpanded, onToggle }) => {
  const { type, title, point, icon, description, method } = mission;

  const isWeekly = type === 'weekly';

  return (
    <View style={styles.card}>
      {/* 상단 */}
      <View style={styles.header}>
        <Text style={[styles.category, { color: isWeekly ? '#0DA666' : '#17704B' }]}>
          {isWeekly ? '주간 미션' : '일일 미션'}
        </Text>
        <Text style={styles.point}>지급 포인트: {point}P</Text>
      </View>

      {/* 본문 */}
      <View style={styles.body}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
        {!isExpanded && (
          <TouchableOpacity style={styles.checkButton} onPress={onToggle}>
            <Text style={styles.checkText}>확인하기</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 확장 영역 */}
      {isExpanded && (
        <View style={styles.expandedSection}>
          <Text style={styles.descLabel}>미션 정보: <Text style={styles.descText}>{description}</Text></Text>
          <Text style={styles.descLabel}>인증 방법: <Text style={styles.descText}>{method}</Text></Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.authBtn}>
              <Text style={styles.authText}>인증하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeBtn} onPress={onToggle}>
              <Text style={styles.closeText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
    marginBottom: 6,
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
    gap: 8,
  },
  icon: {
    width: 22,
    height: 22,
  },
  title: {
    flex: 1,
    fontSize: 16,
  },
  checkButton: {
    borderWidth: 1,
    borderColor: '#189D66',
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  checkText: {
    color: '#189D66',
    fontWeight: 'bold',
  },
  expandedSection: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  descLabel: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  descText: {
    fontWeight: 'normal',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
    marginTop: 10,
  },
  authBtn: {
    backgroundColor: '#0DA666',
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  authText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeBtn: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  closeText: {
    color: '#333',
  },
});

export default MissionCard;
