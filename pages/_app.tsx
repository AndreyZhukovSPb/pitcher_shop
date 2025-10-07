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
TODO
консоль почистить
интеграция с эвотор
боевой эквайринг
наполнить товары
фото ребят и новости
проверить 404 на телефоне

ТЕСТИРОВАНИЕ
проверить что монго не падает, а если падает то встает
попап оплаты моментальное закрытие

ПЕРЕД ВВЫКАТОМ
в корсах убрать локалхост
удалить старые заказы

??
добавить проверку отправлен ли уже заказ покупателю и нам
бесплатная доставка по России и тогда поменять описание условий доставки?
на ховере менять фото для большой пачки
кнопки добавить в корзину голубые как на главной?

админка: 
валидация линкнейм
проверка количества символов по полям
админка как на старом сайте

later
поставить макс ширину 1440 для хедера/футера и всех страниц
прикрутить метрику
сменющаяся фотка для пачек 1кг/200гр
добавить в контекст 528 строка проверку что если сервер присылает пустой массив товаров чтобы бесконечно запросы не отправлялись 
промокод
две фотки для продукта и слайдер в большой карточке, как в яндексе?
проверка карты для доставки, попадает ли в зону и прикрутить адресную книгу
как вообще делаются авторассылки
страница отключения рассылки
динамическая Подложка как на другом сайте 
подбробнее отличение фильтр обжарки от эспрессо
работа с юр лицами
*/
