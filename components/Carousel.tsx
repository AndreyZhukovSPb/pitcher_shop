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
  onClose?: () => void;
}

export const CarouselItem: React.FC<carouselItemProps> = ({
  children,
  image,
  isCoffeeshop,
  onClose
}) => {


  /* const overlayRef = React.useRef<HTMLDivElement>(null);

  const handleCheckIsOverlay = (e: any) => {
    if (!overlayRef.current || e.target.contains(overlayRef.current)) {
      onClose();
    }
  }
  */

  return (
    <div
      className={`${styles.carousel__item}
      ${isCoffeeshop ? styles.carousel__item_type_coffeshop : ""}`}
      // ref={overlayRef}
      // onClick={isCoffeeshop ? handleCheckIsOverlay : null}
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
  const [currentSellPictures, setCurrentSellPictures] = React.useState<
    Array<MyTypeMainPhoto>
  >([]);

  useEffect(() => {
    if (isMobile && isCoffeeshop) {
      setCurrentSellPictures(coffeeshopPictures);
    } else if (isMobile) {
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
            onClose={onClose}
          >
            <Link href={"/shop"}>
              <button
                aria-label="перейти в магазин"
                className={`
                  ${styles.carousel__button}
                  ${
                    isCoffeeshop ? styles.carousel__button_type_coffeshop : ""
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
  onClose
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
      console.log('debug 0')
      console.log(item.index)
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

  /*
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
    if (diff > 2) {
      if (!rightButtonIsVisible) {
        return;
      } else {
        updateIndex(activeIndex + 1);
      }
    }
    if (diff < -3) {
      if (!leftButtonIsVisible) {
        return;
      } else {
        updateIndex(activeIndex - 1);
      }
    }
    setTouchPosition(null);
  };
  */

  const touchPositionRef = useRef(null);

  const handleTouchStart = (e) => {
    // e.preventDefault();
    const touchDown = e.touches[0].clientX;
    touchPositionRef.current = touchDown;
  };

  const handleTouchMove = (e) => {
    // e.preventDefault();
    if (touchPositionRef.current === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchPositionRef.current - currentTouch;

    // Adjust the threshold as needed for your application
    const swipeThreshold = 20;

    if (diff > swipeThreshold) {
      if (!rightButtonIsVisible) {
        return;
      } else {
        updateIndex(activeIndex + 1);
        touchPositionRef.current = null;
      }
      // Swipe to the right
      // Add your logic here
    } else if (diff < -swipeThreshold) {
      if (!leftButtonIsVisible) {
        return;
      } else {
        updateIndex(activeIndex - 1);
      // Swipe to the left
      // Add your logic here
    }

    touchPositionRef.current = null;
  };
  }

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
          style=
            {{ transform: `translateX(-${activeIndex * 100}%)`,
              touchAction: 'pan-x'  }}
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
        <p className={`${styles.carousel__counter}
            ${!isCoffeeshop ? styles.carousel__counter_hidden : ""}`}>
              {activeIndex + 1 } / {React.Children.count(children)}
        </p> 
      </section>
    </div>
  );
};



export default Carousel;

/*
  useEffect(() => {
    if (isCoffeeshop) {
      console.log('debug0');
      setCurrentCatouselItem(item.index);
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

<section className={`${styles.carousel} ${
                  isOpen! ? styles.carousel_hidden : ""
                }`}>
*/
