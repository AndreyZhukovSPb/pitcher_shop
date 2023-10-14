import Main from "../components/Main";
import Footer from "../components/Footer";
import { baseURL } from "../utils/constatnts";

const Index = ({ data }) => {

  console.log(data)
  console.log(data.instaPhoto)

  return (
    <>
      <Main
        mainPictures={data.sellPictures.desctopPhoto}
        mainPicturesMobile={data.sellPictures.mobilePhoto}
        storesPictures={data.storesPictures}
        aboutInfo={data.aboutInfo}
        instaPhoto={data.instaPhoto && data.instaPhoto.data}
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
- Логгер ошибок бекэнд 
- main photo park new
+ проверить что ховеры ушли с мобилы и остались на десктопе

WAITING FOR
меню переделать и залить в облако - надпись "меню", белое или черное? что есть в меню
team photo парк - поменять
photo Kiri ot Kiri
Barista about - add
гид по завариванию

Nikita
почему бэк тупит?
timeout чтобы вернуть транзишн, так себе решение

filally:
- поменять бейс юрл на облако
Консоль ошибки
favicon check
убрать все каменты
удалить шрифты из page
убрать гид по завариванию, открыть ссылку на shop

readme
написать как собирать проект + проверить собирается ли, убрать технологии
children: any CorouselBox
что лежит в headerType?
типизировать useState, useEffect
переписать carouselProps - для функций
карусель разнести на несколько компонентов

npm i cors - probably will be usefull
553648129
"homepage": "https://AndreyZhukovSPb.github.io/pitcher",    
*/



