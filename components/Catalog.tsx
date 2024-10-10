import styles from "../styles/Catalog.module.css";
import { useMediaQuery } from 'react-responsive';
import Category from "./Category";
import { filterCats } from "../utils/dataTranformers";
import { type ProductType } from '../utils/sharedTypes';

import React, { useEffect, useRef, useState } from "react";

interface catalogProps {
  categoryList: ProductType[];
}

const Catalog: React.FC<catalogProps> = ({ categoryList }) => {
  const categoryListTransformed = filterCats(categoryList);
  const [activeSection, setActiveSection] = useState(null);
  const sectionRefs = useRef([]);
  const [isMenuFixed, setIsMenuFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = 350; 
      const fixedPosition = 330;
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

  return (
    <>
    {isMenuFixed ? (<div className={styles.catalog__placeholder}></div>) : ''}
    <div className={`${styles.catalog__nav} ${isMenuFixed ? styles.catalog__nav_fixed : ''}`}>
      {/* <a href="#section1" 
        // className={styles.catalog__navLink} 
        className={`${styles.catalog__navLink} ${activeSection === `section1` ? styles.catalog__navLink_active : ''}`}
        onClick={scrollToSection}>Все товары</a> */}
      <a href="#section1" 
        // className={styles.catalog__navLink} 
        className={`${styles.catalog__navLink} ${activeSection === `section1` ? styles.catalog__navLink_active : ''}`}
        onClick={scrollToSection}>Новое в Pitcher</a>
      <a href="#section2" 
        // className={styles.catalog__navLink} 
        className={`${styles.catalog__navLink} ${activeSection === `section2` ? styles.catalog__navLink_active : ''}`}
        onClick={scrollToSection}>Дрип кофе</a>
      <a href="#section3" 
        // className={styles.catalog__navLink} 
        className={`${styles.catalog__navLink} ${activeSection === `section3` ? styles.catalog__navLink_active : ''}`}
        onClick={scrollToSection}>Эспрессо</a>
      <a href="#section4" 
        className={`${styles.catalog__navLink} ${activeSection === `section4` ? styles.catalog__navLink_active : ''}`}
        onClick={scrollToSection}>Фильтр</a>
      <a href="#section5" 
        // className={styles.catalog__navLink} 
        className={`${styles.catalog__navLink} ${activeSection === `section5` ? styles.catalog__navLink_active : ''}`}
        onClick={scrollToSection}>Наш мерч</a>
    </div>
    <ul className={styles.catalog__list}>
      {categoryListTransformed.map((item, number) => {
        return (
          <div className={styles.catalog__item} key={number} id={`section${number + 1}`} ref={(el) => { sectionRefs.current[number] = el; }}>
            {item.array.length > 0 && (
              <Category
                category={item}
              />
            )}
          </div>
        );
      })}
    </ul>
  </>
  );
};

export default Catalog;
