import React from "react";
import { useState, useEffect } from "react";
import styles from "../styles/Team.module.css";
import { MyTypeAboutProps, MyTypeTeam } from "../components/SharedTypes";
import Teammate from "./Teammate";

interface TeamProps {
  teamAbout: MyTypeAboutProps;
  teamPhoto: Array<MyTypeTeam>;
}

const Team: React.FC<TeamProps> = ({ teamAbout, teamPhoto }) => {
  const [currentTeam, setCurrentTeam] = React.useState<Array<MyTypeTeam>>([]);

  useEffect(() => {
      setCurrentTeam(teamPhoto);
  }, []);

  return (
    <section className={styles.team}>
      <h2 className={styles.team__title}>Команда Pitcher</h2>
      <p className={styles.team__subTitle}>{teamAbout.firstMessage}</p>
      <p className={styles.team__subTitle}>{teamAbout.secondMEssage}</p>
      <p className={styles.team__subTitle}>{teamAbout.thirdMEssage}</p>
      <div className={styles.team__container}>
        {currentTeam.map((item) => (
          <Teammate
            key={`${item.id} ${item.name}`}
            image={item.image}
            name={item.name}
            about={item.about}
            role={item.role}
            id={item.id}
            begining={item.begining}
            about_mobile={item.about_mobile}
          />
        ))}
      </div>
    </section>
  );
};

export default Team;
