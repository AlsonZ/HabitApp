import React from 'react';
import {StyleSheet, Text, Pressable, View} from 'react-native';
import ModalItem from './ModalItem';
import {DefaultColors} from '../settings/Colors';

const OkModal = ({title, modalVisible, setModalVisible, children}) => {
  return (
    <ModalItem modalVisible={modalVisible} setModalVisible={setModalVisible}>
      <View>
        <View style={styles.modalHeader}>
          <Text style={styles.modalHeading}>{title}</Text>
        </View>
        {children}
        <View style={styles.modalFooter}>
          <Pressable
            style={[styles.modalButton, styles.modalButtonBorder]}
            android_ripple={{color: DefaultColors.pressableRipple}}
            onPress={() => {
              setModalVisible(false);
            }}>
            <Text style={styles.modalButtonText}>Ok</Text>
          </Pressable>
        </View>
      </View>
    </ModalItem>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingHorizontal: '15%',
    borderBottomColor: 'lightgray',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  modalHeading: {
    fontSize: 18,
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  modalButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    flexBasis: 0,
    flexGrow: 1,
  },
  modalButtonText: {
    fontSize: 14,
  },
  modalButtonBorder: {
    borderTopColor: 'lightgray',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});

export default OkModal;
