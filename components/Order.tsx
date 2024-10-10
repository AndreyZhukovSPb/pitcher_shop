import React, { useEffect, useState } from "react";
import { type AdminDataType } from "../utils/sharedTypes";
import styles from "../styles/Orders.module.css";
import { getOrderData } from "../utils/dataTranformers";


interface orderProps {
  order: AdminDataType; 
}

const Order: React.FC<orderProps> = ({ order }) => {
  const [isOrederExtended, setIsOrederExtended] = React.useState<boolean>(false)

  const handleClick = () => {
    setIsOrederExtended(!isOrederExtended);
  };

  return (
    <li className={styles.orders__item}>
      <div className={styles.orders__itemTitle} onClick={handleClick}>
        <div className={styles.orders__itemTitleContainer}>
          <span className={`${styles.orders__itemTitleData} ${styles.orders__itemTitleData_gray}`}>
            #{order.number} | {getOrderData(order.date, order.time)}
          </span>
          <span className={`${styles.orders__itemTitleData} ${styles.orders__itemTitleData_black}`}>
            {order.client.name}: {order.client.phone} 
          </span>
        </div>
        <div className={styles.orders__itemTitleSummary}>
          <p className={styles.orders__itemTitleData}>
            Оплата: <span className={styles.orders__itemTitleData_black}>{order.isPayed ? 'Да' : 'Нет'}</span>
          </p>
          <p className={styles.orders__itemTitleData}>
            Сумма: <span className={styles.orders__itemTitleData_black}>{order.total}</span>
          </p>
        </div>
      </div>
      <div className={`${styles.orders__itemTale} ${isOrederExtended ? styles.orders__itemTale_extended : ''}`}>
      <p className={styles.orders__itemTaleData}>
          <span className={styles.orders__itemTaleData_gray}>Email: </span> {order.client.email} 
        </p>
        <p className={styles.orders__itemTaleData}>
          <span className={styles.orders__itemTaleData_gray}>Доставка: </span>
            {order.client.deliveryType},
            {order.client.deliveryPoint ? ` ${order.client.deliveryPoint}` : ''}
            {order.client.address ? ` ${order.client.address}` : ''}
        </p>
        {order.client.comment && (
          <p className={styles.orders__itemTaleData}>
            <span className={styles.orders__itemTaleData_gray}>Комментарий: </span>
            {order.client.comment}
          </p>
        )}
        <p className={`${styles.orders__itemTaleData} ${styles.orders__itemTaleData_bold}`}>Заказ:</p>
        {order.order.map((item, number) => (
          <div key={number} className={styles.orders__itemTaleOrderContainer}>
            <p className={styles.orders__itemTaleOrder}>
              - {item.name} {item.name_2 ? item.name_2 : ''} {item.price.title}
            </p>
            {item.milling && (
              <p className={styles.orders__itemTaleOrder}>
                <span className={styles.orders__itemTaleOrder_gray}>Помол: </span>
                {item.milling}
            </p>
            )}
            <p className={styles.orders__itemTaleOrder}>
              <span className={styles.orders__itemTaleOrder_gray}>Количество: </span>
              {item.price.quantity}
            </p>
            <p className={styles.orders__itemTaleOrder}>
              <span className={styles.orders__itemTaleOrder_gray}>Цена: </span>
                {item.price.priceItem}
            </p>
            {/* <span className={styles.orders__itemTaleOrder}>
              Сумма: {item.price.priceItem * item.price.quantity}
            </span> */}
          </div>
        ))}
      </div>
    </li>
  );
};

export default Order;
