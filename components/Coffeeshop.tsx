import styles from "../styles/Coffeeshop.module.css";
import menu from "../public/nemu_v_1.jpeg";
import Image from "next/image";

import {
  ImageList,
  ImageListItem,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useState, useEffect } from "react";
import useViewportSizes from "use-viewport-sizes";
import SectionLine from "./SectionLine";
import { MyTypeAboutProps, MyTypeTeam } from "./SharedTypes";
import ImagePopup from "./ImagePopup";
import Team from "./Team";
import { useMediaQuery } from "react-responsive";
import { MyTypeImage } from "./SharedTypes";
import React from "react";
import { CarouselBox } from "./Carousel";

interface MyTypeImagesArray {
  image: string;
  cols: number;
  rows: number;
}

interface coffeeshopProps {
  isMayak: boolean;
  isPark: boolean;
  imagesArrayDesctop: Array<MyTypeImagesArray>;
  imagesArrayMobile: Array<MyTypeImagesArray>;
  data: MyTypeAboutProps;
  teamAbout: MyTypeAboutProps;
  teamPhoto: Array<MyTypeTeam>;
}

const Coffeeshop: React.FC<coffeeshopProps> = ({
  isPark,
  isMayak,
  imagesArrayDesctop,
  imagesArrayMobile,
  data,
  teamAbout,
  teamPhoto,
}) => {
  const [vpWidth] = useViewportSizes({ dimension: "w" });
  const [currentSize, setCurrentSize] = React.useState<number>();
  const [isPopupOpen, setIsPopupOpen] = React.useState<boolean>(false);
  const [currentPhoto, setCurrentPhoto] = React.useState<string>("");
  const [currentCatouselItem, setCurrentCatouselItem] = React.useState<MyTypeImage>({});

  const isTablet = useMediaQuery({
    query: `(max-width: 899px) and (min-width: 768px)`,
  });
  const isMobile = useMediaQuery({ query: `(max-width: 767px)` });
  const isSmallMobile = useMediaQuery({ query: `(max-width: 599px)` });

  interface MyTypeSizeData {
    itemsToShow?: number;
    columnsToShow?: number;
    currentGap?: number;
  }

  interface MyTypeData {
    map?: string;
    map_tablet?: string;
    map_mobile?: string;
    title?: string;
    shcedule?: string;
    shcedule_tablet?: string;
    content_1?: string;
    content_1_tablet?: string;
    content_2?: string;
    content_2_tablet?: string;
    content_3?: string;
    content_4?: string;
  }

  const [currentSizeData, setCurrentSizeData] = React.useState<MyTypeSizeData>(
    {}
  );

  const [currentPictures, setCurrentPictures] = React.useState<
    Array<MyTypeImage>
  >([]);

  const [currentShopData, setCurrentShopData] = React.useState<MyTypeData>({});

  const [isCarouselOpen, setIsCarouselOpen] = React.useState<boolean>(false);

  function setCoffeeShopData(
    imageArray: Array<MyTypeImage>,
    data: MyTypeData
    // map: string
  ) {
    setCurrentPictures(imageArray);
    setCurrentShopData(data);
  }

  function setSizeData(data: MyTypeSizeData) {
    setCurrentSizeData(data);
  }

  useEffect(() => {
    if (!isMobile) {
      setSizeData({ itemsToShow: 16, columnsToShow: 6, currentGap: 6 });
      setCoffeeShopData(imagesArrayDesctop, data);
    } else {
      setSizeData({ itemsToShow: 7, columnsToShow: 12, currentGap: 3 });
      setCoffeeShopData(imagesArrayMobile, data);
    }
  }, [isMobile]);

  useEffect(() => {
    setCurrentSize(window.screen.width / 6.734);
  }, [window.screen.width]);

  const theme = createTheme({
    components: {
      MuiImageListItem: {
        styleOverrides: {
          root: {
            "&:hover": {
              cursor: "pointer",
              opacity: 0.7,
              transition: "opacity 0.7s ease",
              boxShadow: "0 0 2px 3px rgba(0, 0, 0, 0.5)",
            },
          },
        },
      },
    },
  });

  function openPopup(image: string) {
    setCurrentPhoto(image);
    setIsPopupOpen(true);
  }
  
  function openCarousel(item: MyTypeImage) {
    setIsCarouselOpen(true)
    setCurrentCatouselItem(item)
  }

  function closeCarousel() {
    setIsCarouselOpen(false)
  }

  function closePopup() {
    setIsPopupOpen(false);
    setCurrentPhoto("");
  }

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted)
    return (
      <>
        <section className={styles.coffeeshop}>
          <div className={styles.coffeeshop__infoContainer}>
            <Image src={menu} priority alt="menu" className={styles.coffeeshop__menu} />
            <div className={styles.coffeeshop__info}>
              <p className={styles.coffeeshop__title}>
                {currentShopData.title}
              </p>
              <p className={styles.coffeeshop__title}>
                {isTablet || isMobile
                  ? currentShopData.shcedule_tablet
                  : currentShopData.shcedule}
              </p>
              <p className={styles.coffeeshop__content}>
                {" "}
                {isTablet && isPark
                  ? currentShopData.content_1_tablet
                  : currentShopData.content_1}
              </p>
              <p
                className={`${styles.coffeeshop__content} ${
                  isPark && isTablet ? styles.coffeeshop__content_hidden : ""
                }`}
              >
                {" "}
                {isMayak && isTablet
                  ? currentShopData.content_2_tablet
                  : currentShopData.content_2}
              </p>
              <p className={styles.coffeeshop__content}>
                {" "}
                {currentShopData.content_3}
              </p>
              <p
                className={`${styles.coffeeshop__content} ${
                  isMayak && isTablet ? styles.coffeeshop__content_hidden : ""
                }`}
              >
                {" "}
                {currentShopData.content_4}
              </p>
            </div>
            <div className={styles.coffeeshop__map} >
              <iframe
                className={styles.coffeeshop__iframe}
                src={
                  isTablet
                    ? currentShopData.map_tablet
                    : isSmallMobile
                    ? currentShopData.map_mobile
                    : currentShopData.map
                }
                title="2"
              ></iframe>
            </div>
          </div>
          <SectionLine />
          <div className={styles.coffeeshop__gallery}>
            <ImageList
              // sx={{ height: 100, width: 500 }}
              variant="quilted"
              cols={currentSizeData.columnsToShow}
              // rowHeight='auto'
              rowHeight={currentSize}
              gap={currentSizeData.currentGap}
            >
              {currentPictures
                .slice(0, currentSizeData.itemsToShow)
                .map((item) => (
                  <ThemeProvider
                    theme={theme}
                    key={`${currentSizeData.itemsToShow} ${item.image}`}
                  >
                    <ImageListItem
                      cols={item.cols || 1}
                      rows={item.rows || 1}
                      onClick={() => {
                        if(!isMobile) {
                          openPopup(item.image);
                        } else {
                          openCarousel(item);
                        }
                      }}
                      className={styles.coffeeshop__picture}
                    >
                      <Image
                        src={item.image}
                        alt={item.image}
                        className={styles.coffeeshop__photo}
                        loading="lazy"
                        fill
                      />
                    </ImageListItem>
                  </ThemeProvider>
                ))}
            </ImageList>
          </div>
          <SectionLine />
          <Team teamAbout={teamAbout} teamPhoto={teamPhoto} />

          <SectionLine />
        </section>
        <ImagePopup
          isOpen={isPopupOpen}
          item={currentPhoto}
          onClose={closePopup}
          arrayOfImages={currentPictures}
        />
        {isCarouselOpen && 
          <CarouselBox 
            coffeeshopPictures={currentPictures}      
            isCoffeeshop={isCarouselOpen}
            onClose={closeCarousel}
            item={currentCatouselItem}
          />} 
          
      </>
    );
};

export default Coffeeshop;

/*


                  {isCarouselOpen && 
          <CoffeeCarousel
            coffeeshopPictures={currentPictures}      
            isCoffeeshop={isCarouselOpen}
            onClose={closeCarousel}
            item={currentCatouselItem}
          />} 
*/
