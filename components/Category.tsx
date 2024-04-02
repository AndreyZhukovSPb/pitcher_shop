import React, { useEffect, useRef, useState } from "react";
// import arrow from '../../image/icons/arr-down.svg';
import arrow from "../public/arr_down.svg";
import styles from "../styles/Category.module.css";
import Image from "next/image";
import Product from "./Product";
import { type ProductType } from "../utils/sharedTypes";

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

  useEffect (() => {
    if (isCatOpened === true) {
      const contentEl = contentRef.current as HTMLDivElement;
      setHeight(contentEl?.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isCatOpened]);

  const openCatHandler = () => {
    setIsCatOpened(!isCatOpened)
  }

  return (
    <li className={styles.category__container}>
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
