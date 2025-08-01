import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale } from 'react-native-size-matters';
import COLORS from '../../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPointHistory } from '../../../redux/slices/pointSlice';

const { width, height } = Dimensions.get('window');

const PointsHistoryScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  // 포인트 관련 상태
  const loading = useSelector((state) => state.point.loading.fetchPointHistory);
  const pointHistory = useSelector((state) => state.point.pointHistory);
  const retentionPoints = useSelector((state) => state.point.retentionPoints);
  const error = useSelector((state) => state.point.error);

  // 처음 마운트 시 데이터 가져오기
  useEffect(() => {
    dispatch(fetchPointHistory());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>포인트 사용 내역</Text>
        <Text></Text>
      </View>

      {/* 현재 보유 포인트 */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>현재 보유중인 포인트</Text>
        <Text style={styles.balanceValue}>{retentionPoints}P</Text>
      </View>

      {/* 최근 거래내역 */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>최근거래내역 (30일)</Text>
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 30 }} size="large" color={COLORS.green200} />
      ) : error ? (
        <Text style={{ textAlign: 'center', color: 'red', marginTop: 30 }}>
          포인트 내역을 불러오는 데 실패했습니다.
        </Text>
      ) : (
        <ScrollView style={styles.scrollContainer}>
          {pointHistory.length === 0 ? (
            <Text style={{ textAlign: 'center', marginTop: 20, color: '#888' }}>
              최근 거래 내역이 없습니다.
            </Text>
          ) : (
            pointHistory.map((tx, index) => {
              const dateObj = new Date(tx.payment_date);
              const date = dateObj.toISOString().slice(0, 10); // YYYY-MM-DD
              const day = `(${['일','월','화','수','목','금','토'][dateObj.getDay()]})`;

              return (
                <View key={index} style={styles.transactionItem}>
                  <Text style={styles.date}>{date} {day}</Text>
                  <View style={styles.detailRow}>
                    <Text style={styles.name}>{tx.shop_name}</Text>
                    <Text style={styles.amount}>-{tx.used_points}P</Text>
                  </View>
                  <Text style={styles.balance}>잔액: {tx.total_points}P</Text>
                </View>
              );
            })
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default PointsHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // 헤더
  header: {
    backgroundColor: COLORS.green200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(12),
    paddingTop: height * 0.07,
  },
  headerText: {
    color: '#fff',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },

  // 잔액
  balanceContainer: {
    backgroundColor: COLORS.green200,
    alignItems: 'center',
    paddingVertical: moderateScale(20),
    paddingBottom: height * 0.05,
  },
  balanceLabel: {
    color: '#fff',
    fontSize: moderateScale(14),
  },
  balanceValue: {
    color: '#fff',
    fontSize: moderateScale(26),
    fontWeight: 'bold',
    marginTop: moderateScale(5),
  },

  // 최근 거래 내역 섹션
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(15),
  },
  sectionTitle: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
  },

  // 거래 내역 리스트
  scrollContainer: {
    paddingHorizontal: moderateScale(16),
  },
  transactionItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: moderateScale(12),
  },
  date: {
    color: '#7b7b7b',
    fontSize: moderateScale(12.5),
    marginBottom: 4,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: moderateScale(17),
    fontWeight: '600',
    marginBottom: moderateScale(5),
  },
  amount: {
    fontSize: moderateScale(15),
    fontWeight: '500',
    color: 'red',
    marginTop: 4,
  },
  balance: {
    color: '#7b7b7b',
    fontSize: moderateScale(12),
    marginTop: 4,
  },
});
