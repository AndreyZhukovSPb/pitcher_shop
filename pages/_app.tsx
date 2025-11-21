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
        <ProductsContextProvider initialProducts={pageProps.data} initialCategories={pageProps.categories}>
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
уменьшить картинки на главной?
боевой эквайринг+ бизнес ру

ПРОВЕРИТЬ

ПЕРЕД ВЫКАТОМ
сделать файл окружения чтобы все было там
в корсах убрать локалхост
ссылка на старый магазин

ADMIN
сделать проверку платежа по урлу банка
добавить в заказ строку доставка
добавить инфо о доставке уведомлений
валидация линкнейм
проверка количества символов по полям
админка как на старом сайте
научить Аню сжимать фото

LATER
сделать ридми
бесплатная доставка по России и тогда поменять описание условий доставки?
не сбрасывать данные покупателя при покупке если ушел из Корзины
тексты анализ
возвращаться на то же место на странице с которого ушли
что будет если после оплаты сразу закроют окно, не дожидаясь редиректа
? после возврата в главное меню карточки отрисовываются со скролом
адресный справочник, либо разные поля для адреса
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
