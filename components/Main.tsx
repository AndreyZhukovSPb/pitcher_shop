// import SectionLine from "../components_OLD/SectionLine";
import styles from "../styles/Main.module.css";
import Image from "next/image";
import Catalog from "./Catalog";
import SectionLine from "./SectionLine";
import { useMediaQuery } from "react-responsive";
// import img1 from "../public/Mobile_1_2.png";

interface MainProps {
  data: any; // ПЕРЕДАЛАТЬ
}

const Main: React.FC<MainProps> = ({ data }) => {

  const isBigScreen = useMediaQuery({ query: "(min-width: 399px)" });

  return (
    <>
    <section className={styles.main}>
      <div className={styles.main__container}>
        <Image
          src={isBigScreen ? 'https://i.ibb.co/3CsPrHQ/Main-1-opt.jpg' : 'https://i.ibb.co/HBZhqRd/Main-3-opt.jpg'}
          alt="main banner"
          className={styles.main__banner}
          fill
        />
        <div className={styles.main__overlay}>
          <div className={styles.main__textContainer}>
            <p className={styles.main__text}>Свежий кофе </p>
            <p className={styles.main__text}>с доставкой в день заказа</p>
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
