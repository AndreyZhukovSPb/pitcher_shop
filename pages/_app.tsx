import Head from "next/head";
import "normalize.css/normalize.css";
import ScrollToTop from "../components/ScrollToTop";
import "../styles/fonts.css";
import '../styles/global.css'
import Layout from "../components/Layout";
import React from "react";
import { CartContextProvider, ProductsContextProvider } from "../components/Context";

export default function MyApp({ Component, pageProps }) {
  
  return (
    <>
      <Head>
        <title>Specialty coffee</title>
        <link rel="icon" href="/favicon.ico/" sizes="any" lang="RU"/>
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
ссылка на контакты в футере обозначить ее как кликабельную
? очистка корзины ? 
высота главного банера
увеличивать инпут адреса по высоте
звездочки для обязательных полей
? комментарий к заказу ? 
футер переписать 
Даша телефон проверить

??
бесплатная доставка по России и тогда поменять описание условий доставки?
бэкграунд бургер меню
в категории стрелку поменять на "+/-"
кнопки добавить в корзину голубые как на главной?
две фотки для продукта и слайдер в большой карточке, как в яндексе?

later
пропадающий в всплывающий хедер?
динамическая Подложка как на другом сайте 
подбробнее отличение фильтр обжарки от эспрессо
работа с юр лицами
карточка шопер проверить
description.about - сделать проверку по количеству символов от и до
*/
