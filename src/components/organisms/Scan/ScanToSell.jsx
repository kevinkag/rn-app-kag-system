import React, { useEffect, useRef, useState } from "react";
import { Button, Dimensions, Image, Modal, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RNCamera } from "react-native-camera";
import Toast from "react-native-toast-message";
import SvgIcon from "../../atoms/SvgIcon";
import { dollar, down, flashlight, test, toBackScan, units, up } from "../../../assets";
import { useStore } from "../../../stores";
import StyledView from "../../templates/StyledView";
import StyledText from "../../templates/StyledText";
import { colors } from "../../../utils/colors";
import ButtonApp from "../../atoms/ButtonApp";
import StyledImage from "../../templates/StyledImage";
import OverlayScan from "../../atoms/OverlayScan";
import useSoundPlayer from "../../../hooks/SoundPlayer";
import { formatNumber } from "../../../utils/functions";

const ScanToSell = ({ visible, setVisible, setResult, products, onClose, setReloadTable, form }) => {

    const { searchProductByName, originalProducts } = useStore()

    const playSound = useSoundPlayer('soundadd')

    const scannedRef = useRef(false);


    const [flashEnabled, setFlashEnabled] = useState(false);

    const [itemScanned, setitemScanned] = useState(null)
    const [isScanned, setIsScanned] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [codeBar, setcodeBar] = useState('')

    const [itemState, setitemState] = useState(null)
    const [quantity, setQuantity] = useState(1);

    const handleBarcodeScanned = (data) => {
        const barcode = data.barcodes[0] 

        if (!isScanned) {

            if (!barcode) {
                return
            }
            const filteredData = originalProducts.find((product) => product?.barcode?.code === barcode?.data)

            if (filteredData?.barcode?.code === codeBar?.data) {
                return
            }

            if (filteredData) {
                
                setcodeBar(barcode)
                setTimeout(() => {
                    Toast.show({
                        type: 'info',
                        text1: 'Escaneo exitoso',
                        text2: `Se ha encontrado registrado: ${filteredData?.name}`,
                        visibilityTime: 3000,
                    });
                    setitemScanned({
                        productId: filteredData?._id,
                        name: filteredData.name,
                        units: 1,
                        maxUnits: filteredData.units,
                        costPrice: filteredData.sellingPrice,
                        image: filteredData.image
                    })
                    setitemState({
                        name: filteredData.name,
                        productId: filteredData._id,
                        units: quantity,
                        sellingPrice: filteredData.sellingPrice,
                    })
                }, 100);
                setIsLoading(true)
            }
        }
    }

    useEffect(() => {
        if (isScanned) {
            setIsScanned(false)
        }
    }, [codeBar, form]);

    const submitStateToForm = async () => {
        setResult((prevForm) => {
            const newItem = itemState

            let array = prevForm || []
            //Check if the name or productId of the new object already exists in the array
            const index = array.findIndex(item => item.productId === newItem.productId);
            // If the object already exists in the array
            if (index !== -1) {
                array[index].units += quantity;
            } else {
                array.push({ ...newItem, units: quantity });
            }

            playSound()
            return array
        })
        setReloadTable(prevState => !prevState)
        setQuantity(1)
        setitemScanned(null)
        setitemState(null)
        setcodeBar('')
        setIsLoading(false)
    }
    // const resetScanner = () => {
    //     setQuantity(1)
    // };

    const onCancel = () => {
        setitemState(null)
        setitemScanned(null)
        setcodeBar('')
        setIsLoading(false)
        setQuantity(1)
        setReloadTable(prevState => !prevState)
    }

    const toggleFlash = () => {
        setFlashEnabled(!flashEnabled);
    };

    const goBack = () => {
        setIsLoading(false)
        onCancel()
        onClose()
    }

    const increaseQuantity = () => {
        let units = 0
        if (form) {
            const products = originalProducts.find(product => product._id === itemScanned.productId)
            const findUnits = form.find((item) => item?.productId === products?._id)
            units = findUnits?.units
        }
        const newQuantity = quantity + 1;
        let maxUnits = itemScanned.maxUnits

        units ? maxUnits = maxUnits - units : maxUnits

        if (newQuantity <= maxUnits) {
            setQuantity(newQuantity);
        }
    };
    const decreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };


    const calculateAmountAccordingToTheForm = (maxUnits) => {
        let unitsAvailable
        if (form) {
            const products = originalProducts.find(product => product._id === itemScanned.productId)
            const findUnits = form.find((item) => item?.productId === products?._id)
            unitsAvailable = maxUnits - findUnits?.units
        } else {
            unitsAvailable = maxUnits
        }
        return unitsAvailable || maxUnits
    }

    return (
        <><Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={goBack}
        >
            <View style={styles.container}>
                <RNCamera
                    style={styles.camera}
                    captureAudio={false}
                    autoFocus={true}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    onGoogleVisionBarcodesDetected={handleBarcodeScanned}
                    googleVisionBarcodeMode={RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeMode.ALTERNATE}
                    flashMode={flashEnabled ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off} />

                <View style={styles.barcodeOverlay}>
                    <OverlayScan isScanned={isLoading} />
                </View>

                <StyledView jc={'space-between'} style={[styles.borders, styles.bordersTop]}>
                    <StyledView row jc={"space-between"} pt={2} pl={2} pr={2} ai='center'>
                        <TouchableOpacity onPress={goBack}>
                            <SvgIcon Svg={toBackScan} width={40} height={40} style={{ color: 'white' }} />
                        </TouchableOpacity>
                        <Text style={styles.text}>
                            Escanear código de barras
                        </Text>
                        <TouchableOpacity style={styles.flashlight} onPress={toggleFlash}>
                            <SvgIcon Svg={flashlight} width={40} height={40} />
                        </TouchableOpacity>
                    </StyledView>

                    {
                        itemScanned && (
                            <><StyledText color="white" style={{ marginLeft: width * 0.01, }}>Articulo escaneado correctamente.</StyledText>
                                <ButtonApp
                                    onPress={onCancel}
                                    text="Volver a escanear" style={{ borderRadius: 0 }} /></>
                        )
                    }


                </StyledView>


                {itemScanned && (<StyledView w={100} h={20} jc="space-between" style={[styles.borders, styles.editItemScanned]}>
                    <StyledView row mt={1} jc={'space-between'}>

                        <StyledView row>
                            <StyledView ml={2} mr={2} mt={1.5} >
                                <StyledImage source={{ uri: itemScanned?.image }} style={{ width: 40, height: 40 }} />

                            </StyledView>

                            <StyledView ml={2}>
                                <StyledView row ai={'center'}>
                                    <StyledText textAlign={'left'} fs={18} fw='500' color={'white'} style={{ textTransform: 'capitalize' }}>{`${itemScanned?.name}`}</StyledText>
                                    <StyledView mr={4} />
                                    <SvgIcon Svg={units} width={14} height={14} style={{ color: 'white', }} />
                                    <StyledText fw={'bold'} color={'white'} style={{ marginLeft: 4, marginTop: -10, }}>{calculateAmountAccordingToTheForm(itemScanned?.maxUnits)}</StyledText>
                                </StyledView>

                                <StyledView mt={1} row>
                                    {/* <SvgIcon Svg={dollar} width={28} height={28} /> */}
                                    <StyledText textAlign={'left'} fs={18} fw='500' color={'white'}>$ {formatNumber(itemScanned?.costPrice * quantity)}</StyledText>
                                </StyledView>

                            </StyledView>


                        </StyledView>

                        <StyledView row mr={2}>
                            <TextInput
                                style={styles.input}
                                value={quantity.toString()}
                                onChangeText={(text) => {
                                    const newValue = parseInt(text) || 0; // Parsea el texto a un número entero, si no es válido, devuelve 0
                                    if (newValue <= itemScanned?.units) { // Verifica si el nuevo valor no excede el límite
                                        setQuantity(newValue); // Establece el nuevo valor en el estado
                                    }
                                }}
                                keyboardType="numeric"
                            />
                            <StyledView style={{}}>
                                <TouchableOpacity onPress={increaseQuantity} style={styles.button}>
                                    <SvgIcon Svg={up} width={40} height={40} style={{ color: 'white' }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={decreaseQuantity} style={styles.button}>
                                    <SvgIcon Svg={down} width={40} height={40} style={{ color: 'white' }} />
                                </TouchableOpacity>
                            </StyledView>
                        </StyledView>
                    </StyledView>

                    <StyledView row style={{}}>
                        <ButtonApp text="Terminar"
                            onPress={goBack}
                            textStyle={styles.textStyleEditI}
                            style={[styles.buttonEditItemSelected,
                            { backgroundColor: colors.pastelRedColor }]}
                        />
                        <ButtonApp text="Aceptar y terminar"
                            onPress={async () => {
                                await submitStateToForm()
                                goBack()

                            }}
                            textStyle={styles.textStyleEditI}
                            style={[styles.buttonEditItemSelected,
                            { backgroundColor: '#87d4f5' }]}
                        />
                        <ButtonApp text="Agregar"
                            onPress={submitStateToForm}
                            textStyle={styles.textStyleEditI}
                            style={styles.buttonEditItemSelected} />
                    </StyledView>
                </StyledView>)}
            </View>
        </Modal>
        </>
    )
}

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rbga(0,0,0,0.5)',
    },
    editItemScanned: {
        bottom: 0,
        padding: 0,
        paddingTop: 4,
        justifyContent: 'space-between',
        alignItems: null,
    },
    buttonEditItemSelected: {
        flex: 1,
        borderRadius: 0,
        height: height * 0.08,
        backgroundColor: colors.pastelGreenColor
    },
    textStyleEditI: {
        fontSize: 18,
    },
    camera: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    barcodeOverlay: {
        flex: 1,
        position: 'absolute',
        left: width * 0.075,
        zIndex: 10,
    },
    borders: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: height * 0.2,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    bordersTop: {
        top: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    headerScan: {
        flex: 1,
        top: 0
    },

    flashlight: {
        backgroundColor: 'rgba(0,0,0,0)',
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        paddingTop: height * 0.02,
        paddingBottom: height * 0.02
    },
    input: {
        fontSize: 55,
        borderRadius: 5,
        padding: 8,
        marginHorizontal: 10,
        textAlign: 'center',
        marginTop: -height * 0.01,
        color: 'white'
    },
    button: {
        backgroundColor: colors.blueGrayColor,
        padding: 0,
        marginBottom: 8,
        borderRadius: 5,
        elevation: 4
    },

});

export default ScanToSell;
