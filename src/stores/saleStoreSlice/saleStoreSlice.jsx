import { deleteSaleById, fetchAllCompletedSales, makeSale, makeSaleIfIsOffline } from "../../services/apiSales";
import realm from "../../realm"; // Importa la instancia de Realm
import Realm from "realm";
import { createSaleOfflineRealm, createSaleRealm, deleteSaleOfflineRealm, setSalesToRealm } from "../../realm/sales/salesService";

const saleStore = (set, get) => ({
    salesState: [],
    salesOffline: [],
    error: null,
    loading: true,
    makeSaleAsync: async (data) => {
        try {
            await makeSale([data]);
            set((state) => ({
                salesState: state.salesState.length === 0 ? [data] : [...state.salesState, data],
                loading: false,
            }));
        } catch (error) {
            set((state) => ({
                salesOffline: state.salesOffline.length === 0 ? [data] : [...state.salesOffline, data],
                loading: false,
            }));
            return
        }
    },
    makeSaleFromSaleOffline: async () => {
        try {
            const data = realm.objects('SaleOffline');
            if (data.length === 0) {
                return;
            }

            await makeSaleIfIsOffline(data);

            await deleteSaleOfflineRealm()
            set({
                salesOffline: [],
                loading: false,
            });
        } catch (error) {
            set({ loading: false, error: error });
            throw new Error(error)
        }
    },
    fetchAllSales: async () => {
        const localSales = realm.objects('Sale');
        const soffline = realm.objects('SaleOffline')
        try {
            set({ loading: true });
            const res = await fetchAllCompletedSales(); // Obtiene las ventas del servidor
            set({
                salesState: res,
                loading: false,
            });
        } catch (error) {
            set({
                salesState: localSales,
                salesOffline: soffline,
                loading: false,
                error: error,
            });
        }
    },
    fetchAllSalesOffline: () => {
        try {
            set({ loading: true });
            const sales = realm.objects('SaleOffline')
            set({
                salesOffline: sales,
                loading: false,
            });
        } catch (error) {
            set({
                loading: false,
                error: error,
            });
        }
    },
    deleteSale: async (id) => {
        try {
            set({ loading: true });
            await deleteSaleById(id);
            realm.write(() => {
                const saleToDelete = realm.objectForPrimaryKey('Sale', id);
                realm.delete(saleToDelete); // Elimina la venta de la base de datos local de Realm
            });
            set((prevState) => ({
                loading: false,
                salesState: prevState.salesState.filter(sale => sale._id !== id)
            }));
        } catch (error) {
            set({ loading: false, error: error });
            throw new Error(error);
        }
    },
});

export default saleStore;
