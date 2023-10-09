import React, { useState } from 'react';
import styles from "../styles/CoffeeCarousel.module.css";

export default function CoffeeCarousel({ coffeeshopPictures, isCoffeeshop, onClose, item }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isCarouselOpen, setIsCarouselOpen] = useState(false);

    const openCarousel = (index) => {
        setCurrentImageIndex(index);
        setIsCarouselOpen(true);
    };

    const closeCarousel = () => {
        setIsCarouselOpen(false);
    };

    const nextImage = () => {
        if (currentImageIndex < images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const previousImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    return (
        <div>
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Image ${index}`}
                    onClick={() => openCarousel(index)}
                />
            ))}

            <div className={`${styles.carousel} ${isCarouselOpen ? styles.open : ''}`}>
                <button className={styles.close} onClick={closeCarousel}>Close Carousel</button>
                <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex}`} />
                <button className={styles.previous} onClick={previousImage}>Previous</button>
                <button className={styles.next} onClick={nextImage}>Next</button>
            </div>
        </div>
    );
}
