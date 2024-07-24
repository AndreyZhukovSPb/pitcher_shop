import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from 'react-responsive';
// import arrow from '../../image/icons/arr-down.svg';
import arrow from "../public/arr_down.svg";
import styles from "../styles/Category.module.css";
import Image from "next/image";
import Product from "./Product";
import { type ProductType } from "../utils/sharedTypes";
import SectionLine from "./SectionLine";

interface categoryProps {
  category: { name: string; array: ProductType[] };
  // isOpen: boolean;
}

const Category: React.FC<categoryProps> = ({
  category,

}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [isCatOpened, setIsCatOpened] = useState(false);
  const isBigScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  useEffect (() => {
    if (isCatOpened || isBigScreen) {
      const contentEl = contentRef.current as HTMLDivElement;
      setHeight(contentEl?.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isCatOpened, isBigScreen]);

  const openCatHandler = () => {
    if (isBigScreen) {
      return
    } else {
      setIsCatOpened(!isCatOpened)
    }
  }

  return (
    <li className={styles.category__container}>
        <SectionLine
          isForCatalog={true}
        />
        <button className={styles.category__btn} onClick={openCatHandler}>
        <h2 className={styles.category__name}>{category.name}</h2>
          <Image
            className={`${styles.category__arrow} ${
              isCatOpened ? styles.category__arrow_opened : ""
            } `}
            src={arrow}
            alt="Стрелка"
          />
      </button>
      <div className={`${styles.category__wrap} ${isCatOpened ? styles.category__wrap_opened : ''}`} style={{ height }}>
          <div ref={contentRef} className={`${styles.category__productContainer} ${isCatOpened ? styles.category__productContainer_opened : ''}`}>
          {category.array.map((item, number) => {
            return <Product key={number} product={item} />;
          })}
        </div>
      </div>
    </li>
  );
};

export default Category;
