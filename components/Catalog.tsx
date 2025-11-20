import styles from "../styles/Catalog.module.css";
import { useMediaQuery } from 'react-responsive';
import Category from "./Category";
import { filterCats } from "../utils/dataTranformers";
import { type ProductType } from '../utils/sharedTypes';
import { ProductsContext } from "./Context";

import React, { useEffect, useRef, useState } from "react";

interface catalogProps {
  categoryList: ProductType[];
}

const Catalog: React.FC<catalogProps> = ({ categoryList }) => {
  const ContextProduct = React.useContext(ProductsContext);
  const newWay = ContextProduct.categoriesData;

  // const categoryListTransformed = filterCats(categoryList);
  const [activeSection, setActiveSection] = useState(null);
  const sectionRefs = useRef([]);
  const [isMenuFixed, setIsMenuFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = 250; // 350 было при высоте банера 400
      const fixedPosition = 230; // 330 было при высоте банера 400
      // 500 и 480 330
      if (scrollY > fixedPosition) {
        setIsMenuFixed(true);
      } else {
        setIsMenuFixed(false);
      }
      sectionRefs.current.forEach((section, index) => {
        if (section) {
          const { top } = section.getBoundingClientRect();
          if (top <= offset && top >= -section.clientHeight + offset) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (event) => {
    event.preventDefault();
    const sectionId = event.currentTarget.getAttribute('href');
    const sectionElement = document.querySelector(sectionId);
    if (sectionElement) {
      const topOffset = 110; // Расстояние до верхней части элемента, которое нужно прокрутить
      const elementTop = sectionElement.getBoundingClientRect().top + window.scrollY;
      window.scroll({
        top: elementTop - topOffset,
        behavior: 'smooth'
      });
    }
  };

  // const [loaded, setLoaded] = useState(false);

  // useEffect(() => {
  // const timeout = setTimeout(() => setLoaded(true), 50);
  // return () => clearTimeout(timeout);
  // }, []);

  return (
    <>
    {isMenuFixed ? (<div className={styles.catalog__placeholder}></div>) : ''}
    <div className={`${styles.catalog__nav} ${isMenuFixed ? styles.catalog__nav_fixed : ''}`}>
      <a href="#section1" 
        className={`${styles.catalog__navLink} ${activeSection === `section1` ? styles.catalog__navLink_active : ''}`}
        onClick={scrollToSection}>Новое в Pitcher</a>
      <a href="#section2" 
        className={`${styles.catalog__navLink} ${activeSection === `section2` ? styles.catalog__navLink_active : ''}`}
        onClick={scrollToSection}>Дрип кофе</a>
      <a href="#section3" 
        className={`${styles.catalog__navLink} ${activeSection === `section3` ? styles.catalog__navLink_active : ''}`}
        onClick={scrollToSection}>Эспрессо</a>
      <a href="#section4" 
        className={`${styles.catalog__navLink} ${activeSection === `section4` ? styles.catalog__navLink_active : ''}`}
        onClick={scrollToSection}>Фильтр</a>
      <a href="#section5" 
        className={`${styles.catalog__navLink} ${activeSection === `section5` ? styles.catalog__navLink_active : ''}`}
        onClick={scrollToSection}>Мерч и подарки</a>
    </div>
    <div className={styles.catalog__list}
      // style={{
      // opacity: loaded ? 1 : 0,
      // transition: 'opacity 1s ease'
      // }}
    >
      {/* {categoryListTransformed.map((item, number) => { */}
      {newWay.map((item, number) => {
        return (
          <div className={styles.catalog__item} key={number} id={`section${number + 1}`} ref={(el) => { sectionRefs.current[number] = el; }}>
            {/* {item.array.length > 0 && ( */}
              <Category
                category={item}
              />
            {/* )} */}
          </div>
        );
      })}
    </div>
  </>
  );
};

export default Catalog;
