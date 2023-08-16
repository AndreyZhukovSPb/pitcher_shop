import styles from '../styles/Photo.module.css'
import { MyTypeInstaPhoto } from "./SharedTypes";

interface photoProps {
  // image: string;
  // type: string;
  // key: string;
  // videoImage?: string;
  // permalink: string;
  item: MyTypeInstaPhoto;
}

const Photo: React.FC<photoProps> = ({
  item
}) => {
  function onClick(link: string) {
    window.open(link, "_blank");
  }

  if (item.media_type === "IMAGE" || item.media_type === "CAROUSEL_ALBUM") {
    return (
      <img
        src={item.media_url}
        alt="foto from insta"
        className={styles.photo}
        onClick={() => {
          onClick(item.permalink);
        }}
      />
    );
  } else if (item.media_type === "VIDEO") {
    return (
      <img
        src={item.thumbnail_url}
        alt="foto from insta"
        className={styles.photo}
        onClick={() => {
          onClick(item.permalink);
        }}
      />
    );
  } else {
    return <div></div>;
  }
};

export default Photo;
