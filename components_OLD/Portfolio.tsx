import React, { useState, useEffect } from "react";
import Photo from "./Photo";
import { useMediaQuery } from "react-responsive";
import { MyTypeInstaPhoto } from "./SharedTypes";
import styles from '../styles/Portfolio.module.css'

interface PortfolioProps {
  instaPhoto: Array<MyTypeInstaPhoto>
}

const Portfolio: React.FC<PortfolioProps> = ({instaPhoto}) => {
  const isMobile = useMediaQuery({ query: `(max-width: 767px)` });

  const [itemsToShow, setItemsToShow] = React.useState<number>();

  // const [allPhoto, setAllPhoto] = React.useState<
  //  Array<MyTypeInstaPhoto>
  // >([]);

  useEffect(() => {
    if (!isMobile) {
      setItemsToShow(16);
    } else {
      setItemsToShow(9);
    }
  }, [isMobile]);

  // useEffect(() => {
  //      setAllPhoto(instaPhoto);
  // }, [instaPhoto]);

  return (
    <section className={styles.portfolio}>
      <h2 
        className={styles.portfolio__title}
        onClick={()=>console.log(instaPhoto)}
      >
          Последние новости из жизни Picther
      </h2>
      <div className={styles.portfolio__photoContainer}>
        {instaPhoto && instaPhoto.slice(0, itemsToShow).map((item) => (
          <Photo
            key={item.id}
            item={item}
          />
        ))}
      </div>
      
    </section>
  );
};

export default Portfolio;


/*
*/

/*
image={item.media_url}
            type={item.media_type}
            videoImage={item.thumbnail_url}
            permalink={item.permalink}
*/
