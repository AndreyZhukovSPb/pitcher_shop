import React, { useEffect, useState } from "react";
import styles from "../styles/Product.module.css";
import { CartContext } from "./Context";
import { ProductType } from "../utils/sharedTypes";

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
  const updateCart = Context.updateProductQuantity;
  // const [isSpanVisible, setIsSpanVisible] = useState(false);
  const resetMilling = Context.resetMilling;
  const resetPriceType = Context.resetPriceType;
  const resetQuantity = Context.resetQuantity;
  const [itemsInCart, setItemsInCart] = useState<number>(0);

  useEffect(()=>{
    if (!currentCart.some(item => item._id === currentProduct._id)) {
      return
    } else {
      setItemsInCart(currentCart
        .filter(item => item._id === currentProduct._id)
          .reduce((total, item) => total + item.price.quantity, 0))
    }
  }, [currentCart])

  const handleSubmit = () => {
    // const delta = (currentFeatures.find(item => item.itemId === currentProduct._id).quantity)
    currentCart.some(item => item._id === currentProduct._id) 
    && 
    // currentCart.find(item => item.id === currentProduct._id).currentSize === 
    // currentFeatures.find(item => item.itemId === currentProduct._id).currentSize
    currentCart.filter(item => item._id === currentProduct._id)
      .find(item => item.currentSize === currentFeatures.find(item => item.itemId === currentProduct._id).currentSize) 
    ? 
      (updateCart(currentProduct._id),
        resetProductFeatures())
      : 
      addToCartHandler();
  };

  const resetProductFeatures = () => {
    resetMilling(currentProduct._id);
    resetPriceType(currentProduct._id);
    resetQuantity(currentProduct._id, true);
  }

  const addToCartHandler =  () => {
    // setIsSpanVisible(!isSpanVisible);
    addToCart(currentProduct);
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
          {currentCart.some(item => item._id === currentProduct._id) && (
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
