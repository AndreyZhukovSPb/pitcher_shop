import React, { useEffect, useState } from "react";
import styles from "../styles/Product.module.css";
import { type ProductType } from "../utils/sharedTypes";

interface balanceProps {
  item: ProductType;
  isShortCard: boolean;
}

const Balance: React.FC<balanceProps> = ({ item, isShortCard }) => {
  const [balanceScales, setBalanceScales] = useState({
    sweetness: 0,
    accidity: 0,
    bitterness: 0,
  });

  useEffect(() => {
    if (item.balance) {
      setBalanceScales({
        sweetness: (item.balance.switness / 5) * 100,
        accidity: (item.balance.accidity / 5) * 100,
        bitterness: (item.balance.bitterness / 5) * 100,
      });
    }
  }, [item]);

  return (
    <div className={`${styles.product__scalesContainer} ${isShortCard ? '' : styles.product__scalesContainer_fullCard}`}>
      <div className={styles.product__scaleBox}>
        <p className={`${styles.product__scaleTitle} ${isShortCard ? '' : styles.product__scaleTitle_fullCard}`}>Сладость</p>
        <div className={styles.product__scaleRuler}>
          <span
            className={styles.product__scale}
            style={{ width: `${balanceScales.sweetness}%` }}
          ></span>
        </div>
      </div>
      <div className={styles.product__scaleBox}>
        <p className={`${styles.product__scaleTitle} ${isShortCard ? '' : styles.product__scaleTitle_fullCard}`}>Кислотность</p>
        <div className={styles.product__scaleRuler}>
          <span
            className={styles.product__scale}
            style={{ width: `${balanceScales.accidity}%` }}
          ></span>
        </div>
      </div>
      <div className={styles.product__scaleBox}>
        <p className={`${styles.product__scaleTitle} ${isShortCard ? '' : styles.product__scaleTitle_fullCard}`}>Горечь</p>
        <div className={styles.product__scaleRuler}>
          <span
            className={styles.product__scale}
            style={{ width: `${balanceScales.bitterness}%` }}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default Balance;
