import Main from "../components/Main";
import Footer from "../components/Footer";
import { baseURL } from "../utils/constatnts";

const Index = ({ data }) => {

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

export async function getServerSideProps() {
  const res = await fetch(baseURL);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

/*
Алена
логи на фронте
шрифты мейн
сортировка css свойств?

to-do: 
+ readme: написать как собирать проект + проверить собирается ли, убрать технологии
+ убрать ссылку на гид из бургера
проверить что ховеры ушли с мобилы и остались на десктопе
меню переделать и залить в облако - надпись "меню", белое или черное? что есть в меню

WAITING FOR
photo: team park, main park, Kira
Barista about - add

filally:
Консоль ошибки страницы кофеен, контакты
favicon check
убрать все каменты
удалить шрифты из page
прописать корс нормально
children: any CorouselBox
что лежит в headerType?

Потом: 
открыть ссылку на shop
открыть ссылку на гид
Посмотреть swiper для карусели
почитать react-map-gl и react-leaflet
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



