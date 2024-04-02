// import SectionLine from "../components_OLD/SectionLine";
import styles from "../styles/Main.module.css";
import {
  MyTypeMainPhoto,
  MyTypeInstaPhoto,
  MyTypeAboutProps,
} from "../components_OLD/SharedTypes";
// import { CarouselBox } from "../components_OLD/Carousel";
// import Stores from "../components_OLD/Stores";
// import About from "../components_OLD/About";
// import Portfolio from "../components_OLD/Portfolio";
import Image from "next/image";
import Catalog from "./Catalog";
import SectionLine from "./SectionLine";

interface MainProps {
  // mainPictures: Array<MyTypeMainPhoto>;
  // mainPicturesMobile: Array<MyTypeMainPhoto>;
  // storesPictures: Array<string>;
  // aboutInfo: MyTypeAboutProps;
  // instaPhoto?: Array<MyTypeInstaPhoto>;
  data: any; // ПЕРЕДАЛАТЬ
}

const Main: React.FC<MainProps> = (
  {
    data
    // mainPictures,
    // mainPicturesMobile,
    // storesPictures,
    // aboutInfo,
    // instaPhoto,
  }
) => {
  return (
    <>
    <section className={styles.main}>
      <div className={styles.main__container}>
        <Image
          src={"/main1.jpg"}
          alt="main banner"
          className={styles.main__banner}
          fill
        />
        <div className={styles.main__overlay}>
          <div className={styles.main__textContainer}>
            <p className={styles.main__text}>доставляем</p>
          </div>
        </div>
      </div>
      <Catalog
        categoryList={data}
      />
    </section>
    <SectionLine/>
    </>
  );
};

export default Main;
