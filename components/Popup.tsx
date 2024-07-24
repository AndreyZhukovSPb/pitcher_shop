import React, { useEffect } from 'react';
import styles from "../styles/Popup.module.css";
import { useRouter } from "next/router";
import { isTimeInInterval } from '../utils/timeHandler'

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  onCloseSuccess?: () => void;
  orderNumber?: string;
  isPayed: boolean;
  orderEmail?: string;
  message?: string[];
  isPaymentError?: boolean;
  isPaymentPending: boolean
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  orderNumber,
  isPayed,
  orderEmail,
  message,
  onCloseSuccess,
  isPaymentError,
  isPaymentPending
}) => {

  const overlayRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();
  const currentPath = router.asPath;

  const handleCheckIsOverlay = (e: any) => {
    if (isPaymentPending) {
      return
    } else {
      if (!overlayRef.current || e.target.contains(overlayRef.current)) {
        handleClose();
      }
    }
  }

  const handleClose = (): void => {
    if (isPayed || isPaymentError) {
      onCloseSuccess;
      router.push('/');
      // onClose();
    } else {
      if (currentPath !== '/cart' && currentPath.startsWith('/cart')) {
        router.push('/cart')
        onClose();
      } else {
        onClose();
      }
    }
  };

  console.log(message)

  return (
    <section 
      className={`${styles.popup} ${isOpen ? styles.popup_opened : ''}`}
      onClick={handleCheckIsOverlay}
      ref={overlayRef}  
    >
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
                  {Array.isArray(message) && message.map((item, index) => (
                    <p key={index} className={styles.popup__text}>
                      {item}
                    </p>    
                  ))}
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

// {!isPayed && (
//   <>
//     <p className={styles.popup__text}>
//       При оплате заказа проиошла ошибка
//     </p>
//     <p className={styles.popup__text}>
//       Пожалуйста, попробуйте еще раз
//     </p>
//   </>
// )}
