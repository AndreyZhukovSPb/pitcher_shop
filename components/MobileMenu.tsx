import React from "react";
// import "./MobileMenu.css";
import { useRef } from "react";
import Link from "next/link";
import styles from "../styles/MobileMenu.module.css";

interface mobileMenuProps {
  isMobileMenuVisible: boolean;
  onCloseClick: () => void;
  isMain?: boolean;
  isPark?: boolean;
  isMayak?: boolean;
  isShop?: boolean;
  isGuide?: boolean;
  isContacts?: boolean;
  shopLink: string;
}

const MobileMenu: React.FC<mobileMenuProps> = ({
  isMobileMenuVisible,
  onCloseClick,
  isMain,
  isMayak,
  isPark,
  isShop,
  isGuide,
  isContacts,
  shopLink
}) => {
  const overlayRef = React.useRef<HTMLDivElement>(null);

  // console.log(shopLink);

  function handleCheckIsOverlay(e: any) {
    if (!overlayRef.current || e.target.contains(overlayRef.current)) {
      onCloseClick();
    }
  }

  return (
    <div
      className={`${styles.menu} ${isMobileMenuVisible ? styles.menu_active : ""}`}
      // className={`menu ${isMobileMenuVisible ? "menu_active" : ""}`}
      ref={overlayRef}
      onClick={handleCheckIsOverlay}
    >
      <div className={styles.menu__container}>
        <button
          onClick={onCloseClick}
          className={`${styles.menu__closeButton} ${
            isMobileMenuVisible ? styles.menu__closeButton_active : ""
          }`}
        ></button>
        <div className={styles.menu__navContainer}>
          <Link
            href={'/'}
            className={`${styles.menu__navigation} ${
              isMain ? styles.menu__navigation_active : ""
            } }`}
            onClick={onCloseClick}
          >
            Главная
          </Link>
          <Link
            href={shopLink}
            className={`${styles.menu__navigation} ${
              isShop ? styles.menu__navigation_active : ""
            } }`}
            onClick={onCloseClick}
          >
            Онлайн магазин
          </Link>
          <Link
            href={'/park'}
            className={`${styles.menu__navigation} ${
              isPark ? styles.menu__navigation_active : ""
            } }`}
            onClick={onCloseClick}
          >
            Парк Победы
          </Link>
          <Link
            href={'/mayak'}
            className={`${styles.menu__navigation} ${
              isMayak ? styles.menu__navigation_active : ""
            } }`}
            onClick={onCloseClick}
          >
            Маяковская
          </Link>
          <Link
            href={'/contacts'}
            className={`${styles.menu__navigation} ${
              isContacts ? styles.menu__navigation_active : ""
            } }`}
            onClick={onCloseClick}
          >
            Контакты
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

/*
<Link
            href={'/'}
            className={`${styles.menu__navigation} ${
              isGuide ? styles.menu__navigation_active : ""
            } }`}
            onClick={onCloseClick}
          >
            Гид по завариванию
          </Link>
*/
