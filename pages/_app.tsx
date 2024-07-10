import Head from "next/head";
import "normalize.css/normalize.css";
import ScrollToTop from "../components/ScrollToTop";
import "../styles/fonts.css";
import '../styles/global.css'
import Layout from "../components/Layout";
import React from "react";
import { CartContextProvider, ProductsContextProvider } from "../components/Context";
import YandexMetrika from "../utils/yandexMetrika";

export default function MyApp({ Component, pageProps }) {
  
  return (
    <>
      <Head>
        <title>Specialty coffee</title>
        <link rel="icon" href="/favicon.ico/" sizes="any" lang="RU"/>
        <YandexMetrika />
      </Head>
      <ScrollToTop />
      <div className='page'>
        <ProductsContextProvider>
          <CartContextProvider>
            <Layout>
              <Component 
                {...pageProps} 
              />
            </Layout>
            
            </CartContextProvider>
          </ProductsContextProvider>
      </div>
    </>
  );
}

/*
now
адаптив
интеграция с эвотор
Даша телефон проверить
платилка + оплата по куар коду

??
main банер
лого в хедере: сделать всегда на главную или на магазин и на главную с главной магазина
бесплатная доставка по России и тогда поменять описание условий доставки?
бэкграунд бургер меню
в категории стрелку поменять на "+/-"
кнопки добавить в корзину голубые как на главной?

later
промокод
две фотки для продукта и слайдер в большой карточке, как в яндексе?
проверка карты для доставки, попадает ли в зону и прикрутить адресную книгу
заказ в локал сторадж
как вообще делаются авторассылки
страница отключения рассылки
динамическая Подложка как на другом сайте 
подбробнее отличение фильтр обжарки от эспрессо
работа с юр лицами
карточка шопер проверить
description.about - сделать проверку по количеству символов от и до
*/
