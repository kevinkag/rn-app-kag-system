import Storage from "../utils/Storage";
import api from "../utils/api";

export const PRODUCT_CHANGE_KEY = "product_change"

const fetchAllProducts = async (req, res) => {
    try {
        const consult = (await api.get('/metadata')).data


        const lastModified = await consult.productsMetadata.lastModification
        const storageData = await Storage.getData(PRODUCT_CHANGE_KEY)

        if (!storageData) {
            await Storage.saveData(PRODUCT_CHANGE_KEY, lastModified)
        } else {
            await Storage.updateData(PRODUCT_CHANGE_KEY, lastModified)
        }

        if (storageData >= lastModified) {
            throw new Error('No hay datos nuevos disponibles');
            return
        }

        const response = await api.get('/product')
        return response.data
    } catch (error) {
        throw error
    }
}

const insertProduct = async (datos) => {
    try {
        const response = await api.post('/product/add', datos);
        return response;
    } catch (error) {
        // Si ocurre un error, maneja el error de acuerdo a tus necesidades
        console.error('Error al insertar datos en la API:', error);
        // Devuelve un valor nulo o lanza el error para que sea manejado por quien llame a esta función
        throw error;
    }
};

const deleteProductById = async (id) => {
    try {
        const response = await api.delete(`/product/delete/${id}`);
        return response;
    } catch (error) {
        console.error('Error al insertar datos en la API:', error);
        throw error
    }
}

const updateProductById = async (id, data) => {
    try {
        const response = await api.put(`/product/edit/${id}`, data);
        return response;
    } catch (error) {
        console.error('Error al insertar datos en la API:', error);
        throw error
    }
}

export { insertProduct, deleteProductById, updateProductById, fetchAllProducts };
