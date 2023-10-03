import Main from "../components/Main";
import Footer from "../components/Footer";
import { baseURL } from "../utils/constatnts";

const Index = ({ data }) => {

  console.log(data.instaPhoto)
  // data.instaPhoto.data

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
+ contacts for mobile
- листалка на попапах мобила


WAITING FOR
меню переделать и залить в облако - надпись "меню", белое или черное?
team photo парк - поменять
main photo park new
photo Kiri ot Kiri
Barista about - add

Nikita
почему бэк тупит?

??
carousel button ближе к низу
Menu popup?
what does menu include?
на мобиле есть ховер и курсор поинтер?

filally:
Консоль ошибки
удалить app и appOld
ScrollToTop проверить
favicon check?
errors console
убрать все каменты
удалить шрифты из page

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
git push origin level-1     
    "typescript": "^5.1.6",
    "private": true,
    
*/



