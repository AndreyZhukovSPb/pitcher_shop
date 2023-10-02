import React, { useState, useEffect } from "react";
import styles from "../styles/Carousel.module.css";
// import { Link } from "react-router-dom";
import Link from "next/link";
import { MyTypeMainPhoto } from "./SharedTypes";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";

interface carouselItemProps {
  children: any;
  image: string;
}

export const CarouselItem: React.FC<carouselItemProps> = ({
  children,
  image,
}) => {
  return (
    <div className={styles.carousel__item}>
      <Image
        src={image}
        alt="main picture"
        className={styles.carousel__image}
        fill
        priority
      />
      {children}
    </div>
  );
};

interface carouselBoxProps {
  mainPictures: Array<MyTypeMainPhoto>;
  mainPicturesMobile: Array<MyTypeMainPhoto>;
}

export const CarouselBox: React.FC<carouselBoxProps> = ({
  mainPictures,
  mainPicturesMobile,
}) => {
  const isMobile = useMediaQuery({ query: `(max-width: 767px)` });

  const [currentSellPictures, setCurrentSellPictures] = React.useState<
    Array<MyTypeMainPhoto>
  >([]);

  useEffect(() => {
    if (isMobile) {
      setCurrentSellPictures(mainPicturesMobile);
    } else {
      setCurrentSellPictures(mainPictures);
    }
  }, [isMobile, mainPictures, mainPicturesMobile]);

  return (
    <>
      <Carousel>
        {currentSellPictures.map((item) => (
          <CarouselItem key={item.pictureId} image={item.image}>
            <Link href={"/shop"}>
              <button aria-label="перейти в магазин" className={styles.carousel_button}>
                {isMobile ? "перейти в магазин" : "купить"}
              </button>
            </Link>
            <div
              className={`${styles.carousel__textContainer} ${
                styles[item.type]
              }`}
            >
              <p className={styles.carousel__text}>{item.text_1}</p>
              <p className={styles.carousel__text}>{item.text_2}</p>
              <p className={styles.carousel__text}>{item.text_3}</p>
            </div>
          </CarouselItem>
        ))}
      </Carousel>
    </>
  );
};

interface carouselProps {
  children: any;
}

const Carousel: React.FC<carouselProps> = ({ children }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [counter, setCounter] = React.useState(0);
  const [leftButtonIsVisible, setLeftButtonIsVisible] = React.useState(false);
  const [rightButtonIsVisible, setRightButtonIsVisible] = React.useState(true);

  useEffect(() => {
    const vhOffset = window.innerHeight - document.documentElement.clientHeight;
    document.documentElement.style.setProperty('--vh-offset', `${vhOffset}px`);
  }, []);

  useEffect(() => {
    if (
      counter >= React.Children.count(children) - 1 ||
      !rightButtonIsVisible
    ) {
      return;
    } else {
      const interval = setInterval(() => {
        setCounter((counter) => (counter = counter + 1));
        updateIndex(activeIndex + 1);
      }, 2500);
      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    }
  });

  const updateIndex = (newIndex: number) => {
    setActiveIndex(newIndex);
    if (newIndex <= 0) {
      setLeftButtonIsVisible(false);
      return;
    } else if (newIndex >= React.Children.count(children) - 1) {
      setRightButtonIsVisible(false);
    } else {
      if (!leftButtonIsVisible) {
        setLeftButtonIsVisible(true);
      }
      if (!rightButtonIsVisible) {
        setRightButtonIsVisible(true);
      }
    }
  };

  const [touchPosition, setTouchPosition] = useState(null);

  const handleTouchStart = (e: any) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e: any) => {
    const touchDown = touchPosition;
    if (touchDown === null) {
      return;
    }
    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;
    if (diff > 5) {
      if (!rightButtonIsVisible) {
        return;
      } else {
        updateIndex(activeIndex + 1);
      }
    }
    if (diff < -5) {
      if (!leftButtonIsVisible) {
        return;
      } else {
        updateIndex(activeIndex - 1);
      }
    }
    setTouchPosition(null);
  };

  return (
    <section className={styles.carousel}>
      <div
        className={styles.carousel__inner}
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child);
        })}
      </div>
      <button
        aria-label="предыдущая картинка"
        className={`${styles.carousel__wrapButton} ${
          styles.carousel__wrapButton_type_prev
        } ${!leftButtonIsVisible ? styles.carousel__wrapButton_hidden : ""}`}
        onClick={() => {
          updateIndex(activeIndex - 1);
        }}
      ></button>
      <button
        aria-label="предыдущая картинка"
        className={`${styles.carousel__wrapButton} ${
          styles.carousel__wrapButton_type_next
        } ${!rightButtonIsVisible ? styles.carousel__wrapButton_hidden : ""}`}
        onClick={() => {
          updateIndex(activeIndex + 1);
          setCounter((counter) => (counter = counter + 1));
        }}
      ></button>
    </section>
  );
};

export default Carousel;

// export const CarouselBox: React.FC<{}> = () => {
/*
  interface MyTypeMainPhoto {
    pictureId: number;
    image: string;
    text_1: string;
    text_2: string;
    text_3: string;
    number: string;
  }
  const [mainPictures, setMainPictures] = React.useState<
    Array<MyTypeMainPhoto>
    >([]);
  const [mainPicturesMobile, setMainPicturesMobile] = React.useState<
    Array<MyTypeMainPhoto>
    >([]);
    useEffect(() => {
    Api.getMainPhoto()
      .then((res) => {
        setMainPictures(res.desctopPhoto);
        setMainPicturesMobile(res.mobilePhoto);
        console.log(res.istaPhoto.data)
      })
  }, []);
  */
