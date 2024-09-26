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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

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
форма заполения контактов корявая айфон + она увеличивается
перейти к оплате курсор поинтер сделать
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

на тестировании
в мобиле не меняется цвет хедера при скроле

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
