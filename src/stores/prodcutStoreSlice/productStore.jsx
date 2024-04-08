import api from '../../utils/api';
import { deleteProductById, fetchAllProducts, insertProduct, updateProductById } from '../../services/apiProduct';
import Storage, { StorageKeys } from '../../utils/Storage';
import { getDataTypeFromField, sortArrayByFieldAndOrder, sortObjectsByUnitsAscending } from './productStoreFunctions';

const productStore = (set) => ({
    product: {},
    products: [],
    field: 'name',
    originalProducts: [],
    fetchProducts: async () => {
        try {
            const productsData = await fetchAllProducts()

            set((state) => ({
                products: productsData,
                originalProducts: productsData // Guardar una copia de los datos originales
            }));
            if (!productsData) {
                return
            }
            await Storage.saveData(StorageKeys.PRODUCT, JSON.stringify(productsData));
        } catch (error) {
            console.error('Error fetching products from API: ', error);
            try {
                const storedData = await Storage.getData(StorageKeys.PRODUCT);
                if (storedData) {
                    const parsedData = JSON.parse(storedData);
                    set((state) => ({
                        products: parsedData,
                        originalProducts: parsedData // Guardar una copia de los datos originales
                    }));
                }
            } catch (storageError) {
                console.error('Error fetching products from storage: ', storageError);
            }
        }
    },
    createProductAsync: async (data) => {
        try {
            const response = await insertProduct(data);

            set((prevState) => ({
                products: [...prevState.products, response.data]
            }));
        } catch (error) {
            console.error('Error creating product: ', error);
        }
    },
    deleteProductByIdAsync: async (id) => {
        try {
            await deleteProductById(id)
            set((prevState) => ({
                products: prevState.products.filter(product => product._id !== id)
            }));
        } catch (error) {
            console.error('Error creating product: ', error);
        }
    },
    updateProductByIdAsync: async (id, data) => {
        try {
            const response = await updateProductById(id, data)
            set((prevState) => ({
                products: prevState.products.map(product => product._id === id ? response.data : product)
            }));
        } catch (error) {

        }
    },
    searchProductByName: (name, field) => {
        if (!name) { // Verifica si name está vacío
            // Si name está vacío, restaura los datos originales en products
            set((state) => ({
                ...state,
                products: state.originalProducts
            }));
            return; // Salir de la función ya que no es necesario continuar
        }

        if (containsOnlyNumbers(name) && !field) {
            set((state) => ({
                ...state,
                products: state.originalProducts.filter((item) => item?.barcode?.code === name),
            }));

        } else if (containsLettersAndNumbers(name)) {
            if (containsLettersAndNumbers(name)) {

                const number = parseInt(name, 10);
                set((state) => ({
                    ...state,
                    products: sortObjectsByUnitsAscending(state.originalProducts),
                }));
                return
            }
            set((state) => ({
                ...state,
                products: state.originalProducts.filter((item) => item[field]?.toLowerCase().includes(name.toLowerCase())),
            }));
        } else {
            console.log("La cadena contiene otros caracteres además de letras y números.");
        }
    },
    setField: (field) => {
        set((state) => ({
            ...state,
            field: field
        }));
    },
    sortProducts: (field, orderBy) => {
        set((state) => ({
            ...state,
            products: sortArrayByFieldAndOrder(state.products, field, orderBy)
        }))
    },
});

const containsOnlyNumbers = (str) => {
    return /^\d+$/.test(str); // Verifica si la cadena contiene solo números
};

const containsLettersAndNumbers = (str) => {
    return /^[a-zA-Z0-9]+$/.test(str); // Verifica si la cadena contiene letras y números
};




export default productStore;
