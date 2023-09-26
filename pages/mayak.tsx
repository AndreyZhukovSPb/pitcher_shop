import Header from "../components/Header";
import Footer from "../components/Footer";
import SectionLine from "../components/SectionLine";
import Coffeeshop from "../components/Coffeeshop";

const Mayak = ({ mayakData }) => {
  //   <Header isMayak={true} />
  
  return (
    <>
      <SectionLine isMain={false} />
      {typeof window !== "undefined" && (
        <Coffeeshop
          isMayak={true}
          isPark={false}
          imagesArrayDesctop={mayakData.desctop}
          imagesArrayMobile={mayakData.mobile}
          data={mayakData.data}
          teamAbout={mayakData.teamAbout}
          teamPhoto={mayakData.teamPhoto}
        />
      )}

      <Footer />
    </>
  );
};

//<Coffeeshop isMayak={true} isPark={false}/>

export default Mayak;

export async function getStaticProps() {
  const res = await fetch("http://localhost:4001/mayak");
  const mayakData = await res.json();

  return {
    props: {
      mayakData,
    },
  };
}
