import React, {useContext} from 'react';
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  StatusBar,
} from 'react-native';
import {ThemeContext} from '../contexts/ThemeContext';

const ModalItem = ({children, modalVisible, setModalVisible}) => {
  const [theme] = useContext(ThemeContext);
  return (
    <Modal visible={modalVisible} animationType="fade" transparent={true}>
      <StatusBar
        backgroundColor={
          theme.overlayColor === 'dark-content'
            ? 'rgba(0, 0, 0, 0.5)'
            : 'rgba(255,255,255, 0.08)'
        }
        animated={true}
      />
      <TouchableWithoutFeedback
        onPress={() => {
          setModalVisible(false);
        }}>
        <View
          style={[
            styles.modalOverlay,
            {
              backgroundColor:
                theme.overlayColor === 'dark-content'
                  ? 'rgba(0, 0, 0, 0.5)'
                  : 'rgba(255,255,255, 0.08)',
            },
          ]}></View>
      </TouchableWithoutFeedback>
      <View style={styles.modalContainer}>
        <View
          style={[styles.modalView, {backgroundColor: theme.backgroundColor}]}>
          {children}
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
    paddingBottom: 20,
  },
  modalView: {
    display: 'flex',
    flexWrap: 'wrap',
    maxHeight: '60%',
    backgroundColor: 'white',
    marginHorizontal: 20,
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
  },
});

export default ModalItem;
