import styles from "../styles/Footer.module.css";
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__contactsContainer}>
          <Link href={"/contacts"} className={styles.footer__contactsTitle}>
            Контакты
          </Link>
          <ul className={styles.footer__contacts}>
            <li className={styles.footer__contactbox}>
              <a href="tel:+79313393043" className={styles.footer__box}>
                <Image
                  src={"/phone.svg"}
                  alt="icon phone"
                  className={styles.footer__icon}
                  fill
                />
                <p
                  className={`${styles.footer__content} ${styles.footer__content_type_contacts}`}
                >
                  +7-931-339-30-43
                </p>
              </a>
            </li>
            <li className={styles.footer__contactbox}>
              <a
                href="mailto:pitcherbar@gmail.com"
                target="_blank"
                className={styles.footer__box}
              >
                <Image
                  src={"/email.svg"}
                  alt="icon email"
                  className={styles.footer__icon}
                  fill
                />
                <p
                  className={`${styles.footer__content} ${styles.footer__content_type_contacts}`}
                >
                  pitcherbar@gmail.com
                </p>
              </a>
            </li>
            <li className={styles.footer__contactbox}>
              <a
                href="https://www.instagram.com/pitcherbar/"
                target="_blank"
                className={styles.footer__box}
              >
                <p className={`${styles.footer__icon} ${styles.footer__icon_type_insta}`}>@</p>
                <p
                  className={`${styles.footer__content} ${styles.footer__content_type_contacts}`}
                >
                  pitcherbar
                </p>
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.footer__coffeshops}>
          <h3 className={styles.footer__coffeshopsTitle}>Наши кофейни</h3>
          <div className={styles.footer__coffeshopsBox}>
            <div className={styles.footer__coffeshop}>
              <h4
                className={`${styles.footer__content} ${styles.footer__content_type_adres}`}
              >
                м Парк победы
              </h4>
              <p
                className={`${styles.footer__content} ${styles.footer__content_type_adres}`}
              >
                Бассейная 12
              </p>
              <p
                className={`${styles.footer__content} ${styles.footer__content_type_adres}`}
              >
                Пн-Пт: 8:00-22:00
              </p>
              <p
                className={`${styles.footer__content} ${styles.footer__content_type_adres}`}
              >
                Сб-Вс: 9:00-22:00
              </p>
            </div>
            <div className={styles.footer__coffeshop}>
              <h4
                className={`${styles.footer__content} ${styles.footer__content_type_adres}`}
              >
                м Маяковская
              </h4>
              <p
                className={`${styles.footer__content} ${styles.footer__content_type_adres}`}
              >
                Марата 2
              </p>
              <p
                className={`${styles.footer__content} ${styles.footer__content_type_adres}`}
              >
                Пн-Пт: 9:00-22:00
              </p>
              <p
                className={`${styles.footer__content} ${styles.footer__content_type_adres}`}
              >
                Сб-Вс: 9:00-22:00
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className={styles.footer__copyright}>2014 - 2024 Picther loves you</p>
    </footer>
  );
};

export default Footer;

/*
&#64;
<Image
                  src={"/instagram.svg"}
                  alt="icon instagram"
                  className={styles.footer__icon}
                  fill
                />
*/
