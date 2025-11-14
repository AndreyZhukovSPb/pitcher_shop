import React, { useEffect, useState } from "react";
import { type OrderType } from "../utils/sharedTypes";
import styles from "../styles/Cart.module.css";
import Image from "next/image";
import img1 from "../public/pack_1.png";
import Milling from "./ProductMilling";
import Counter from "./ProductCounter";
import SectionLine from "./SectionLine";
import { CartContext } from "./Context";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";

interface cartItemProps {
  item: OrderType;
}

const CartItem: React.FC<cartItemProps> = ({ item }) => {
  const Context = React.useContext(CartContext);
  const removeFromCart = Context.removeFromCart;
  const router = useRouter();
  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  // const orderData = Context.orderData;

  // const [currentCart, setCurentCart] = React.useState<OrderType[]>([]); // DEL?

  const handleImageClick = () => {
    router.push(`/${item.linkName}`);
    // console.log("пойдем в карточку");
  };


  const handleDelItemClick = () => {
    // console.log("удаляем заказ");
    removeFromCart(item);
  };

  return (
    <li className={styles.cart__item}>
      <div className={styles.cart__about}>
        <Image
          className={styles.cart__image}
          src={item.currentUrl}
          alt="фото пачки"
          onClick={handleImageClick}
          fill
        />
        <div className={styles.cart__featureContainer}>
          <h2 className={styles.cart__itemName}>{item.name}</h2>
          {/* {item.name_2 && (
            <h2 className={styles.cart__itemName}>{item.name_2}</h2>
          )}
          {item.subtitle && (
        <p className={styles.cart__subTitle}>{item.subtitle}</p>
      )} */}

          <div className={styles.cart__itemSize}>
            <p className={styles.cart__itemSizeTitle}>
              {item.price.title}
            </p>
            <p className={styles.cart__itemSizePrice}>
              {item.price.priceItem} &#8381;
            </p>
          </div>
          {(item.cat_id === 2 ||
            item.cat_id === 3) && (<Milling currentProduct={item} isShotCard={false} isCart={true}/>)}
        </div>
        <button 
          className={styles.cart__del} 
          onClick={handleDelItemClick}
        />
      </div>
      <div className={styles.cart__counterContainer}>
        <Counter
          currentProduct={item}
          isCart={true}
        />
        <div className={styles.cart__numbersContainer}>
          <p className={styles.cart__subTotalTitle}>сумма</p>
          {/* <p className={styles.cart__subTotal}>{item.price.quantity * item.price.priceItem} &#8381;</p> */}
          <p className={styles.cart__subTotal}>{item.quantity * item.price.priceItem} &#8381;</p>
        </div>
      </div>
      <SectionLine
        isBigScreen={isBigScreen}
        // isBigScreen={true}
      />
    </li>
  );
};

export default CartItem;

// className={styles.}
