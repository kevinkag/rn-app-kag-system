import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import SvgIcon from './SvgIcon';
import { check } from '../../assets';
import { colors } from '../../utils/colors';
import StyledView from '../templates/StyledView';
import Sound from 'react-native-sound';

const Loader = ({ isScanned }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isCheck, setIsCheck] = useState(false);
    const soundRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsCheck(true);
            setIsLoading(false);
        }, 100);

        return () => clearTimeout(timer);
    }, [isScanned]);

    useEffect(() => {
        // Load sound
        soundRef.current = new Sound('beep.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.error('Error al cargar el sonido', error);
            }
        });

        return () => {
            if (soundRef.current) {
                soundRef.current.release();
            }
        };
    }, []);

    const playScanSound = useCallback(() => {
        if (soundRef.current) {
            soundRef.current.play((success) => {
                if (!success) {
                    console.log('Error al reproducir el sonido');
                }
            });
        }
    }, []);

    const { width } = Dimensions.get('window');

    useEffect(() => {
        if (isCheck) {
            playScanSound();
        }
    }, [isCheck, playScanSound]);

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size='large' color={'white'} />
            ) : (
                <StyledView style={{ position: 'absolute' }}>
                    <SvgIcon Svg={check} width={width * 0.26} height={width * 0.26} style={{ color: colors.pastelGreenColor }} />
                </StyledView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default React.memo(Loader);
