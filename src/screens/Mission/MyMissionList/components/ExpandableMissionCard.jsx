import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import COLORS from '../../../../constants/colors';
import { getSmallCategoryIcon } from '../../../../utils/categoryIconMapper';

const MAX_HEIGHT = 120; // 확장 영역 높이
const ANIMATION_DURATION = 300;

const ExpandableMissionCard = ({ mission, isExpanded, onToggle, openCertificationModal }) => {
  const { id, category, type, title, rewardPoints, description } = mission.mission;
  const isWeekly = type === 'WEEKLY';

  useEffect(()=>{
    console.log("misonnn",mission)
  },[])

  const animatedHeight = useRef(new Animated.Value(0)).current;
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isExpanded) {
      // 열기 애니메이션
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: MAX_HEIGHT,
          duration: ANIMATION_DURATION,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: ANIMATION_DURATION,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      // 닫기 애니메이션
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: 0,
          duration: ANIMATION_DURATION,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 0,
          duration: ANIMATION_DURATION / 2,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [isExpanded]);

  return (
    <View style={styles.card}>
      {/* 상단 */}
      <View style={styles.header}>
        <Text style={[styles.category, { color: isWeekly ? COLORS.green400 : COLORS.green200 }]}>
          {isWeekly ? '주간 미션' : '일일 미션'}
        </Text>
        <Text style={styles.point}>지급 포인트: {rewardPoints}P</Text>
      </View>

      {/* 본문 */}
      <View style={styles.body}>
        <Image
            source={getSmallCategoryIcon(category)}
            style={{
                height:moderateScale(17),
                width:moderateScale(17),
                tintColor:'#333',
            }}
            resizeMode="contain"    
        />
        <Text style={styles.title}>{title}</Text>
        {mission.userMissionStatus==="IN_PROGRESS"?
          !isExpanded && (
            <TouchableOpacity style={styles.checkButton} onPress={onToggle}>
              <Text style={styles.checkText}>확인하기</Text>
            </TouchableOpacity>
          )
        :
          <TouchableOpacity style={styles.inProgressButton} onPress={onToggle} disabled={true}>
            <Text style={styles.inProgressText}>검토중</Text>
          </TouchableOpacity>
        }
      </View>

      {/* 확장 영역 */}
      <Animated.View style={[styles.expandBox, { height: animatedHeight, opacity: animatedOpacity }]}>
        <Text style={styles.descLabel}>미션 설명: <Text style={styles.descText}>{description}</Text></Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.authBtn}>
            <Text style={styles.authText} onPress={()=>openCertificationModal(mission)}>인증하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeBtn} onPress={onToggle}>
            <Text style={styles.closeText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    // padding: 12,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(20),
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(10),
    alignItems:"center",
  },
  category: {
    fontSize:moderateScale(16),
    fontWeight: 'bold',
  },
  point: {
    alignSelf:"flex-start",
    color: '#888888ff',
    fontSize: moderateScale(11),
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
    fontWeight:"600",
    paddingVertical:4,
  },
  checkButton: {
    borderWidth: 1,
    borderColor: COLORS.green200,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  checkText: {
    color: COLORS.green200,
    // fontWeight: 'bold',
  },
  inProgressButton:{
    borderWidth: 1,
    borderColor: COLORS.green200,
    backgroundColor: COLORS.green200,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,    
  },
  inProgressText:{
    color:"white",
  },
  expandBox: {
    overflow: 'hidden',
    // justifyContent:"center",
    // marginTop: 10,
    // paddingTop: 10,
  },
  descLabel: {
    fontWeight: 'bold',
    marginBottom: 4,
    paddingTop: 10,
    // borderWidth:1,
  },
  descText: {
    fontWeight: 'normal',
    borderWidth:1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent:"flex-end",
    gap: 10,
    marginTop: 10,
  },
  authBtn: {
    backgroundColor: COLORS.green200,
    borderRadius: 8,
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
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  closeText: {
    color: '#333',
  },
});

export default ExpandableMissionCard;
