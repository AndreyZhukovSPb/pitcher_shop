import styles from "../styles/SectionLine.module.css";

interface SectionLineProps {
  isMain?: boolean;
  isForCatalog? : boolean;
  isBigScreen?: boolean;
  hideForBigScreen?: boolean
}

const SectionLine: React.FC<SectionLineProps> = ({ hideForBigScreen, isMain, isForCatalog, isBigScreen }) => {
  return (
    <>
    {!hideForBigScreen && (
      <div
      className={`${styles.sectionLine} 
        ${isForCatalog ? styles.sectionLine_type_catalog : ""}
        ${isBigScreen ? styles.sectionLine_type_bigScreen : ""}
        `}
    ></div>
    )}
    </>
  );
};

export default SectionLine;
