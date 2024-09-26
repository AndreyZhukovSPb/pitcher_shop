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
эспрессо обжарка айфон на 2 строки ушло
айфон больше воздуха сделать между заголовком каталога и шрифт крупнее?
в мобиле не меняется цвет хедера при скроле
что делать с фотками
main банер + фон на меню + текст на главный банер
интеграция с эвотор

Для заполнения:
добавить описание для всех полных карточек
product abot - 2 строчки, посчитать слова/буквы, на дрипы и прочее 3 строчки
description.about - сделать проверку по количеству символов от и до

??
бесплатная доставка по России и тогда поменять описание условий доставки?
в категории стрелку поменять на "+/-"
кнопки добавить в корзину голубые как на главной?
бэкграунд бургер меню

later
прикрутить метрику
добавить в контекст 528 строка проверку что если сервер присылает пустой массив товаров чтобы бесконечно запросы не отправлялись 
промокод
две фотки для продукта и слайдер в большой карточке, как в яндексе?
проверка карты для доставки, попадает ли в зону и прикрутить адресную книгу
как вообще делаются авторассылки
страница отключения рассылки
динамическая Подложка как на другом сайте 
подбробнее отличение фильтр обжарки от эспрессо
работа с юр лицами
карточка шопер проверить
*/
