import React from "react";
import styles from "../styles/Teammate.module.css";
import { useMediaQuery } from "react-responsive";
import { MyTypeTeam } from "../components/SharedTypes";

const Teammate: React.FC<MyTypeTeam> = ({
  image,
  name,
  role,
  about,
  begining,
  about_mobile,
}) => {
  const isMobile = useMediaQuery({ query: `(max-width: 599px)` });

  return (
    <div className={styles.teammate}>
      <img src={image} alt="фото сотрудника" className={styles.teammate__image} />
      <p className={styles.teammate__title}>{name}</p>
      <p className={styles.teammate__subTitle}>{role}</p>
      <p
        className={`${styles.teammate__subTitle} ${
          role === "сооснователь" ? styles.teammate__subTitle_invisible : ""
        } `}
      >
        в проекте с {begining} {isMobile ? "г" : "года"}
      </p>
      <p className={styles.teammate__about}>{!isMobile ? about : about_mobile}</p>
    </div>
  );
};

export default Teammate;
