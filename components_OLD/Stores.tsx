import React from "react";
// import { Link } from 'react-router-dom';
import Link from "next/link";
// import './Stores.css'
import styles from "../styles/Stores.module.css";
import Image from "next/image";
// import Image from "next/legacy/image";

interface StoresProps {
  storesPictures: Array<string>;
}

const Stores: React.FC<StoresProps> = ({ storesPictures }) => {
  return (
    <section className={styles.stores}>
      <div className={styles.stores__container}>
        <h2 className={styles.stores__title}>Территория Pitcher</h2>
        <div className={styles.stores__grid}>
          <Link href={"/park"} className={styles.box1}>
            { storesPictures[0] && ( <Image src={storesPictures[0]} alt="coffeshop photo" className={styles.stores__photo} fill  sizes="20vw"/> ) }            
          </Link>
          <Link href={"/park"} className={styles.box2}>
            { storesPictures[1] && (<Image src={storesPictures[1]} alt="coffeshop photo" className={styles.stores__photo} fill sizes="20vw" />) }
          </Link>
          <a className={`${styles.store__legend} ${styles.box6}`} href="/park"> м Парк Победы: улица Бассейная, 12</a>
          <Link href={"/mayak"} className={styles.box3}>
            { storesPictures[2] && (<Image src={storesPictures[2]} alt="coffeshop photo" className={styles.stores__photo} fill sizes="20vw" />) }
          </Link>
          <Link href={"/mayak"} className={styles.box4}>
          { storesPictures[3] && (<Image src={storesPictures[3]} alt="coffeshop photo" className={styles.stores__photo} fill sizes="20vw" />) }
          
          </Link>
          <Link href={"/mayak"} className={styles.box5}>
            { storesPictures[4] && (<Image src={storesPictures[4]} alt="coffeshop photo" className={styles.stores__photo} fill sizes="20vw" />) }
            
          </Link>
          <a className={`${styles.store__legend} ${styles.box7}`} href="/mayak"> м Маяковская: улица Марата, 2 </a>
        </div>
      </div>
    </section>
  );
};

export default Stores;

/*
<Image src={storesPictures[0]} alt="coffeshop photo" className={styles.stores__photo} fill={true}  sizes="20vw"/>
<Image src={storesPictures[1]} alt="coffeshop photo" className={styles.stores__photo} fill sizes="20vw" />
<Image src={storesPictures[2]} alt="coffeshop photo" className={styles.stores__photo} fill sizes="20vw" />
<Image src={storesPictures[3]} alt="coffeshop photo" className={styles.stores__photo} fill sizes="20vw" />
<Image src={storesPictures[4]} alt="coffeshop photo" className={styles.stores__photo} fill sizes="20vw" />
import coffeeShop_1 from '../../images/Park_16.jpg'
import coffeeShop_2 from '../../images/Park_11.jpg'
import coffeeShop_3 from '../../images/Mayak_3.jpg'
import coffeeShop_4 from '../../images/Mayak_10.JPG'
import coffeeShop_5 from '../../images/Mayak_17.JPG'
return (
    <section className='stores'>
      <div className='stores__container'>
        <h2 className='stores__title'>Территория Pitcher</h2>
        <div className='stores__grid'>
          <Link to='/park' className='box1'>
            <img src={coffeeShop_1} alt="" className='stores__photo'/>
          </Link>
          <Link to='/park' className='box2'>
            <img src={coffeeShop_2} alt="" className='stores__photo'/>
          </Link>
          <a className='store__legend box6' href='/park'>м Парк Победы: улица Бассейная, 12</a>  
          <Link to='/mayak' className='box3'>
            <img src={coffeeShop_3} alt="" className='stores__photo'/>
          </Link>
          <Link to='/mayak' className='box4'>
            <img src={coffeeShop_4} alt="" className='stores__photo'/>
          </Link>
          <Link to='/mayak' className='box5'>
            <img src={coffeeShop_5} alt="" className='stores__photo'/>
          </Link>
          <a className='store__legend box7' href='/mayak'>м Маяковская: улица Марата, 2</a>  
        </div>
      </div>
      
    </section>
  )
*/
