import Header from "../components/Header";
import Footer from "../components/Footer";
import SectionLine from "../components/SectionLine";
import Coffeeshop from "../components/Coffeeshop";
import { baseURL } from "../utils/constatnts";

const Park = ({ parkData }) => {
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
  const res = await fetch(`${baseURL}/park`);
  const parkData = await res.json();

  return {
    props: {
      parkData,
    },
  };
}
