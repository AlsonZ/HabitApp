import React, {useContext, useState} from 'react';
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {DefaultColors} from '../settings/Colors';

const ModalItem = ({
  children,
  modalVisible,
  setModalVisible,
  title,
  modalHeader,
  modalFooter,
}) => {
  const modalHeaderActive = modalHeader ? modalHeader : false;
  const modalFooterActive = modalFooter ? modalFooter : false;
  return (
    <Modal visible={modalVisible} animationType="fade" transparent={true}>
      <TouchableWithoutFeedback
        onPress={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalOverlay}></View>
      </TouchableWithoutFeedback>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <View>
            {modalHeaderActive && (
              <Text style={styles.modalHeader}>{title}</Text>
            )}
            {children}
            {modalFooterActive && (
              <View style={styles.modalFooter}>
                <TouchableHighlight
                  underlayColor={DefaultColors.touchableHightlightUnderlay}
                  onPress={() => {
                    setModalVisible(false);
                  }}>
                  <Text style={styles.modalButton}>OK</Text>
                </TouchableHighlight>
              </View>
            )}
          </View>
        </View>
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
  modalHeader: {
    // display: 'flex',
    alignItems: 'center',
    // width: '100%',
    margin: 5,
    marginLeft: 20,
    fontSize: 18,
  },
  modalFooter: {
    display: 'flex',
    flexDirection: 'row-reverse',
    margin: 3,
  },
  modalButton: {
    padding: 8,
    paddingHorizontal: 15,
    marginRight: 5,
    fontSize: 15,
  },
});

export default ModalItem;
