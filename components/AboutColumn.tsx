import React from "react";
import styles from "../styles/About.module.css";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import { MyTypeAboutProps } from "./SharedTypes";

interface AboutColumnProps {
  icon: string;
  aboutColumnInfo: MyTypeAboutProps;
}

const AboutColumn: React.FC<AboutColumnProps> = ({ icon, aboutColumnInfo }) => {
  const isMobile = useMediaQuery({ query: `(max-width: 589px)` });

  return (
    <div className={styles.about__container}>
      <Image src={icon} alt="иконка" className={styles.about__title} fill />
      <div className={styles.about__contextContainer}>
        <p className={styles.about__context}>
          {!isMobile ? aboutColumnInfo.p_1_desctop : aboutColumnInfo.p_1_mobile}
        </p>
        <p className={styles.about__context}>
          {!isMobile ? aboutColumnInfo.p_2_desctop : aboutColumnInfo.p_2_mobile}
        </p>
        <p
          className={`${styles.about__context} ${styles.about__context_type_mobile}`}
        >
          {aboutColumnInfo.p_3_desctop}
        </p>
        <p
          className={`${styles.about__context} ${styles.about__context_type_mobile}`}
        >
          {aboutColumnInfo.p_4_desctop}
        </p>
      </div>
    </div>
  );
};

export default AboutColumn;
