import { useEffect, useRef } from 'react';
import Sound from 'react-native-sound';

export default function useSoundPlayer(soundName) {
    const soundRef = useRef(null);

    useEffect(() => {
        soundRef.current = new Sound(soundName, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('Error al cargar el sonido', error);
            }
        });

        return () => {
            if (soundRef.current) {
                soundRef.current.release();
            }
        };
    }, [soundName]);

    const playSound = () => {
        if (soundRef.current) {
            soundRef.current.play((success) => {
                if (success) {
                    console.log('Sonido reproducido con éxito');
                } else {
                    console.log('Error al reproducir el sonido');
                }
            });
        }
    };

    return playSound;
}
