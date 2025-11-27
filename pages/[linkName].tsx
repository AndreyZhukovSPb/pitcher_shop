import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
// import { millingTableNew } from "../utils/constatnts";
import { CartContext, ProductsContext } from "../components/Context";
import { getItemByLinkName } from "../utils/api";
import { ProductType } from "../utils/sharedTypes";
import styles from "../styles/ProductFull.module.css";
// import img2 from "../public/pack_2.png";
import Balance from "../components/ProductBalance";
import Milling from "../components/ProductMilling";
import Counter from "../components/ProductCounter";
import Size from "../components/ProductSize";
import SubmitBtn from "../components/ProductSubmitBtn";
import { useMediaQuery } from "react-responsive";
import { showTime } from "../utils/constatnts";
// import useCheckStorage from '../utils/checkStorage'

const LinkNamePage: React.FC = () => {
  const Context = useContext(ProductsContext);
  const FeaturesContext = useContext(CartContext)
  const productsList = Context.productsData;
  const passToProductList = Context.addToProducts;
  const { query } = useRouter();
  const [currentItem, setCurrentItem] = useState<ProductType>();
  const [currentItemUrl, setCurrentItemUrl] = useState<string>();
  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const currentFeatures = FeaturesContext.currentProductFeatures;
  const [currentCatUrl, setCurrentCatUrl] = useState<string>();

  const fetchCurrentItem = async (linkName: string) => {

    const item = await getItemByLinkName(linkName);
      if (!item) {
        router.replace("/404"); // редирект на страницу 404
        return;
  }
    passToProductList([item]);
  };

  useEffect(() => {
    // console.log(productsList);
    if (query.linkName === undefined) {
      // console.log('query  еще не готов')
      return;
    } else {
      const linkName = query.linkName.toString();
      if (productsList.length > 0 && productsList.find((item) => item.linkName === linkName)) {
        // console.log('забрали продукт из контекста');
        setCurrentItem(productsList.find((item) => item.linkName === linkName));
      } else {
        // console.log('пошли за продуктом на сервер');
        fetchCurrentItem(linkName);
      }
    }
  }, [productsList, query.linkName]);
  
  useEffect(()=> {
    if (currentItem) {
      setCurrentItemUrl(currentFeatures.find((item)=>item.itemId === currentItem._id).currentUrlLarge)
    }
      
    if (showTime && currentItem && productsList.length > 0) { // ПОСЛЕ АКЦИИ ЗАКОМЕНТИРОВАТЬ
      const currentSize = currentFeatures.find((item)=>item.itemId === currentItem._id).currentSize
      const currentCatId = productsList.find((item)=>item._id === currentItem._id).cat_id
      if (currentCatId === 1 || currentCatId === 4 || currentSize === 1) {
        setCurrentCatUrl('https://storage.yandexcloud.net/pitcher-photos/for%20shop/final/cat10s.png')
      } else {
        setCurrentCatUrl('https://storage.yandexcloud.net/pitcher-photos/for%20shop/final/cat20s.png')
      }
    }
    
  },[currentFeatures, currentItem, productsList])

  console.log(currentCatUrl)

  const router = useRouter();

  return (
    <>
      {currentItem && currentItemUrl &&(
        <section className={styles.productFull}>
          <div className={styles.productFull__imageContainer}>
            {showTime && currentCatUrl && (<>
              <Image 
                className={`${styles.productFull__cat}`}
                src= {currentCatUrl}
                fill
                alt="cat discount"
            />
            </>)}
            <Image
              className={styles.productFull__image}
              src={currentItemUrl}
              fill
              alt="фото пачки"
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
                  <p className={styles.productFull__featureContainer}>
                    <span className={styles.productFull__aboutTitle}>Тип обжарки: </span>
                    {currentItem.description.roastingType}
                  </p>
                )}
                {currentItem.description.variaty && (
                  <p className={styles.productFull__featureContainer}>
                    <span className={styles.productFull__aboutTitle}>Обработка: </span>
                    {currentItem.description.variaty}
                  </p>

                )}
                {currentItem.description.flavour && (
                  <p className={styles.productFull__featureContainer}>
                    <span className={styles.productFull__aboutTitle}>Вкусовой профиль: </span>
                    {currentItem.description.flavour}
                  </p>
                  
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
                (!(currentItem.cat_id === 2 || currentItem.cat_id === 3) &&
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
            {(currentItem.cat_id === 2 || currentItem.cat_id === 3) && (
              <Milling currentProduct={currentItem} isShotCard={false} />
            )}
            <div className={styles.productFull__cartContainer_bigScreen}>
              <div className={styles.productFull__cartContainer}>
                <Size
                  product={currentItem}
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
