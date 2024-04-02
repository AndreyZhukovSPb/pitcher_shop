import React, { useEffect, useState } from "react";
import styles from "../styles/Product.module.css";
import { type ProductType, type OrderType } from "../utils/sharedTypes";
import { CartContext } from "./Context";

interface sizeProps {
  product: ProductType;
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
                      product.price.length === 1
                        ? styles.product__weight_choosed
                        : ""
                    }`}
                  >
                    {item.title}
                  </p>
                  <p
                    className={`${styles.product__price} ${
                      product.price.length === 1
                        ? styles.product__price_choosed
                        : ""
                    }`}
                  >
                    {item.priceItem} &#8381;
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
