import { useEffect } from 'react';
import { useSaleStore } from '../stores';
import realm from '../realm';
import NetInfo from "@react-native-community/netinfo";
import useNetworkStatus from './useNetworkStatus';

const usePendingRequests = () => {
    const { makeSaleFromSaleOffline } = useSaleStore();
    const isConnected = useNetworkStatus()

    useEffect(() => {
        const processMakeSalesPending = async () => {
            if (isConnected) {
                await makeSaleFromSaleOffline();
            }
        };
        processMakeSalesPending();
    }, [isConnected, makeSaleFromSaleOffline]);

    return null;
};

export default usePendingRequests;
