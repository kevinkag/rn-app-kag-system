import React, { useMemo } from 'react';
import { ActivityIndicator } from 'react-native';

const SvgIcon = ({ width, height, style, Svg, isLoading }) => {
  const renderSvg = useMemo(() => {
    return <Svg width={width} height={height} style={style} />;
  }, [width, height, style, Svg]);

  return (
    <>
      {isLoading ? (
        <ActivityIndicator style={style} size="small" color="#000" />
      ) : (
        renderSvg
      )}
    </>
  );
};

export default SvgIcon;
