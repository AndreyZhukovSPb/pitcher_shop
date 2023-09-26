import React from "react";
import { useState, useEffect, useRef } from "react";
import { MyTypeImage } from "./SharedTypes";
import styles from "../styles/ImagePopup.module.css";
import Image from "next/image";

interface ImagePopupProps {
  isOpen: boolean;
  item: string;
  onClose: () => void;
  arrayOfImages: Array<MyTypeImage>;
}

const ImagePopup: React.FC<ImagePopupProps> = ({
  arrayOfImages,
  isOpen,
  item,
  onClose = () => {},
}) => {
  const [leftButtonIsVisible, setLeftButtonIsVisible] =
    React.useState<boolean>(true);
  const [rightButtonIsVisible, setRightButtonIsVisible] =
    React.useState<boolean>(true);
  const [currentImage, setCurrentImage] = React.useState<string>("");
  const overlayRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentImage === "") {
      return;
    } else {
      document.addEventListener("keydown", handleKeyDown);
    }
    function handleKeyDown(e: any) {
      keyDownHandler(e);
    }
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentImage]);

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
        updatePhopo(currentImage, 1);
      }
    }
    if (diff < -5) {
      if (!leftButtonIsVisible) {
        console.log("мотать некуда налево");
        return;
      } else {
        console.log("налево");
        updatePhopo(currentImage, -1);
      }
    }
    setTouchPosition(null);
  };

  useEffect(() => {
    if (!item || !arrayOfImages) {
      return;
    }
    setCurrentImage(item);
    checkVisibility(arrayOfImages.findIndex((image) => image.image === item));
  }, [item]);

  function handleClose() {
    setLeftButtonIsVisible(true);
    setRightButtonIsVisible(true);
    // setCurrentImage("");
    onClose();
  }

  function updatePhopo(message: string, index: number) {
    let newOne = arrayOfImages.findIndex((image) => image.image === message);
    setCurrentImage(arrayOfImages[newOne + index].image);
    checkVisibility(newOne + index);
  }

  function checkVisibility(index: number) {
    if (index < 1) {
      setLeftButtonIsVisible(false);
    } else if (index >= arrayOfImages.length - 1) {
      setRightButtonIsVisible(false);
    } else {
      if (!leftButtonIsVisible) {
        setLeftButtonIsVisible(true);
      }
      if (!rightButtonIsVisible) {
        setRightButtonIsVisible(true);
      }
    }
  }

  function keyDownHandler(event: any) {
    if (event.keyCode === 27) {
      handleClose();
    }
    if (event.keyCode === 37) {
      if (!leftButtonIsVisible) {
        return;
      }
      updatePhopo(currentImage, -1);
    } else if (event.keyCode === 39) {
      if (!rightButtonIsVisible) {
        return;
      }
      updatePhopo(currentImage, 1);
    } else {
      return;
    }
  }

  function handleCheckIsOverlay(e: any) {
    console.log("clock");
    if (!overlayRef.current || e.target.contains(overlayRef.current)) {
      console.log("here?");
      handleClose();
    }
  }

  return (
    <section
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onClick={handleCheckIsOverlay}
      ref={overlayRef}
      className={`${styles.popup} ${isOpen && item ? styles.popup_opened : ""}`}
    >
      <div className={styles.popup__photoContainer}>
        {currentImage && (
          <Image
            src={currentImage}
            alt="coffeeshop photo"
            className={styles.popup__photo}
            fill
          />
        )}
      </div>
      <button
        aria-label="Close"
        type="button"
        className={styles.popup__closeButton}
        onClick={handleClose}
      ></button>
      <button
        className={`${styles.popup__wrapButton} ${
          styles.popup__wrapButton_type_prev
        } ${!leftButtonIsVisible ? styles.popup__wrapButton_hidden : ""}`}
        onClick={() => {
          updatePhopo(currentImage, -1);
        }}
      ></button>
      <button
        className={`${styles.popup__wrapButton} ${
          styles.popup__wrapButton_type_next
        } ${!rightButtonIsVisible ? styles.popup__wrapButton_hidden : ""}`}
        onClick={() => {
          updatePhopo(currentImage, 1);
        }}
      ></button>
    </section>
  );
};

export default ImagePopup;
