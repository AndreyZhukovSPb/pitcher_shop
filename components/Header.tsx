import logo from "../public/logo.svg";
import logoMobile from "../public/logo_mobile.svg";
import styles from '../styles/Header.module.css'
import Link from "next/link";
import Image from 'next/image'
import Navigation from "./Navigation";
import { mainWebUrl } from "../utils/constatnts";
import { CartContext } from "./Context";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import SectionLine from "./SectionLine";

interface headerProps {
  onClick?: () => void;
  isPark?: boolean;
  isMayak?: boolean;
  isMain?: boolean;
  isContacts?: boolean;
  isShop?: boolean;
  isFullCard?: boolean;
  isCart: boolean 
}

const Header: React.FC<headerProps> = ({
  // isMayak,
  // isPark,
  isMain,
  // isContacts,
  // isShop,
  isFullCard,
  isCart
}) => {
  const router = useRouter();
  const Context = React.useContext(CartContext);
  const currentOrder = Context.orderData;
  const [itemsInCart, setItemsInCart] = useState(0);
  // const resetMilling = Context.resetMilling;
  // const resetPriceType = Context.resetPriceType;
  const resetProductFeatures = Context.setInitialProductList;
  const [isScrolled, setIsScrolled] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY;
  //     if (scrollPosition > 0) {
  //       setIsScrolled(true);
  //     } else {
  //       setIsScrolled(false);
  //     }
  //   };
  // })

  useEffect(()=> {
    setItemsInCart(currentOrder.reduce((total, item) => total + item.price.quantity, 0));
  }, [currentOrder])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hanldeOnCartClick = () => {
    router.push(`/cart`);
    resetProductFeatures();
  }

  // console.log(isCart)
  // ${isCart? styles.header__type_cart : ''} 

  return (
    // ${isMain? styles.header__type_main : ''} 
    <header className=
      {`${styles.header} 
      ${isMain? styles.header__type_main : ''} 
      ${styles.header__type_cart} 
      ${isScrolled? styles.header__type_scrolled : ''}`}
    >      
      <Navigation
        firstTitle="Парк Победы"
        secondTitle="Маяковская"
        fisrtLink="/park"
        secondLink="/mayak"
        isMayak={false}
        isPark={false}
        isMain={false}
        isContacts={false}
        isForBurger={true}
        isGuideReady={true}
        mainWebUrl={mainWebUrl}
        isFullCard={isFullCard}
        isCart={isCart}
        // isShop={isShop}
      />
      <Link href={'/'} className={styles.header__logoContainer}>
        <Image
          src={logo}
          priority={true}
          alt="logo"
          className={`
            ${styles.header__logo} 
            ${isMain || isScrolled ? styles.header__logo_type_main : ''}
            `}
        />
        <Image
          src={logoMobile}
          priority={true}
          alt="logo"
          className={`
            ${styles.header__logo} 
            ${isMain || isScrolled ? styles.header__logo_type_main : ''} 
            ${styles.header__logo_mobile} }`}
        />
      </Link>
      <div className={styles.header__cartContainer}>
        <Image
          src={"/cart.svg"}
          alt="main cart"
          className={`${styles.header__cart} ${isMain ? styles.header__cart_type_main : ''}`}
          fill
          onClick={hanldeOnCartClick}
        />
        <div className={`${styles.header__cartCounter} ${itemsInCart === 0 ? styles.header__cartCounter_empty : ''}`}>
          <p className={styles.header__counter}>{itemsInCart}</p>
        </div>
      </div>
      {/* {isCart && (
        <SectionLine/>
      )} */}
    </header>
  );
};

export default Header;
