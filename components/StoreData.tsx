import React, { useEffect } from "react";
import styles from "../styles/StoreData.module.css";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";

interface MyStoreDataProps {
  title: string;
  map: string;
  map_mobile: string;
  shcedule: string;
  teamPhoto: string;
}

interface StoreDataProps {
  data: MyStoreDataProps;
}

const StoreData: React.FC<StoreDataProps> = ({ data }) => {
  const isSmallMobile = useMediaQuery({ query: `(max-width: 599px)` });

  const [currentSizeMap, setCurrentSizeMap] = React.useState<string>("");

  useEffect(() => {
    isSmallMobile
      ? setCurrentSizeMap(data.map_mobile)
      : setCurrentSizeMap(data.map);
  }, [isSmallMobile]);

  return (
    <div className={styles.storeData}>
      <div className={styles.storeData__info}>
        <p className={styles.storeData__title}>{data.title}</p>
        <p className={styles.storeData__title}>{data.shcedule}</p>
      </div>
      <div className={styles.storeData__container}>
        <div className={styles.storeData__imageContainer}>
          <Image
            src={data.teamPhoto}
            alt="main picture"
            className={styles.storeData__image}
            fill
            priority
          />
        </div>
        <div className={styles.storeData__map}>
          <iframe
            className={styles.storeData__iframe}
            src={currentSizeMap}
            title="3"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default StoreData;
