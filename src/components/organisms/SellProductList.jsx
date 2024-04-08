import { Alert, Dimensions, FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { useSaleStore, useStore } from '../../stores';
import SellProductItem from '../molecules/SellProductItem';
import AddToSell from '../molecules/AddToSell';
import ModalAddProduct from './ModalAddProduct';
import ModalEditSellManuality from './modals/ModalEditSellManuality';
import SellTable from '../molecules/SellTable';
import StyledText from '../templates/StyledText';
import Scan from '../atoms/Scan';
import CodeBarButton from '../atoms/CodeBarButton';
import DoubleButtons from '../atoms/DoubleButtons';
import ScanToSell from './Scan/ScanToSell';
import { colors } from '../../utils/colors';
import ModalConfirmation from './ModalConfirmation';
import StyledView from '../templates/StyledView';
import Loader from '../atoms/Loader';
import LoaderFull from '../atoms/LoaderFull';

export default function SellProductList({ form, setForm }) {

    const { originalProducts: products } = useStore(); // Obtén la función fetchProducts del store de Zustand
    const { makeSaleAsync } = useSaleStore();

    const [modalEditForm, setModalEditForm] = useState(false)
    const [itemToEdit, setItemToEdit] = useState(null)
    const [scanVisible, setScanVisible] = useState(false)

    const [reloadTable, setReloadTable] = useState(false)

    const [productsComponenteState, setProductsComponenteState] = useState(null)



    if (scanVisible) {
        StatusBar.setBarStyle('light-content');
        StatusBar.setBackgroundColor('rgba(0,0,0,0.8)'); //
    } else {
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor(colors.backgroundColor); //
    }

    useEffect(() => {
        if (form) {
            const filteredProducts = products.filter(product => {
                // Verificar si el productId del producto está presente en form
                return !form.some(item => item.productId === product._id);
            });

            // Establecer el estado con los productos filtrados
            setProductsComponenteState(filteredProducts);
        } else {
            setProductsComponenteState(products);

        }
        // Filtrar los productos que no están presentes en el estado form

        return () => {
            // Limpiar el estado al desmontar el componente
            setProductsComponenteState(null);

        }

    }, [products, form]);



    const renderItem = ({ item }) => {
        return (
            <SellProductItem
                item={item}
                onDelete={onDeleteItem}
                onPress={openEditForm}//1 de aqui obtengo el item de la lista {name, units, etc}
            />
        );
    };


    const onMakeSale = async () => {

        if (!form || form.length === 0) {
            return; // Si el formulario está vacío, no hacer nada
        }
        // Crear un nuevo objeto con la estructura deseada
        const sale = {
            date: new Date(),
            products: form.map(item => ({
                productId: item.productId,
                units: item.units,
                totalAmount: item.units * item.sellingPrice
            }))
        };
        // Llamar a la función para realizar la venta con el nuevo objeto de venta
        try {
            await makeSaleAsync(sale);
        } catch (error) {
            throw new Error(error)
        }
        setForm(null)
    };


    const onDeleteItem = (item) => {
        const deletedItem = form.filter(objeto => objeto !== item);
        setForm(deletedItem)
    }

    const openEditForm = (item) => {//2 llega el item de -1
        setModalEditForm(true)
        setItemToEdit(item) //3 almacenamos en estado el item de la lista a actualizar
    }

    const editForm = (itemToUpdate) => {
        setModalEditForm(false)
        const editedForm = form.map(item => {
            if (item.productId === itemToUpdate.productId) {
                return { ...item, units: itemToUpdate.units };
            } else {
                return item;
            }
        });
        setForm(editedForm)
    }

    const onClose = () => {
        setModalEditForm(false)
        setScanVisible(false)
    }

    const onPressButtons = (value) => {
        let data = { title: null, description: null }
        let action

        if (value === 'done') {
            data = { title: 'Venta realizada', description: 'Confirmar para continuar' }
            action = onMakeSale
        } else {
            data = { title: 'Cancelar venta', description: '¿Desea cancelar la venta?' }
            action = () => setForm(null)
        }
        ConfirmationAlert(
            data.title,
            data.description,
            action
        )
    }

    return (
            <>
                <AddToSell setForm={setForm} products={productsComponenteState} form={form} />

                <StyledView h={57}>
                    {!form && <StyledText textAlign="center" color="gray">Crear factura</StyledText>}
                    <FlatList
                        data={form}
                        renderItem={renderItem}
                        style={styles.containerList} />
                </StyledView>
                {form && (<SellTable form={form} reloadTable={reloadTable} />)}

                <CodeBarButton form={form} setForm={setForm} setScannerVisible={setScanVisible} />

                {form && <DoubleButtons onPressOne={onPressButtons} />}

                <ModalEditSellManuality
                    visible={modalEditForm}
                    closeModal={onClose}
                    onSubmit={editForm}
                    form={form}
                    itemToEdit={itemToEdit}
                />
                <ScanToSell visible={scanVisible}
                    setResult={setForm}
                    setReloadTable={setReloadTable}
                    form={form}
                    setVisible={setScanVisible}
                    onClose={onClose} />
            </>
    );
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
    containerList: {
        maxHeight: height * 0.57

    }
});


const ConfirmationAlert = (title, description, action) => {
    Alert.alert(
        title,
        description,
        [
            {
                text: 'Aceptar',
                onPress: () => {
                    action();
                    Toast.show({
                        type: 'info',
                        text1: title,
                        visibilityTime: 3000,
                    });
                }
            },
        ],
        { cancelable: true }
    );
}

