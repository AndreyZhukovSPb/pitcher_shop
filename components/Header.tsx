// import React from "react";
import logo from "../public/logo.svg";
import logoMobile from "../public/logo_mobile.svg";
// import "./Header.css"
import styles from '../styles/Header.module.css'
// import { Link } from "react-router-dom";
import Link from "next/link";
import Image from 'next/image'
import Navigation from "./Navigation";

interface headerProps {
  onClick?: () => void;
  isPark?: boolean;
  isMayak?: boolean;
  isMain?: boolean;
  isContacts?: boolean;
}

const Header: React.FC<headerProps> = ({
  isMayak,
  isPark,
  isMain,
  isContacts,
}) => {
  return (
    <header className={`${styles.header} ${isMain? styles.header__type_main : ''} `}>
      <Navigation
        firstTitle="Онлайн магазин"
        secondTitle="Гайд по завариванию"
        fisrtLink="https://shop.pitcherbar.ru"
        secondLink="https://shop.pitcherbar.ru"
        isMain={isMain}
        isForBurger={false}
        isGuideReady={false}
      />
      <Link href={"/"} className={styles.header__logoContainer}>
        <Image
          src={logo}
          priority={true}
          alt="logo"
          className={`${styles.header__logo} ${isMain ? styles.header__logo_type_main : ''}`}
        />
        <Image
          src={logoMobile}
          priority={true}
          alt="logo"
          className={`${styles.header__logo} ${isMain ? styles.header__logo_type_main : ''} ${styles.header__logo_mobile} }`}
        />
      </Link>
      <Navigation
        firstTitle="Парк Победы"
        secondTitle="Маяковская"
        fisrtLink="/park"
        secondLink="/mayak"
        isMayak={isMayak}
        isPark={isPark}
        isMain={isMain}
        isContacts={isContacts}
        isForBurger={true}
        isGuideReady={true}
      />
    </header>
  );
};

export default Header;


/* 
<img
          src={logo}
          alt="logo"
          className={`header__logo ${isMain ? "header__logo_type_main" : ""}`}
        />
        <img
          src={logoMobile}
          alt="logo"
          className={`header__logo header__logo_mobile ${
            isMain ? "header__logo_type_main" : ""
          }`}
          />
*/