// components/FullImageModal.jsx
import React from 'react';
import { Modal, View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

const FullImageModal = ({ visible, onClose, images, index }) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={styles.backdrop}>
      <TouchableOpacity style={styles.close} onPress={onClose}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>
      <Image source={{ uri: images[index] }} style={styles.full} resizeMode="contain" />
    </View>
  </Modal>
);

export default FullImageModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  full: {
    width: '100%',
    height: '100%',
  },
  close: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
  closeText: { color: '#fff', fontSize: 30 },
});
