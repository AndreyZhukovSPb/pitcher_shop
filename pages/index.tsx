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
  

  useEffect(()=> {
    if (ProductList.length < 1 ) {
      // console.log('иницииурем продакт лист')
      passInitialProducts(data);
    } else {
      // console.log('НЕ иницииурем продакт лист')
    }
  }, [data])

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

