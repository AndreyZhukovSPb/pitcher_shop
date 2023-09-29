import Main from "../components/Main";
import Footer from "../components/Footer";
import { baseURL } from "../utils/constatnts";

const Index = ({ data }) => {
  // <Header isMain={true} />

  return (
    <>
      <Main
        mainPictures={data.sellPictures.desctopPhoto}
        mainPicturesMobile={data.sellPictures.mobilePhoto}
        storesPictures={data.storesPictures}
        aboutInfo={data.aboutInfo}
        instaPhoto={data.instaPhoto.data}
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

WAITING FOR
меню переделать и залить в облако - надпись "меню", белое или черное?
team photo парк - поменять
main photo park new
photo Kiri ot Kiri
Barista about - add

??
Menu popup?
what does menu include?
на мобиле есть ховер и курсор поинтер?
clicable links in footer

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
*/

