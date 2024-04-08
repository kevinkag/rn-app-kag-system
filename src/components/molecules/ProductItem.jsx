import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, memo, useMemo } from 'react'
import SvgIcon from '../atoms/SvgIcon'
import { dollar, edit, more, noimage, trash, units } from '../../assets'
import { colors } from '../../utils/colors';
import { formatNumber } from '../../utils/functions';
import CustomAlert from '../atoms/CustomAlert';
import useStore from '../../stores';
import ModalEditProduct from '../organisms/ModalEditProduct';
import ModalBarcodeGenerator from '../organisms/modals/ModalBarcodeGenerator';
import StyledView from '../templates/StyledView';
import StyledImage from '../templates/StyledImage';

const MemoSvgIcon = memo(SvgIcon);
const MemoTouchableOpacity = memo(TouchableOpacity);

export default function ProductItem({
   item,
   onPress,
   selectedProduct,
   setmodalEditVisible,
   setAlertVisible,
   onCloseModalViewBarcodeuseCallback
}) {

   const backgroundColor = selectedProduct ? colors.primaryColor : 'white';
   const textColor = selectedProduct ? 'white' : colors.fontDarkColor;
   const itemWidth = selectedProduct ? width * 0.8 : null; // Define el ancho solo si está seleccionado

   const formattedCostPrice = useMemo(() => {
      return formatNumber(Number(item?.costPrice));
   }, [item?.costPrice]);

   const formattedSellingPrice = useMemo(() => {
      return formatNumber(Number(item?.sellingPrice));
   }, [item?.sellingPrice]);

   useEffect(() => {

   }, [item])



   return (
      <View style={styles.container}>
         <MemoTouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor, width: itemWidth }, styles.content]}>
            <StyledImage source={{ uri: item?.image }} style={styles.image} />
            <View style={styles.textContainer}>
               <StyledView row jc="space-between" ai="center">
                  <Text style={[styles.title, { color: textColor }, styles.name]}>{item?.name}</Text>
                  <StyledView row ai="center">
                     <MemoSvgIcon Svg={units} width={14} height={14} styles={{ color: textColor }} />
                     <Text style={[styles.title, { color: textColor, }, styles.units]}>{item?.units}</Text>
                  </StyledView>
               </StyledView>

               <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                  <MemoTouchableOpacity onPress={() => onCloseModalViewBarcodeuseCallback(true)}>
                     {
                        selectedProduct && <MemoSvgIcon Svg={more} width={28} height={28} styles={{ color: 'white' }} />
                     }
                  </MemoTouchableOpacity>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                     <MemoSvgIcon Svg={dollar} width={20} height={20} />
                     <View style={{ paddingHorizontal: 10, paddingVertical: 2, flexDirection: 'row', borderColor: '#f07a84', borderBottomWidth: 2, borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}>
                        <Text style={[styles.title, { color: textColor }, styles.price]}>{formattedCostPrice}</Text>
                     </View>
                     <View style={{ paddingHorizontal: 10, paddingVertical: 2, flexDirection: 'row', borderColor: '#9af07a', borderBottomWidth: 2, borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>

                        <Text style={[styles.title, { color: textColor }, styles.price]}>{formattedSellingPrice}</Text>
                     </View>
                  </View>
               </View>
            </View>


         </MemoTouchableOpacity>
         {
            selectedProduct && // Verificar si el elemento actual es el seleccionado
            <View style={styles.editContainer}>
               <MemoTouchableOpacity
                  onPress={() => setmodalEditVisible(true)}
                  style={{ alignSelf: 'center', marginBottom: height * 0.02 }}>
                  <MemoSvgIcon Svg={edit} width={24} height={24} />
               </MemoTouchableOpacity>
               <MemoTouchableOpacity
                  onPress={() => setAlertVisible(true)}
                  style={{ alignSelf: 'center' }}>
                  <MemoSvgIcon Svg={trash} width={24} height={24} />
               </MemoTouchableOpacity>
            </View>
         }
      </View>
   )
}


const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
   container: {
      flexDirection: 'row', display: 'flex', justifyContent: 'space-between'
   },
   content: {
      flex: 1,
      flexDirection: 'row',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      borderRadius: 10,
      marginBottom: height * 0.01
   },
   image: {
      width: width * 0.15,
      height: width * 0.15,
   },
   editContainer: {
      backgroundColor: 'white',
      justifyContent: 'center',
      borderRadius: 25,
      display: 'flex',
      width: width * 0.1,
      marginRight: width * 0.01,
      marginLeft: width * 0.03,
      marginBottom: height * 0.01


   },
   textContainer: {
      flex: 1,
      justifyContent: 'space-between',
      paddingLeft: width * 0.02,
   },
   name: {
      fontSize: 16,
      textTransform: 'capitalize',
      fontWeight: '600'
   },
   description: {
      fontSize: 12,
      color: 'gray'
   },
   price: {
      fontWeight: 'bold'
   },
   units: {
      marginLeft: 6,
      marginRight: 2,
      fontSize: 12,
      fontWeight: 'normal',
   }

})