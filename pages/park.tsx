import Header from "../components/Header";
import Footer from "../components/Footer";
import SectionLine from "../components/SectionLine";
import Coffeeshop from "../components/Coffeeshop";


const Park = ({ parkData }) => {
//    <Header isPark={true} />
  return (
    <>
      <SectionLine isMain={false} />
      {typeof window !== "undefined" && (
        <Coffeeshop
          isMayak={false}
          isPark={true}
          imagesArrayDesctop={parkData.desctop}
          imagesArrayMobile={parkData.mobile}
          data={parkData.data}
          teamAbout={parkData.teamAbout}
          teamPhoto={parkData.teamPhoto}
        />
      )}
      <Footer />
    </>
  );
};

export default Park;

export async function getStaticProps() {
  const res = await fetch("http://localhost:4001/park");
  const parkData = await res.json();

  return {
    props: {
      parkData,
    },
  };
}
