import React, { useEffect, useState } from 'react'
import BaseTemplate from '../organisms/BaseTemplate';
import FloatingActionButton from '../atoms/FloatingActionButton';
import ProductList from '../organisms/ProductList';
import SearchBar from '../molecules/SearchBar';
import ModalAddProduct from '../organisms/ModalAddProduct';



export default function HomeScreen({ route }) {


  const [isModalFormVisible, setModalFormVisibility] = useState(false)

  useEffect(() => {
    if (isModalFormVisible) {
      setModalFormVisibility(false)
    }
  }, [])

  return (
    <><BaseTemplate>
      <SearchBar />
      <ProductList />
      <FloatingActionButton onPress={() => setModalFormVisibility(true)} />
    </BaseTemplate>
      <ModalAddProduct visible={isModalFormVisible} onClose={() => setModalFormVisibility(false)} />
    </>
  )
}