import App from "../components/App";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import { useEffect } from "react";

const Index = ({ data, switchOffIsMain }) => {
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
  const res = await fetch("http://localhost:4001");
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}




/*
to-do: 
FEATURE:
скорость перелистывания карусели для мобилы увеличить

REFACTOR
baseURL вынести в константу и поменять во всех фетч запросах
удалить шрифты из page

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

filally:
удалить app и appOld
ScrollToTop проверить
favicon check?
errors console
*/

