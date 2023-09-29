import React, { useState, useEffect } from "react";
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

  const [aboutTexts, setAboutTexts] = React.useState<
  Array<String>
>([]);

  useEffect(() => {
    if (isMobile) {
      setAboutTexts([aboutColumnInfo.p_1_mobile, aboutColumnInfo.p_2_mobile, aboutColumnInfo.p_3_desctop, aboutColumnInfo.p_4_desctop]);
    } else {
      setAboutTexts([aboutColumnInfo.p_1_desctop, aboutColumnInfo.p_2_desctop, aboutColumnInfo.p_3_desctop, aboutColumnInfo.p_4_desctop]);
    }
  }, [isMobile]);

  return (
    <div className={styles.about__container}>
      <Image src={icon} alt="иконка" className={styles.about__title} fill />
      <div className={styles.about__contextContainer}>
        <p className={styles.about__context}>
          {aboutTexts[0]}
        </p>
        <p className={styles.about__context}>
        {aboutTexts[1]}
        </p>
        <p
          className={`${styles.about__context} ${styles.about__context_type_mobile}`}
        >
          {aboutTexts[2]}
        </p>
        <p
          className={`${styles.about__context} ${styles.about__context_type_mobile}`}
        >
          {aboutTexts[3]}
        </p>
      </div>
    </div>
  );
};

export default AboutColumn;