import styles from "../styles/Catalog.module.css";
import Category from "./Category";
import { filterCats } from "../utils/dataTranformers";
import { type ProductType } from '../utils/sharedTypes';

import React, { useState } from "react";

interface catalogProps {
  categoryList: ProductType[];
}

const Catalog: React.FC<catalogProps> = ({ categoryList }) => {
  // const [currentCatId, setCurrentCatId] = useState(-1);
  // const btnOnClick = (item: number): void => {
  //   setCurrentCatId((currentValue) => (currentValue !== item ? item : -1));
  // };

  // const [openedItems, setOpenedItems] = useState([false, false, false, false]);
  // const onClickHandler = (item: number): void => {
  //   toogleIsCatOpen(item);
  // };

  // const toogleIsCatOpen = (index) => {
  //   console.log(index);
  //   setOpenedItems((state) =>
  //     state.map((item, i) => (i === index ? !item : item))
  //   );
  // };

  const categoryListTransformed = filterCats(categoryList);

  return (
    <ul className={styles.catalog__list}>
      {categoryListTransformed.map((item, number) => {
        return (
          <div key={number}>
            {item.array.length > 0 && (
              <Category
                category={item}
                // isOpen={openedItems[number]}
                // btnOnClick={() => {
                //   onClickHandler(number);
                // }}
              />
            )}
          </div>
        );
      })}
    </ul>
  );
};

export default Catalog;
