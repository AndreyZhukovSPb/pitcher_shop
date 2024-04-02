import Main from "../components/Main";
// import Footer from "../components/Footer";
import { baseURL } from "../utils/constatnts";
import { ProductsContext, CartContext } from "../components/Context";
import React, { useEffect } from "react";
// import { changeArrayForCart } from "../utils/dataTranformers";

const Index = ({ data }) => {
  const ContextProduct = React.useContext(ProductsContext);
  const passInitialProducts = ContextProduct.getInitialProducts;
  const ProductList = ContextProduct.productsData;

  useEffect(()=> {
    if (ProductList.length < 2 ) {
      passInitialProducts(data);
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

