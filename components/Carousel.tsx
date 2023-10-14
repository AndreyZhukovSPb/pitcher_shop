import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/Carousel.module.css";
// import { Link } from "react-router-dom";
import Link from "next/link";
import { MyTypeMainPhoto, MyTypeImage } from "./SharedTypes";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";

interface carouselItemProps {
  children: any;
  image: string;
  isCoffeeshop?: boolean;
}

export const CarouselItem: React.FC<carouselItemProps> = ({
  children,
  image,
  isCoffeeshop,
}) => {

  return (
    <div
      className={`${styles.carousel__item}
      ${isCoffeeshop ? styles.carousel__item_type_coffeshop : ""}`}
    >
      <Image
        src={image}
        alt="main picture"
        className={`
          ${styles.carousel__image}
          ${isCoffeeshop ? styles.carousel__image_type_coffeshop : ""}`}
        fill
        priority
      />
      {children}
    </div>
  );
};

interface carouselBoxProps {
  mainPictures?: Array<MyTypeMainPhoto>;
  mainPicturesMobile?: Array<MyTypeMainPhoto>;
  coffeeshopPictures?: Array<MyTypeImage>;
  isCoffeeshop?: boolean;
  item?: MyTypeImage;
  onClose?: () => void;
}

export const CarouselBox: React.FC<carouselBoxProps> = ({
  mainPictures,
  mainPicturesMobile,
  coffeeshopPictures,
  isCoffeeshop,
  item,
  onClose,
}) => {
  const isMobile = useMediaQuery({ query: `(max-width: 767px)` });
  const isTablet = useMediaQuery({ query: `(max-width: 1023px)` });
  const [currentSellPictures, setCurrentSellPictures] = React.useState<
    Array<MyTypeMainPhoto>
  >([]);

  useEffect(() => {
    if (isMobile && isCoffeeshop) {
      setCurrentSellPictures(coffeeshopPictures);
    } else if (isMobile || isTablet) {
      setCurrentSellPictures(mainPicturesMobile);
    } else {
      setCurrentSellPictures(mainPictures);
    }
  }, [isMobile, mainPictures, mainPicturesMobile, isCoffeeshop]);

  return (
    <>
      <Carousel isCoffeeshop={isCoffeeshop} item={item} onClose={onClose}>
        {currentSellPictures.map((item) => (
          <CarouselItem
            key={item.image}
            image={item.image}
            isCoffeeshop={isCoffeeshop}
          >
            <Link href={"/shop"}>
              <button
                aria-label="перейти в магазин"
                className={`
                  ${styles.carousel__button}
                  ${
                    isCoffeeshop ? styles.carousel__button_hidden : ""
                  }`}
              >
                {isMobile ? "перейти в магазин" : "купить"}
              </button>
            </Link>
            <div
              className={`${styles.carousel__textContainer} 
                ${styles[item.type]}`}
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
  isCoffeeshop: boolean;
  // coffeeshopPictures: Array<MyTypeMainPhoto>;
  item: MyTypeImage;
  onClose?: () => void;
}

const Carousel: React.FC<carouselProps> = ({
  children,
  isCoffeeshop,
  item,
  onClose,
}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [counter, setCounter] = React.useState(0);
  const [leftButtonIsVisible, setLeftButtonIsVisible] = React.useState(false);
  const [rightButtonIsVisible, setRightButtonIsVisible] = React.useState(true);
  const [isReadyForTransition, setIsReadyForTransition] = React.useState(false);

  const setCurrentCatouselItem = (index: number) => {
    updateIndex(index);
    setTimeout(() => {
      setIsReadyForTransition(true);
    }, 500);
  };

  useEffect(() => {
    if (!isCoffeeshop) {
      return;
    } else {
      setCurrentCatouselItem(item.index);
      console.log("debug 0");
      console.log(item.index);
    }
  }, []);

  useEffect(() => {
    if (isCoffeeshop) {
      return;
    } else {
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
    }
  });

  const updateIndex = (newIndex: number) => {
    setActiveIndex(newIndex);
    if (newIndex <= 0) {
      setLeftButtonIsVisible(false);
      return;
    } else if (
      React.Children.count(children) !== 0 &&
      newIndex >= React.Children.count(children) - 1
    ) {
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

  const touchPositionRef = useRef(null);

  const handleTouchStart = (e) => {

    const touchDown = e.touches[0].clientX;
    touchPositionRef.current = touchDown;
  };

  const handleTouchMove = (e) => {
    if (touchPositionRef.current === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchPositionRef.current - currentTouch;
    const swipeThreshold = 20;

    if (diff > swipeThreshold) {
      if (!rightButtonIsVisible) {
        return;
      } else {
        updateIndex(activeIndex + 1);
        touchPositionRef.current = null;
      }
    } else if (diff < -swipeThreshold) {
      if (!leftButtonIsVisible) {
        return;
      } else {
        updateIndex(activeIndex - 1);
      }

      touchPositionRef.current = null;
    }
  };

  const handleTouchEnd = () => {
    touchPositionRef.current = null;
  };

  const isMobile = useMediaQuery({ query: `(max-width: 767px)` });

  const [vh, setVh] = useState(0);

  useEffect(() => {
    function handleResize() {
      setVh(window.innerHeight);
    }

    // Add an event listener for window resize
    // window.addEventListener('resize', handleResize);

    // Initial setup
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  const desktopStyles = {
    transform: `translateX(-${activeIndex * 100}%)`,
  };

  const mobileStyles = {
    transform: `translateX(-${activeIndex * 100}%)`,
    touchAction: "pan-x",
  };

  const stylesToApply = isCoffeeshop ? mobileStyles : desktopStyles;

  return (
    <div
      className={`${styles.cont} ${
        isCoffeeshop ? styles.cont_type_coffeshop : ""
      }`}
      style={{ height: `${vh}px` }}
    >
      <section className={styles.carousel}>
        <div
          className={`${styles.carousel__inner} 
            ${
              isCoffeeshop
                ? styles.carousel__inner_type_coffeshop
                : styles.carousel__inner_type_transition
            }
            ${
              isReadyForTransition ? styles.carousel__inner_type_transition : ""
            }
            `}
          style={stylesToApply}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {React.Children.map(children, (child, index) => {
            return React.cloneElement(child);
          })}
        </div>
        <button
          aria-label="предыдущая картинка"
          className={`${styles.carousel__wrapButton} 
            ${styles.carousel__wrapButton_type_prev} 
            ${!leftButtonIsVisible ? styles.carousel__wrapButton_hidden : ""} 
            ${
              isCoffeeshop ? styles.carousel__wrapButton_type_CoffeshopPrev : ""
            }`}
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        ></button>
        <button
          aria-label="слудующая картинка"
          className={`${styles.carousel__wrapButton} 
            ${styles.carousel__wrapButton_type_next} 
            ${!rightButtonIsVisible ? styles.carousel__wrapButton_hidden : ""} 
            ${
              isCoffeeshop ? styles.carousel__wrapButton_type_CoffeshopNext : ""
            }`}
          onClick={() => {
            updateIndex(activeIndex + 1);
            setCounter((counter) => (counter = counter + 1));
          }}
        ></button>
        <button
          aria-label="закрыть"
          className={`${styles.carousel__closeButton}
            ${!isCoffeeshop ? styles.carousel__closeButton_hidden : ""}`}
          onClick={onClose}
        ></button>
        <p
          className={`${styles.carousel__counter}
            ${!isCoffeeshop ? styles.carousel__counter_hidden : ""}`}
        >
          {activeIndex + 1} / {React.Children.count(children)}
        </p>
      </section>
    </div>
  );
};

export default Carousel;
