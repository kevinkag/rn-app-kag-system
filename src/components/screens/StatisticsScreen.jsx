import { Dimensions, StyleSheet, View } from 'react-native';
import React, { useEffect, useMemo } from 'react';
import BaseTemplate from '../organisms/BaseTemplate';
import StyledText from '../templates/StyledText';
import StyledView from '../templates/StyledView';
import LinearGradient from 'react-native-linear-gradient';
import { useSaleStore, useStore } from '../../stores';
import { calcularGananciasHoy, calcularGananciasSemanaActual, calcularIngresosBrutosDia, calcularIngresosBrutosSemanaActual, calcularInventaryCost, calcularTotalVedido } from '../../utils/statistics';
import { colors } from '../../utils/colors';
import WeeklySalesChart from '../molecules/WeeklySalesChart';
import MonthlySalesChart from '../molecules/MonthlySalesChart';

export default function StatisticsScreen() {
    const { products } = useStore();
    const { salesState, fetchAllSales } = useSaleStore();

    useEffect(() => {
        fetchAllSales();
    }, []);

    const ingresos = useMemo(() => {
        if (!salesState || !products || salesState.length === 0 || products.length === 0) {
            return {};
        }

        return {
            brutos: calcularIngresosBrutosDia(salesState, products),
            brutosSemana: calcularIngresosBrutosSemanaActual(salesState, products),
            ganancias: calcularGananciasHoy(products, salesState),
            gananciasSemana: calcularGananciasSemanaActual(salesState, products)
        };
    }, [salesState, products]);

    const gananciasTotales = useMemo(() => {
        return calcularInventaryCost(products)
    }, [products])

    const weeklySalesData = [100, 200, 150, 300, 250, 400, 0];



    return (
        <BaseTemplate>
            {products && salesState && (
                <StyledView flex={1} ><StyledView style={styles.container}>
                    <LinearGradient colors={['#fecc96', '#f99496']} style={styles.item} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}>
                        <StyledText fs={12} style={styles.text}>ingreso neto hoy:</StyledText>
                        <StyledView row>
                            <StyledText style={styles.text} fs={20}>$ {ingresos?.ganancias.gananciasTotales}</StyledText>
                            <StyledText style={[styles.textShadow, { marginLeft: 4 }]} fs={12} fw={500} color={colors.pastelGreenColor}>{!isNaN(ingresos.ganancias.rentabilidadPromedio) && ingresos.ganancias.rentabilidadPromedio + '%'}</StyledText>
                        </StyledView>
                        <StyledText fs={12} style={styles.text}>total semana: $ {ingresos.gananciasSemana}</StyledText>
                    </LinearGradient>
                    <LinearGradient colors={['#3bf8ec', '#4ca8f9']} style={styles.item} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}>
                        <StyledText fs={12} style={styles.text}>ingreso bruto hoy:</StyledText>
                        <StyledText style={styles.text} fs={20}>$ {ingresos?.brutos}</StyledText>
                        <StyledText fs={12} style={styles.text}>total semana: $ {ingresos.brutosSemana}</StyledText>
                    </LinearGradient>


                    <LinearGradient colors={['#88fcbb', '#1bd093']} style={styles.item} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}>
                        <StyledText fs={12} style={styles.text}>costo del inventario:</StyledText>
                        <StyledText style={styles.text} fs={20}>$ {gananciasTotales?.cost}</StyledText>
                        <StyledText fs={12} style={styles.text}>ganancias: $ {gananciasTotales?.ganancias}</StyledText>

                    </LinearGradient>

                    <LinearGradient colors={['#fa8ff9', '#a38aff']} style={styles.item} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}>
                        <StyledText fs={12} style={styles.text}>ganancias totales:</StyledText>
                        <StyledText style={styles.text} fs={20}>$ {calcularTotalVedido(products).ganancias}</StyledText>
                        <StyledText fs={12} style={styles.text}>articulos vendidos: {calcularTotalVedido(products).articulos}</StyledText>

                    </LinearGradient>



                </StyledView>
                    <WeeklySalesChart data={weeklySalesData} />
                </StyledView>

            )}
        </BaseTemplate>
    );
}


const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 0,
    },
    item: {
        width: width * 0.46, // Ajusta el ancho para dos columnas
        height: height * 0.11, // Altura fija para cada celda
        backgroundColor: 'lightgray',
        marginBottom: 10,
        justifyContent: 'space-between',
        padding: width * 0.02,
        elevation: 4,
        borderRadius: 8,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.3)', // Color de la sombra
        textShadowOffset: { width: 2, height: 2 }, // Desplazamiento de la sombra
        textShadowRadius: 5, // Radio de la sombra
    },
    textShadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.3)', // Color de la sombra
        textShadowOffset: { width: 2, height: 2 }, // Desplazamiento de la sombra
        textShadowRadius: 5, // Radio de la sombra
    }
});
