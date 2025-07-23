// components/MissionCard.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale } from 'react-native-size-matters';
import COLORS from '../../../constants/colors';
import { getLargeCategoryIcon, getSmallCategoryIcon } from '../../../utils/categoryIconMapper';

export default function MissionCard({ item, isSelected, onSelect, onInfoPress }) {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.cardSelected]}
      onPress={() => onSelect(item.id)}
    >
        <View style={styles.cardContent}>
            <View>
                <View style={styles.firstRow}>
                    <Image
                        source={getSmallCategoryIcon(item.category)}
                        style={{
                            height:moderateScale(17),
                            width:moderateScale(17),
                            tintColor:isSelected ? '#fff' : '#333',
                            marginRight: moderateScale(7),
                            // borderWidth:1,
                        }}
                        resizeMode="contain"    
                    />
                    {/* <Ionicons
                        name={item.icon}
                        size={20}
                        color={isSelected ? '#fff' : '#333'}
                        style={styles.icon}
                    /> */}
                    <Text style={[styles.title, isSelected && styles.titleSelected]}>{item.title}</Text>        
                </View> 

                <View style={styles.textContainer}>
                    <Text style={[styles.points, isSelected && styles.pointsSelected]}>
                    지급 포인트: {item.rewardPoints}p
                    </Text>
                </View> 
            </View>


            <TouchableOpacity onPress={() => onInfoPress(item)}>
                <Ionicons name="help-circle-outline" size={22} color={isSelected ? '#fff' : '#1A8D57'} />
            </TouchableOpacity>                 
        </View>
       


    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 11,
    elevation: 2,
  },
  cardSelected: {
    backgroundColor: COLORS.green200,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent:"space-between",
    alignItems:"center"
  },
  firstRow: {
    flexDirection: 'row',
    marginBottom: moderateScale(9),
    alignItems: 'center',
    // borderWidth:1,
  },  
  icon: {
    marginRight: 9,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  titleSelected: {
    color: '#fff',
  },
  points: {
    fontSize: 12,
    color: '#1f1f1fab',
  },
  pointsSelected: {
    color: '#fff',
  },
});
