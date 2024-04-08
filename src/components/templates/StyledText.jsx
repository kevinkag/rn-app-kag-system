import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const StyledText = ({ children, fs, fw, color, textAlign, style }) => {
    const styles = StyleSheet.create({
        text: {
            fontSize: fs ? parseInt(fs) : 14,
            fontWeight: fw || 'normal',
            color: color || 'black',
            textAlign: textAlign || 'left',
        },
    });

    return (
        <>
            <Text style={[styles.text, style]}>{children}</Text>
        </>
    );
};

export default StyledText;
