import SectionLine from "./SectionLine";
import { MyTypeMainPhoto, MyTypeInstaPhoto, MyTypeAboutProps } from "./SharedTypes";

import { CarouselBox } from "./Carousel";
import Stores from "./Stores";
import About from "./About";
import Portfolio from "./Portfolio";

interface MainProps {
  mainPictures: Array<MyTypeMainPhoto>,
  mainPicturesMobile: Array<MyTypeMainPhoto>,
  storesPictures: Array<string>,
  aboutInfo: MyTypeAboutProps,
  instaPhoto?: Array<MyTypeInstaPhoto>
}

const Main: React.FC<MainProps> = ({mainPictures, mainPicturesMobile, storesPictures, aboutInfo, instaPhoto}) => {

  return (
    <>
      <CarouselBox
        mainPictures={mainPictures}
        mainPicturesMobile={mainPicturesMobile}
      />
      <Stores 
        storesPictures={storesPictures} 
      />
      <About 
        aboutInfo={aboutInfo}
      />
      {instaPhoto && 
        <Portfolio 
          instaPhoto={instaPhoto} 
        />}
      
      <SectionLine 
        isMain={true} 
      />

    </>
  );
};

export default Main;

  /* 
  const [mainPictures, setMainPictures] = React.useState<
    Array<MyTypeMainPhoto>
  >([]);

  const [mainPicturesMobile, setMainPicturesMobile] = React.useState<
    Array<MyTypeMainPhoto>
  >([]);

  const [instaPhoto, setInstaPhoto] = React.useState<Array<MyTypeInstaPhoto>>(
    []
  );

  const [storesPictures, setStoresPictures] = React.useState<Array<string>>([]);

  const [aboutTexts, setAboutTexts] = React.useState<{}>({});

  
  useEffect(() => {
    Api.getMainPhoto().then((res) => {
      setMainPictures(res.sellPictures.desctopPhoto);
      setMainPicturesMobile(res.sellPictures.mobilePhoto);
      // setInstaPhoto(res.instaPhoto.data);
      setStoresPictures(res.storesPictures);
      setAboutTexts(res.aboutTexts);
    });
  }, []);
  */

