import styles from "../styles/Cart.module.css";
import { CartContext } from "../components/Context";
// import Category from "./Category";
// import { filterCats } from "../utils/dataTranformers";
import { type OrderType } from '../utils/sharedTypes';
import SectionLine from "../components/SectionLine";
import CartItem from "../components/CartItem";
import CartContacts from "../components/CartContacts";
import Preloader from "../components/Preloader";
import { getWordForCart } from "../utils/dataTranformers";
import { discountedOrder } from "../utils/discountedOrder";
import { useRouter } from "next/router";
import { postOrder, checkOrder, checkPromo } from "../utils/api";
import { useMediaQuery } from "react-responsive";
import { regOrderError, paymentFailed, paymentCheckError, paymentChecking, freeDeliveryAmount, showTime, promoTime } from "../utils/constatnts";

// import useCheckStorage from '../utils/checkStorage'

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Popup from "../components/Popup";
import CartPromo from "../components/CartPromo";

interface cartProps {
} // DEL?

const Cart: React.FC<cartProps> = ({  }) => {
  const Context = React.useContext(CartContext);
  const orderData = Context.orderData;
  // const orderDataFromContext = Context.orderData;
  const resetCart = Context.resetCart;
  const router = useRouter();
  const [currentAmount, setCurentAmount] = React.useState<number>(0);
  const [currentTotal, setCurentTotal] = React.useState<number>(0);
  const [deliveryPrice, setDeliveryPrice] = React.useState<number>(0);
  const [deliveryType, setDeliveryType] = React.useState<string>('');
  const [deliveryPoint, setDeliveryPoint] = React.useState<string>('Бассейная 12');
  const [isDeliveryChosen, setIsDeliveryChosen] = React.useState<boolean>(false);
  const [isDelivery, setIsDelivery] = React.useState<boolean>(false);
  const [isContactsValid, setIsContactsValid] = React.useState<boolean>(false);
  const [contactsErrors, setContactsErrors] = React.useState<string[]>([]);
  const [isReadyToPay, setIsReadyToPay] = React.useState<boolean>(false);
  const [showContactsErr, setShowContactsErr] = React.useState<boolean>(false);
  const [isOrderPayed, setIsOrderPayed] = React.useState<boolean>(false);
  const [isPopupOpened, setIsPopupOpened] = React.useState<boolean>(false);
  const [isPreloaderOpened, setIsPreloaderOpened] = React.useState<boolean>(false);
  const [orderNumber, setOrderNumber] = React.useState<string>('');
  const [orderEmail, setOrderEmail] = React.useState<string>('');
  const [popupMessage, setPopupMessage] = React.useState<string[]>([]);
  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const [isPaymentError, setIsPaymentError] = React.useState<boolean>(false);
  const [isPaymentPending, setIsPaymentPending] = React.useState<boolean>(false);
  const [isPromoChecked, setIsPromoChecked] = React.useState<boolean>(false);
  const [isCodeValid, setIsCodeValid] = React.useState<boolean>(false);
  const [namePromo, setNamePromo] = React.useState<string>('');
  const [promoresError, setPromoresError] = React.useState<string>('');
  const [discountValue, setDiscountValue] = React.useState<number>(0);
  const [discountValueForPrices, setDiscountValueForPrices] = React.useState<number>(0);
  const [totalForDelivery, setTotalForDelivery] = React.useState<number>(0);
  // const [currentDiscount, setCurrentDiscount] = React.useState<number>(0);

  // const [orderData, setOrderData] = React.useState<OrderType[]>([])

  // useEffect(()=> {
  //   setOrderData(orderDataFromContext);
  // },[orderDataFromContext])

  // useCheckStorage();
  useEffect(()=> {
    if (isCodeValid) {
      setTotalForDelivery(currentTotal * (100-discountValueForPrices)/100)
    } else {
      setTotalForDelivery(currentTotal)
    }

  }, [orderData, deliveryType, isCodeValid, currentTotal, discountValue])

  useEffect(() => {
    if (deliveryType !== 'Самовывоз') {
      setIsDelivery(true)
    } else {
      setIsDelivery(false)
    }
  }, [deliveryType])

  useEffect(() => {
  setIsPreloaderOpened(false);
}, []);

  const handleChooseDelivery = (value: string) => {
    setDeliveryType(value);
    setIsDeliveryChosen(true);
  }

  const handleChoosePoint = (value: string) => {
    setDeliveryPoint(value);
  }

  useEffect(() => {
    const determineUrlType = (url) => {
      if (url.includes('orderId')) {
        // const url = window.location.href;
        const currentUrl = window.location.href;
        const urlObj = new URL(currentUrl);
        const params = new URLSearchParams(urlObj.search);
        const orderId = params.get('orderId');
        console.log(orderId);
        return(orderId);
      } else {
        return
      }
    };

      const currentUrl = window.location.href;
      const urlType = determineUrlType(currentUrl);
      if (urlType) {
        setIsPaymentPending(true);
        setIsPopupOpened(true);
        setPopupMessage(paymentChecking);
        // console.log(`URL содержит orderId = ${urlType}`);
        checkPayment(urlType);
      } else {
        // console.log('URL не содержит orderId, выполняем действия для корзины');
        return
      }
  }, []); 

  useEffect((
  ) => {
    console.log('debug')
    setCurentAmount(orderData.reduce((acc, item) => {
      // return acc + item.price.quantity;
      return acc + item.quantity;
    }, 0));
    setCurentTotal(orderData.reduce((acc, item) => {
      return acc + item.price.priceItem * item.quantity;
    }, 0));
  }, [orderData])

  console.log(currentAmount)

  useEffect(() => {
    if (deliveryType === 'Курьер') {
      if (!isCodeValid) {
        setDeliveryPrice(currentTotal >= freeDeliveryAmount ? 0 : 400)
      } else {
        console.log(currentTotal * (100-discountValueForPrices)/100)
        setDeliveryPrice(currentTotal * (100-discountValueForPrices)/100 >= freeDeliveryAmount ? 0 : 400)
      }
    } else {
      setDeliveryPrice(0)  
    }
  }, [currentTotal, deliveryType, isCodeValid])

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
    // setOrderNumber('');
    // setOrderEmail('');
    // setPopupMessage([]);
  }

  const sendOrder = 
    (order: OrderType[], 
      deliveryData: { [key: string]: string }, 
      pickUpPoint: string,
      deliveryPrice: number,
      currentTotal: number,
      isDelivery: boolean,
      deliveryType: string
      ) => {
    // console.log(data);
    // console.log(isDelivery);
    let fullDeliveryData = {}
    if (isDelivery) {
      fullDeliveryData = {
        name: deliveryData.name,
        phone: deliveryData.phone,
        address: deliveryData.adress,
        comment: deliveryData.comment,
        email: deliveryData.email,
        deliveryType: deliveryType,
        deliveryPrice: deliveryPrice
      }
    } else {
      fullDeliveryData = {
        name: deliveryData.name,
        phone: deliveryData.phone,
        comment: deliveryData.comment,
        email: deliveryData.email,
        deliveryPoint: pickUpPoint,
        deliveryType: deliveryType,
        };
    }

    const total = isCodeValid ? 
      deliveryPrice + (currentTotal * (100-discountValueForPrices)/100) : 
      deliveryPrice + currentTotal;

    // сохраняю данные заказа на клиенте - перенес в контекст
    // const orderDataForStorage = JSON.stringify(order);
    // localStorage.setItem('orderData', orderDataForStorage);
    // const deliveryDataForStorage = JSON.stringify(fullDeliveryData);
    // localStorage.setItem('deliveryData', deliveryDataForStorage);

    postOrder(fullDeliveryData, order, total, isCodeValid, namePromo)
      .then((data) => {
        if (data.orderData && data.urlForPayment) {
          // console.log(data)
          // resetOrder();
          // setOrderNumber(data.orderData.number)
          // setOrderEmail(data.orderData.client.email)
          // setIsOrderPayed(true) 
          setIsPreloaderOpened(true);
          // const orderDataForStorage = JSON.stringify(data.orderData);
          // localStorage.setItem('orderData', orderDataForStorage);
          // setIsPopupOpened(true);
          router.push(data.urlForPayment);
        } else {
          console.log(`ответ от сервера пришел, ошибка: ${data.message}`)
          setIsPreloaderOpened(false);
          setIsReadyToPay(false);
          setPopupMessage(regOrderError);
          setIsPopupOpened(true);
        }
      })
      .catch(()=> {
        setIsPreloaderOpened(false);
        setIsReadyToPay(false);
        console.log('овтет от сервера не пришел, сработал таймаут ожидания')
        setPopupMessage(regOrderError);
        setIsPopupOpened(true);
      })
  }

  const checkPayment = async (orderId) => {
    const orderPayed = await checkOrder(orderId);
    // if (orderPayed.success && orderPayed.status && orderPayed.dataBaseError) {
    //   console.log('here?')
    //   setIsPaymentPending(false);
    //   setIsPopupOpened(true);
    //   setIsOrderPayed(true);
    //   setIsPaymentError(true);
    //   setPopupMessage(dataBaseError);
    //   resetOrder();
    // } else 
      if (orderPayed.success && orderPayed.status) {
      // console.log(`проверили зака, вернулся ${orderPayed.data.message}`)
      // console.log(orderPayed.data.order.number)
      // console.log(orderPayed.data.order.client.email)
      setOrderNumber(orderPayed.data.order.number)
      setOrderEmail(orderPayed.data.order.client.email)
      setIsPaymentPending(false);
      setIsPopupOpened(true);
      setIsOrderPayed(true);
      resetOrder();
      return;  
    } else if (orderPayed.success && !orderPayed.status) {
      console.log('заказ не оплачен, попробуйте еще раз')
      setIsPopupOpened(true);
      setPopupMessage(paymentFailed);
      setIsPaymentPending(false);
    } else {
      console.log('произошла ошибка проверки платежа, свяжитесь с нами по номеру')
      setIsPopupOpened(true);
      setIsPaymentError(true);
      setIsPaymentPending(false);
      setPopupMessage(paymentCheckError);
      resetOrder();
      return
      
    }
    // return orderPayed
  }
  
  const handleCustomerData = (contacts: { [key: string]: string }) => {
    setIsPreloaderOpened(true)
    if (!isCodeValid) {
      sendOrder(orderData, contacts, deliveryPoint, deliveryPrice, currentTotal, isDelivery, deliveryType)
    } else {
      const discountedOrderForApi = discountedOrder(orderData, discountValueForPrices);
      sendOrder(discountedOrderForApi, contacts, deliveryPoint, deliveryPrice, currentTotal, isDelivery, deliveryType)
    }
  }

  const handleSubmit = () => {
    if (isContactsValid) {
      setIsReadyToPay(true);
      setShowContactsErr(false);
      // console.log('pushed?')
    } else {
      setIsReadyToPay(false);
      setShowContactsErr(true);
    }
  }

  const handleClosePopup = () => {
    
    setIsPopupOpened(false);
    setPopupMessage([]);
    // setIsOrderPayed(false); // НАДО?
  }

  const handleCloseSuccessPopup = () => {
    console.log('here2')
    setIsPopupOpened(false);
    setOrderNumber('');
    setOrderEmail('');
    setPopupMessage([]);
    setIsPaymentError(false);
    // setIsOrderPayed(false); // НАДО?
  }

  const handleDeliveryClick = () => {
    router.push(`/delivery`);
    // console.log("пойдем в условия доставки");
  };


const checkPromoCode = async (value: string) => {
  if (!isPromoChecked) {setIsPromoChecked(true);}
  try {
    const result = await checkPromo(value); // результат запроса от сервера
    if (result.success && result?.valid) { 
      setDiscountValue(result.value)
      setDiscountValueForPrices(result.value * 100)
      setNamePromo(value);
      setIsCodeValid(true);
    } else {
      setPromoresError('Промокод недействителен')
      setDiscountValue(0)
      setDiscountValueForPrices(0)
      setIsCodeValid(false);
      setNamePromo('');
    }
  } catch (error) {
    setPromoresError('Ошибка при проверке промокода')
    setIsCodeValid(false);
    setDiscountValue(0);
    setDiscountValueForPrices(0);
    setNamePromo('');
  }
};

  if (orderData && orderData.length === 0) {
    // Пока данные загружаются, отображайте индикатор загрузки или placeholder
    return (
      <>
        <section className={styles.cart}>
          <h2 className={styles.cart__title} >Корзина</h2>
          <p className={styles.cart__subTitle}>Ваша корзина пуста</p>
          <a rel="stylesheet" href="/" className={styles.cart__backLink}>Вернуться в каталог</a>
        </section>
        <Popup
          onClose={handleClosePopup}
          isPayed = {isOrderPayed}
          orderNumber={orderNumber}
          isOpen={isPopupOpened}
          orderEmail={orderEmail}
          message={popupMessage}
          onCloseSuccess={handleCloseSuccessPopup}
          isPaymentError={isPaymentError}
          isPaymentPending={isPaymentPending}
        />
      </>
    )
  }

  return (
    <>
      <section className={styles.cart}>
      {/* <SectionLine/> */}
        <h2 className={styles.cart__title}>Корзина</h2>
        {showTime && (
          <p className={`${styles.cart__showTimeText} ${styles.cart__subTitle}`}>
            Цены на товары указаны уже за вычетом скидок
          </p>  
        )}
        {/* {orderData.length === 0 && (
          <p className={styles.cart__subTitle}>Ваша корзина пуста</p>
        )} */}
        <div className={styles.cart__container}>
          <div className={`${styles.cart__listContainer} ${orderData.length === 0 ? styles.cart_hidden : ''}`}>
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
          </div>
          <div className={`${styles.cart__customerContainer} ${orderData.length === 0 ? styles.cart_hidden : ''}`}>
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
                    {totalForDelivery < freeDeliveryAmount ? ` (400₽ или бесплатно при заказе от ${freeDeliveryAmount}₽)` : ' (бесплатно)'}
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
                  <span className={styles.cart__deliveryComment}> 
                    {totalForDelivery < freeDeliveryAmount ? ` (по тарифам транспортной компании или бесплатно при заказе от ${freeDeliveryAmount}₽)` : ' (бесплатно)'}
                    {/* (по тарифам транспортной компании СДЭК) */}
                  </span>  
                </p>
                
              </label>
            </form>
            {deliveryType === 'Доставка по РФ' && (
              <span className={`${styles.cart__deliveryName}`}>
                {totalForDelivery < freeDeliveryAmount ? 
                  'Доставка осуществляется компанией СДЭК. Оплачивается отдельно при получении.' :
                  'Бесплатная доставка до пункта выдачи СДЭК на территории России по вашему выбору.'
                }
                </span>
            )}
            <div onClick={handleDeliveryClick} className={`${styles.cart__deliveryExtra}`}>
              <span className={styles.cart__deliveryName_extra}>Подробнее о доставке и оплате</span>  
            </div>
            </>
            )}
            
            {deliveryType === 'Самовывоз' && orderData.length >= 1 && (
              <form className={styles.cart__deliveryContainer}>
                <h2 className={`${styles.cart__title} ${styles.cart__title_extra}`}>Выберите кофейню</h2>
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
                  isPaymentReceived={isOrderPayed}
                />
                {promoTime && (
                  <>
                    <h2 className={`${styles.cart__title} ${styles.cart__title_promo}`}>Промокод</h2>
                    <CartPromo
                      applyPromocode={checkPromoCode}
                    />
                    <div className={styles.cart__promoresContainer}>
                      <span className={`${styles.cart__promores} ${isCodeValid ? styles.cart__promores_visible : ''}`}>
                        Применен промокод на {discountValue*100}% скидку 
                      </span>
                      <span className={`${styles.cart__promores} ${styles.cart__promores_false} ${!isCodeValid && isPromoChecked ? styles.cart__promores_visible : ''}`}>
                        {/* Промокод недействителен */}
                        {promoresError}
                      </span>
                    </div>
                    
                  </>
                  
                )}
                <div className={styles.cart__totalContainer}>
                  <h2 className={styles.cart__title}>Ваш заказ</h2>
                  <div className={styles.cart__goodsSummContainer}>
                    <p className={styles.cart__goodsSummTitle}>
                      {currentAmount}{getWordForCart(currentAmount)}на сумму
                    </p>
                    <p className={styles.cart__goodsSummMoney}>{currentTotal} &#8381;</p>
                  </div>
                  {isCodeValid && (
                    <div className={styles.cart__goodsSummContainer}>
                      <p className={styles.cart__goodsSummTitle}>
                        Скидка
                      </p>
                    <p className={`${styles.cart__goodsSummMoney} ${styles.cart__goodsSummMoney_discount}`}>- {(currentTotal * discountValueForPrices / 100)} &#8381;</p>
                  </div>
                  )}
                  <div className={styles.cart__goodsSummContainer}>
                    <p className={styles.cart__goodsSummTitle}>Доставка</p>
                    <p className={styles.cart__goodsSummMoney}>
                      {
                      
                        deliveryType === 'Самовывоз' ? '0 ₽' : 
                        deliveryType === 'Курьер' ? `${deliveryPrice} ₽` : 
                        deliveryType === 'Доставка по РФ' && (currentTotal * (100-discountValueForPrices)/100) >= freeDeliveryAmount ? '0 ₽' :
                        'при получении'}
                    </p>
                  </div>
                  <div className={styles.cart__goodsSummContainer}>
                    <p className={`${styles.cart__goodsSummTitle} ${styles.cart__goodsSummTitle_total}`}>
                      Итого
                    </p>
                    <p className={`${styles.cart__goodsSummMoney} ${styles.cart__goodsSummMoney_total}`}>
                      {!isCodeValid ? deliveryPrice + currentTotal : deliveryPrice + (currentTotal * (100-discountValueForPrices)/100)} ₽
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
                    <Link className={styles.cart__link} href="/conditions"> обработки персональных данных</Link>
                    , и
                    <Link className={styles.cart__link} target="blank" href="/oferta"> публичной оферты.</Link>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        <Popup
          onClose={handleClosePopup}
          isPayed = {isOrderPayed}
          orderNumber={orderNumber}
          isOpen={isPopupOpened}
          orderEmail={orderEmail}
          message={popupMessage}
          isPaymentPending={isPaymentPending}
        />
        <Preloader
          isOpen={isPreloaderOpened}
        />
      </section>
      <SectionLine
        hideForBigScreen={isBigScreen}
      />
    </>
    
  );
};

export default Cart;
