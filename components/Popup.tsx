import React, { useEffect } from 'react';
import styles from "../styles/Popup.module.css";
import { useRouter } from "next/router";
import { isTimeInInterval } from '../utils/timeHandler'

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber?: string;
  isPayed: boolean;
  orderEmail?: string
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  orderNumber,
  isPayed,
  orderEmail
}) => {
  
  const router = useRouter();

  const handleClose = (): void => {
    if (isPayed) {
      router.push('/')
      onClose();
    } else {
      onClose();
    }
  };

  return (
    <section className={`${styles.popup} ${isOpen ? styles.popup_opened : ''}`}>
      <div className={`${styles.popup__container} ${!isPayed ? styles.popup__container_failed : ''}`}>
        <div className={styles.popup__info}>
          
              {isPayed && (
                <>
                  <p className={styles.popup__text}>
                    Заказ успешно оплачен
                  </p>
                  <p className={styles.popup__text}>
                    Номер заказа 
                    <span className={styles.popup__text_bold}> {orderNumber}</span>
                  </p>
                  <p className={styles.popup__text}>
                    Подтверждение отправлено на электронную почту
                    <span className={styles.popup__text_bold}> {orderEmail}</span>
                  </p>
                  <p className={styles.popup__text}>
                    {isTimeInInterval ? 
                      'Завтра ' : 
                      'Сегодня '}
                    мы свяжемся с вами и согласуем время доставки
                  </p>
                  {/* <p className={styles.popup__text}>
                    {isTimeInInterval ? '' : ''}
                    В ближайшее время мы свяжемся с вами и согласуем время доставки
                  </p> */}
                </>
              )}
              {!isPayed && (
                <>
                  <p className={styles.popup__text}>
                    При оплате заказа проиошла ошибка
                  </p>
                  <p className={styles.popup__text}>
                    Пожалуйста, попробуйте еще раз
                  </p>
                </>
              )}
              
        </div>
        <button
          aria-label='Close'
          type='button'
          className={styles.popup__btn}
          onClick={handleClose}
        ></button>
      </div>


    </section>
  );
};

export default Popup;
