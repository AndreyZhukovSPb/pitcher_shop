import React from "react";
import styles from "../styles/Contacts.module.css";
import Header from "../components/Header";
import StoreData from "../components/StoreData";
import Image from "next/image";
import SectionLine from "../components/SectionLine";
// import { dataMayak, dataPark } from "../../utils/constants";


//     <Header isContacts={true} />

const Contacts = ({ data }) => {
  return (
    <>
      <SectionLine isMain={false} />
      <section className={styles.contacts}>
        <div className={styles.contacts__container}>
          <StoreData data={data.park} />
          <StoreData data={data.mayak} />
        </div>
        <ul className={styles.contacts__data}>
          <li className={styles.contacts__contactbox}>
            <Image
              src={"/phone_new.png"}
              alt="icon phone"
              className={styles.contacts__icon}
              fill
            />
            <p className={styles.contacts__content}>+7-931-339-30-43</p>
          </li>
          <li className={styles.contacts__contactbox}>
            <Image
              src={"/email.png"}
              alt="icon email"
              className={styles.contacts__icon}
              fill
            />
            <p className={styles.contacts__content}>pitcherbar@gmail.com</p>
          </li>
          <li className={styles.contacts__contactbox}>
            <Image
              src={"/insta.png"}
              alt="icon email"
              className={styles.contacts__icon}
              fill
            />
            <p className={styles.contacts__content}>pitcherbar</p>
          </li>
        </ul>
        <p className={styles.contacts__message}>
          2014 - 2023 Picther loves you
        </p>
      </section>
    </>
  );
};

export default Contacts;

export async function getStaticProps() {
  const res = await fetch("http://localhost:4001/contacts");
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

/*
 <Image
        src={image}
        alt="main picture"
        className={styles.carousel__image}
        fill
      />
*/
