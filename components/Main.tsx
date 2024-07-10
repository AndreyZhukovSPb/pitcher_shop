// import SectionLine from "../components_OLD/SectionLine";
import styles from "../styles/Main.module.css";
import Image from "next/image";
import Catalog from "./Catalog";
import SectionLine from "./SectionLine";

interface MainProps {
  data: any; // ПЕРЕДАЛАТЬ
}

const Main: React.FC<MainProps> = ({ data }) => {
  return (
    <>
    <section className={styles.main}>
      <div className={styles.main__container}>
        <Image
          // src={"/main1.jpg"}
          // src="https://i.ibb.co/HBZhqRd/Main-3-opt.jpg"
          src="https://i.ibb.co/3CsPrHQ/Main-1-opt.jpg"
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
