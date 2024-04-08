
export const ProductSaleSchema = {
    name: 'ProductSale',
    properties: {
        productId: 'string',
        units: 'int',
        totalAmount: 'double',
    },
};

export const SalesSchema = {
    name: 'Sale',
    properties: {
        _id: 'objectId', // Definición implícita de _id como clave primaria
        date: 'date',
        products: { type: 'list', objectType: 'ProductSale' },
    },
    primaryKey: '_id', // Definición explícita de _id como clave primaria

};

export const SalesOfflineSchema = {
    name: 'SaleOffline',
    properties: {
        _id: 'objectId', // Definición implícita de _id como clave primaria
        date: 'date',
        products: { type: 'list', objectType: 'ProductSale' },
    },
    primaryKey: '_id', // Definición explícita de _id como clave primaria
};


