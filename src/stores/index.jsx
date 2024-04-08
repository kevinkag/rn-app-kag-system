import { create } from 'zustand';
import productStore from './prodcutStoreSlice/productStore';
import saleStore from './saleStoreSlice/saleStoreSlice';

const useStore = create(productStore);
const useSaleStore = create(saleStore)

export {
    useStore, useSaleStore
}
