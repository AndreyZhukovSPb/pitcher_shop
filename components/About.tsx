import React from 'react';
import styles from '../styles/About.module.css'
import { MyTypeAboutProps } from './SharedTypes';
import AboutColumn from './AboutColumn';

interface AboutProps {
  aboutInfo: MyTypeAboutProps
}

const About: React.FC<AboutProps> = ({ aboutInfo }) => {
  const iconCoffeePath = "/icon_coffee.png";
  const iconNinjaPath = "/icon_ninja.png";
  const iconTrustPath = "/icon_trust.png";

  return (
    <section className={styles.about}>
      <div className={styles.about__box}>
        <AboutColumn aboutColumnInfo={aboutInfo.firstColumn} icon={iconCoffeePath} />
        <AboutColumn aboutColumnInfo={aboutInfo.secondColumn} icon={iconNinjaPath} />
        <AboutColumn aboutColumnInfo={aboutInfo.thirdColumn} icon={iconTrustPath} />
      </div>
    </section>
  );
};

export default About;
