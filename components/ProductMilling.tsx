import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Product.module.css";
import { millingTableNew } from "../utils/constatnts";
import useOnClickOutside from "use-onclickoutside";
import { CartContext } from "./Context";
import  { type ProductType, type OrderType } from "../utils/sharedTypes";

interface categoryMilling {
  isShotCard: boolean;
  currentProduct?: ProductType | OrderType;
  // cartProduct?: OrderType;
  isCart?: boolean;
}

const Milling: React.FC<categoryMilling> = ({ isShotCard, currentProduct, isCart
}) => {
  const ref = React.useRef(null);
  const [isMillingListOpen, setIsMillingListOpen] = useState(false);
  const Context = React.useContext(CartContext);
  const currentFeatures = Context.currentProductFeatures;
  const updateMillingType = Context.updateMillingType;
  const updateMillingInCart = Context.updateMillingCart;
  const orderData = Context.orderData

  // const passMillingType = Context.getInitialMillligType;
  // const getMillingType = Context.currentMillingType;
  // useEffect(()=>{
  //   if (getMillingType.some(item => item.id === currentProduct._id)) {
  //     console.log('мы тут были?')
  //     return
  //   } else {
  //     console.log('вот тут мы не должны быть никогда')
  //     // if (currentProduct.cat_id === 1 || currentProduct.cat_id === 2) {        
  //     //   passMillingType(currentProduct._id, millingTableNew[0], currentProduct.promo);
  //     // } else {
  //     //   return
  //     // }
  //   }
  // },[getMillingType])

  const onMillingHandler = () => {
    setIsMillingListOpen(!isMillingListOpen);
  };

  const handleChoseMilling = (value: string): void => {
    if (isCart) {
      if ('milling' in currentProduct && currentProduct.milling  === value) {
        // console.log('помол не поменялся, ничего не делаем')
        setIsMillingListOpen(!isMillingListOpen);
        return
      } else {
        // console.log('сейчас установим в корзине новый помол ' + value);
        updateMillingInCart(currentProduct, value);
        setIsMillingListOpen(!isMillingListOpen);
      }
    } else {
      updateMillingType(currentProduct._id, value);
      // console.log('сейчас установим ' + value)
      setIsMillingListOpen(!isMillingListOpen);
    }
  };

  useOnClickOutside(ref, () => setIsMillingListOpen(false));

  // const bugHandler = () => {
  //   console.log(millingTableNew)
  // }

  return (
    <div className=
      {`${styles.product__extrasContainer} 
        ${isShotCard ? '' : styles.product__extrasContainer_fullCard}
        ${isCart ? styles.product__extrasContainer_cart : ''}`
      }
    >
    <div 
      className={`${styles.product__extraOptions} ${isCart ? styles.product__extraOptions_cart : ''}`}
      // ref={ref}
    >
      <p className={styles.product__millingTitle} >Помол:</p>
      <span
        className={`${styles.product__currentMill} ${isCart ? styles.product__currentMill_cart : ''}`}
        onClick={() => {
          onMillingHandler();
        }}
      >
        {isCart && (
          'milling' in currentProduct &&
          currentProduct.milling
          // orderData.some(item => item._id === currentProduct._id) 
          //   && (orderData.filter(item => item._id === currentProduct._id 
          //     && 'currentSize' in currentProduct 
          //       && item.currentSize === currentProduct.currentSize)[0].milling)  
        )}
        {/* {!isCart && 'millingType' in currentProduct && String(currentProduct.millingType)} */}
        {!isCart && (
          currentFeatures.some(item => item.itemId === currentProduct._id) && (currentFeatures.find(item => item.itemId === currentProduct._id).millingType)
        )}
      </span>
      <ul
        ref={ref}
        className={`${styles.product__millingList} 
          ${isMillingListOpen ? styles.product__millingList_opened : ""}
          ${isCart ? styles.product__millingList_cart : ''}
        `}
      >
        {millingTableNew.map((item, number) => {
          return (
            <li
              key={number}
              onClick={() => {
                handleChoseMilling(item);
              }}
              className={styles.product__millingType}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  </div>
    );
};

export default Milling;
