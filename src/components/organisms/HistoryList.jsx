import { Button, Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import StyledView from '../templates/StyledView'
import StyledText from '../templates/StyledText'
import { formatDateToString } from '../../utils/functions'
import HistoryItem from '../molecules/HistoryItem'
import { useSaleStore, useStore } from '../../stores'
import ShimmerEffectHistorial from '../atoms/ShimmerEffects/ShimmerEffectHistorial'
import ButtonApp from '../atoms/ButtonApp'
import SvgIcon from '../atoms/SvgIcon'
import { back, next } from '../../assets'
import { colors } from '../../utils/colors'

export default function HistoryList({ salesState, loading }) {

    const { products } = useStore()
    const { fetchAllSales } = useSaleStore()


    const [isRefreshing, setIsRefreshing] = useState(false);
    const [pagination, setPagination] = useState({ start: 0, end: 14 });

    useEffect(() => {
        // Esta función se ejecuta cuando se necesita cargar más datos
        // Suscribir el manejador de carga a `onEndReached` del FlatList
        return () => {
            setIsRefreshing(false)
            // Limpia la suscripción cuando el componente se desmonta
        };
    }, [isRefreshing]);

    const onRefresh = async () => {
        await fetchAllSales()
    }

    const sortedSalesState = [...salesState].sort((a, b) => new Date(b.date) - new Date(a.date));

    const handlePaginationNext = () => {
        const newPagination = {
            start: pagination.end,
            end: pagination.end + 14 // Incrementar el valor de 'end' en 4 para obtener el próximo conjunto de elementos
        };
        setPagination(newPagination);
    };


    const handlePaginationPrev = () => {
        const newPagination = {
            start: pagination.start - 14,
            end: pagination.end - 14 // Incrementar el valor de 'end' en 4 para obtener el próximo conjunto de elementos
        };
        setPagination(newPagination);
    };



    return (
        loading ? <>
            <ShimmerEffectHistorial />
            <StyledView mt={0.01} />
            <ShimmerEffectHistorial /></>
            : (
                <><FlatList
                    data={sortedSalesState.slice(pagination.start, pagination.end)}
                    renderItem={({ item }) => <HistoryItem item={item} products={products} />}
                    keyExtractor={(item) => item._id}
                    refreshing={isRefreshing}
                    onRefresh={onRefresh} // Indica que la carga ha terminado
                />
                    <StyledView row jc={'center'} mb={1} mt={1} ai='center'>
                        <ButtonApp onPress={handlePaginationPrev} disabled={pagination.start === 0} style={{ backgroundColor: colors.blueGrayColor }} text={<SvgIcon Svg={back} width={24} height={24} style={{ color: 'white' }} />} />
                        <StyledText style={styles.textPagination}>{Math.floor(pagination.end / 14)}/{Math.floor(sortedSalesState.length / 14) > 0 ? Math.ceil(sortedSalesState.length / 14) : 1}</StyledText>
                        <ButtonApp onPress={handlePaginationNext} disabled={pagination.end >= sortedSalesState.length} style={{ backgroundColor: colors.blueGrayColor }} text={<SvgIcon Svg={next} width={24} height={24} style={{ color: 'white' }} />} />
                    </StyledView>
                </>
            )
    )
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
    textPagination: {
        fontSize: 20,
        color: colors.blueGrayColor,
        padding: width * 0.02,
        fontWeight: '500',
        textShadowColor: 'rgba(189, 189, 189, 0.6)', // Color de la sombra
        textShadowOffset: { width: 2, height: 2 }, // Desplazamiento de la sombra
        textShadowRadius: 5, // Radio de la sombra
    }
})