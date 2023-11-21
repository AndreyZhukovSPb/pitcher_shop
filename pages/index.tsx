import Main from "../components/Main";
import Footer from "../components/Footer";
import { baseURL } from "../utils/constatnts";

const Index = ({ data }) => {

  console.log(data)
  // console.log(data.instaPhoto)

  return (
    <>
      <Main
        mainPictures={data.sellPictures.desctopPhoto}
        mainPicturesMobile={data.sellPictures.mobilePhoto}
        storesPictures={data.storesPictures}
        aboutInfo={data.aboutInfo}
        instaPhoto={data.instaPhoto && data.instaPhoto}
      />
      <Footer/>
    </>
  );
};

export default Index;

export async function getStaticProps() {
  const res = await fetch(baseURL);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

/*
to-do: 
+ проверить что ховеры ушли с мобилы и остались на десктопе

WAITING FOR
запушить: сервер бэк + деплой фронт
меню переделать и залить в облако - надпись "меню", белое или черное? что есть в меню
photo: team park, main park, Kira
поменять фото Светы/Полины
Barista about - add

filally:
- поменять бейс юрл на облако
Консоль ошибки
почитать react-map-gl и react-leaflet
Посмотреть swiper для карусели
favicon check
убрать все каменты
удалить шрифты из page
открыть ссылку на shop
прописать корс нормально
readme
написать как собирать проект + проверить собирается ли, убрать технологии
children: any CorouselBox
что лежит в headerType?

Потом: 
типизировать useState, useEffect
переписать carouselProps - для функций
логи на фронте
гид по завариванию
личный кабинет
timeout чтобы вернуть транзишн, так себе решение
карусель разнести на несколько компонентов
прикрутить метрики 
написать на бэке функцию которая будет ходить 1 раз в 24 часа и обновлять инста фотки
переписать бэк чтобы проверялась каждая фотка

npm i cors - probably will be usefull
553648129
"homepage": "https://AndreyZhukovSPb.github.io/pitcher",    
*/



