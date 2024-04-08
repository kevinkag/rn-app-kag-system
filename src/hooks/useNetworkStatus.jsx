import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

const useNetworkStatus = () => {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        console.log('is connected: ', isConnected)

        // Al desmontar el componente, se detiene la escucha del estado de la conexión
        return () => {
            unsubscribe();
        };
    }, []);

    return isConnected;
};

export default useNetworkStatus;
