import React, {useContext} from 'react';
import {StyleSheet, Text, Pressable, View} from 'react-native';
import ModalItem from './ModalItem';
import {DefaultColors} from '../settings/Colors';
import {ThemeContext} from '../contexts/ThemeContext';

const DeleteModal = ({title, onPress, modalVisible, setModalVisible}) => {
  const [theme] = useContext(ThemeContext);
  return (
    <ModalItem modalVisible={modalVisible} setModalVisible={setModalVisible}>
      <View>
        <View style={styles.modalHeader}>
          <Text style={[styles.modalHeading, {color: theme.textColor}]}>
            {title}
          </Text>
        </View>
        <View style={styles.modalFooter}>
          <Pressable
            style={styles.modalButton}
            android_ripple={{color: DefaultColors.pressableRipple}}
            onPress={() => {
              setModalVisible(false);
            }}>
            <Text style={[styles.modalButtonText, {color: theme.textColor}]}>
              Cancel
            </Text>
          </Pressable>
          <Pressable
            style={[styles.modalButton, styles.modalButtonBorder]}
            android_ripple={{color: DefaultColors.pressableRipple}}
            onPress={() => {
              onPress();
              setModalVisible(false);
            }}>
            <Text style={[styles.modalButtonText, {color: theme.textColor}]}>
              Delete
            </Text>
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
    flexDirection: 'row',
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
    borderLeftColor: 'lightgray',
    borderLeftWidth: StyleSheet.hairlineWidth,
  },
});

export default DeleteModal;
