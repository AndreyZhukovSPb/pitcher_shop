import styles from "../styles/Product.module.css";
import Image from "next/image";
import img1 from "../public/pack_1.png";
import img2 from "../public/pack_2.png";
import { CartContext } from "./Context";
import React, { use, useEffect, useState } from "react";
import { type ProductType } from "../utils/sharedTypes";
import Milling from "./ProductMilling";
import Counter from "./ProductCounter";
import Balance from "./ProductBalance";
import Size from "./ProductSize";
import SubmitBtn from "./ProductSubmitBtn";
import { useRouter } from "next/router";
import { showTime } from "../utils/constatnts";

interface productProps {
  product: ProductType;
}

const Product: React.FC<productProps> = ({ product }) => {
  const Context = React.useContext(CartContext);
  const resetMilling = Context.resetMilling;
  const resetPriceType = Context.resetPriceType;
  const resetQuantity = Context.resetQuantity;
  const currentFeatures = Context.currentProductFeatures;
  // const currentImage = React.useState('')

  // const addToCart = Context.addToOrder;
  // const currentCart = Context.orderData;
  // const updateCart = Context.updateProductQuantity;
  // const [isSpanVisible, setIsSpanVisible] = useState(false);
  // const [millingType, setMillingType] = useState(millingTableNew[0]);
  // const [balanceScales, setBalanceScales] = useState({
  //   sweetness: 0,
  //   accidity: 0,
  //   bitterness: 0,
  // });
  // const [itemsToAdd, setItemsToAdd] = useState(1);
  // const [productToAdd, setProductToAdd] = useState({size: product.price[0].title, price: product.price[0].priceItem});

  // useEffect (()=> {
  //       currentCart.some(item => item.id === product._id) ?
  //       setIsSpanVisible(true) :
  //       setIsSpanVisible(false)
  // }, [currentCart])

  // useEffect(() => {
  //   if (product.balance) {
  //     setBalanceScales({
  //       sweetness: (product.balance.switness / 5) * 100,
  //       accidity: (product.balance.accidity / 5) * 100,
  //       bitterness: (product.balance.bitterness / 5) * 100,
  //     });
  //   }
  // }, []);

  // const onAddHandler = () => {
  //   setItemsToAdd(1);
  //   // setWeightToAdd(0);
  //   currentCart.some(item => item.id === product._id) ?
  //     updateCart(product._id, itemsToAdd) :
  //     addToCartHandler();
  // };

  // const addToCartHandler =  () => {
  //   setIsSpanVisible(!isSpanVisible);
  //   const addedItem = {
  //     name: product.name,
  //     name_2: product.name_2,
  //     price:
  //       {title: productToAdd.size,
  //         priceItem: productToAdd.price}
  //     ,
  //     url: product.url,
  //     linkName: product.linkName,
  //     quantity: itemsToAdd,
  //     id: product._id,
  //     milling: millingType
  //   }
  //   addToCart(addedItem);
  // }

  const router = useRouter();

  const handleProductClick = () => {
    router.push(`/${product.linkName}`);
    resetMilling(product._id);
    resetPriceType(product._id);
    resetQuantity(product._id, true);
    // console.log("click?");
  };

  const currentImageUrl = currentFeatures.find(
    (item) => item.itemId === product._id
  )?.currentUrl;

  const currentSize = currentFeatures.find(
    (item) => item.itemId === product._id
  )?.currentSize;

  const isBigBag = currentSize === 0 ? false : true

  // const catSrc = (product.cat_id === 2 || product.cat_id === 3) && currentSize === 0 
  const catSrc = (product.cat_id === 2 || product.cat_id === 3) && !isBigBag
    ? 'https://storage.yandexcloud.net/pitcher-photos/for%20shop/final/cat20s.png'
    : 'https://storage.yandexcloud.net/pitcher-photos/for%20shop/final/cat10s.png'


  return (
    <>
      {/* {currentImageUrl && ( */}
        <div className={`${styles.product} ${showTime ? styles.product__showTime : ''}`}>
          <div
            className={styles.product__container}
            onClick={handleProductClick}
          >
            {showTime && (
              <Image 
                className={`${styles.product__cat}`}
                src= {catSrc}
                fill
                alt="cat discount"
            />
            )}
            <Image
              className={`
                ${styles.product__image} ${product.name=== 'DRIP BAG 25 дрипов' ? styles.product__image_large : ''}  
                ${showTime ? styles.product__image_showTime : ''}
                `}
              // src={currentImageUrl}
              src={!currentImageUrl ? product.url : currentImageUrl}

              alt="фото пачки"
              onClick={handleProductClick}
              fill
              // onLoadingComplete={() => setLoaded(true)}
              // style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
            />
            <div className={styles.product__titleContainer}>
              <h2 className={styles.product__title}>{product.name}</h2>
              {product.name_2 && (
                <h2 className={styles.product__title}>{product.name_2}</h2>
              )}
            </div>
            {product.description.variaty && (
              <p className={styles.product__scaleTitle}>
                {product.description.variaty}
              </p>
            )}
            {product.subtitle && (
              <p className={styles.product__scaleTitle}>{product.subtitle}</p>
            )}
            <p className={styles.product__about}>
              {product.description.flavour}
            </p>
            <p className={styles.product__about}>{product.description.about}</p>
            {product.balance && <Balance item={product} isShortCard={true} />}
          </div>

          {(product.cat_id === 2 || product.cat_id === 3) && (
            <Milling currentProduct={product} isShotCard={true} />
          )}
          {showTime && (
            <div className={styles.product__discount}></div>
          )}  
          <div 
            className={`${styles.product__cartContainer} ${showTime ? styles.product__cartContainer_showTime : ''}`}
          >
            <Size 
              product={product} 
              // discountPercent={discountPercent}
              />
          
            <Counter currentProduct={product} />
          </div>
          <SubmitBtn currentProduct={product} />
        </div>
      {/* )} */}
    </>
  );
};

export default Product;
