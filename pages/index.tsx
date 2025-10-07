import Main from "../components/Main";
// import Footer from "../components/Footer";
import { baseURL } from "../utils/constatnts";
import { ProductsContext, CartContext } from "../components/Context";
import React, { useEffect } from "react";
// import useCheckStorage from '../utils/checkStorage'
// import { changeArrayForCart } from "../utils/dataTranformers";

const Index = ({ data }) => {
  const ContextProduct = React.useContext(ProductsContext);
  const passInitialProducts = ContextProduct.getInitialProducts;
  const ProductList = ContextProduct.productsData;
  const ContextCart = React.useContext(CartContext);
  const currentProductFeatures = ContextCart.currentProductFeatures;
  // const setCartFromStorage = ContextCart.setOrderFromStorage;
  // const addToCart = ContextCart.addToOrder;
  // const [isCartSet, setIsCartSet] = React.useState(false)

  // useEffect(()=> {
  //   console.log(currentProductFeatures)
  // },[currentProductFeatures])

  useEffect(()=> {
    if (ProductList.length < 1 ) {
      console.log('иницииурем продакт лист')
      passInitialProducts(data);
    } else {
      console.log('НЕ иницииурем продакт лист')
    }
  }, [data])

  // useCheckStorage();

  // useEffect(()=>{
  //   if (isCartSet) {
  //     console.log('корзина УЖЕ установлена из LS, не устанавливаем повторно')
  //     return
  //   } else {
  //     if (currentProductFeatures.length > 0) {
  //       useCheckStorage();
  //       setIsCartSet(true)
  //       // if (localStorage.getItem('orderData') !== null) {
  //       //   console.log(`Элемент с ключом orderData существует в localStorage`);
  //       //   // const cartFromStorageString = localStorage.getItem('orderData');
  //       //   // const cartFromStorageArray = JSON.parse(cartFromStorageString);
  //       //   // setCartFromStorage(cartFromStorageArray);
  //       //   setIsCartSet(true)
  //       // } else {
  //       //   console.log(`Элемент с ключом orderData не существует в localStorage`);
  //       //   return
  //       // }
  //     }
  //   }
  // },[currentProductFeatures])

  return (
      <Main
        data = {data}
      />
  );
};

export default Index;

export async function getServerSideProps() {
  
  try {    
    const res = await fetch(baseURL);
    const data = await res.json();
    // console.log(data)
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.log(error)
    throw error;
  }
}

