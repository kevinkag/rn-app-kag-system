import React, { useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { colors } from '../../utils/colors';

const ModalConfirmation = ({ visible, onClose, children, header, setResponse }) => {
  const modalContentRef = useRef(null);

  const onResponse = (resp) => {
    setResponse(resp);
    onClose();
  } 

  const handleContainerPress = () => {
    onClose();
  };

  const handleContentPress = (event) => {
    event.stopPropagation();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >   
      <TouchableWithoutFeedback onPress={handleContainerPress}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={handleContentPress}>
            <View
              style={styles.modalContent}
              ref={modalContentRef}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.headerText}>{header}</Text>
              </View>
              <View style={{paddingHorizontal:8, paddingTop:10, marginBottom:24}}>
                {children}
              </View>
              <View style={{flexDirection:'row',alignSelf:'flex-end', marginRight:10}}>
                <TouchableOpacity onPress={() => onResponse(false)} style={styles.closeButton}>
                  <Text style={styles.cancelButton}>NO</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onResponse(true)} style={styles.closeButton}>
                  <Text style={styles.acceptButton}>SI</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 6,
    paddingTop: 10,
    width: width*0.8,
    maxWidth: 400,
    maxHeight: '80%',
    justifyContent: 'center',
  },
  modalHeader:{
    paddingHorizontal:8,
    borderBottomWidth:1,
    borderColor:'#b2b2b2'
  },
  headerText:{
    fontWeight:'bold',
    fontSize:16,
    paddingBottom:8,
  },
  closeButton: {
    padding: 10,
  },
  cancelButton:{
    fontSize: 16,
    fontWeight:'bold',
    color: '#b3b3b3',
    paddingRight:10,
  },
  acceptButton: {
    fontSize: 16,
    fontWeight:'bold',
    color: colors.primaryColor,
    paddingLeft:30,
    borderLeftWidth:2,
    borderColor:'#b3b3b3'
  },
});

export default ModalConfirmation;
