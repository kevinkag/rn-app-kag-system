import React from 'react';
import { View, Dimensions } from 'react-native';

const StyledView = ({ jc, ai, row, flexWrap, flexGrow, flexShrink, flexBasis, alignSelf, alignContent, flex, w, h, mt, mb, mr, ml, me, ms, pt, pe, pr, pl, ps, children, style }) => {
  const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

  const justifyContent = jc ? justifyContentMap[jc] : 'flex-start';
  const alignItems = ai ? alignItemsMap[ai] : 'stretch';
  const flexWrapValue = flexWrap ? 'wrap' : 'nowrap';
  const combinedFlexGrow = flexGrow ? { flexGrow } : null;
  const combinedFlexShrink = flexShrink ? { flexShrink } : null;
  const combinedFlexBasis = flexBasis ? { flexBasis } : null;
  const combinedAlignSelf = alignSelf ? { alignSelf: alignSelfMap[alignSelf] } : null;
  const combinedAlignContent = alignContent ? { alignContent: alignContentMap[alignContent] } : null;
  const combinedFlex = flex ? { flex } : null;

  // Calcular el ancho y alto en píxeles del tamaño de la ventana
  const widthPixels = w ? windowWidth * (w / 100) : null;
  const heightPixels = h ? windowHeight * (h / 100) : null;
  const combinedWidth = widthPixels ? { width: widthPixels } : null;
  const combinedHeight = heightPixels ? { height: heightPixels } : null;

  // Determinar flexDirection
  const flexDirection = row ? 'row' : 'column';

  // Establecer margen y relleno
  const marginStyles = {
    marginTop: mt ? windowHeight * (mt / 100) : null,
    marginBottom: mb ? windowHeight * (mb / 100) : null,
    marginLeft: ml ? windowWidth * (ml / 100) : null,
    marginRight: mr ? windowWidth * (mr / 100) : null,
    marginHorizontal: me ? windowWidth * (me / 100) : null,
    marginVertical: ms ? windowHeight * (ms / 100) : null,
  };

  const paddingStyles = {
    paddingTop: pt ? windowHeight * (pt / 100) : null,
    paddingBottom: pe ? windowHeight * (pe / 100) : null,
    paddingLeft: pl ? windowWidth * (pl / 100) : null,
    paddingRight: pr ? windowWidth * (pr / 100) : null,
    paddingHorizontal: pe ? windowWidth * (pe / 100) : null,
    paddingVertical: ps ? windowHeight * (ps / 100) : null,
  };

  const combinedStyle = [
    { justifyContent, alignItems, flexDirection, flexWrap: flexWrapValue },
    combinedFlexGrow,
    combinedFlexShrink,
    combinedFlexBasis,
    combinedAlignSelf,
    combinedAlignContent,
    combinedFlex,
    combinedWidth,
    combinedHeight,
    marginStyles,
    paddingStyles,
    style,
  ];

  return (
    <View style={combinedStyle}>
      {children}
    </View>
  );
};

const justifyContentMap = {
  'center': 'center',
  'flex-start': 'flex-start',
  'flex-end': 'flex-end',
  'space-between': 'space-between',
  'space-around': 'space-around',
  'space-evenly': 'space-evenly',
};

const alignItemsMap = {
  'center': 'center',
  'flex-start': 'flex-start',
  'flex-end': 'flex-end',
  'stretch': 'stretch',
  'baseline': 'baseline',
};

const alignSelfMap = {
  'auto': 'auto',
  'flex-start': 'flex-start',
  'flex-end': 'flex-end',
  'center': 'center',
  'stretch': 'stretch',
  'baseline': 'baseline',
};

const alignContentMap = {
  'flex-start': 'flex-start',
  'flex-end': 'flex-end',
  'center': 'center',
  'stretch': 'stretch',
  'space-between': 'space-between',
  'space-around': 'space-around',
};

export default StyledView;
