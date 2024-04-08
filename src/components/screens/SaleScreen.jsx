import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BaseTemplate from '../organisms/BaseTemplate'
import CodeBarButton from '../atoms/CodeBarButton'
import SellProductList from '../organisms/SellProductList'
import DoubleButtons from '../atoms/DoubleButtons'
import AddToSell from '../molecules/AddToSell'
import ModalConfirmation from '../organisms/ModalConfirmation'
import BarcodeScanner from '../atoms/BarcodeScanner'
import { useStore } from '../../stores'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function SaleScreen() {

  const { originalProducts } = useStore()

  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState(null)


  useEffect(() => {

  }, [originalProducts])


  const modalConfirmation = () => {
    setModalVisible(!modalVisible);
  };


  return (
    <><BaseTemplate>
      <SellProductList form={form} setForm={setForm} />
    </BaseTemplate>
      {/*     
      <ModalConfirmation
        visible={modalVisible}
        setResponse={setResponseConfirmation}
        setModalVisible header="Cancelar venta"
        onClose={() => setModalVisible(false)}
      >
        <Text style={{ color: 'gray' }}>Estás seguro en cancelar la venta?</Text>
      </ModalConfirmation> */}
    </>
  )
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  bottomContainer: {
    backgroundColor: 'white',
    height: height * 0.2
  },

})