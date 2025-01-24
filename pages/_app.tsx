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
ос: попап после заказа мобила

После деплоя перед боевым
поменять ордер намбер на 2000
наполнить базу
фотки из инсты обновить на главном сайте
интеграция с эвотор
консоль почистить
main банер после 699 + текст на главный банер
в корсах убрать локалхост
шоко +20, корсы, обновить фото в инсте


ТЕСТИРОВАНИЕ
лоадер на большом экране
баг при переходе из каталога в карочку  полную
фокус инпута

??
бесплатная доставка по России и тогда поменять описание условий доставки?
в категории стрелку поменять на "+/-"
кнопки добавить в корзину голубые как на главной?
бэкграунд бургер меню

админка: 
валидация линкнейм
проверка количества символов по полям

later
заказы фильтр по времени
сделать 2 фотки большую и маленькую
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
карточка шопер проверить
*/
