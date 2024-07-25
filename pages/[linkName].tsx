import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { millingTableNew } from "../utils/constatnts";
import { ProductsContext } from "../components/Context";
import { getItemByLinkName } from "../utils/api";
import { ProductType } from "../utils/sharedTypes";
import styles from "../styles/ProductFull.module.css";
import img2 from "../public/pack_2.png";
import Balance from "../components/ProductBalance";
import Milling from "../components/ProductMilling";
import Counter from "../components/ProductCounter";
import Size from "../components/ProductSize";
import SubmitBtn from "../components/ProductSubmitBtn";
import { useMediaQuery } from "react-responsive";
// import useCheckStorage from '../utils/checkStorage'

const LinkNamePage: React.FC = () => {
  const Context = useContext(ProductsContext);
  const productsList = Context.productsData;
  const passToProductList = Context.addToProducts;
  const { query } = useRouter();
  const [currentItem, setCurrentItem] = useState<ProductType>();
  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  // const [millingType, setMillingType] = useState(millingTableNew[0]);

  // useCheckStorage();

  const [productToAdd, setProductToAdd] = useState({}); // DELETE?

  const fetchCurrentItem = async (linkName: string) => {
    // console.log('получили продукт с сервера');
    const item = await getItemByLinkName(linkName);
    // setCurrentItem(item);
    passToProductList([item]);
  };

  useEffect(() => {
    // console.log(productsList);
    if (query.linkName === undefined) {
      // console.log('query  еще не готов')
      return;
    } else {
      const linkName = query.linkName.toString();
      if (productsList.length > 0) {
        // console.log('забрали продукт из контекста');
        setCurrentItem(productsList.find((item) => item.linkName === linkName));
      } else {
        fetchCurrentItem(linkName);
      }
    }
  }, [productsList, query.linkName]);

  useEffect(() => {
    if (currentItem) {
      setProductToAdd({
        size: currentItem.price[0].title,
        price: currentItem.price[0].priceItem,
      });
    } else {
      return;
    }
  }, [currentItem]);

  const router = useRouter();
  const handleTestBack = () => {
    router.push("/");
  };

  return (
    <>
      {currentItem && (
        <section className={styles.productFull}>
          <div className={styles.productFull__imageContainer}>
            <Image
              className={styles.productFull__image}
              // src={img2}
              src={currentItem.cat_id === 1 || currentItem.cat_id === 2 ? 'https://i.ibb.co/VS8jW7D/pack.png' : 'https://i.ibb.co/6vYmZTL/drip.jpg'}
              fill
              alt="фото пачки"
              // onClick={handleTestBack}
            />
            <div className={styles.productFull__titleContainer}>
              <h2 className={styles.productFull__title}>{currentItem.name}</h2>
              {currentItem.name_2 && (
                <h2 className={styles.productFull__title}>
                  {currentItem.name_2}
                </h2>
              )}
            </div>
            {currentItem.subtitle && (
              <p className={styles.productFull__subtitle}>
                {currentItem.subtitle}
              </p>
            )}
          </div>
          <div className={styles.productFull__infoContainer}>
            {currentItem.description.flavour && (
              <div className={styles.productFull__aboutContainer}>
                {currentItem.description.roastingType && (
                  <div className={styles.productFull__featureContainer}>
                    <p className={styles.productFull__aboutTitle}>
                      Тип обжарки:{" "}
                    </p>
                    <p className={styles.productFull__about}>
                      {currentItem.description.roastingType}
                    </p>
                  </div>
                )}
                {currentItem.description.variaty && (
                  <div className={styles.productFull__featureContainer}>
                    <p className={styles.productFull__aboutTitle}>
                      Обработка:{" "}
                    </p>
                    <p className={styles.productFull__about}>
                      {currentItem.description.variaty}
                    </p>
                  </div>
                )}
                {currentItem.description.flavour && (
                  <div className={styles.productFull__featureContainer}>
                    <p className={styles.productFull__aboutTitle}>
                      Вкусовой профиль:{" "}
                    </p>
                    <p className={styles.productFull__about}>
                      {currentItem.description.flavour}
                    </p>
                  </div>
                )}
              </div>
            )}

            {currentItem.balance && (
              <div className={styles.productFull__balanceContainer}>
                <p className={styles.productFull__descriptionTitle}>Баланс:</p>
                <Balance item={currentItem} isShortCard={false} />
              </div>
            )}
            {currentItem.aboutFull &&
              (!isBigScreen ||
                (!(currentItem.cat_id === 1 || currentItem.cat_id === 2) &&
                  !currentItem.balance)) && (
                <div className={styles.productFull__descriptionContainer}>
                  <p className={styles.productFull__descriptionTitle}>
                    Описание:{" "}
                  </p>
                  {currentItem.aboutFull.map((item, number) => {
                    return (
                      <p
                        key={number}
                        className={styles.productFull__description}
                      >
                        {item}
                      </p>
                    );
                  })}
                </div>
              )}
            {(currentItem.cat_id === 1 || currentItem.cat_id === 2) && (
              <Milling currentProduct={currentItem} isShotCard={false} />
            )}
            <div className={styles.productFull__cartContainer_bigScreen}>
              <div className={styles.productFull__cartContainer}>
                <Size
                  product={currentItem}
                  // weightToAdd={weightToAdd}
                  // onSizeClick={handleSizeChoise}
                />
                <Counter currentProduct={currentItem} />
              </div>

              {isBigScreen ? (
                <SubmitBtn currentProduct={currentItem} isFullCard={true} />
              ) : (
                ""
              )}
            </div>
          </div>
          {!isBigScreen ? (
            <SubmitBtn currentProduct={currentItem} isFullCard={true} />
          ) : (
            ""
          )}
          {currentItem.aboutFull && isBigScreen && currentItem.balance && (
            <div className={styles.productFull__aboutContainer_bigScreen}>
              {currentItem.aboutFull.map((item, number) => {
                return (
                  <p key={number} className={`${styles.productFull__description} ${styles.productFull__description_bigScreen}`}>
                    {item}
                  </p>
                );
              })}
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default LinkNamePage;

// className={styles.productFull__}
// const currentItem = productsList.filter((item) => item.linkName === query.linkName)
