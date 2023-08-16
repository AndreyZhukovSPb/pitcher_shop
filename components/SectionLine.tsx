import styles from "../styles/SectionLine.module.css";

interface SectionLineProps {
  isMain?: boolean;
}

const SectionLine: React.FC<SectionLineProps> = ({ isMain }) => {
  return (
    <div
      className={`${styles.sectionLine} ${isMain ? styles.sectionLine_type_main : ""}`}
    ></div>
  );
};

export default SectionLine;
