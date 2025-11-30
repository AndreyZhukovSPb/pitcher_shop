// import SectionLine from "../components_OLD/SectionLine";
import styles from "../styles/Main.module.css";
import Image from "next/image";
import Catalog from "./Catalog";
import SectionLine from "./SectionLine";
import { ProductsContext } from "../components/Context";
// import { useMediaQuery } from "react-responsive";
import mainbanner from '../public/mainbanner.png'
import mainbanmob from '../public/mainbannermob.png'
import React from "react";

// import img1 from "../public/Mobile_1_2.png";

interface MainProps {
  data: any; // ПЕРЕДАЛАТЬ
}

const Main: React.FC<MainProps> = ({ data }) => {
  const ContextProduct = React.useContext(ProductsContext);
  const products = ContextProduct.productsData

  return (
    <>
    <section className={styles.main}>
      <div className={styles.main__container}>
        <picture>
          <source srcSet={mainbanmob.src} media="(max-width: 399px)" />
          <Image
            src={mainbanner}
            alt="main banner"
            className={styles.main__banner}
            fill
          />
        </picture>
        <div className={styles.main__overlay}>
          <div className={styles.main__textContainer}>
            <p className={styles.main__text}>Свежий кофе </p>
            {/* <p className={styles.main__text}>ЧЕРНАЯ ПЯТНИЦА</p> */}
            {/* <p className={styles.main__text}>27, 28, 29, 30 НОЯБРЯ</p> */}
            <p className={styles.main__text}>с доставкой в день заказа</p>
            <a href="/delivery" className={styles.main__link }>
              подробнее о доставке и оплате
            </a>
          </div>
        </div>
      </div>
      <Catalog
        // categoryList={data}
        categoryList={products}
        
      />
    </section>
    <SectionLine/>
    </>
  );
};

export default Main;
