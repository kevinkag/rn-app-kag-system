import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { colors } from "../../utils/colors";
import { formatNumber } from "../../utils/functions";

const SellTable = ({ form, reloadTable }) => {

    const [total, setTotal] = useState(null)

    useEffect(() => {
        console.log('cambio el form')
        setTotal(calculateTotalPrice(form))
    }, [reloadTable, form])



    return (
        <>
            <View style={styles.container}>
                <View style={styles.row}>
                    {
                        form &&
                        <><Text style={styles.label}>Total de la orden:</Text>
                            <Text style={styles.value}>{total && formatNumber(total)} COP</Text></>
                    }
                </View>
            </View>
        </>
    );
};

function calculateTotalPrice(array) {
    if (!Array.isArray(array) || array.length === 0) {
        return 0; // Si el array está vacío o no es válido, retornar 0
    }

    // Utilizar reduce para sumar los valores de sellingPrice de cada objeto en el array
    const totalPrice = array.reduce((accumulator, currentValue) => {
        // Multiplicar el precio de venta por las unidades y sumarlo al acumulador
        return accumulator + (currentValue.sellingPrice || 0) * currentValue.units;
    }, 0); // Inicializar el acumulador en 0

    return totalPrice; // Retornar el total calculado
}




const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: width * 0.024,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5,
    },
    label: {
        color: colors.fontDarkColor,
        fontSize: width * 0.03,
        flex: 1,
    },
    value: {
        color: colors.primaryColor,
        fontSize: width * 0.04,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    separator: {
        borderBottomColor: "black",
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: 5,
    },
});

export default SellTable;
