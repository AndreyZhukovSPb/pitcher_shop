import React, { useEffect, useState } from "react";
import styles from "../styles/Navigation.module.css";
import MobileMenu from "./MobileMenu";
import { CartContext, ProductsContext } from "./Context";
import { useRouter } from "next/router";

interface navigationProps {
  firstTitle: string;
  secondTitle: string;
  fisrtLink: string;
  secondLink: string;
  isMayak?: boolean;
  isPark?: boolean;
  isMain?: boolean;
  isForBurger: boolean;
  isContacts?: boolean;
  isGuideReady?: boolean;
  isShop?: boolean
  mainWebUrl: string,
  isFullCard: boolean,
  isCart: boolean
}

const Navigation: React.FC<navigationProps> = ({
  isContacts,
  firstTitle,
  secondTitle,
  fisrtLink,
  secondLink,
  isMayak,
  isPark,
  isMain,
  isForBurger,
  isGuideReady,
  isShop,
  mainWebUrl,
  isFullCard,
  isCart
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  // const ContextProducts = React.useContext(ProductsContext);
  const Context = React.useContext(CartContext);
  const currentFeatures = Context.currentProductFeatures
  const resetMilling = Context.resetMilling;
  const resetPriceType = Context.resetPriceType;
  const resetQuantity = Context.resetQuantity;
  const [isScrolled, setIsScrolled] = useState(false);
  const { query }  = useRouter();

  const [fullCardId, setFullCardId] = useState<string>('')
  const [fullCardCatId, setFullCardCatId] = useState<number>(0)
  const router = useRouter();

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

  useEffect(() => {
    if (!isFullCard) {
      return
    } else {
      if (query.linkName === undefined) {
        return
      } else {
        const linkName = query.linkName.toString();
        if (currentFeatures.length >= 1 && currentFeatures.find(item => item.linkName === linkName)) {
          // console.log(`проверяем query ${query.linkName}`)
          // setFullCardId(currentFeatures.find(item => item.linkName === linkName).itemId)
          setFullCardId(currentFeatures.find(item => item.linkName === linkName).itemId)
          setFullCardCatId(currentFeatures.find(item => item.linkName === linkName).cat_id)
        } 
      }
    }
  }, [currentFeatures, query.linkName, isFullCard]);

  // console.log(fullCardId)
  // console.log(isFullCard)
  
  function handleBurgerClick() {
    setIsMenuOpen(true);
  }

  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  function handleBackClick() {
    resetPriceType(fullCardId);
    resetQuantity(fullCardId, true);
    // router.push(`/`);
    if (fullCardCatId === 2 || fullCardCatId === 3) {
      resetMilling(fullCardId);
    }
    router.back()
  }

  return (
    <>
    {!isFullCard && !isCart && (
      <nav className={`${styles.navigation}`}>
        <button
          aria-label="меню для мобильного"
          onClick={handleBurgerClick}
          className={`${styles.navigation__button} ${
            isForBurger ? styles.navigation__button_active : ""} 
            ${!isMain ? styles.navigation__button_type_store : ""}
            ${isScrolled? styles.navigation__button_type_scrolled : ''}
          `}
        ></button>
    </nav>
    )}
    {(isFullCard || isCart) && (
      <nav className={styles.navigation}>
        <button
          aria-label="кнопка вернуться"
          onClick={handleBackClick}
          className={`${styles.navigation__button} 
            ${styles.navigation__button_active}
            ${styles.navigation__button_type_back}`}
        ></button>
    </nav>
    )}
      <MobileMenu
      isMobileMenuVisible={isMenuOpen}
      onCloseClick={handleCloseMenu}
      isMayak={false}
      isPark={false}
      isMain={false}
      isContacts={false}
      isShop={true}
      shopLink={'/'}
      mainWebUrl={mainWebUrl}
      />
      
      
    </>
  );
};

export default Navigation;
