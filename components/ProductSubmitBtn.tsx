import React, { useEffect, useState } from "react";
import styles from "../styles/Product.module.css";
import { CartContext } from "./Context";
import { ProductType } from "../utils/sharedTypes";
import { cartIdHandler } from "../utils/cartIdHandler";

interface SubmitBtnProps {
  currentProduct: ProductType;
  isFullCard?: boolean;
}

const SubmitBtn: React.FC<SubmitBtnProps> = ({ currentProduct, isFullCard
}) => {
  const Context = React.useContext(CartContext);
  const currentFeatures = Context.currentProductFeatures;
  const currentCart = Context.orderData;
  const addToCart = Context.addToOrder;
  const updateCart = Context.updateProductQuantityInCart;
  // const [isSpanVisible, setIsSpanVisible] = useState(false);
  const resetMilling = Context.resetMilling;
  const resetPriceType = Context.resetPriceType;
  const resetQuantity = Context.resetQuantity;
  const [itemsInCart, setItemsInCart] = useState<number>(0);
  const [existInCart, setExistInCart] = useState<boolean>(false);

  // useEffect(()=>{
  //   if (!currentCart.some(item => item._id === currentProduct._id)) {
  //     return
  //   } else {
  //     setItemsInCart(currentCart
  //       .filter(item => item._id === currentProduct._id)
  //         .reduce((total, item) => total + item.quantity, 0))
  //   }
  // }, [currentCart])

  useEffect(() => {
  if (currentFeatures.length === 0 || currentCart.length === 0) {
    setExistInCart(false);
    return;
  } else if ((!currentCart.some(item => item._id === currentProduct._id))) {
    setExistInCart(false);
    return;
  } else {
    const productWithSize = currentFeatures.find(item => item.itemId === currentProduct._id)
    const productBaseId = `${productWithSize.itemId}_${productWithSize.currentSize}`; 
    const filteredItems = currentCart.filter(item => {
      const [id, size] = item.cartId.split('_');
      const itemBaseId = `${id}_${size}`;
      return itemBaseId === productBaseId; // сравниваем без milling
  });
    if (filteredItems.length === 0) {
      setExistInCart(false);
    } else {
      setExistInCart(true)  
    }
    const totalQuantity = filteredItems.reduce((total, item) => total + item.quantity, 0);
    setItemsInCart(totalQuantity);
  }
  
}, [currentCart, currentFeatures]);

  const handleSubmit = () => {
    const productWithFeatures = currentFeatures.find(item => item.itemId === currentProduct._id)
    const idForCart = cartIdHandler(productWithFeatures.itemId, productWithFeatures.currentSize, productWithFeatures.millingType)
    if (currentCart.some(item => item.cartId === idForCart)) {
      updateCart(currentProduct._id, idForCart);
      resetProductFeatures();
    } else {
      addToCartHandler();
    }
    // currentCart.some(item => item.cartId === idForCart) && currentCart.filter(item => item._id === currentProduct._id)
    //   .find(item => 
    //     item.currentSize === currentFeatures.find(item => item.itemId === currentProduct._id).currentSize 
    //     &&
    //     item.milling &&
    //     item.milling === currentFeatures.find(item => item.itemId === currentProduct._id).millingType
    //     )
    //     ? 
    //       (updateCart(currentProduct._id),
    //       resetProductFeatures())
    //     : 
    //       addToCartHandler();
  };

  const resetProductFeatures = () => {
    resetQuantity(currentProduct._id, true);
    if (currentProduct.cat_id === 2 || currentProduct.cat_id === 3) {
      resetMilling(currentProduct._id); 
    }
    // что оставляем? пока оставляем только размер
    // resetPriceType(currentProduct._id);
  }

  const addToCartHandler =  () => {
    // setIsSpanVisible(!isSpanVisible);
    addToCart(currentProduct);
    // console.log(currentProduct)
    resetProductFeatures();
  }

//   useEffect (()=> {
//     currentCart.some(item => item.id === currentProduct._id) ? 
//     setIsSpanVisible(true) :
//     setIsSpanVisible(false)
// }, [currentCart])
  
  return (
    <>
    <div className={`${styles.product__spanContainer} ${isFullCard ? styles.product__spanContainer_fullCard : '' }`}>
      {currentCart.some(item => item._id === currentProduct._id) && 
        (
          <span
            className={`${styles.product__added} ${
            styles.product__added_visible
          } `}
        >
          {/* {currentCart.some(item => item._id === currentProduct._id) && ( */}
          {existInCart && (
            // `В корзине ${currentCart.some(item => item.id === currentProduct._id) && (currentCart.find(item => item.id === currentProduct._id).quantity)} шт `
            `В корзине ${itemsInCart} шт `
            
          )}
        </span>
        ) 
      }
      </div> 

      <button className={`${styles.product__button} ${isFullCard ? styles.product__button_fullCard : '' }`} onClick={handleSubmit}>
        добавить в корзину
      </button>
    </>
    
    );
};

export default SubmitBtn;
