import React, { useEffect, useState } from "react";
import styles from "../styles/Product.module.css";
import { type ProductType, type OrderType } from "../utils/sharedTypes";
import { CartContext } from "./Context";
import { showTime } from "../utils/constatnts";

interface sizeProps {
  product: ProductType;
  // discountPercent: number
  // weightToAdd: number;
  // onSizeClick: ((input: number)=> void); // ПЕРЕПИСАТЬ
}

const Size: React.FC<sizeProps> = ({ product }) => {
  const Context = React.useContext(CartContext);
  const currentFeatures = Context.currentProductFeatures;
  const updatePrice = Context.updatePriceType;
  const resetQuantity = Context.resetQuantity;
  const resetMilling = Context.resetMilling;
  // const currentSize = currentFeatures.find(item => item.itemId = product._id).currentSize;

  // const [currentSize, setCurrentSize] = useState<number>(0)
  
  // const testHandle = () => {
  //   console.log(currentFeatures)
  //   setCurrentSize(currentFeatures.find(item => item.itemId = product._id).currentSize)
  // }

  // useEffect(()=> {
  //   if (currentFeatures.some(item => item.itemId === product._id)) {
  //     console.log('here?')
  //     testHandle();
  //     // setCurrentSize(currentFeatures.find(item => item.itemId = product._id).currentSize)
  //   } else 
  //   return
  // }, [currentFeatures])

  const handleChoseSize = (value: number): void => {
    updatePrice(product._id, value);
    resetQuantity(product._id, false, value);
    resetMilling (product._id);
  };

  // console.log(currentSize)
  // const updateSize = Context.updateMillingType;
  // console.log(weightToAdd)

  // const oldPrice = (product.cat_id === 2 || product.cat_id === 2)

  const space = showTime ? '' : ' ' 

  const oldPrice = (newPrice, size) => {
    const cat10 = product.cat_id === 1 || product.cat_id === 4
    const isBig = size === 0 ? false : true
    const value = cat10 ? (newPrice / 0.9) : isBig ? (newPrice / 0.9) : (newPrice / 0.8)
  
    return Math.trunc(value);
}

  return (
    <form className={styles.product__priceContainer}>
          {product.price.map((item, number) => {
            // console.log(number)
            return (
              <label className={styles.product__priceLabel} key={number}>
                {product.price.length > 1 && (
                  <>
                    <input
                      type="radio"
                      name="priceOption"
                      className={styles.product__deliveryType_type_invisible}
                      // defaultChecked={number === 0}
                      checked={currentFeatures.some(item => item.itemId === product._id) && number === currentFeatures.find(item => item.itemId === product._id).currentSize}
                      // defaultChecked={true}
                      // checked={number === currentFeatures.find(item => item.itemId = product._id).currentSize}
                      onChange={() => {
                        // onSizeClick(number);
                        handleChoseSize(number);
                      }}
                    />
                    <span
                      className={styles.product__deliveryType_type_visible}
                    ></span>
                  </>
                )}
                <div className={styles.product__priceOptions}>
                  <p
                    className={`${styles.product__weight} ${
                      product.price.length === 1 ? styles.product__weight_choosed : ""}`}
                  >
                    {item.title}
                  </p>
                  {showTime && (
                    
                    <p
                      className={`${styles.product__price} 
                        ${product.price.length === 1 ? styles.product__price_choosed : ""}
                        ${styles.product__price_old} 
                        `}
                    >
                    {oldPrice(item.priceItem,number)}{space}&#8381;
                    {/* {item.priceItem / (1-discountPercent)}{space}&#8381; */}
                    </p>

                  )}
                  <p
                    className={`${styles.product__price} 
                    ${product.price.length === 1 ? styles.product__price_choosed : ""}
                    ${showTime ? styles.product__price_showTime : ''}
                    ${showTime && product.price.length === 1 ? styles.product__price_showTimeTrue : ''}
                    `}
                  >
                    {item.priceItem}{space}&#8381;
                  </p>
                  {/* {formatSumm(item.priceItem)} */}
                </div>
              </label>
            );
          })}
        </form>
    );
};

export default Size;
