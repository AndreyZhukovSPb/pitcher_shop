import React from "react";
// import { Link } from "react-router-dom";
import Link from "next/link";
// import "./Navigation.css";
import styles from "../styles/Navigation.module.css";
import MobileMenu from "./MobileMenu";

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
  isGuideReady?: boolean
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
  isGuideReady
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  function handleBurgerClick() {
    setIsMenuOpen(true);
  }

  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  return (
    <>
      <nav className={styles.navigation}>
        <Link
          href={fisrtLink}
          className={`${styles.navigation__link} ${
            isPark ? styles.navigation__link_active : ""
          } ${isMain ? styles.navigation__link_type_main : ""}`}
        >
          {firstTitle}
        </Link>
        <Link
          href={secondLink}
          className={`${styles.navigation__link} ${
            isMayak ? styles.navigation__link_active : ""
          } ${isMain ? styles.navigation__link_type_main : ""} ${!isGuideReady ? styles.navigation__link_hidden : ''}`}
        >
          {secondTitle}
        </Link>
        <button
          aria-label="меню для мобильного"
          onClick={handleBurgerClick}
          className={`${styles.navigation__button} ${
            isForBurger ? styles.navigation__button_active : ""
          } ${!isMain ? styles.navigation__button_type_store : ""}`}
        ></button>
      </nav>
      <MobileMenu
        isMobileMenuVisible={isMenuOpen}
        onCloseClick={handleCloseMenu}
        isMayak={isMayak}
        isPark={isPark}
        isMain={isMain}
        isContacts={isContacts}
        shopLink={'https://shop.pitcherbar.ru'}
      />
    </>
  );
};

export default Navigation;
