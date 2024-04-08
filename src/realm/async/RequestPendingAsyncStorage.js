import AsyncStorage from '@react-native-async-storage/async-storage';

const savePendingRequest = async (operation, collection, id, data) => {
    try {
        // Obtiene las solicitudes pendientes actuales del AsyncStorage
        const currentRequests = await AsyncStorage.getItem('pendingRequests');
        let pendingRequests = currentRequests ? JSON.parse(currentRequests) : [];

        // Agrega la nueva solicitud a las pendientes
        pendingRequests.push({ operation, collection, id, data });

        // Guarda las solicitudes pendientes actualizadas en el AsyncStorage
        await AsyncStorage.setItem('pendingRequests', JSON.stringify(pendingRequests));
        console.log('se ha guardado:', pendingRequests)
    } catch (error) {
        console.error('Error saving pending request:', error);
        throw error;
    }
};

const getPendingRequests = async () => {
    try {
        // Obtiene las solicitudes pendientes del AsyncStorage
        const pendingRequests = await AsyncStorage.getItem('pendingRequests');
        console.log('se obtuvo', pendingRequests)
        return pendingRequests ? JSON.parse(pendingRequests) : [];
    } catch (error) {
        console.error('Error getting pending requests:', error);
        throw error;
    }
};

const clearPendingRequests = async () => {
    try {
        // Elimina las solicitudes pendientes del AsyncStorage
        await AsyncStorage.removeItem('pendingRequests');
        console.log('se limpiaron datos de pending')
    } catch (error) {
        console.error('Error clearing pending requests:', error);
        throw error;
    }
};

export { savePendingRequest, getPendingRequests, clearPendingRequests };


