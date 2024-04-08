import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import SvgIcon from './SvgIcon';
import { colors } from '../../utils/colors';

const IconInput = ({ iconName, icon, colorIcon, style, ...rest }) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <TextInput
        style={styles.input}
        {...rest}
      />
      <View style={styles.icon}>
        <SvgIcon Svg={icon} width={24} height={24} styles={{ color: colorIcon }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    color:colors.fontDarkColor
  },
  icon: {
    marginLeft: 10,
    color: 'gray',
  },
});

export default IconInput;
