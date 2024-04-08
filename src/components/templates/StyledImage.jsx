import React, { useState, useMemo, useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import SvgIcon from '../atoms/SvgIcon';
import { noimage } from '../../assets';

const StyledImage = ({ source, style, placeholderSource }) => {
    const [loading, setLoading] = useState(true);

    const onLoadStart = useCallback(() => setLoading(true), []);
    const onLoadEnd = useCallback(() => setLoading(false), []);
    const onLoad = useCallback(() => setLoading(false), []);
    const onError = useCallback(() => setLoading(false), []);

    const imageComponent = useMemo(() => {
        return (
            <FastImage
                source={source}
                style={{ ...style, position: 'absolute' }}
                resizeMode={FastImage.resizeMode.contain}
                onLoadStart={onLoadStart}
                onLoadEnd={onLoadEnd}
                onLoad={onLoad}
                onError={onError}
            />
        );
    }, [source, style, onLoadStart, onLoadEnd, onLoad, onError]);

    return (
        <View style={style}>
            {imageComponent}
            {loading && (
                <SvgIcon
                    Svg={noimage}
                    style={{ ...style, position: 'absolute' }}
                    resizeMode={FastImage.resizeMode.contain}
                />
            )}
            {!loading && placeholderSource && (
                <FastImage
                    source={placeholderSource}
                    style={{ ...style, position: 'absolute' }}
                    resizeMode={FastImage.resizeMode.contain}
                />
            )}
        </View>
    );
};

export default StyledImage;
