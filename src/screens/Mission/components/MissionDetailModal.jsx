// components/MissionDetailModal.jsx
import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale } from 'react-native-size-matters';
import COLORS from '../../../constants/colors';
import { getLargeCategoryIcon, getSmallCategoryIcon } from '../../../utils/categoryIconMapper';

const {width, height} = Dimensions.get('window');

export default function MissionDetailModal({ visible, onClose, mission }) {
  if (!mission) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.header}>미션 정보</Text>

          <View style={styles.body}>
            <View style={styles.titleRow}>
                {/* <Ionicons name="storefront-outline" size={80} color={COLORS.green400} style={styles.icon} /> */}
                <Image
                    source={getLargeCategoryIcon(mission.category)}
                    style={styles.icon}
                    resizeMode="contain"    
                />                
                <Text style={styles.title}>{mission.title}</Text>
            </View>

            <View style={styles.typeRow}>
                <Text style={styles.typeTitle}>{mission.type==="WEEKLY"?"주간":"일일"} 미션</Text>
                <View style={styles.iconRow}>
                    <View style={{flexDirection:"row", alignItems:"center"}}>
                        <Image
                            source={getSmallCategoryIcon(mission.category)}
                            style={{
                                height:moderateScale(17),
                                width:moderateScale(17),
                                tintColor:'#333',
                                // marginRight: moderateScale(7),
                                // borderWidth:1,
                            }}
                            resizeMode="contain"    
                        />
                        <Text style={styles.genre}>{mission.category}</Text>
                    </View>
                    <View style={{flexDirection:"row", alignItems:"center"}}>
                        <Ionicons name="trophy-outline" size={20} color="#333" style={{ marginLeft: 12 }} />
                        <Text style={styles.points}>{mission.rewardPoints}P</Text>
                    </View>

                </View>                
            </View>
            <Text style={styles.description}>{mission.description}</Text>

            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                <Text style={styles.closeText}>돌아가기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  container: {
    backgroundColor: '#fff',
    height: height *0.85,

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: COLORS.green400,
    width: '100%',
    textAlign: 'center',
    paddingVertical: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  body:{
    width:"100%",
    height:"100%",
    paddingHorizontal: width*0.05,
    paddingTop: height*0.07,
    alignItems: 'center',    
  },
  titleRow:{
    alignItems:"center",
    // borderWidth:1,
    borderBottomWidth:1,
    borderColor:"#a7a7a7d8",
    marginBottom:moderateScale(15),
    width:"100%",
    // paddingBottom: 0,
  },
  icon:{
    height:moderateScale(70),
    width:moderateScale(70),
    tintColor:COLORS.green400,    
    marginBottom:moderateScale(30),
  },
  title: {
    color: COLORS.green400,
    fontSize: 21,
    fontWeight: '600',
    marginBottom:moderateScale(20),
    // paddingBottom:0,
  },
  typeRow: {
    width:"100%",
    alignItems: 'center',
    paddingBottom:moderateScale(10),
    marginBottom: 10,
    borderBottomWidth:1,
    borderColor:"#a7a7a7d8",

  },
  typeTitle:{
    color: COLORS.green400,    
    fontSize:19,
    fontWeight: '600',    
    textAlign:"center",
    marginBottom:moderateScale(18),
  },
  iconRow:{
    // width:"100%",
    flexDirection: 'row',
    justifyContent:"center",
    alignItems: 'center',
    marginBottom: 14,    
    gap:moderateScale(15),
  },  
  genre:{ 
    fontWeight: '600', 
    marginLeft: 8 
  },
  points:{ 
    fontWeight: '600',     
    marginLeft: 4 
  },
  description: {
    fontSize: moderateScale(14),
    color: '#444',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 20,
  },
  closeBtn: {
    width:"100%",
    backgroundColor: COLORS.green400,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 24,
    position: 'absolute',
    bottom: 80,
    left: 16,
    right: 16,
  },
  closeText: {
    textAlign:"center",
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
