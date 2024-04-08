import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';

const CustomAlert = ({ visible, message, onYes, onNo }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => { }}
        >
            <View style={styles.container}>
                <View style={styles.alertBox}>
                    <Text style={styles.message}>{message}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={onNo} style={styles.noButton}>
                            <Text style={styles.buttonText}>NO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onYes} style={styles.yesButton}>
                            <Text style={[styles.buttonText, { color: colors.primaryColor }]}>SI</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    alertBox: {
        backgroundColor: 'white',
        padding:20,
        maxWidth: width*0.9,
        borderRadius: 10,
        elevation: 5,
        alignItems: 'center',
    },
    message: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        color:colors.fontDarkColor
    },
    buttonContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginRight: 10
    },
    yesButton: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingLeft: 28,
        borderLeftWidth: 2,
        borderColor: '#b3b3b3'
    },
    noButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#b3b3b3',
        paddingRight: 14,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#b3b3b3',
        paddingRight: 10,
    },
});

export default CustomAlert;
