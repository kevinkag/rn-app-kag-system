import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import StyledView from '../templates/StyledView'
import StyledText from '../templates/StyledText'
import { formatDatePart, formatDateToString, formatTime, formatYear } from '../../utils/functions'
import { colors } from '../../utils/colors'
import SvgIcon from '../atoms/SvgIcon'
import { dollar, qr, units } from '../../assets'

export default function HistoryItem({ item, products }) {



    useEffect(() => {

    }, [products])



    const [showProducts, setShowProducts] = useState(false)
    const [renderProducts, setRenderProducts] = useState(null)
    const [dataActiveItem, setdataActiveItem] = useState(null)

    const handleShowProducts = () => {
        if (showProducts) {
            setShowProducts(false)
            setdataActiveItem(false)
            return
        }

        setdataActiveItem(addNameToProducts(item, products))
        setShowProducts(true)
    }
    const totalAmount = item.products.reduce((total, product) => total + product.totalAmount, 0);



    return (
        <TouchableOpacity onPress={handleShowProducts} style={[styles.itemContainer, showProducts && styles.itemContainerActive]}>
            <StyledView row jc='space-between' ai='center'>
                <StyledView row ai='center'>
                    <SvgIcon Svg={units} width={20} height={20} />
                    <StyledText style={styles.rightItem} fs={14} fw={500} color={'gray'}>
                      $ {totalAmount}
                    </StyledText>

                </StyledView>

                <StyledView row ai='center'>
                    <StyledView ai='center'>
                        <StyledText fs={10}>
                            {formatDatePart(item?.date)}/
                            {formatYear(item?.date)}
                        </StyledText>
                        <StyledText fw={500} color={colors.primaryColor} fs={10}>
                            {formatTime(item?.date)}
                        </StyledText>
                    </StyledView>

                    {showProducts && <StyledView ml={2}>
                        <TouchableOpacity onPress={() => console.log('xd')}>
                            <SvgIcon Svg={qr} width={28} height={28} style={{ color: colors.blueGrayColor }} />
                        </TouchableOpacity>
                    </StyledView>}
                </StyledView>
            </StyledView>

            {showProducts && dataActiveItem && (
                <>
                    <StyledView mt={1} />
                    {dataActiveItem.products.map((product, key) => (
                        <StyledView key={key} row jc='space-between' style={styles.itemActiveItem}>
                            <StyledView row>
                                <StyledText color='gray' fs={12} fw={500} style={{ textTransform: 'capitalize' }}>
                                    {product?.units}
                                </StyledText>
                                <StyledView ml={2} />
                                <StyledText color='gray' fs={12} fw={500} style={{ textTransform: 'capitalize' }}>
                                    {product?.name}
                                </StyledText>
                            </StyledView>
                            <StyledView>
                                <StyledText color='gray' fs={12} fw={500} >{product?.totalAmount}</StyledText>
                            </StyledView>
                        </StyledView>
                    ))}
                </>
            )}

        </TouchableOpacity>
    )
}

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: 'white',
        paddingHorizontal: width * 0.02,
        paddingVertical: height * 0.0077,
        borderRadius: 10,
        borderBottomWidth: 1,
        borderColor: colors.blueGrayColor,
    },
    itemContainerActive: {
        borderColor: colors.primaryColor,
        elevation: 3,

    },
    rightItem: {
        marginLeft: width * 0.03,
        paddingLeft: width * 0.03,
        borderLeftWidth: 2,
        borderColor: colors.primaryColor
    },
    itemActiveItem: {

        backgroundColor: colors.backgroundColor,
        padding: 4,
        paddingHorizontal: 10,
        borderRadius: 2,
        borderBottomWidth: 0.5,
        borderColor: 'gray'
    }
})

function addNameToProducts(saleItem, memoizedProducts) {
    return {
        ...saleItem, // Mantener todas las propiedades originales de saleItem
        products: saleItem.products.map(product => {
            // Encontrar el producto correspondiente en memoizedProducts por productId
            const matchingProduct = memoizedProducts.find(p => p._id === product.productId);
            // Si se encuentra el producto correspondiente, agregar su nombre al objeto del producto
            if (matchingProduct) {
                return {
                    ...product, // Mantener todas las propiedades originales del producto
                    name: matchingProduct.name // Agregar el campo "name" con el nombre del producto
                };
            }
            // Si no se encuentra el producto correspondiente, devolver el producto original
            return product;
        })
    };
}