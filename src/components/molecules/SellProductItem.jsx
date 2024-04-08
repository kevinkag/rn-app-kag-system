import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../utils/colors';
import SvgIcon from '../atoms/SvgIcon';
import { dollar, edit, total, trash, units } from '../../assets';
import StyledView from '../templates/StyledView';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import StyledText from '../templates/StyledText';
import { formatNumber } from '../../utils/functions';

export default function SellProductItem({ onPress, item, onDelete }) {
    const [showAdditionalView, setShowAdditionalView] = useState(true);

    useEffect(() => {

    }, [item])


    const handleDeleteItem = () => {
        onDelete(item)
        setShowAdditionalView(false); // Oculta la vista adicional después de eliminar
    };

    const renderRightActions = () => (
        <>
            <TouchableOpacity style={styles.additionalView} onPress={handleDeleteItem}>
                <SvgIcon Svg={trash} width={22} height={22} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.additionalView} onPress={() => onPress(item)}>
                <SvgIcon Svg={edit} width={22} height={22} />
            </TouchableOpacity>
        </>
    );

    return (
        <>
            <Swipeable renderRightActions={renderRightActions}
                onSwipeableWillOpen={() => setShowAdditionalView(false)}
                onSwipeableWillClose={() => setShowAdditionalView(true)}>
                <TouchableOpacity style={[styles.container, !showAdditionalView && { flexDirection: 'row-reverse' }]} onPress={() => onPress(item)}>
                    <Text style={styles.name}>{item?.name}</Text>

                    <StyledView row w={52} >
                        <StyledView row ai="center">
                            <SvgIcon Svg={dollar} width={16} height={16} styles={{ color: colors.primaryColor }} />
                            <Text style={styles.price}>{formatNumber(item?.sellingPrice)}</Text>
                        </StyledView>
                        <StyledView me={3} />
                        <StyledView row mr={1} ai="center" >
                            <SvgIcon Svg={units} width={16} height={16} styles={{ color: colors.primaryColor }} />
                            <Text style={styles.quantity}>{item?.units}</Text>
                            <StyledView me={2} ai='center'/>
                            <SvgIcon Svg={total} width={16} height={16} style={{ color: colors.blueGrayColor }} />
                            <Text style={styles.quantity}>{formatNumber(item?.units * item?.sellingPrice)}</Text>
                        </StyledView>
                    </StyledView>
                </TouchableOpacity>
            </Swipeable></>
    )
}



const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 7,
        paddingVertical: 7,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    editContainer: {

    },
    name: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 5,
        color: 'gray',
        textTransform: 'capitalize',
        maxWidth: width * 0.43
    },
    price: {
        fontSize: 14,
        color: 'gray',
        fontWeight: '500'
    },
    quantity: {
        fontSize: 14,
        color: 'gray',
        fontWeight: '500',
        marginLeft: 6
    },
    additionalView: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.1,
        borderBottomWidth: 1,
        borderLeftWidth: 0.5,
        borderColor: '#ccc',
    },
});
