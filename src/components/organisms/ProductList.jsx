import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { useStore } from '../../stores';
import ProductItem from '../molecules/ProductItem';
import CustomAlert from '../atoms/CustomAlert';
import ModalEditProduct from './ModalEditProduct';
import ModalBarcodeGenerator from './modals/ModalBarcodeGenerator';
import SkeletonScreen from '../atoms/SkeletonScreen';
import { colors } from '../../utils/colors';
import ShimmerEffect from '../atoms/ShimmerEffect';
import StyledView from '../templates/StyledView';

const MemoCustomAlert = React.memo(CustomAlert);
const MemoModalBarcodeGenerator = React.memo(ModalBarcodeGenerator);

const ProductList = () => {
     const { deleteProductByIdAsync, fetchProducts, products } = useStore();

     const [selectedId, setSelectedId] = useState(null);
     const [productState, setProductState] = useState(null);
     const [alertVisible, setAlertVisible] = useState(false);
     const [modalEditVisible, setmodalEditVisible] = useState(false);
     const [isVisibleModalViewBarcode, setIsVisibleModalViewBarcode] = useState(false);
     const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga de datos
     const [isRefreshing, setIsRefreshing] = useState(false);


     useEffect(() => {
          loadData()
     }, []);

     const loadData = async () => {
          await fetchProducts()
               .then(() => setIsLoading(false)) // Cuando los datos se cargan completamente, establecer isLoading en false
               .catch((error) => console.error('Error fetching products:', error));
     }

     const onCloseEditModal = () => {
          setProductState({})
          setmodalEditVisible(false)
     };

     const onOpenEditModal = (product) => {
          setProductState(product)
          setmodalEditVisible(true)
     }

     const onCloseModalViewBarcodeuseCallback = (isVisible) => setIsVisibleModalViewBarcode(isVisible);

     const handlePress = (itemId, product) => {
          setProductState(product);
          // console.log('do you press on: ', product)
          setSelectedId(itemId);
     };

     const handleYes = (id) => {
          deleteProductByIdAsync(id);
          setAlertVisible(false);
     };

     const onRefresh = async () => {
          setIsRefreshing(true);
          // Lógica para cargar o actualizar datos
          await loadData(); // Aquí puedes llamar a tu función para cargar los datos
          setIsRefreshing(false);
     };


     const handleNo = () => setAlertVisible(false);

     return (
          <>
               {isLoading && (
                    // Mostrar un componente de carga mientras se cargan los datos
                    <>
                         <ShimmerEffect />
                         <StyledView mt={2} />
                         <ShimmerEffect /></>

               )}
               {!isLoading && (
                    // Mostrar la lista de productos cuando los datos se hayan cargado completamente
                    <FlatList
                         style={{ zIndex: -1 }}
                         data={products}
                         renderItem={({ item }) => (
                              <ProductItem
                                   item={item}
                                   onPress={() => handlePress(item?._id, item)}
                                   selectedProduct={item?._id === selectedId}
                                   setmodalEditVisible={() => onOpenEditModal(item)}
                                   setAlertVisible={setAlertVisible}
                                   onCloseModalViewBarcodeuseCallback={onCloseModalViewBarcodeuseCallback}
                              />
                         )}
                          refreshControl={
                              <RefreshControl
                                   tintColor={colors.primaryColor}
                                   progressBackgroundColor={colors.backgroundColor}
                                   style={{ color: 'red' }}
                                   colors={[colors.primaryColor, 'gray', '#ff0']} // Colores del loader para diferentes estados
                                   refreshing={isRefreshing}
                                   onRefresh={onRefresh}
                              />}
                         keyExtractor={(item) => item?._id}
                    />
               )}
               {productState && (
                    <>
                         <MemoCustomAlert
                              visible={alertVisible}
                              message={`Estás seguro que deseas eliminar "${productState?.name}"?`}
                              onNo={() => handleNo(selectedId)}
                              onYes={() => handleYes(selectedId)}
                         />
                         <ModalEditProduct
                              visible={modalEditVisible}
                              product={productState}
                              onClose={onCloseEditModal} />
                         <MemoModalBarcodeGenerator
                              isVisible={isVisibleModalViewBarcode}
                              setIsVisible={setIsVisibleModalViewBarcode}
                              barcode={productState?.barcode}
                         />
                    </>
               )}
          </>
     );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
     loadingContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
     },
});

export default ProductList;
