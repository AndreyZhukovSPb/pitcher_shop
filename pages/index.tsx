import App from "../components/App";
import Header from "../components/Header";
import Main from "../components/Main";
import Head from "next/head";

const Index = ({ data }) => {
  return (
    <>
      <Header isMain={true} />
      <Main
        mainPictures={data.sellPictures.desctopPhoto}
        mainPicturesMobile={data.sellPictures.mobilePhoto}
        storesPictures={data.storesPictures}
        aboutInfo={data.aboutInfo}
        instaPhoto={data.instaPhoto.data}
      />
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
