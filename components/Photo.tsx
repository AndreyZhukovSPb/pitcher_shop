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
    // console.log(item.permaLink);
    // console.log(item.storageLink);
    window.open(link, "_blank");
  }

  const randomParam = Math.random().toString(36).substring(7);

  return (
    <Image
      src={`${item.storageLink}?random=${randomParam}`}
      alt='foto from insta'
      className={styles.photo}
      fill
      unoptimized={true}
      onClick={() => {
            onClick(item.permaLink);
          }}
    />
  );

};

export default Photo;
