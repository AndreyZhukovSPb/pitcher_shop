import styles from '../styles/Photo.module.css'
import { MyTypeInstaPhoto } from "./SharedTypes";
import Image from "next/image";

interface photoProps {
  item: MyTypeInstaPhoto;
}

const Photo: React.FC<photoProps> = ({
  item
}) => {
  function onClick(link: string) {
    window.open(link, "_blank");
  }

  // console.log(item.storageLink)

  return (
    <Image
      src={item.storageLink}
      alt='foto from insta'
      className={styles.photo}
      fill
      unoptimized={false}
      onClick={() => {
            onClick(item.permaLink);
          }}

    />

    // <Image src={storesPictures[0]} alt="coffeshop photo" className={styles.stores__photo} fill  sizes="20vw"/>
    // <img
    //   src={item.storageLink}
    //   alt="foto from insta"
    //   className={styles.photo}
    //   unoptimized={true}
    //   onClick={() => {
    //     onClick(item.permaLink);
    //   }}
    // />
  );

};

export default Photo;
