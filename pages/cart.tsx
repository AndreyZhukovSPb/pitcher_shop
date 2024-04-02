import styles from "../styles/Cart.module.css";
import { CartContext } from "../components/Context";
// import Category from "./Category";
// import { filterCats } from "../utils/dataTranformers";
import { type OrderType } from '../utils/sharedTypes';
import SectionLine from "../components/SectionLine";
import CartItem from "../components/CartItem";
import CartContacts from "../components/CartContacts";

import React, { useEffect, useState } from "react";
import { Input } from "@mui/material";

interface cartProps {
} // DEL?

const Cart: React.FC<cartProps> = ({  }) => {
  const Context = React.useContext(CartContext);
  const orderData = Context.orderData;
  const [currentAmount, setCurentAmount] = React.useState<number>(0);
  const [deliveryType, setDeliveryType] = React.useState<string>('');
  const [deliveryPoint, setDeliveryPoint] = React.useState<string>('Парк');
  const [isDeliveryChosen, setIsDeliveryChosen] = React.useState<boolean>(false);

  const handleChooseDelivery = (value: string) => {
    setDeliveryType(value);
    setIsDeliveryChosen(true);
  }

  const handleChoosePoint = (value: string) => {
    setDeliveryPoint(value);
  }

  useEffect((    
  ) => {
    setCurentAmount(orderData.reduce((acc, item) => {
      return acc + item.price.priceItem * item.price.quantity;
    }, 0));

  }, [orderData])

  console.log(currentAmount)

  return (
    <section className={styles.cart}>
    {/* <SectionLine/> */}
      <h2 className={styles.cart__title}>Корзина</h2>
      {orderData.length === 0 && (
        <p className={styles.cart__subTitle}>Ваша корзина пуста</p>
      )}
      <ul className={styles.cart__list}>
        {orderData.map((product, number) =>{
          return (
            <CartItem
              key={number}
              item={product}
            />
          )
        })}
      </ul>
      <form className={styles.cart__deliveryContainer}>
        <h2 className={styles.cart__title}>Получение</h2>
        <label className={styles.cart__label}>
          <input
            type="radio"
            name="deliveryOption"
            // id='1'
            className={styles.cart__deliveryType_type_invisible}
            // defaultChecked={number === 0}
            // checked={currentFeatures.some(item => item.itemId === product._id) && number === currentFeatures.find(item => item.itemId === product._id).currentSize}
            // defaultChecked={true}
            // checked={number === currentFeatures.find(item => item.itemId = product._id).currentSize}
            // onChange={() => {
            //   // onSizeClick(number);
            //   handleChoseSize(number);
            // }}
            onClick={() => handleChooseDelivery('Самовывоз')}
          />
          <span className={styles.cart__deliveryType_type_visible}></span>
          <p className={styles.cart__deliveryName}>Самовывоз из кофейни</p>
        </label>
        <label className={styles.cart__label}>
          <input
            type="radio"
            name="deliveryOption"
            // id='2'
            className={styles.cart__deliveryType_type_invisible}
            onClick={() => handleChooseDelivery('Курьер')}
          />
          <span className={styles.cart__deliveryType_type_visible}></span>
          <p className={styles.cart__deliveryName}>Доставка по Санкт-Петербургу</p>
        </label>
        <label className={styles.cart__label}>
          <input
            type="radio"
            name="deliveryOption"
            // id='3'
            className={styles.cart__deliveryType_type_invisible}
            onClick={() => handleChooseDelivery('Доставка по РФ')}
          />
          <span className={styles.cart__deliveryType_type_visible}></span>
          <p className={styles.cart__deliveryName}>Доставка в другое место</p>
        </label>
      </form>
      {deliveryType === 'Самовывоз' && (
        <form className={styles.cart__deliveryContainer}>
          <h2 className={styles.cart__title}>Выбрите кофейню</h2>
          <label className={styles.cart__label}>
            <input
              type="radio"
              name="deliveryOption"
              defaultChecked={true}
              // id='2'
              className={styles.cart__deliveryType_type_invisible}
              onClick={() => handleChoosePoint('Парк')}
            />
            <span className={styles.cart__deliveryType_type_visible}></span>
            <p className={styles.cart__deliveryName}>Бассейная 12</p>
          </label>
          <label className={styles.cart__label}>
            <input
              type="radio"
              name="deliveryOption"
              // id='3'
              className={styles.cart__deliveryType_type_invisible}
              onClick={() => handleChoosePoint('Маяк')}
            />
            <span className={styles.cart__deliveryType_type_visible}></span>
            <p className={styles.cart__deliveryName}>Марата 2</p>
          </label>
        </form>
      )}
      {deliveryType === 'Курьер'}
      {deliveryType === 'Доставка по РФ'}
      {isDeliveryChosen && (
        // <>
        <CartContacts
          isDelivery={true}
        />
      )}
    </section>
    
  );
};

export default Cart;
