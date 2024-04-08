import api from '../utils/api'
import realm from '../realm'
import { createSaleOfflineRealm, createSaleRealm, setSalesToRealm } from '../realm/sales/salesService'
import Storage from '../utils/Storage'


export const SALE_CHANGE_KEY = "sale_change"


const makeSale = async (saleObject) => {
    try {
        const resp = await api.post('/sales/add-array', saleObject)
        createSaleRealm(resp.data?.products)
        return resp
    } catch (error) {
        createSaleOfflineRealm(saleObject[0]?.products)
        throw new Error(error)
    }
}

const makeSaleIfIsOffline = async (saleObject) => {
    try {
        const resp = await api.post('/sales/add-array', saleObject)
        createSaleRealm(resp.data?.products)
        return resp
    } catch (error) {
        throw new Error(error)
    }
}


const fetchAllCompletedSales = async () => {
    const response = { data: realm.objects('Sale') };
    try {

        const consult = (await api.get('/metadata')).data

        const lastModified = await consult.salesMetadata.lastModification
        const storageData = await Storage.getData(SALE_CHANGE_KEY)

        console.log('->>>>', storageData)
        if (!storageData) {
            await Storage.saveData(SALE_CHANGE_KEY, lastModified)
        } else {
            await Storage.updateData(SALE_CHANGE_KEY, lastModified)
        }

        if (storageData >= lastModified) {
            throw new Error('No hay sales disponibles');
            return
        }

        const resp = await api.get('/sales')
        await setSalesToRealm(resp.data)
        response.data = resp.data
    } catch (error) {
        throw new Error(error)
    }
    return response.data
}

const deleteSaleById = async (id) => {
    try {
        const deleted = await api.delete(`/sales/delete/${id}`)
        return deleted.data
    } catch (error) {
        throw new Error(error)
    }
}

export { makeSale, makeSaleIfIsOffline, fetchAllCompletedSales, deleteSaleById }