import React, { useState } from "react";
import styles from "../styles/Product.module.css";
import { CartContext } from "./Context";
import { type ProductType, type OrderType } from "../utils/sharedTypes";

interface counterProps {
  currentProduct: ProductType | OrderType;
  isCart?: boolean
}

const Counter: React.FC<counterProps> = ({ currentProduct, isCart
}) => {
  const Context = React.useContext(CartContext);
  const currentFeatures = Context.currentProductFeatures;
  const updateQuantity = Context.updateQuantity;
  const updateQuantutyInCart = Context.updateQuantutyInCart;
  const orderData = Context.orderData;

  const handleChangeQuantity = (input: any) => { // CHANGE
    if (!isCart) {
      updateQuantity(currentProduct._id, input.id);
    } else {
    // } else if (isCart && 'quantity' in currentProduct && 'milling' in currentProduct && 'currentSize' in currentProduct){
      updateQuantutyInCart(currentProduct as OrderType, input.id);
      // updateQuantutyInCart(currentProduct, input.id);
    // } else {
    //   console.log('debug')
    }

    // if ('quantity' in currentProduct && 'milling' in currentProduct && 'currentSizets' in currentProduct) {
      // currentProduct является OrderType
    
  }
  // const handleChangeQuantity = (input: any): void => {
  //   // ПЕРЕПИСАТЬ
  //   if (input.id === "minus") {
  //     if (itemsToAdd === 1) {
  //       return;
  //     } else {
  //       setItemsToAdd(itemsToAdd - 1);
  //       passItemsToAdd(itemsToAdd - 1);
  //     }
  //   } else if (input.id === "plus") {
  //     setItemsToAdd(itemsToAdd + 1);
  //     passItemsToAdd(itemsToAdd + 1);
  //   }
  // };
  
  return (
    <div className={styles.product__counterContainer}>
    <p className={`${styles.product__extra} ${isCart ? styles.product__extra_cart : ''}`}>количество</p>
    <div className={`${styles.product__counterBox} ${isCart ? styles.product__counterBox_cart : ''}`}>
      <span
        id="minus"
        className={`${styles.product__counterButton} ${styles.product__counterButton_type_minus} ${isCart ? styles.product__counterButton_cart : ''}`}
        onClick={(event) => {
          handleChangeQuantity(event.target);
        }}
      ></span>
      <p
        className={`${styles.product__extra} ${styles.product__counter} ${isCart ? styles.product__counter_cart : ''}`}
      >
        {!isCart && (currentFeatures.some(item => item.itemId === currentProduct._id) && 
          (currentFeatures.find(item => item.itemId === currentProduct._id)
            .price[currentFeatures.find(item => item.itemId === currentProduct._id).currentSize].quantity))
        }
        {isCart && (
          currentProduct.quantity
          // orderData.some(item => item._id === currentProduct._id) && 
          // (orderData.filter(item => item._id === currentProduct._id 
          //   && 'currentSize' in currentProduct 
          //     && item.currentSize === currentProduct.currentSize)[0].price.quantity)  
          )
        }
      </p>
      <span
        id="plus"
        className={`${styles.product__counterButton} ${styles.product__counterButton_type_plus} ${isCart ? styles.product__counterButton_cart : ''}`}
        onClick={(event) => {
          handleChangeQuantity(event.target);
        }}
      ></span>
    </div>
  </div>
    );
};

export default Counter;
