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
как разместить чтобы часть Никиты не слетела

to-do: 
шрифты мейн
проверить что ховеры ушли с мобилы и остались на десктопе
меню переделать и залить в облако - надпись "меню", белое или черное? что есть в меню


filally:
Консоль ошибки страницы кофеен, контакты
favicon check
убрать все каменты
удалить шрифты из page
прикрутить статистику
прописать корс нормально

Потом: 
что лежит в headerType?
children: any CorouselBox
открыть ссылку на shop
сортировка css свойств
открыть ссылку на гид в том числе в бургере
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



