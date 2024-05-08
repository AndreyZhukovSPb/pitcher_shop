import styles from "../styles/Cart.module.css";
import { CartContext } from "../components/Context";
// import Category from "./Category";
// import { filterCats } from "../utils/dataTranformers";
import { type OrderType } from '../utils/sharedTypes';
import SectionLine from "../components/SectionLine";
import CartItem from "../components/CartItem";
import CartContacts from "../components/CartContacts";
import { getWordForCart } from "../utils/dataTranformers";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";

interface cartProps {
} // DEL?

const Cart: React.FC<cartProps> = ({  }) => {
  const Context = React.useContext(CartContext);
  const orderData = Context.orderData;
  const resetCart = Context.resetCart;
  const router = useRouter();
  const [currentAmount, setCurentAmount] = React.useState<number>(0);
  const [currentTotal, setCurentTotal] = React.useState<number>(0);
  const [deliveryPrice, setDeliveryPrice] = React.useState<number>(0);
  const [deliveryType, setDeliveryType] = React.useState<string>('');
  const [deliveryPoint, setDeliveryPoint] = React.useState<string>('Парк');
  const [isDeliveryChosen, setIsDeliveryChosen] = React.useState<boolean>(false);
  const [isDelivery, setIsDelivery] = React.useState<boolean>(false);
  const [isContactsValid, setIsContactsValid] = React.useState<boolean>(false);
  const [contactsErrors, setContactsErrors] = React.useState<string[]>([]);
  const [isReadyToPay, setIsReadyToPay] = React.useState<boolean>(false);
  const [showContactsErr, setShowContactsErr] = React.useState<boolean>(false);

  useEffect(() => {
    if (deliveryType !== 'Самовывоз') {
      setIsDelivery(true)
    } else {
      setIsDelivery(false)
    }
  }, [deliveryType])

  const handleChooseDelivery = (value: string) => {
    setDeliveryType(value);
    setIsDeliveryChosen(true);
    console.log('rok?')
  }

  const handleChoosePoint = (value: string) => {
    setDeliveryPoint(value);
  }

  useEffect((    
  ) => {
    setCurentAmount(orderData.reduce((acc, item) => {
      return acc + item.price.quantity;
    }, 0));
    setCurentTotal(orderData.reduce((acc, item) => {
      return acc + item.price.priceItem * item.price.quantity;
    }, 0));
    // setDeliveryPrice(currentTotal >= 1800 ? 0 : 400)
  }, [orderData])

  useEffect(() => {
    if (deliveryType === 'Курьер') {
      setDeliveryPrice(currentTotal >= 1800 ? 0 : 400)
    } else {
      setDeliveryPrice(0)  
    }
  }, [currentTotal, deliveryType])

  const handleContactsErrors = (isValid: boolean, errors: string[]) => {
    setIsContactsValid(isValid);
    setContactsErrors(errors);
  }

  const resetOrder = () => {
    resetCart();
    setIsReadyToPay(false);
    setDeliveryType('');
    setDeliveryPoint('');
    setIsDeliveryChosen(false);
  }
  
  const handleCustomerData = (contacts: { [key: string]: string }) => {
    console.log(`данные покупателя`);
    console.log(contacts);
    console.log(`заказ`);
    console.log(orderData);
    console.log(deliveryPoint)
    resetOrder();
  }

  const handleSubmit = () => {
    if (isContactsValid) {
      setIsReadyToPay(true);
      setShowContactsErr(false);
      // console.log(customerData);
    } else {
      setIsReadyToPay(false);
      setShowContactsErr(true);
    }
  }

  const handleDeliveryClick = () => {
    router.push(`/delivery`);
    console.log("пойдем в условия доставки");
  };

  return (
    <>
    <section className={styles.cart}>
    {/* <SectionLine/> */}
      <h2 className={styles.cart__title} >Корзина</h2>
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
      {orderData.length >= 1 && (
        <>
        <form className={styles.cart__deliveryContainer}>
        <h2 className={styles.cart__title}>Получение</h2>
        <label className={styles.cart__label}>
          <input
            type="radio"
            name="deliveryOption"
            className={styles.cart__deliveryType_type_invisible}
            onClick={() => handleChooseDelivery('Самовывоз')}
          />
          <span className={styles.cart__deliveryType_type_visible}></span>
          <p className={styles.cart__deliveryName}>
            Самовывоз из кофейни
            <span className={styles.cart__deliveryComment}> (бесплатно)</span>  
          </p>
        </label>
        <label className={styles.cart__label}>
          <input
            type="radio"
            name="deliveryOption"
            className={styles.cart__deliveryType_type_invisible}
            onClick={() => handleChooseDelivery('Курьер')}
          />
          
          {/* <span className={styles.cart__deliveryType_type_visible}></span> */}
          <div className={styles.cart__deliveryType_type_visible}></div>
          
          
          <p className={styles.cart__deliveryName}>
            Доставка по Санкт-Петербургу
            <span className={styles.cart__deliveryComment}>
              {currentTotal < 1800 ? ' (400₽ или бесплатно при заказе от 1800₽)' : ' (бесплатно)'}
            </span>  
          </p>
        </label>
        <label className={styles.cart__label}>
          <input
            type="radio"
            name="deliveryOption"
            className={styles.cart__deliveryType_type_invisible}
            onClick={() => handleChooseDelivery('Доставка по РФ')}
          />
          <span className={styles.cart__deliveryType_type_visible}></span>
          <p className={styles.cart__deliveryName}>
            Доставка в другое место
            <span className={styles.cart__deliveryComment}> (по тарифам транспортной компании СДЭК)
            </span>  
          </p>
          
        </label>
      </form>
      {deliveryType === 'Доставка по РФ' && (
        <span className={`${styles.cart__deliveryName}`}>Доставка осуществляется компанией СДЭК. Оплачивается отдельно при получении.</span>
      )}
      <div onClick={handleDeliveryClick} className={`${styles.cart__deliveryExtra}`}>
        <span className={styles.cart__deliveryName_extra}>Подробнее о доставке и оплате.</span>  
      </div>
      </>
      )}
      
      {deliveryType === 'Самовывоз' && orderData.length >= 1 && (
        <form className={styles.cart__deliveryContainer}>
          <h2 className={`${styles.cart__title} ${styles.cart__title_extra}`}>Выбрите кофейню</h2>
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
      {isDeliveryChosen && orderData.length >= 1 &&(
        <>
          <CartContacts
            isDelivery={isDelivery}
            passErrors={handleContactsErrors}
            passContacts={handleCustomerData}
            isSubmiyClicked={isReadyToPay}
          />
          <div className={styles.cart__totalContainer}>
            <h2 className={styles.cart__title}>Ваш заказ</h2>
            <div className={styles.cart__goodsSummContainer}>
              <p className={styles.cart__goodsSummTitle}>
                {currentAmount}{getWordForCart(currentAmount)}на сумму
              </p>
              <p className={styles.cart__goodsSummMoney}>{currentTotal} &#8381;</p>
            </div>
            <div className={styles.cart__goodsSummContainer}>
              <p className={styles.cart__goodsSummTitle}>Доставка</p>
              <p className={styles.cart__goodsSummMoney}>
                {deliveryType === 'Самовывоз' ? 'бесплатно' : deliveryType === 'Курьер' ? `${deliveryPrice} ₽` : 'при получении'}
              </p>
            </div>
            <div className={styles.cart__goodsSummContainer}>
              <p className={`${styles.cart__goodsSummTitle} ${styles.cart__goodsSummTitle_total}`}>
                Итого
              </p>
              <p className={`${styles.cart__goodsSummMoney} ${styles.cart__goodsSummMoney_total}`}>
                {deliveryPrice + currentTotal} ₽
              </p>
            </div>
            <div className={styles.cart__errorsContainer}>
              {showContactsErr && (
                contactsErrors.reverse().map((item, index) => (
                  <p className={styles.cart__error}  key={index}>{item}</p>
                ))
              )}

            </div>
            <button className={styles.cart__button} onClick={handleSubmit}>
              перейти к оплате
            </button>
            <p className={styles.cart__contidions}>
              Переходя к оплате вы выражаете согласие с условиями
              <a className={styles.cart__link} target="blank" href="/conditions"> обработки персональных данных</a>
              , и
              <a className={styles.cart__link} target="blank" href="/"> публичной оферты.</a>
            </p>
          </div>
        </>
      )}
      
    </section>
    <SectionLine/>
    </>
  );
};

export default Cart;
