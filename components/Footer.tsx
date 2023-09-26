import styles from '../styles/Footer.module.css'
import Link from "next/link";
// import phoneIcon from "../../images/phone_new.png";
// import emailIcon from "../../images/email.png";
// import instaIcon from "../../images/insta.png";
import Image from 'next/image'

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <ul className={styles.footer__contacts}>
          <Link
            href={"/contacts"}
            className={styles.footer__contacts}
          >
            Контакты
          </Link>
          <li className={styles.footer__contactbox}>
            <Image src={'/phone_new.png'} alt="icon phone" className={styles.footer__icon} fill />
            <p className={`${styles.footer__content} ${styles.footer__content_type_contacts}`} >
              +7-931-339-30-43
            </p>
          </li>
          <li className={styles.footer__contactbox}>
            <Image src={'/email.png'} alt="icon email" className={styles.footer__icon} fill />
            <p className={`${styles.footer__content} ${styles.footer__content_type_contacts}`} >
              pitcherbar@gmail.com
            </p>
          </li>
          <li className={styles.footer__contactbox}>
            <Image src={'/insta.png'} alt="icon instagram" className={styles.footer__icon} fill />
            <p className={`${styles.footer__content} ${styles.footer__content_type_contacts}`} >
              pitcherbar
            </p>
          </li>
        </ul>
        <div className={styles.footer__coffeshops}>
          <h3 className={styles.footer__coffeshopsTitle}>Наши кофейни</h3>
          <div className={styles.footer__coffeshopsBox}>
            <div className={styles.footer__coffeshop}>
              <h4 className={`${styles.footer__content} ${styles.footer__content_type_adres}`}>
                м Парк победы
              </h4>
              <h4 className={`${styles.footer__content} ${styles.footer__content_type_adres}`}>
                Бассейная 12
              </h4>
              <p className={`${styles.footer__content} ${styles.footer__content_type_adres}`}>
                Пн-Пт: 8:00-22:00
              </p>
              <p className={`${styles.footer__content} ${styles.footer__content_type_adres}`}>
                Сб-Вс: 9:00-22:00
              </p>
            </div>
            <div className={styles.footer__coffeshop}>
              <h4 className={`${styles.footer__content} ${styles.footer__content_type_adres}`}>
                м Маяковская
              </h4>
              <h4 className={`${styles.footer__content} ${styles.footer__content_type_adres}`}>
                Марата 2
              </h4>
              <p className={`${styles.footer__content} ${styles.footer__content_type_adres}`}>
                Пн-Пт: 9:00-22:00
              </p>
              <p className={`${styles.footer__content} ${styles.footer__content_type_adres}`}>
                Сб-Вс: 9:00-22:00
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className={styles.footer__copyright}>2014 - 2023 Picther loves you</p>
    </footer>
  );
};

export default Footer;
