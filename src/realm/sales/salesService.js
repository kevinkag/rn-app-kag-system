import realm from '../index'; // Importa la instancia de Realm configurada
import Realm from 'realm'
// Función para obtener todas las ventas
export const getAllSalesRealm = () => {
    const allSales = realm.objects('Sale'); // Consulta todas las ventas de la base de datos local
    return allSales; // Devuelve el resultado de la consulta
};

export const createSaleRealm = (products) => {
    try {
        realm.write(() => {
            const newSale = {
                _id: new Realm.BSON.ObjectId(),
                date: new Date(),
                products: products,
            };
            realm.create('Sale', newSale);
        });
        console.log('Venta creada en realm Sale');
    } catch (error) {
        throw new Error(error)
    }
};

export const createSaleOfflineRealm = (products) => {
    try {
        realm.write(() => {
            const newSale = {
                _id: new Realm.BSON.ObjectId(),
                date: new Date(),
                products: products,
            };
            realm.create('SaleOffline', newSale);
        });
    } catch (error) {
        throw new Error(error)
    }
}

export const deleteSaleOfflineRealm = async () => {
    try {
   
        realm.write(() => {
            const allOSales = realm.objects('SaleOffline');
            realm.delete(allOSales);
        });

        console.log('Todos los datos de la colección han sido eliminados.');
    } catch (error) {
        console.error('Error al eliminar los datos:', error);
    }
}


export const setSalesToRealm = async (data) => {
    try {
        // Inicia una transacción de escritura
        realm.write(() => {
            // Borra todos los objetos en la tabla 'Sale'
            const allSales = realm.objects('Sale');
            realm.delete(allSales);
            // Inserta cada venta en la base de datos
            data.forEach(sell => {
                realm.create('Sale', {
                    ...sell,
                    _id: new Realm.BSON.ObjectId(),
                });
            });
        });

        console.log('Ventas insertadas correctamente.');
    } catch (error) {
        console.error('Error al insertar las ventas:', error);
    }
}

