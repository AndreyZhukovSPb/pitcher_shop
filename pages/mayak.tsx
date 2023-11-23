import Header from "../components/Header";
import Footer from "../components/Footer";
import SectionLine from "../components/SectionLine";
import Coffeeshop from "../components/Coffeeshop";
import { baseURL } from "../utils/constatnts";

const Mayak = ({ mayakData }) => {
  
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

export default Mayak;

export async function getServerSideProps() {
  const res = await fetch(`${baseURL}/mayak`);
  const mayakData = await res.json();

  return {
    props: {
      mayakData,
    },
  };
}
