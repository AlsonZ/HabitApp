import React, {useContext, useState} from 'react';
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const ModalItem = ({children, modalVisible, setModalVisible}) => {
  return (
    <Modal visible={modalVisible} animationType="fade" transparent={true}>
      <TouchableWithoutFeedback
        onPress={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalOverlay}></View>
      </TouchableWithoutFeedback>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxHeight: '60%',
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default ModalItem;
