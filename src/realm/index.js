// realm.js
import Realm from 'realm';
import { SalesSchema, ProductSaleSchema, SalesOfflineSchema } from './sales/salesSchema';

const realm = new Realm({
    schema: [
        SalesSchema,
        SalesOfflineSchema,
        ProductSaleSchema,
    
    ]
});

export default realm;
